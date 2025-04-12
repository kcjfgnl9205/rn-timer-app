import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import TimerCreateScreen from '@/screens/TimerCreateScreen'
import TimerAdd from '@/components/timer/TimerAdd'
import { RootStackParamList } from '@/types/type'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="TimerCreate"
        component={TimerCreateScreen}
        options={{ title: '타이머 추가', headerBackTitle: '뒤로', headerRight: () => <TimerAdd /> }}
      />
    </Stack.Navigator>
  )
}
