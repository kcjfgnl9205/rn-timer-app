import React from 'react'
import { View } from 'react-native'

interface Props {
  icon: React.ElementType
}

export default function SettingIcon({ icon: Icon }: Props) {
  return (
    <View className="p-2 items-center justify-center rounded-lg">
      <Icon size={20} color={'#000'} />
    </View>
  )
}
