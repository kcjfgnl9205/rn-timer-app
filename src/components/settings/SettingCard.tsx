import { View, Text } from 'react-native'
import SettingCardItem from '@/components/settings/SettingCardItem'
import { SettingItem } from '@/types/type'

interface Props {
  title?: string
  items: SettingItem[]
}
export default function SettingCard({ title, items }: Props) {
  return (
    <View>
      {title && <Text className="text-black font-bold text-sm mb-2 px-2">{title}</Text>}
      <View className="flex-col gap-4 bg-neutral-100 rounded-xl p-2 w-full">
        {items.map((item, index) => (
          <SettingCardItem key={index} {...item} />
        ))}
      </View>
    </View>
  )
}
