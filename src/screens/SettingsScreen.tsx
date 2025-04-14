import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Bell, Vibrate, BellDot, Settings, Headset, Info, ChevronRight } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SettingContainer from '@/components/settings/SettingContainer'
import { Navigation, SettingSection } from '@/types/type'

export default function SettingsScreen() {
  const navigation = useNavigation<Navigation>()
  const vibration = useSettingsStore((s) => s.vibration)
  const sound = useSettingsStore((s) => s.sound)
  const push = useSettingsStore((s) => s.push)

  const sections: SettingSection[] = [
    {
      title: '알림 설정',
      items: [
        {
          icon: <Vibrate size={20} color="#000" />,
          label: '진동 알림',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Text>{vibration.enabled ? `ON (${vibration.value})` : 'OFF'} </Text>
              <ChevronRight size={24} color="#000" />
            </View>
          ),
          onPress: () => navigation.navigate('VibrationSetting'),
        },
        {
          icon: <Bell size={20} color="#000" />,
          label: '소리 알림',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Text>{sound.enabled ? `ON (${sound.value})` : 'OFF'} </Text>
              <ChevronRight size={24} color="#000" />
            </View>
          ),
          onPress: () => navigation.navigate('SoundSetting'),
        },
        {
          icon: <BellDot size={20} color="#000" />,
          label: '푸시 알림',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Text>{push.enabled ? `ON (${push.value})` : 'OFF'} </Text>
              <ChevronRight size={24} color="#000" />
            </View>
          ),
          onPress: () => navigation.navigate('PushSetting'),
        },
      ],
    },
    {
      title: '설정',
      items: [
        {
          icon: <Settings size={20} color="#000" />,
          label: '설정',
          onPress: () => {},
        },
      ],
    },
    {
      title: '문의하기',
      items: [
        {
          icon: <Headset size={20} color="#000" />,
          label: '자주 있는 질문',
          onPress: () => {},
        },
        {
          icon: <Info size={20} color="#000" />,
          label: '서비스 이용약관',
          onPress: () => {},
        },
      ],
    },
  ]

  return <SettingContainer items={sections} />
}
