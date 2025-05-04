import { View, FlatList } from 'react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import TimerCard from '@/components/timer/TimerCard'
import { getColors } from '@/theme/colors'

export default function TimerScreen() {
  const timers = useTimerStore((s) => s.timers)
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <View className="flex-1 pt-2" style={{ backgroundColor: colors.background }}>
      <FlatList
        data={timers}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={index}>
            <TimerCard item={item} />
          </View>
        )}
      />
    </View>
  )
}
