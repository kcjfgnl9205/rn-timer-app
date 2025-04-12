import { useLayoutEffect, useState } from 'react'
import { View, TextInput, Alert, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { useTimerStore } from '@/stores/useTimerStore'
import TimePickerGroup from '@/components/timer/TimePickerGroup'
import TimeQuickAddButtons from '@/components/timer/TimeQuickAddButtons'
import ColorPicker from '@/components/timer/ColorPicker'
import { addSecondsToTime } from '@/utils/utils'

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']

export default function TimerCreateScreen() {
  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('30')
  const [seconds, setSeconds] = useState('0')
  const [color, setColor] = useState(COLORS[0])
  const addTimer = useTimerStore((s) => s.addTimer)

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('타이머 이름을 입력해주세요.')
      return
    }

    const duration = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    const newTimer = {
      id: uuid.v4() as string,
      title,
      color,
      duration,
    }

    addTimer(newTimer)
    navigation.goBack()
  }

  const handleAddTime = (sec: number) => {
    const result = addSecondsToTime(hours, minutes, seconds, sec)
    setHours(result.hours)
    setMinutes(result.minutes)
    setSeconds(result.seconds)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleCreate} className="mr-4">
          <Text className="text-blue-500 text-xl font-semibold">추가</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation, title, hours, minutes, seconds, color])

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-base mb-2">타이머 제목</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 mb-8"
        placeholder="예: 공부 타이머"
        value={title}
        onChangeText={setTitle}
      />

      <TimePickerGroup
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        setHours={setHours}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
      />

      <TimeQuickAddButtons onAdd={handleAddTime} />

      <ColorPicker color={color} onSelect={setColor} colors={COLORS} />
    </View>
  )
}
