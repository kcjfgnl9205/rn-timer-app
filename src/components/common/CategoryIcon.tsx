import { CATEGORY_CLASS_MAP } from '@/consts/const'
import { Category } from '@/types/type'
import { View, Pressable } from 'react-native'

interface Props {
  color: Category
  selected?: boolean
  onPress?: () => void
}

export default function CategoryIcon({ color, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        className={`w-full h-full rounded-full ${CATEGORY_CLASS_MAP[color]} 
          ${
            selected ? 'border-2 border-black dark:border-white' : 'border-[1px] border-neutral-100'
          }`}
      />
    </Pressable>
  )
}
