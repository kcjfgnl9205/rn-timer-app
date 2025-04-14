import { Switch } from 'react-native'
import { Check } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SettingContainer from '@/components/settings/SettingContainer'
import { SettingSection, SoundType } from '@/types/type'
import { playSound } from '@/utils/utils'

export default function SoundScreen() {
  const sound = useSettingsStore((s) => s.sound)
  const setSound = useSettingsStore((s) => s.setSoundEnabled)
  const setSoundValue = useSettingsStore((s) => s.setSoundValue)

  const SOUND_OPTIONS: SoundType[] = [
    '기본',
    '벨소리1',
    '벨소리2',
    '벨소리3',
    '벨소리4',
    '벨소리5',
    '벨소리6',
  ]

  const handleSelectSound = (label: SoundType) => {
    setSoundValue(label)
    playSound(label)
  }

  const sections: SettingSection[] = [
    {
      items: [
        {
          label: '소리 알림',
          rightIcon: (
            <Switch
              value={sound.enabled}
              onValueChange={setSound}
              trackColor={{ true: '#06b6d4', false: '#ccc' }}
              thumbColor="#fff"
            />
          ),
        },
      ],
    },
    ...(sound.enabled
      ? [
          {
            title: '소리',
            items: SOUND_OPTIONS.map((label) => ({
              label,
              onPress: () => handleSelectSound(label),
              rightIcon: sound.value === label ? <Check size={12} color="blue" /> : undefined,
            })),
          },
        ]
      : []),
  ]

  return <SettingContainer items={sections} />
}
