import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'
import { Text as RNText, TextProps } from 'react-native'

export function Text(props: TextProps) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <RNText
      {...props}
      className={`font-pretendard ${props.className || ''}`}
      style={[{ color: colors.text }, props.style]}
    />
  )
}
