import { useEffect, useState, useLayoutEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Pause, Play, RotateCw, Trash2, Bell, Vibrate } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { Text } from '@/components/common/Text'
import { formatTime, getRemainingTime } from '@/utils/utils'

export default function TimerDetailScreen() {
  const route = useRoute()
  const navigation = useNavigation()

  const { id } = route.params as { id: string }
  const [_, forceUpdate] = useState(0)

  const timers = useTimerStore((s) => s.timers)
  const startTimer = useTimerStore((s) => s.startTimer)
  const pauseTimer = useTimerStore((s) => s.pauseTimer)
  const resetTimer = useTimerStore((s) => s.resetTimer)
  const deleteTimer = useTimerStore((s) => s.deleteTimer)

  const timer = timers.find((t) => t.id === id)
  if (!timer) return <Text>타이머를 찾을 수 없습니다.</Text>

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: timer.color,
      },
      headerShadowVisible: false,
      headerTintColor: '#fff', // 아이콘/텍스트 색상
      headerTitle: '', // 제목 숨기기
    })
  }, [navigation])

  useEffect(() => {
    if (!timer.isRunning) return

    const interval = setInterval(() => {
      forceUpdate((n) => n + 1) // 1초마다 리렌더링
    }, 1000)

    return () => clearInterval(interval)
  }, [timer.isRunning])

  const remainingTime = getRemainingTime(timer)

  const handleDelete = () => {
    deleteTimer(timer.id)
    navigation.goBack()
  }

  return (
    <View className={`flex-1 justify-center items-center`} style={{ backgroundColor: timer.color }}>
      <View className="absolute top-2 left-4 right-4 flex-row justify-between z-10 ">
        <TouchableOpacity onPress={handleDelete}>
          <Trash2 size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Bell size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Vibrate size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white text-2xl font-bold mb-2">{timer.title}</Text>
      <Text className="text-white text-6xl font-bold mb-6">{formatTime(remainingTime)}</Text>

      <View className="flex-row space-x-4">
        <TouchableOpacity
          className="bg-white p-4 rounded-full"
          onPress={() => (timer.isRunning ? pauseTimer(timer.id) : startTimer(timer.id))}
        >
          {timer.isRunning ? (
            <Pause size={32} color={timer.color} />
          ) : (
            <Play size={32} color={timer.color} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-4 rounded-full"
          onPress={() => resetTimer(timer.id)}
        >
          <RotateCw size={32} color={timer.color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
