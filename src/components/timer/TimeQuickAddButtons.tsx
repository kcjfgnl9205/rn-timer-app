import { View, Text, TouchableOpacity } from 'react-native'

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
  return (
    <View className="flex-row justify-center flex-wrap gap-2 mb-8">
      {options.map((option) => (
        <TouchableOpacity
          key={option.label}
          onPress={() => onAdd(option.value)}
          className="bg-gray-200 rounded-full px-4 py-2 mx-1 my-1"
        >
          <Text className="text-sm">{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
