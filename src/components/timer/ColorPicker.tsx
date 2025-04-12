import { FlatList, TouchableOpacity, View, Text } from 'react-native'

interface Props {
  color: string
  onSelect: (color: string) => void
  colors: string[]
}

export default function ColorPicker({ color, onSelect, colors }: Props) {
  return (
    <View>
      <Text className="text-base mb-2">색상 선택</Text>
      <FlatList
        horizontal
        data={colors}
        keyExtractor={(item) => item}
        className="mb-6"
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`w-10 h-10 rounded-full mx-2 border-2 ${
              color === item ? 'border-black' : 'border-transparent'
            }`}
            onPress={() => onSelect(item)}
            style={{ backgroundColor: item }}
          />
        )}
      />
    </View>
  )
}
