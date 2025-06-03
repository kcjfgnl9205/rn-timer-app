import { useState, useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated'
import { useTimerStore } from '@/stores/useTimerStore'
import { getRemainingTime } from '@/utils/utils'
import { Timer } from '@/types/type'

export function useTimerProgress(timer: Timer, radius: number = 80) {
  const { pauseTimer, resetTimer } = useTimerStore()
  const [_, forceUpdate] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const circumference = 2 * Math.PI * radius
  const remainingTime = getRemainingTime(timer)
  const progress = remainingTime / timer.duration
  const initialOffset = circumference * (1 - progress)
  const animatedOffset = useSharedValue(initialOffset)

  useEffect(() => {
    if (!timer.isRunning && remainingTime === timer.duration) {
      // 리셋된 상태라면 애니메이션 0으로
      animatedOffset.value = withTiming(0, { duration: 500 })
    }
  }, [timer.isRunning, remainingTime])

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        const newRemainingTime = getRemainingTime(timer)

        if (newRemainingTime <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }

          pauseTimer(timer.id)

          Alert.alert(
            '타이머 종료',
            `"${timer.title}" 타이머가 끝났어요.`,
            [
              {
                text: '확인',
                onPress: () => {
                  resetTimer(timer.id)

                  // 애니메이션도 0으로 부드럽게 이동
                  animatedOffset.value = withTiming(0, { duration: 500 })
                },
              },
            ],
            { cancelable: false }
          )
        } else {
          forceUpdate((n) => n + 1)
        }
      }, 1000)

      animatedOffset.value = withTiming(circumference, { duration: remainingTime * 1000 })
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      const offset = circumference * (1 - remainingTime / timer.duration)
      cancelAnimation(animatedOffset)
      animatedOffset.value = offset
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timer.isRunning])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }))

  return { remainingTime, progress, animatedProps, circumference }
}
