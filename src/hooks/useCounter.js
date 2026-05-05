import { useEffect, useState } from 'react'

// 모듈 스코프에서 한 번만 생성. value.toLocaleString() 은 매 호출마다 Intl
// 객체를 새로 만들기 때문에 카운터처럼 frame 단위로 호출되는 컨텍스트에선
// 캐시된 NumberFormat 이 더 저렴.
const commaFormatter =
  typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function'
    ? new Intl.NumberFormat('en-US')
    : null

export function useCounter({ target, duration = 2000, active = true, format = 'plain' }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    // target 이 바뀌면 0 부터 다시 카운트.
    setValue(0)

    let startTime = null
    let raf = 0
    let lastFloor = -1

    function step(timestamp) {
      if (startTime === null) startTime = timestamp
      const progress = timestamp - startTime
      const eased = progress >= duration ? 1 : 1 - Math.pow(2, (-10 * progress) / duration)
      const current = Math.min(target * eased, target)
      const next = Math.floor(current)
      if (next !== lastFloor) {
        lastFloor = next
        setValue(next)
      }
      if (progress < duration) {
        raf = requestAnimationFrame(step)
      } else if (lastFloor !== target) {
        setValue(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [active, target, duration])

  const display =
    format === 'comma'
      ? commaFormatter
        ? commaFormatter.format(value)
        : value.toLocaleString()
      : String(value)
  return display
}
