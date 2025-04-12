import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Play, RotateCw } from 'lucide-react-native'
import { Timer } from '@/types/type'
import { formatTime } from '@/utils/utils'

interface Props {
  item: Timer
}

export default function TimerGrid({ item }: Props) {
  return (
    <View className="flex-col gap-2 rounded-xl p-3" style={{ backgroundColor: item.color }}>
      <View>
        <Text className="text-white font-semibold text-sm" numberOfLines={1}>
          {item.title}
        </Text>

        <Text className="text-white font-bold text-3xl text-center">
          {formatTime(item.duration)}
        </Text>
      </View>

      <View className="flex-row justify-center items-center gap-4">
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <Play size={18} color={item.color} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <RotateCw size={18} color={item.color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
