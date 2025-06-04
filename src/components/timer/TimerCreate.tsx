import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Plus from '@/assets/icons/plus.svg'
import { Navigation } from '@/types/type'

export default function TimerCreate() {
  const navigation = useNavigation<Navigation>()

  return (
    <Pressable onPress={() => navigation.navigate('TimerForm')}>
      <View className="mr-4">
        <Plus width={24} height={24} color="#000" />
      </View>
    </Pressable>
  )
}
