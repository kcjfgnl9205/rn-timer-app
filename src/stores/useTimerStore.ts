import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Timer } from '@/types/type'

type TimerStore = {
  timers: Timer[]
  addTimer: (timer: Timer) => void
  startTimer: (id: string) => void
  pauseTimer: (id: string) => void
  resetTimer: (id: string) => void
  deleteTimer: (id: string) => void
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      timers: [],
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
              const added = Math.min(elapsed, t.remainingTime ?? t.duration)

              return {
                ...t,
                isRunning: false,
                startedAt: null,
                remainingTime: remaining, // ✅ 여기에 저장해서 resume 가능하게!
                totalTime: (t.totalTime ?? 0) + added, // ✅ 누적 시간
              }
            }),
          }
        }),
      resetTimer: (id) =>
        set((state) => {
          const now = Date.now()
          return {
            timers: state.timers.map((t) => {
              if (t.id !== id) return t

              let added = 0
              if (t.isRunning && t.startedAt) {
                const elapsed = Math.floor((now - t.startedAt) / 1000)
                added = Math.min(elapsed, t.remainingTime ?? t.duration)
              }

              return {
                ...t,
                isRunning: false,
                startedAt: null,
                remainingTime: t.duration,
                totalTime: (t.totalTime ?? 0) + added,
              }
            }),
          }
        }),
      deleteTimer: (id) =>
        set((state) => ({
          timers: state.timers.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
