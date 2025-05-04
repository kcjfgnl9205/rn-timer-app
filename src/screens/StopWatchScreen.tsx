import { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, AppState, AppStateStatus, FlatList } from 'react-native'
import { RotateCw, Pause, Play, Flag } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Text } from '@/components/common/Text'
import { getColors } from '@/theme/colors'
import { formatTimeStopWatch } from '@/utils/utils'

export default function StopWatchScreen() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const appState = useRef(AppState.currentState)
  const backgroundStart = useRef<number | null>(null)
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

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
    <View className="flex-1 px-6 pt-12 gap-14" style={{ backgroundColor: colors.background }}>
      <View className="flex-col items-center gap-8">
        <Text
          className="text-6xl font-bold"
          style={{ fontVariant: ['tabular-nums'], color: colors.text }}
        >
          {formatTimeStopWatch(elapsed)}
        </Text>

        <View className="flex-row gap-6">
          <TouchableOpacity
            className="p-4 rounded-full"
            style={{
              backgroundColor: colors.container,
              borderColor: colors.border,
              borderWidth: 1,
            }}
            onPress={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? (
              <Pause size={32} color={colors.text} />
            ) : (
              <Play size={32} color={colors.text} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isRunning}
            className="p-4 rounded-full"
            style={{
              backgroundColor: isRunning ? colors.disabled : colors.container,
              borderColor: colors.border,
              borderWidth: 1,
            }}
            onPress={handleReset}
          >
            <RotateCw size={32} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4 rounded-full"
            onPress={handleLap}
            style={{
              backgroundColor: colors.container,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            <Flag size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        className="w-full mb-12"
        data={laps}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 12 }}
        renderItem={({ item, index }) => (
          <View className="flex-row justify-between border-b border-neutral-300 py-4">
            <Text className="text-lg font-bold" style={{ color: colors.text }}>
              Lap {laps.length - index}
            </Text>
            <Text
              className="text-xl font-bold"
              style={{ fontVariant: ['tabular-nums'], color: colors.text }}
            >
              {formatTimeStopWatch(item)}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
