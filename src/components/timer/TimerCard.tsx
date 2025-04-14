import { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Play, Pause, RotateCw } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { formatTime, getRemainingTime } from '@/utils/utils'
import { GridMode, Timer, Navigation } from '@/types/type'

interface Props {
  mode: GridMode
  item: Timer
}

export default function TimerCard({ mode, item }: Props) {
  const navigation = useNavigation<Navigation>()
  const isGrid = mode === 'grid'
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

  return (
    <Pressable onPress={() => navigation.navigate('TimerDetail', { id: item.id })}>
      <View
        className={`
        ${isGrid ? 'flex-col gap-2 p-3' : 'flex-row justify-between items-center px-6 py-4'}
        rounded-xl
      `}
        style={{ backgroundColor: item.color }}
      >
        <View className={`${isGrid ? '' : 'flex-1 pr-4'}`}>
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="text-white font-bold text-3xl text-center">
            {formatTime(remainingTime)}
          </Text>
        </View>

        <View className="flex-row gap-2 justify-center">
          <TouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={() => (item.isRunning ? pauseTimer(item.id) : startTimer(item.id))}
          >
            {item.isRunning ? (
              <Pause size={20} color={item.color} />
            ) : (
              <Play size={20} color={item.color} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={() => resetTimer(item.id)}
          >
            <RotateCw size={20} color={item.color} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
}
