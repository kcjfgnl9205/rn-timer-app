import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Settings, Timer, Clock4 } from 'lucide-react-native'
import TimerScreen from '@/screens/TimerScreen'
import SettingsScreen from '@/screens/SettingsScreen'
import StopWatchScreen from '@/screens/StopWatchScreen'
import TimerAdd from '@/components/timer/TimerAdd'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text, // 💡 헤더 텍스트 색도 설정하면 깔끔
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: { fontSize: 12 },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name="타이머"
        component={TimerScreen}
        options={{
          tabBarLabel: '타이머',
          tabBarIcon: () => <Timer size={24} color={colors.text} />,
          headerRight: () => <TimerAdd />,
        }}
      />
      <Tab.Screen
        name="스톱워치"
        component={StopWatchScreen}
        options={{
          tabBarLabel: '스톱워치',
          tabBarIcon: () => <Clock4 size={24} color={colors.text} />,
        }}
      />
      <Tab.Screen
        name="설정"
        component={SettingsScreen}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: () => <Settings size={24} color={colors.text} />,
        }}
      />
    </Tab.Navigator>
  )
}
