import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Tabs: undefined
  TimerCreate: undefined
  TimerDetail: { id: string }
  VibrationSetting: undefined
  SoundSetting: undefined
  PushSetting: undefined
}

export type Navigation = NativeStackNavigationProp<RootStackParamList, any>

export interface Timer {
  id: string
  title: string
  color: string
  duration: number
  startedAt?: number | null // 타이머 시작한 timestamp (Date.now())
  isRunning?: boolean // 실행중인지
  remainingTime: number // 일시정지 시 남은 시간 기억용
  totalTime: number // 타이머 총 실행 시간
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

export type GridMode = 'grid' | 'list'

// 진동 옵션
export type VibrationType =
  | '기본'
  | '가벼움'
  | '중간'
  | '강함'
  | '단단함'
  | '부드러움'
  | '성공'
  | '경고'
  | '오류'

// 벨소리 옵션
export type SoundType =
  | '기본'
  | '벨소리1'
  | '벨소리2'
  | '벨소리3'
  | '벨소리4'
  | '벨소리5'
  | '벨소리6'
