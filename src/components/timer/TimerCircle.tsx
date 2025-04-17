import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Text } from '@/components/common/Text'
import { formatTime, getRemainingTime, getCirclePath } from '@/utils/utils'
import { Timer } from '@/types/type'

interface Props {
  radius: number // 원의 반지름
  timer: Timer
  strokeWidth?: number
}

export default function TimerCircle({ radius, timer, strokeWidth = 8 }: Props) {
  const size = radius * 2 + strokeWidth
  const remainingTime = getRemainingTime(timer)
  const path = getCirclePath(radius, strokeWidth)

  return (
    <View className="relative items-center justify-center" style={{ width: size, height: size }}>
      <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <Path d={path} fill="none" stroke={'#d9d9d9'} strokeWidth={strokeWidth} />
      </Svg>
      <View
        className="absolute top-1/2 left-1/2 items-center justify-center"
        style={{
          transform: [{ translateX: -size / 2 }, { translateY: -size / 2 }],
          width: size,
          height: size,
        }}
      >
        <Text
          className="text-black text-6xl font-bold text-center"
          style={{ fontVariant: ['tabular-nums'] }}
        >
          {formatTime(remainingTime)}
        </Text>
      </View>
    </View>
  )
}
