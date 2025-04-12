import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Grid, List } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { GridMode } from '@/types/type'

interface Props {
  mode: GridMode
  onChange: (mode: GridMode) => void
}

export default function GridToolbar({ mode, onChange }: Props) {
  const resetAllTimers = useTimerStore((s) => s.resetAllTimers)

  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
      <View>
        <TouchableOpacity onPress={() => resetAllTimers()}>
          <Text className="text-black font-semibold">전체 초기화</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => onChange('grid')}>
          <Grid size={28} color={mode === 'grid' ? '#000' : '#aaa'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange('list')}>
          <List size={28} color={mode === 'list' ? '#000' : '#aaa'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
