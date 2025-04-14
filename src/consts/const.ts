import * as Haptics from 'expo-haptics'
import { SoundType, VibrationType } from '@/types/type' // 타입 분리 시

export const VIBRATION_MAP: Record<VibrationType, () => Promise<void>> = {
  기본: () => Haptics.selectionAsync(),
  가벼움: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  중간: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  강함: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  단단함: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
  부드러움: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
  성공: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  경고: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  오류: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
}

export const SOUND_MAP: Record<SoundType, number> = {
  기본: require('@/assets/sounds/sound01.wav'),
  벨소리1: require('@/assets/sounds/sound02.wav'),
  벨소리2: require('@/assets/sounds/sound03.wav'),
  벨소리3: require('@/assets/sounds/sound04.wav'),
  벨소리4: require('@/assets/sounds/sound05.wav'),
  벨소리5: require('@/assets/sounds/sound06.wav'),
  벨소리6: require('@/assets/sounds/sound07.wav'),
}
