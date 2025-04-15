import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/components/common/Text'

interface Props {
  icon?: JSX.Element
  label: string
  subLabel?: string
  onPress?: () => void
  rightIcon?: JSX.Element
}

export default function SettingCardItem({ icon, label, subLabel, onPress, rightIcon }: Props) {
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
        <View className="">
          <Text className="text-black text-xl">{label}</Text>
          {subLabel && <Text className="text-base text-neutral-500">{subLabel}</Text>}
        </View>
      </View>

      <View>{rightIcon}</View>
    </Container>
  )
}
