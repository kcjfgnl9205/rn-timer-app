import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Grid, List } from 'lucide-react-native'
import { GridMode } from '@/types/type'

interface Props {
  mode: GridMode
  onChange: (mode: GridMode) => void
}

export default function GridToolbar({ mode, onChange }: Props) {
  return (
    <View className="flex-row items-center justify-end px-4 py-2 bg-gray-100 border-b border-gray-200">
      <TouchableOpacity onPress={() => onChange('grid')}>
        <Grid size={28} color={mode === 'grid' ? '#000' : '#aaa'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onChange('list')}>
        <List size={28} color={mode === 'list' ? '#000' : '#aaa'} />
      </TouchableOpacity>
    </View>
  )
}
