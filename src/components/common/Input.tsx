import { TextInput, TextInputProps } from 'react-native'
import { getColors } from '@/theme/colors'
import { useSettingsStore } from '@/stores/useSettingsStore'

export function Input(props: TextInputProps) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  return (
    <TextInput
      className="border rounded-lg px-4 py-4"
      style={{
        borderColor: colors.border,
        color: colors.text,
        backgroundColor: colors.container,
        ...(props.style as object),
      }}
      placeholderTextColor={colors.border}
      {...props}
    />
  )
}
