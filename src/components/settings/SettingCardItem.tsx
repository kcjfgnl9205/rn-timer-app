import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
  icon?: JSX.Element
  label: string
  onPress?: () => void
  rightIcon?: JSX.Element
}

export default function SettingCardItem({ icon, label, onPress, rightIcon }: Props) {
  const isPressable = typeof onPress === 'function'
  const Container = isPressable ? TouchableOpacity : View

  return (
    <Container
      onPress={onPress}
      className="flex-row items-center justify-between w-full px-4 py-1"
      disabled={!isPressable}
    >
      <View className="flex-row items-center gap-2">
        {icon}
        <Text className="text-black">{label}</Text>
      </View>

      <View>{rightIcon}</View>
    </Container>
  )
}
