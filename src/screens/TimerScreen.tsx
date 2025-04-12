import { View, FlatList } from 'react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import GridToolbar from '@/components/timer/GridToolbar'
import TimerCard from '@/components/timer/TimerCard'

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
          renderItem={({ item, index }) => (
            <View className={`${mode === 'grid' ? 'basis-1/2 p-1' : 'p-1'}`} key={index}>
              <TimerCard mode={mode} item={item} />
            </View>
          )}
        />
      </View>
    </View>
  )
}
