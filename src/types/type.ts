import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Tabs: undefined
  TimerForm: undefined | { id?: string }
  TimerDetail: { id: string }
  CategorySetting: undefined
}

export type Navigation = NativeStackNavigationProp<RootStackParamList, any>

export interface Timer {
  id: string
  title: string
  duration: number
  startedAt?: number | null // 타이머 시작한 timestamp (Date.now())
  isRunning?: boolean // 실행중인지
  remainingTime: number // 일시정지 시 남은 시간 기억용
  totalTime: number // 타이머 총 실행 시간
  sound: SoundType
}

export interface SettingItem {
  icon?: JSX.Element
  label: string
  subLabel?: string
  onPress?: () => void
  rightIcon?: JSX.Element
}

export interface SettingSection {
  title?: string
  items: SettingItem[]
}

// 벨소리 옵션
export type SoundType =
  | '없음'
  | '기본'
  | '벨소리1'
  | '벨소리2'
  | '벨소리3'
  | '벨소리4'
  | '벨소리5'
  | '벨소리6'

export interface Sound {
  label: SoundType
  sound: any
}
