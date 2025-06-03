import { Platform, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { ChevronDown } from 'lucide-react-native'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Text } from '@/components/common/Text'
import { getColors } from '@/theme/colors'

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
  const colorScheme = useSettingsStore((s) => s.colorScheme)
  const colors = getColors(colorScheme)
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
              style={{
                width: 100,
                height: 150,
                color: colors.text,
              }}
              itemStyle={{
                fontSize: 20,
                color: colors.text,
              }}
            >
              {[...Array(range).keys()].map((num) => (
                <Picker.Item key={num} label={`${num}`} value={num.toString()} />
              ))}
            </Picker>

            {Platform.OS === 'android' && colorScheme === 'dark' && (
              <View className="absolute right-2 top-[45%] pointer-events-none">
                <ChevronDown size={16} color={colors.text} />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}
