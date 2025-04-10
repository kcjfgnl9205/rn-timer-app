import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/type'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import TimerCreateScreen from '@/screens/TimerCreateScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="TimerCreate"
        component={TimerCreateScreen}
        options={{ title: '타이머 추가', headerBackTitle: '뒤로' }}
      />
    </Stack.Navigator>
  )
}
