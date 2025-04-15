import { View } from 'react-native'
import SettingCardItem from '@/components/settings/SettingCardItem'
import { Text } from '@/components/common/Text'
import { SettingItem } from '@/types/type'

interface Props {
  title?: string
  items: SettingItem[]
}
export default function SettingCard({ title, items }: Props) {
  return (
    <View className="mx-1">
      {title && <Text className="text-black font-bold text-lg mb-2 px-2">{title}</Text>}
      <View className="flex-col bg-neutral-100 rounded-xl w-full py-1">
        {items.map((item, index) => (
          <SettingCardItem key={index} {...item} />
        ))}
      </View>
    </View>
  )
}
