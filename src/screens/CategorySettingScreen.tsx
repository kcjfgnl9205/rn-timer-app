import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Text } from '@/components/common/Text'
import { CategoryCreateModal } from '@/components/modal/CategoryCreateModal'
import CategoryIcon from '@/components/common/CategoryIcon'
import Trash from '@/assets/icons/trash.svg'
import { getColors } from '@/theme/colors'

export default function CategorySettingScreen() {
  const categories = useSettingsStore((s) => s.categories)
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const removeCategory = useSettingsStore((s) => s.removeCategory)
  const colors = getColors(colorScheme)

  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex flex-row gap-3 mr-4">
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text className="font-medium text-lg">추가</Text>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  return (
    <View className="flex-1 px-6 pt-12 gap-14">
      <CategoryCreateModal
        visible={visible}
        title="카테고리 추가"
        onClose={() => setVisible(false)}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center gap-4">
              <View className="w-6 h-6">
                <CategoryIcon color={item.color} />
              </View>
              <Text className="text-lg">{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => removeCategory(item.id)}>
              <Trash width={24} height={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
