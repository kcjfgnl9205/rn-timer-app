import { useLayoutEffect, useState, useEffect } from 'react'
import { View, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import Bell from '@/assets/icons/bell.svg'
import { useTimerStore } from '@/stores/useTimerStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import TimePickerGroup from '@/components/timer/TimePickerGroup'
import TimeQuickAddButtons from '@/components/timer/TimeQuickAddButtons'
import { Text } from '@/components/common/Text'
import { SelectModal } from '@/components/modal/SelectModal'
import { addSecondsToTime, splitTime, useSoundPlayer } from '@/utils/utils'
import { getColors } from '@/theme/colors'
import { Timer, SoundType } from '@/types/type'
import { SOUND_LIST } from '@/consts/const'
import CategoryIcon from '@/components/common/CategoryIcon'

export default function TimerFormScreen() {
  const navigation = useNavigation()
  const route = useRoute<any>()
  const { id } = route.params || {}
  const isEditMode = !!id

  const [title, setTitle] = useState('')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('30')
  const [seconds, setSeconds] = useState('0')
  const [sound, setSound] = useState<SoundType>('없음')

  const [categoryId, setCategoryId] = useState<string>('') // 카테고리 선택 저장용
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState<'sound' | 'category' | null>(null)

  const categories = useSettingsStore((s) => s.categories)
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
  const { addTimer, updateTimer, deleteTimer, timers } = useTimerStore()

  const { playSound } = useSoundPlayer()

  const selectedCategory = categories.find((c) => c.id === categoryId)

  // 기존 타이머 데이터 로딩
  useEffect(() => {
    if (isEditMode) {
      const existing = timers.find((t) => t.id === id)
      if (existing) {
        setTitle(existing.title)
        const time = splitTime(existing.duration)
        setHours(String(time.hours))
        setMinutes(String(time.minutes))
        setSeconds(String(time.seconds))
        setSound(existing.sound)
        setCategoryId(existing.categoryId ?? '')
      }
    }
  }, [isEditMode, id])

  const handleCreate = (flg: boolean) => {
    if (!title.trim()) {
      Alert.alert('타이머 이름을 입력해주세요.')
      return
    }

    const timerId = flg ? id : (uuid.v4() as string)
    const duration = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    const newTimer: Timer = {
      id: timerId,
      title,
      duration,
      remainingTime: duration,
      totalTime: 0,
      sound,
      categoryId,
    }

    if (flg) {
      updateTimer(newTimer)
    } else {
      addTimer(newTimer)
    }
    navigation.goBack()
  }

  const handleDelete = (id: string) => {
    deleteTimer(id)
    navigation.goBack()
  }

  const handleAddTime = (sec: number) => {
    const result = addSecondsToTime(hours, minutes, seconds, sec)
    setHours(result.hours)
    setMinutes(result.minutes)
    setSeconds(result.seconds)
  }

  useLayoutEffect(() => {
    const header = isEditMode ? '수정' : '추가'
    navigation.setOptions({
      headerTitle: `타이머 ${header}`,
      headerRight: () => (
        <View className="flex flex-row gap-3 mr-4">
          {isEditMode && (
            <TouchableOpacity onPress={() => handleDelete(id)}>
              <Text className="font-medium text-lg">삭제</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleCreate(isEditMode)}>
            <Text className="font-medium text-lg">{header}</Text>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation, title, hours, minutes, seconds, sound, categoryId])

  const renderSelectionBox = (label: string, onPress: () => void, content: React.ReactNode) => (
    <View>
      <Text className="text-base mb-2">{label}</Text>
      <Pressable onPress={onPress}>
        <View
          className="flex flex-row gap-2 items-center p-4 rounded-lg border"
          style={{
            backgroundColor: colors.container,
            borderColor: colors.border,
          }}
        >
          {content}
        </View>
      </Pressable>
    </View>
  )

  const handleSelect = (label: SoundType) => {
    setSound(label)
    playSound(label)
  }

  const modalOpen = (type: 'sound' | 'category') => {
    setModalType(type)
    setVisible(true)
  }
  return (
    <View className="flex-1 flex flex-col gap-4 p-6">
      <View>
        <Text className="text-base mb-2">타이머 제목</Text>
        <TextInput
          className="border rounded-lg px-4 py-4 "
          style={{
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.container,
          }}
          placeholder="예: 공부 타이머"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View>
        <TimePickerGroup
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
        <TimeQuickAddButtons onAdd={handleAddTime} />
      </View>
      <View>
        {renderSelectionBox(
          '알람 설정',
          () => modalOpen('sound'),
          <>
            <Bell width={22} height={22} color={colors.text} />
            <Text className="text-base">{sound}</Text>
          </>
        )}
      </View>
      <View>
        {renderSelectionBox(
          '카테고리 설정',
          () => modalOpen('category'),
          <>
            <View className="w-6 h-6">
              <CategoryIcon color={selectedCategory?.color ?? 'none'} />
            </View>
            <Text className="text-base">{selectedCategory?.name ?? '없음'}</Text>
          </>
        )}
      </View>

      <SelectModal
        visible={visible}
        title={modalType === 'sound' ? '소리 설정' : '카테고리 설정'}
        items={
          modalType === 'sound'
            ? SOUND_LIST.map((s) => ({ label: s.label, value: s.label }))
            : [
                {
                  label: '없음',
                  value: 'none', // 또는 'none'
                  icon: (
                    <View className="w-6 h-6">
                      <CategoryIcon color="none" />
                    </View>
                  ),
                },
                ...categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                  icon: (
                    <View className="w-6 h-6">
                      <CategoryIcon color={c.color} />
                    </View>
                  ),
                })),
              ]
        }
        selectedValue={modalType === 'sound' ? sound : categoryId}
        onSelect={(value) => {
          if (modalType === 'sound') {
            handleSelect(value as SoundType)
          } else {
            setCategoryId(value)
          }
        }}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}
