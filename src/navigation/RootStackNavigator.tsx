import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import TimerCreateScreen from '@/screens/TimerCreateScreen'
import TimerDetailScreen from '@/screens/TimerDetailScreen'
import VibrationScreen from '@/screens/settings/VibrationScreen'
import SoundScreen from '@/screens/settings/SoundScreen'
import PushScreen from '@/screens/settings/PushScreen'
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
      <Stack.Screen
        name="TimerDetail"
        component={TimerDetailScreen}
        options={{ title: '', headerBackTitle: '뒤로' }}
      />
      <Stack.Screen
        name="VibrationSetting"
        component={VibrationScreen}
        options={{ title: '진동 설정', headerBackTitle: '뒤로' }}
      />
      <Stack.Screen
        name="SoundSetting"
        component={SoundScreen}
        options={{ title: '진동 설정', headerBackTitle: '뒤로' }}
      />
      <Stack.Screen
        name="PushSetting"
        component={PushScreen}
        options={{ title: '푸시 알림 설정', headerBackTitle: '뒤로' }}
      />
    </Stack.Navigator>
  )
}
