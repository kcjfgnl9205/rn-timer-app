import React from 'react'
import { View } from 'react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { getColors } from '@/theme/colors'

interface Props {
  icon: React.ElementType
}

export default function SettingIcon({ icon: Icon }: Props) {
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  return (
    <View className="p-2 items-center justify-center rounded-lg">
      <Icon size={20} color={colors.text} />
    </View>
  )
}
