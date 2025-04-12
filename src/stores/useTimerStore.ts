import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GridMode, Timer } from '@/types/type'

type TimerStore = {
  timers: Timer[]
  mode: GridMode
  setMode: (mode: GridMode) => void
  addTimer: (timer: Timer) => void
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      timers: [],
      mode: 'grid',
      setMode: (mode: GridMode) => set({ mode }),
      addTimer: (timer) => set((state) => ({ timers: [timer, ...state.timers] })),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
