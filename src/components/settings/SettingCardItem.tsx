import { View, Text, TouchableOpacity } from 'react-native'
import { ChevronRight } from 'lucide-react-native'

interface Props {
  icon: JSX.Element
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
      className="flex-row items-center justify-between px-4 py-3 w-full"
      disabled={!isPressable}
    >
      <View className="flex-row items-center gap-2">
        {icon}
        <Text className="text-black">{label}</Text>
      </View>

      {/* 오른쪽 요소: 기본은 ChevronRight */}
      <View>{isPressable && !rightIcon ? <ChevronRight size={16} color="#aaa" /> : rightIcon}</View>
    </Container>
  )
}
