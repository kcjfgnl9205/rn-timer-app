import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Timer } from '@/types/type'

type TimerStore = {
  timers: Timer[]
  addTimer: (timer: Timer) => void
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      timers: [],
      addTimer: (timer) => set((state) => ({ timers: [...state.timers, timer] })),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
