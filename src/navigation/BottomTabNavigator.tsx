import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Settings, Timer } from 'lucide-react-native'
import TimerScreen from '@/screens/TimerScreen'
import SettingsScreen from '@/screens/SettingsScreen'
import StopWatchScreen from '@/screens/StopWatchScreen'
import TimerAdd from '@/components/timer/TimerAdd'

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="타이머"
        component={TimerScreen}
        options={{
          tabBarLabel: '타이머',
          tabBarIcon: () => <Timer size={24} color="#000" />,
          headerRight: () => <TimerAdd />,
        }}
      />
      <Tab.Screen
        name="스탑워치"
        component={StopWatchScreen}
        options={{
          tabBarLabel: '스탑워치',
          tabBarIcon: () => <Timer size={24} color="#000" />,
          headerRight: () => <TimerAdd />,
        }}
      />
      <Tab.Screen
        name="설정"
        component={SettingsScreen}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: () => <Settings size={24} color="#000" />,
        }}
      />
    </Tab.Navigator>
  )
}
