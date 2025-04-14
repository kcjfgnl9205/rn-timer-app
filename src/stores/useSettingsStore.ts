import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VibrationType } from '@/types/type'

interface SettingsState {
  sound: { enabled: boolean; value: string }
  setSoundEnabled: (enabled: boolean) => void
  setSoundValue: (value: string) => void

  vibration: { enabled: boolean; value: VibrationType }
  setVibrationEnabled: (enabled: boolean) => void
  setVibrationValue: (value: VibrationType) => void

  push: { enabled: boolean; value: string }
  setPushEnabled: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // 소리
      sound: { enabled: false, value: '기본' },
      setSoundEnabled: (enabled) => set((state) => ({ sound: { ...state.sound, enabled } })),
      setSoundValue: (value) => set((state) => ({ sound: { ...state.sound, value } })),

      // 진동
      vibration: { enabled: false, value: '기본' },
      setVibrationEnabled: (enabled) =>
        set((state) => ({ vibration: { ...state.vibration, enabled } })),
      setVibrationValue: (value) => set((state) => ({ vibration: { ...state.vibration, value } })),

      // 푸시알림
      push: { enabled: false, value: '기본' },
      setPushEnabled: (enabled) => set((state) => ({ push: { ...state.push, enabled } })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
