import { View, FlatList, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SettingContainer from '@/components/settings/SettingContainer'
import SettingIcon from '@/components/settings/SettingIcon'
import { Navigation, SettingSection } from '@/types/type'
import { getColors } from '@/theme/colors'
import Bell from '@/assets/icons/bell.svg'
import BellRing from '@/assets/icons/bell-ring.svg'
import MoonStar from '@/assets/icons/moon-star.svg'
import SquareDashed from '@/assets/icons/square-dashed.svg'
import ChevronRight from '@/assets/icons/chevron-right.svg'

export default function SettingsScreen() {
  const navigation = useNavigation<Navigation>()

  const sound = useSettingsStore((s) => s.sound)
  const setSound = useSettingsStore((s) => s.setSoundEnabled)

  const push = useSettingsStore((s) => s.push)
  const setPush = useSettingsStore((s) => s.setPushEnabled)

  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const setColorScheme = useSettingsStore((s) => s.setColorScheme)
  const colors = getColors(colorScheme)

  const sections: SettingSection[] = [
    {
      title: '알림',
      items: [
        {
          icon: <SettingIcon icon={Bell} />,
          label: '소리 알림',
          subLabel: '타이머 종료 시 소리로 알림',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Switch
                value={sound.enabled}
                onValueChange={setSound}
                trackColor={{ true: '#06b6d4', false: '#ccc' }}
                thumbColor="#fff"
              />
            </View>
          ),
        },
        {
          icon: <SettingIcon icon={BellRing} />,
          label: '푸시 알림',
          subLabel: '앱이 닫혀 있을 때도 알림 받기',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Switch
                value={push.enabled}
                onValueChange={setPush}
                trackColor={{ true: '#06b6d4', false: '#ccc' }}
                thumbColor="#fff"
              />
            </View>
          ),
        },
      ],
    },
    {
      title: '카테고리',
      items: [
        {
          icon: <SettingIcon icon={SquareDashed} />,
          label: '카테고리 설정',
          subLabel: '',
          onPress: () => navigation.navigate('CategorySetting'),
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <ChevronRight width={20} height={20} color={colors.text} />
            </View>
          ),
        },
      ],
    },
    {
      title: '테마',
      items: [
        {
          icon: <SettingIcon icon={MoonStar} />,
          label: '다크 모드',
          subLabel: '',
          rightIcon: (
            <View className="flex-row gap-4 items-center">
              <Switch
                value={colorScheme === 'dark'}
                onValueChange={(val) => setColorScheme(val ? 'dark' : 'light')}
                trackColor={{ true: '#06b6d4', false: '#ccc' }}
                thumbColor="#fff"
              />
            </View>
          ),
        },
      ],
    },
  ]

  return (
    <FlatList
      data={sections}
      renderItem={({ item }) => <SettingContainer item={item} />}
      keyExtractor={(item) => String(item.title)}
      className="h-full pt-8"
    />
  )
}
