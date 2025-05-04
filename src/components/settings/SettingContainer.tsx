import { View, Text } from 'react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'
import { SettingSection } from '@/types/type'
import SettingCard from '@/components/settings/SettingCard'

interface Props {
  item: SettingSection
}
export default function SettingContainer({ item }: Props) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  return (
    <View className="mx-1 mb-8">
      {item.title && (
        <Text className="font-bold text-lg mb-2 px-2" style={{ color: colors.text }}>
          {item.title}
        </Text>
      )}
      <View
        className="flex-col rounded-xl w-full py-1"
        style={{ backgroundColor: colors.container, borderColor: colors.border, borderWidth: 1 }}
      >
        {item.items.map((item, index) => (
          <SettingCard key={index} {...item} />
        ))}
      </View>
    </View>
  )
}
