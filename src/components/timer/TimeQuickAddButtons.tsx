import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/components/common/Text'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'

interface Props {
  onAdd: (seconds: number) => void
}

const options = [
  { label: '+30초', value: 30 },
  { label: '+5분', value: 300 },
  { label: '+30분', value: 1800 },
  { label: '+1시간', value: 3600 },
]

export default function TimeQuickAddButtons({ onAdd }: Props) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  return (
    <View className="flex-row justify-center flex-wrap gap-2 mb-8">
      {options.map((option) => (
        <TouchableOpacity
          key={option.label}
          onPress={() => onAdd(option.value)}
          className="rounded-full px-4 py-2 mx-1 my-1"
          style={{ backgroundColor: colors.container, borderColor: colors.border }}
        >
          <Text className="text-sm" style={{ color: colors.text }}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
