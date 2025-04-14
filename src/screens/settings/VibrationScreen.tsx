import { Switch } from 'react-native'
import { Check } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import SettingContainer from '@/components/settings/SettingContainer'
import { SettingSection, VibrationType } from '@/types/type'
import { VIBRATION_MAP } from '@/consts/const'

export default function VibrationScreen() {
  const vibration = useSettingsStore((s) => s.vibration)
  const setVibration = useSettingsStore((s) => s.setVibrationEnabled)
  const setVibrationValue = useSettingsStore((s) => s.setVibrationValue)

  const VIBRATION_OPTIONS: VibrationType[] = [
    '기본',
    '가벼움',
    '중간',
    '강함',
    '단단함',
    '부드러움',
    '성공',
    '경고',
    '오류',
  ]

  const handleSelectVibration = (label: VibrationType) => {
    setVibrationValue(label)

    const trigger = VIBRATION_MAP[label]
    if (trigger) trigger()
  }

  const sections: SettingSection[] = [
    {
      items: [
        {
          label: '진동 알림',
          rightIcon: (
            <Switch
              value={vibration.enabled}
              onValueChange={setVibration}
              trackColor={{ true: '#06b6d4', false: '#ccc' }}
              thumbColor="#fff"
            />
          ),
        },
      ],
    },
    ...(vibration.enabled
      ? [
          {
            title: '진동',
            items: VIBRATION_OPTIONS.map((label) => ({
              label,
              onPress: () => handleSelectVibration(label),
              rightIcon: vibration.value === label ? <Check size={12} color="blue" /> : undefined,
            })),
          },
        ]
      : []),
  ]

  return <SettingContainer items={sections} />
}
