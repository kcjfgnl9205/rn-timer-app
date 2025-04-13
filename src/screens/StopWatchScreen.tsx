import { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, AppState, AppStateStatus, FlatList } from 'react-native'
import { RotateCw, Pause, Play, Disc2 } from 'lucide-react-native'
import { formatTimeStopWatch } from '@/utils/utils'

export default function StopWatchScreen() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const appState = useRef(AppState.currentState)
  const backgroundStart = useRef<number | null>(null)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => subscription.remove()
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
      if (isRunning) {
        backgroundStart.current = Date.now()
      }
    }

    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      if (isRunning && backgroundStart.current !== null) {
        const delta = Date.now() - backgroundStart.current
        setElapsed((prev) => prev + delta)
        backgroundStart.current = null
      }
    }

    appState.current = nextAppState
  }

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsed
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime)
      }, 10)
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    setElapsed(0)
    setLaps([])
  }

  const handleLap = () => {
    setLaps((prev) => [elapsed, ...prev])
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12 ">
      {laps.length > 0 && (
        <FlatList
          className="w-full"
          data={laps}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 12 }}
          renderItem={({ item, index }) => (
            <View className="flex-row justify-between border-b border-gray-300 py-2">
              <Text className="text-gray-700">랩 {laps.length - index}</Text>
              <Text className="text-gray-700">{formatTimeStopWatch(item)}</Text>
            </View>
          )}
        />
      )}

      <View
        className={`flex-col items-center gap-2 ${
          laps.length === 0 ? 'flex-1 justify-center' : 'mt-24 mb-8'
        }`}
      >
        <Text className="text-6xl font-bold text-black" style={{ fontVariant: ['tabular-nums'] }}>
          {formatTimeStopWatch(elapsed)}
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity
            className="bg-black p-4 rounded-full"
            onPress={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? <Pause size={32} color="white" /> : <Play size={32} color="white" />}
          </TouchableOpacity>
          <TouchableOpacity className="bg-black p-4 rounded-full" onPress={handleReset}>
            <RotateCw size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-black p-4 rounded-full" onPress={handleLap}>
            <Disc2 size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
