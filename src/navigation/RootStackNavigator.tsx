import { TextStyle } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import TimerCreateScreen from '@/screens/TimerCreateScreen'
import TimerDetailScreen from '@/screens/TimerDetailScreen'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'
import { RootStackParamList } from '@/types/type'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootStackNavigator() {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="TimerCreate"
        component={TimerCreateScreen}
        options={{
          title: '타이머 추가',
          headerBackTitle: '뒤로',
          headerBackTitleStyle: {
            ...({
              fontSize: 18,
              fontWeight: 500,
              color: colors.text,
            } as TextStyle),
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="TimerDetail"
        component={TimerDetailScreen}
        options={{ title: '', headerBackTitle: '뒤로' }}
      />
    </Stack.Navigator>
  )
}
