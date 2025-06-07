import { Category, Sound } from '@/types/type'

export const SOUND_LIST: Sound[] = [
  { label: '없음', sound: '' },
  { label: '기본', sound: require('@/assets/sounds/sound01.wav') },
  { label: '벨소리1', sound: require('@/assets/sounds/sound02.wav') },
  { label: '벨소리2', sound: require('@/assets/sounds/sound03.wav') },
  { label: '벨소리3', sound: require('@/assets/sounds/sound04.wav') },
  { label: '벨소리4', sound: require('@/assets/sounds/sound05.wav') },
  { label: '벨소리5', sound: require('@/assets/sounds/sound06.wav') },
  { label: '벨소리6', sound: require('@/assets/sounds/sound07.wav') },
]

export const CATEGORY_COLORS: Category[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
]

export const CATEGORY_CLASS_MAP: Record<Category, string> = {
  none: 'bg-category-none',
  red: 'bg-category-red',
  orange: 'bg-category-orange',
  amber: 'bg-category-amber',
  yellow: 'bg-category-yellow',
  lime: 'bg-category-lime',
  green: 'bg-category-green',
  emerald: 'bg-category-emerald',
  teal: 'bg-category-teal',
  cyan: 'bg-category-cyan',
  blue: 'bg-category-blue',
  indigo: 'bg-category-indigo',
  purple: 'bg-category-purple',
}
