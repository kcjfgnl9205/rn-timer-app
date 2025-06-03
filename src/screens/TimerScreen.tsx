import { View, FlatList } from 'react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import TimerCard from '@/components/timer/TimerCard'

export default function TimerScreen() {
  const timers = useTimerStore((s) => s.timers)

  return (
    <View className="flex-1 pt-2">
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
