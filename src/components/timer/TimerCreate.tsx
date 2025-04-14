import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Plus } from 'lucide-react-native'
import { Navigation } from '@/types/type'

export default function TimerCreate() {
  const navigation = useNavigation<Navigation>()

  return (
    <Pressable onPress={() => navigation.navigate('TimerCreate')}>
      <View className="mr-4">
        <Plus size={24} color="#000" />
      </View>
    </Pressable>
  )
}
