import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GridMode, Timer } from '@/types/type'

type TimerStore = {
  timers: Timer[]
  mode: GridMode
  setMode: (mode: GridMode) => void
  addTimer: (timer: Timer) => void
  startTimer: (id: string) => void
  pauseTimer: (id: string) => void
  resetTimer: (id: string) => void
  resetAllTimers: () => void
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      timers: [],
      mode: 'grid',
      setMode: (mode: GridMode) => set({ mode }),
      addTimer: (timer) =>
        set((state) => ({
          timers: [{ ...timer, isRunning: false, remainingTime: timer.duration }, ...state.timers],
        })),
      startTimer: (id) =>
        set((state) => ({
          timers: state.timers.map((t) =>
            t.id === id
              ? {
                  ...t,
                  isRunning: true,
                  startedAt: Date.now(),
                  timeLeft: t.remainingTime ?? t.duration,
                }
              : t
          ),
        })),
      pauseTimer: (id) =>
        set((state) => {
          const now = Date.now()
          return {
            timers: state.timers.map((t) => {
              if (t.id !== id || !t.startedAt) return t
              const elapsed = Math.floor((now - t.startedAt) / 1000)
              const remaining = Math.max((t.remainingTime ?? t.duration) - elapsed, 0)
              return {
                ...t,
                isRunning: false,
                startedAt: null,
                timeLeft: remaining,
              }
            }),
          }
        }),
      resetTimer: (id) =>
        set((state) => ({
          timers: state.timers.map((t) =>
            t.id === id ? { ...t, remainingTime: t.duration, isRunning: false } : t
          ),
        })),
      resetAllTimers: () =>
        set((state) => ({
          timers: state.timers.map((t) => ({
            ...t,
            isRunning: false,
            startedAt: null,
            timeLeft: t.duration,
          })),
        })),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
