import { Timer } from '@/types/type'

/**
 * 주어진 시/분/초 값에 추가 시간을 더한 후 새로운 시/분/초 값을 계산하여 리턴
 *
 * @param hours - 현재 시간
 * @param minutes - 현재 분
 * @param seconds - 현재 초
 * @param additionalSeconds - 추가할 시간(초 단위)
 * @returns 새로운 시간, 분, 초를 string으로 반환
 */
export function addSecondsToTime(
  hours: string,
  minutes: string,
  seconds: string,
  additionalSeconds: number
) {
  const total = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
  const updated = total + additionalSeconds
  const newHours = Math.floor(updated / 3600)
  const newMinutes = Math.floor((updated % 3600) / 60)
  const newSeconds = updated % 60

  return {
    hours: String(Math.min(newHours, 23)),
    minutes: String(newMinutes),
    seconds: String(newSeconds),
  }
}

/**
 * 초 단위의 duration 값을 시:분:초 or 분:초 형식으로 변환
 * - 1시간 미만일 경우 → "MM : SS"
 * - 1시간 이상일 경우 → "HH : MM : SS"
 *
 * @param duration - 초 단위의 전체 시간
 * @returns 포맷된 문자열 (string)
 */
export function formatTime(duration: number) {
  const h = Math.floor(duration / 3600)
  const m = Math.floor((duration % 3600) / 60)
  const s = duration % 60

  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')

  if (h > 0) {
    return `${String(h)} : ${mm} : ${ss}`
  } else {
    return `${mm} : ${ss}`
  }
}

/**
 * 주어진 타이머의 현재 남은 시간을 계산
 *
 * - 타이머가 실행 중이고 시작 시간이 존재할 경우:
 *   현재 시간에서 시작 시간을 뺀 경과 시간을 구한 후,전체 남은 시간에서 이를 빼서 남은 시간을 계산
 *
 * - 타이머가 실행 중이 아닌 경우:
 *   저장된 remainingTime 또는 duration을 그대로 반환합니다.
 *
 * @param timer - 계산할 대상이 되는 타이머 객체
 * @returns 현재 시점을 기준으로 한 남은 시간
 */
export function getRemainingTime(timer: Timer): number {
  if (timer.isRunning && timer.startedAt) {
    const elapsed = Math.floor((Date.now() - timer.startedAt) / 1000)
    return Math.max((timer.remainingTime ?? timer.duration) - elapsed, 0)
  }
  return timer.remainingTime ?? timer.duration
}
