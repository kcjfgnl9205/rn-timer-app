import { Switch } from 'react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SettingContainer from '@/components/settings/SettingContainer'
import { SettingSection } from '@/types/type'

export default function PushScreen() {
  const push = useSettingsStore((s) => s.push)
  const setPush = useSettingsStore((s) => s.setPushEnabled)

  const sections: SettingSection[] = [
    {
      items: [
        {
          label: '푸시 알림',
          rightIcon: (
            <Switch
              value={push.enabled}
              onValueChange={setPush}
              trackColor={{ true: '#06b6d4', false: '#ccc' }}
              thumbColor="#fff"
            />
          ),
        },
      ],
    },
  ]

  return <SettingContainer items={sections} />
}
