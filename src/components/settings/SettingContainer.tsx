import { View, FlatList } from 'react-native'
import SettingCard from '@/components/settings/SettingCard'
import { SettingSection } from '@/types/type'

interface Props {
  items: SettingSection[]
}
export default function SettingContainer({ items }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-white py-2">
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View className="p-1" key={index}>
            <SettingCard title={item?.title} items={item.items} />
          </View>
        )}
      />
    </View>
  )
}
