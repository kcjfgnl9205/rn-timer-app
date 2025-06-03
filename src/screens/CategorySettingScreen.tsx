import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from '@/components/common/Text'

export default function CategorySettingScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex flex-row gap-3 mr-4">
          <TouchableOpacity>
            <Text className="font-medium text-lg">추가</Text>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  return <View className="flex-1 px-6 pt-12 gap-14"></View>
}
