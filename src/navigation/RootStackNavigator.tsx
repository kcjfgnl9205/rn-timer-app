import { TextStyle } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import TimerFormScreen from '@/screens/TimerFormScreen'
import TimerDetailScreen from '@/screens/TimerDetailScreen'
import CategorySettingScreen from '@/screens/CategorySettingScreen'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'
import { RootStackParamList } from '@/types/type'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootStackNavigator() {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  const defaultScreenOptions = {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTitleStyle: {
      color: colors.text,
    },
    headerTintColor: colors.text,
    headerBackTitle: '뒤로',
    headerBackTitleStyle: {
      ...({
        fontSize: 18,
        fontWeight: '500',
        color: colors.text,
      } as TextStyle),
    },
    contentStyle: {
      backgroundColor: colors.background,
    },
  }

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="TimerForm"
        component={TimerFormScreen}
        options={{ title: '타이머 추가' }}
      />
      <Stack.Screen
        name="CategorySetting"
        component={CategorySettingScreen}
        options={{ title: '카테고리 설정' }}
      />
    </Stack.Navigator>
  )
}
