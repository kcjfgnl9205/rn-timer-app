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
