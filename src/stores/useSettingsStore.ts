import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SettingsState {
  globalVibration: boolean
  globalSound: boolean
  globalPush: boolean

  setGlobalVibration: (enabled: boolean) => void
  setGlobalSound: (enabled: boolean) => void
  setGlobalPush: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      globalVibration: false,
      globalSound: false,
      globalPush: false,

      setGlobalVibration: (enabled) => set({ globalVibration: enabled }),
      setGlobalSound: (enabled) => set({ globalSound: enabled }),
      setGlobalPush: (enabled) => set({ globalPush: enabled }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
