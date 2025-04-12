import { Platform, View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

interface Props {
  hours: string
  minutes: string
  seconds: string
  setHours: (value: string) => void
  setMinutes: (value: string) => void
  setSeconds: (value: string) => void
}

export default function TimePickerGroup({
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
}: Props) {
  return (
    <View>
      <Text className="text-base mb-2">시간 설정</Text>
      <View className="flex-row justify-center mb-6">
        {[
          { value: hours, setter: setHours, range: 24 },
          { value: minutes, setter: setMinutes, range: 60 },
          { value: seconds, setter: setSeconds, range: 60 },
        ].map(({ value, setter, range }, index) => (
          <View
            key={index}
            className={`flex-row justify-center ${Platform.OS === 'ios' ? 'mb-16' : ''}`}
          >
            <Picker
              selectedValue={value}
              onValueChange={setter}
              style={{ width: 100, height: 150 }}
            >
              {[...Array(range).keys()].map((num) => (
                <Picker.Item key={num} label={`${num}`} value={num.toString()} />
              ))}
            </Picker>
          </View>
        ))}
      </View>
    </View>
  )
}
