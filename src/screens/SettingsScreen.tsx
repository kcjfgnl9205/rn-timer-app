import { View, Switch, FlatList } from 'react-native'
import { Bell, Vibrate, BellDot, Settings, Headset, Info } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SectionCard from '@/components/settings/SettingCard'
import { SettingSection } from '@/types/type'

export default function SettingsScreen() {
  const vibration = useSettingsStore((s) => s.globalVibration)
  const sound = useSettingsStore((s) => s.globalSound)
  const push = useSettingsStore((s) => s.globalPush)

  const setVibration = useSettingsStore((s) => s.setGlobalVibration)
  const setSound = useSettingsStore((s) => s.setGlobalSound)
  const setPush = useSettingsStore((s) => s.setGlobalPush)

  const sections: SettingSection[] = [
    {
      title: '알림 설정',
      items: [
        {
          icon: <Vibrate size={20} color="#000" />,
          label: '진동 알림',
          rightIcon: (
            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ true: '#06b6d4', false: '#ccc' }}
              thumbColor="#fff"
            />
          ),
        },
        {
          icon: <Bell size={20} color="#000" />,
          label: '소리 알림',
          rightIcon: (
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ true: '#06b6d4', false: '#ccc' }}
              thumbColor="#fff"
            />
          ),
        },
        {
          icon: <BellDot size={20} color="#000" />,
          label: '푸시 알림',
          rightIcon: (
            <Switch
              value={push}
              onValueChange={setPush}
              trackColor={{ true: '#06b6d4', false: '#ccc' }}
              thumbColor="#fff"
            />
          ),
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

  return (
    <View className="flex-1 items-center justify-center bg-white py-2">
      <FlatList
        data={sections}
        renderItem={({ item, index }) => (
          <View className="p-1" key={index}>
            <SectionCard title={item?.title} items={item.items} />
          </View>
        )}
      />
    </View>
  )
}
