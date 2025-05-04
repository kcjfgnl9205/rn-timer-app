import { View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Plus } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Navigation } from '@/types/type'
import { getColors } from '@/theme/colors'

export default function TimerAdd() {
  const navigation = useNavigation<Navigation>()
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  return (
    <Pressable onPress={() => navigation.navigate('TimerCreate')}>
      <View className="mr-4">
        <Plus size={24} color={colors.text} />
      </View>
    </Pressable>
  )
}
