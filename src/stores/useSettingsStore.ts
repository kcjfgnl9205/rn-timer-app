import { create } from 'zustand'
import { Appearance, ColorSchemeName } from 'react-native'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SettingsState {
  colorScheme: ColorSchemeName
  setColorScheme: (scheme: ColorSchemeName) => void

  sound: { enabled: boolean; value: string }
  setSoundEnabled: (enabled: boolean) => void
  setSoundValue: (value: string) => void

  push: { enabled: boolean; value: string }
  setPushEnabled: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // 다크/화이트모드
      colorScheme: Appearance.getColorScheme(),
      setColorScheme: (scheme) => set({ colorScheme: scheme }),

      // 소리
      sound: { enabled: false, value: '기본' },
      setSoundEnabled: (enabled) => set((state) => ({ sound: { ...state.sound, enabled } })),
      setSoundValue: (value) => set((state) => ({ sound: { ...state.sound, value } })),

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
