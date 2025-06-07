import { CATEGORY_CLASS_MAP } from '@/consts/const'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'
import { Category } from '@/types/type'
import { View, Pressable } from 'react-native'

interface Props {
  color: Category
  selected?: boolean
  onPress?: () => void
}

export default function CategoryIcon({ color, selected, onPress }: Props) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <Pressable onPress={onPress}>
      <View
        className={`w-full h-full rounded-full ${CATEGORY_CLASS_MAP[color]}`}
        style={{
          borderColor: selected ? colors.border : '',
          borderWidth: selected ? 4 : 0,
        }}
      />
    </Pressable>
  )
}
