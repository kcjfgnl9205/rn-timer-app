import { View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Plus from '@/assets/icons/plus.svg'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Navigation } from '@/types/type'
import { getColors } from '@/theme/colors'

export default function TimerAdd() {
  const navigation = useNavigation<Navigation>()
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  return (
    <Pressable onPress={() => navigation.navigate('TimerForm')}>
      <View className="mr-4">
        <Plus width={24} height={24} color={colors.text} />
      </View>
    </Pressable>
  )
}
