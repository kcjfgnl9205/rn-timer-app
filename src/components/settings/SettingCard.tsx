import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/components/common/Text'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'

interface Props {
  icon?: JSX.Element
  label: string
  subLabel?: string
  onPress?: () => void
  rightIcon?: JSX.Element
}

export default function SettingCard({ icon, label, subLabel, onPress, rightIcon }: Props) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  const isPressable = typeof onPress === 'function'
  const Container = isPressable ? TouchableOpacity : View

  return (
    <Container
      onPress={onPress}
      className="flex-row items-center justify-between w-full px-4 py-4"
      disabled={!isPressable}
    >
      <View className="flex-row items-center gap-2">
        {icon}
        <View>
          <Text className="text-lg">{label}</Text>
          {subLabel && (
            <Text className="text-base" style={{ color: colors.subText }}>
              {subLabel}
            </Text>
          )}
        </View>
      </View>

      {rightIcon}
    </Container>
  )
}
