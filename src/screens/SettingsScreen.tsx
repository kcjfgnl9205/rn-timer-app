import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Bell, Vibrate, BellRing, ChevronRight } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SettingContainer from '@/components/settings/SettingContainer'
import SettingIcon from '@/components/settings/SettingIcon'
import { Text } from '@/components/common/Text'
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
          icon: <SettingIcon icon={Vibrate} />,
          label: '진동 알림',
          subLabel: '타이머 종료 시 진동으로 알림',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Text>{vibration.enabled ? `ON (${vibration.value})` : 'OFF'} </Text>
              <ChevronRight size={24} color="#000" />
            </View>
          ),
          onPress: () => navigation.navigate('VibrationSetting'),
        },
        {
          icon: <SettingIcon icon={Bell} />,
          label: '소리 알림',
          subLabel: '타이머 종료 시 소리로 알림',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Text>{sound.enabled ? `ON (${sound.value})` : 'OFF'} </Text>
              <ChevronRight size={24} color="#000" />
            </View>
          ),
          onPress: () => navigation.navigate('SoundSetting'),
        },
        {
          icon: <SettingIcon icon={BellRing} />,
          label: '푸시 알림',
          subLabel: '앱이 닫혀 있을 때도 알림 받기',
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
  ]

  return <SettingContainer items={sections} />
}
