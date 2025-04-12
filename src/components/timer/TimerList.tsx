import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Play, RotateCw } from 'lucide-react-native'
import { Timer } from '@/types/type'
import { formatTime } from '@/utils/utils'

interface Props {
  item: Timer
}

export default function TimerList({ item }: Props) {
  return (
    <View
      className="flex-row justify-between items-center px-6 py-4 rounded-xl"
      style={{ backgroundColor: item.color }}
    >
      <View className="flex-1 pr-4">
        <Text className="text-white font-semibold text-sm" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-white font-bold text-3xl text-center">
          {formatTime(item.duration)}
        </Text>
      </View>

      <View className="flex-row space-x-2 gap-2">
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <Play size={20} color={item.color} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <RotateCw size={20} color={item.color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
