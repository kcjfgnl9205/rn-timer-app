import { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Play, Pause, RotateCw } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { Text } from '@/components/common/Text'
import { formatTime, getRemainingTime } from '@/utils/utils'
import { Timer, Navigation } from '@/types/type'

interface Props {
  item: Timer
}

export default function TimerCard({ item }: Props) {
  const navigation = useNavigation<Navigation>()
  const { startTimer, pauseTimer, resetTimer } = useTimerStore()

  const [_, forceUpdate] = useState(0) // 리렌더링 유도용 상태
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const remainingTime = getRemainingTime(item)

  useEffect(() => {
    if (item.isRunning) {
      intervalRef.current = setInterval(() => {
        // 1초마다 강제 리렌더링
        forceUpdate((n) => n + 1)
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [item.isRunning])

  useEffect(() => {
    if (remainingTime <= 0 && item.isRunning) {
      console.log(`⏰ 타이머 끝남: ${item.title}`)
      pauseTimer(item.id) // 일단 정지시키고
      Alert.alert(
        '타이머 종료',
        `"${item.title}" 타이머가 끝났어요.`,
        [
          {
            text: '확인',
            onPress: () => {
              resetTimer(item.id)
            },
          },
        ],
        { cancelable: false }
      )
    }
  }, [remainingTime, item.isRunning])

  return (
    <Pressable onPress={() => navigation.navigate('TimerDetail', { id: item.id })}>
      <View className="flex-row justify-between items-center  relative border-b-[1px] border-neutral-200 ">
        <View
          className={`absolute top-0 left-0 w-full h-full ${
            item.isRunning ? 'bg-neutral-100' : 'bg-transparent'
          } `}
        />

        <View className="flex-1 flex-row w-full justify-between py-4 items-center px-4">
          <View>
            <Text className="text-neutral-600 font-semibold text-base" numberOfLines={1}>
              {item.title}
            </Text>

            <Text
              className="text-neutral-900 font-bold text-3xl"
              style={{ fontVariant: ['tabular-nums'] }}
            >
              {formatTime(remainingTime)}
            </Text>
          </View>

          <View className="flex-row gap-2 justify-center">
            {!item.isRunning && remainingTime < item.duration && (
              <TouchableOpacity
                className="border-[1px] border-neutral-200 p-4 rounded-full"
                onPress={() => resetTimer(item.id)}
              >
                <RotateCw size={20} color="#000" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="border-[1px] border-neutral-200 p-4 rounded-full"
              onPress={() => (item.isRunning ? pauseTimer(item.id) : startTimer(item.id))}
            >
              {item.isRunning ? <Pause size={20} color="#000" /> : <Play size={20} color="#000" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
