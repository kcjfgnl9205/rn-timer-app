import { useLayoutEffect, useState } from 'react'
import { View, TextInput, Alert, TouchableOpacity, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import uuid from 'react-native-uuid'
import { Bell, Check } from 'lucide-react-native'
import { useTimerStore } from '@/stores/useTimerStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import TimePickerGroup from '@/components/timer/TimePickerGroup'
import TimeQuickAddButtons from '@/components/timer/TimeQuickAddButtons'
import { Text } from '@/components/common/Text'
import { addSecondsToTime, playSound } from '@/utils/utils'
import { getColors } from '@/theme/colors'
import { Timer, SoundType } from '@/types/type'
import { SOUND_LIST } from '@/consts/const'

export default function TimerCreateScreen() {
  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('30')
  const [seconds, setSeconds] = useState('0')
  const [sound, setSound] = useState<SoundType>('없음')
  const addTimer = useTimerStore((s) => s.addTimer)
  const [visible, setVisible] = useState(false)
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('타이머 이름을 입력해주세요.')
      return
    }

    const duration = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    const newTimer: Timer = {
      id: uuid.v4() as string,
      title,
      duration,
      remainingTime: duration,
      totalTime: 0,
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
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: 500 }}>추가</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation, title, hours, minutes, seconds])

  const handleSoundPlay = async (label: SoundType) => {
    setSound(label)
    await playSound(label)
  }

  return (
    <View className="flex-1 p-6" style={{ backgroundColor: colors.background }}>
      <Text className="text-base mb-2" style={{ color: colors.text }}>
        타이머 제목
      </Text>
      <TextInput
        className="border rounded-lg px-4 py-4 mb-8"
        style={{
          borderColor: colors.border,
          color: colors.text,
          backgroundColor: colors.container,
        }}
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

      <Text className="text-base mb-2" style={{ color: colors.text }}>
        알람 설정
      </Text>
      <Pressable onPress={() => setVisible(true)}>
        <View
          className="flex flex-row gap-2 items-center p-4 rounded-lg border"
          style={{ backgroundColor: colors.container, borderColor: colors.border }}
        >
          <Bell size={22} color={colors.text} />
          <Text className="text-base " style={{ color: colors.text }}>
            {sound}
          </Text>
        </View>
      </Pressable>

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }} // 🔽 아래에서 위로
      >
        <View
          style={{
            backgroundColor: colors.container,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: '50%',
          }}
          className="py-6 px-2 "
        >
          <View className="flex flex-row items-center justify-center mb-8">
            <Text style={{ color: colors.text }} className="font-semibold text-xl">
              소리 설정
            </Text>
          </View>
          <View className="pb-20">
            <FlatList
              data={SOUND_LIST}
              renderItem={({ item }) => {
                const isSelected = item.label === sound
                return (
                  <Pressable onPress={() => handleSoundPlay(item.label)}>
                    <View
                      className="flex flex-row justify-between items-center border rounded-lg p-4 mb-2"
                      style={{ borderColor: colors.border }}
                    >
                      <Text style={{ color: colors.text }} className="text-lg font-semibold">
                        {item.label}
                      </Text>
                      {isSelected && <Check size={22} color={colors.text} />}
                    </View>
                  </Pressable>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}
