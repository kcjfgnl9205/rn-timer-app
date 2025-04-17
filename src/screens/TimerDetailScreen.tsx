import { useEffect, useState, useLayoutEffect } from 'react'
import { View, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Pause, Play, RotateCw, Trash2, Bell, Vibrate } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { Text } from '@/components/common/Text'
import TimerCircle from '@/components/timer/TimerCircle'

export default function TimerDetailScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  // 타이머 아이디
  const { id } = route.params as { id: string }

  // 세로가로 회전
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  // 자동 업데이트
  const [_, forceUpdate] = useState(0)

  // 시계 사이즈
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const radiusWidth = windowWidth * 0.35
  const radiusHeight = windowHeight * 0.35

  // 타이머 정보
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
      headerShadowVisible: false,
      headerTintColor: 'blue', // 아이콘/텍스트 색상
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

  const handleDelete = () => {
    deleteTimer(timer.id)
    navigation.goBack()
  }

  return isLandscape ? (
    // 가로모드 레이아웃
    <View className="flex-1 flex-row bg-white">
      <View className="flex-1 items-center justify-center">
        <TimerCircle radius={radiusHeight} timer={timer} />
      </View>

      <View className="flex-1 justify-center items-center flex-col gap-4">
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Bell size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Vibrate size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <Text className="text-black text-3xl font-bold">{timer.title}</Text>

        <View className="flex-row">
          <TouchableOpacity
            className="bg-white p-4 rounded-full"
            onPress={() => (timer.isRunning ? pauseTimer(timer.id) : startTimer(timer.id))}
          >
            {timer.isRunning ? <Pause size={32} color="#000" /> : <Play size={32} color="#000" />}
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-full"
            onPress={() => resetTimer(timer.id)}
          >
            <RotateCw size={32} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    // 세로모드 레이아웃
    <View className="flex-1 items-center justify-between bg-white py-32 px-4">
      <View className="justify-center items-center flex-col gap-4">
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Bell size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Vibrate size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <Text className="text-black text-3xl font-bold">{timer.title}</Text>
      </View>
      <TimerCircle radius={radiusWidth} timer={timer} />
      <View className="flex-row">
        <TouchableOpacity
          className="bg-white p-4 rounded-full"
          onPress={() => (timer.isRunning ? pauseTimer(timer.id) : startTimer(timer.id))}
        >
          {timer.isRunning ? <Pause size={32} color="#000" /> : <Play size={32} color="#000" />}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-4 rounded-full"
          onPress={() => resetTimer(timer.id)}
        >
          <RotateCw size={32} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
