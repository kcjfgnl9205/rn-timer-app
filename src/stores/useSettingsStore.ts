import { create } from 'zustand'
import uuid from 'react-native-uuid'
import { Appearance, ColorSchemeName } from 'react-native'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Category } from '@/types/type'

interface SettingsState {
  colorScheme: ColorSchemeName
  setColorScheme: (scheme: ColorSchemeName) => void

  sound: { enabled: boolean; value: string }
  setSoundEnabled: (enabled: boolean) => void
  setSoundValue: (value: string) => void

  push: { enabled: boolean; value: string }
  setPushEnabled: (enabled: boolean) => void

  categories: { id: string; name: string; color: Category }[]
  addCategory: (name: string, color: Category) => void
  removeCategory: (id: string) => void
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

      // 카테고리
      categories: [],
      addCategory: (name, color) =>
        set((state) => ({
          categories: [{ id: uuid.v4(), name, color }, ...state.categories],
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
