import { Pressable } from 'react-native'
import { View } from 'react-native'
import { Plus } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/types/type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Navigation = NativeStackNavigationProp<RootStackParamList, 'TimerCreate'>

export default function TimerAdd() {
  const navigation = useNavigation<Navigation>()

  return (
    <Pressable onPress={() => navigation.navigate('TimerCreate')}>
      <View className="mr-4">
        <Plus size={24} color="#000" />
      </View>
    </Pressable>
  )
}
