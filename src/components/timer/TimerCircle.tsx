import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import Svg, { G, Path } from 'react-native-svg'
import { Text } from '@/components/common/Text'
import { formatTime, getCirclePath } from '@/utils/utils'
import { Timer } from '@/types/type'
import { useTimerProgress } from '@/hooks/useTimerProgress'

interface Props {
  radius: number // 원의 반지름
  timer: Timer
  strokeWidth?: number
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function TimerCircle({ radius, timer, strokeWidth = 8 }: Props) {
  const size = radius * 2 + strokeWidth
  const path = getCirclePath(radius, strokeWidth)
  const { remainingTime, animatedProps, circumference } = useTimerProgress(timer, radius)

  return (
    <View className="relative items-center justify-center" style={{ width: size, height: size }}>
      <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          <Path d={path} fill="none" stroke="#d9d9d9" strokeWidth={strokeWidth} />
          <AnimatedPath
            d={path}
            fill="none"
            stroke="#00aaff"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </G>
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
