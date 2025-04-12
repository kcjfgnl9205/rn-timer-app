import { View, Text } from 'react-native'
import SettingCardItem from '@/components/settings/SettingCardItem'
import { SettingItem } from '@/types/type'

interface Props {
  title?: string
  items: SettingItem[]
}
export default function SectionCard({ title, items }: Props) {
  return (
    <View className="bg-neutral-100 rounded-xl p-2 w-full">
      {title && <Text className="text-black font-bold text-sm mb-2 px-2">{title}</Text>}
      {items.map((item, index) => (
        <SettingCardItem key={index} {...item} />
      ))}
    </View>
  )
}
