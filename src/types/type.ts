export type RootStackParamList = {
  Tabs: undefined
  TimerCreate: undefined
  TimerDetail: { id: string }
}

export interface Timer {
  id: string
  title: string
  color: string
  duration: number
  startedAt?: number | null // 타이머 시작한 timestamp (Date.now())
  isRunning?: boolean // 실행중인지
  remainingTime: number // 일시정지 시 남은 시간 기억용
}

export interface SettingItem {
  icon: JSX.Element
  label: string
  onPress?: () => void
  rightIcon?: JSX.Element
}

export interface SettingSection {
  title?: string
  items: SettingItem[]
}

export type GridMode = 'grid' | 'list'
