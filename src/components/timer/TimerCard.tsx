import { View, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Play, Pause, RotateCw } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Text } from '@/components/common/Text'
import { formatTime } from '@/utils/utils'
import { Timer, Navigation } from '@/types/type'
import { useTimerProgress } from '@/hooks/useTimerProgress'
import { getColors } from '@/theme/colors'

interface Props {
  item: Timer
}

export default function TimerCard({ item }: Props) {
  const navigation = useNavigation<Navigation>()
  const { startTimer, pauseTimer, resetTimer } = useTimerStore()
  const { remainingTime } = useTimerProgress(item)

  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <Pressable onPress={() => navigation.navigate('TimerDetail', { id: item.id })}>
      <View
        className="flex-row justify-between items-center relative border-[1px] rounded-xl mb-2"
        style={{ backgroundColor: colors.container, borderColor: colors.border }}
      >
        <View className={`absolute top-0 left-0 w-full h-full`} />

        <View className="flex-1 flex-row w-full justify-between py-4 items-center px-4">
          <View className="mr-32">
            <Text
              className="font-semibold text-base"
              numberOfLines={1}
              style={{ color: colors.subText }}
            >
              {item.title}
            </Text>

            <Text
              className="font-black text-3xl"
              style={{ fontVariant: ['tabular-nums'], color: colors.text }}
            >
              {formatTime(remainingTime)}
            </Text>
          </View>

          <View className="flex-1 flex-row gap-2 justify-end">
            {!item.isRunning && remainingTime < item.duration && (
              <TouchableOpacity
                className="border-[1px] border-neutral-200 p-4 rounded-full"
                onPress={() => resetTimer(item.id)}
              >
                <RotateCw size={20} color={colors.text} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="border-[1px] border-neutral-200 p-4 rounded-full"
              onPress={() => (item.isRunning ? pauseTimer(item.id) : startTimer(item.id))}
            >
              {item.isRunning ? (
                <Pause size={20} color={colors.text} />
              ) : (
                <Play size={20} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
