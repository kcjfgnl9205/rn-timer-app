import { View, FlatList } from 'react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import GridToolbar from '@/components/timer/GridToolbar'
import TimerGrid from '@/components/timer/TimerGrid'
import TimerList from '@/components/timer/TimerList'

export default function TimerScreen() {
  const timers = useTimerStore((s) => s.timers)
  const mode = useTimerStore((s) => s.mode)
  const setMode = useTimerStore((s) => s.setMode)

  return (
    <View className="flex-1 bg-white">
      <GridToolbar mode={mode} onChange={setMode} />

      <View className="pt-2">
        <FlatList
          data={timers}
          key={mode}
          numColumns={mode === 'grid' ? 2 : 1}
          contentContainerStyle={{ paddingBottom: 80 }}
          columnWrapperStyle={mode === 'grid' ? { justifyContent: 'space-between' } : undefined}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return mode === 'grid' ? (
              <View className={`basis-1/2 p-1`}>
                <TimerGrid item={item} />
              </View>
            ) : (
              <View className="p-1">
                <TimerList item={item} />
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}
