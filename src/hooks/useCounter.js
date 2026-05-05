import { useEffect, useRef, useState } from 'react'

export function useCounter({ target, duration = 2000, active = true, format = 'plain' }) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return
    startedRef.current = true

    let startTime = null
    let raf

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const eased = progress === duration ? 1 : 1 - Math.pow(2, (-10 * progress) / duration)
      const current = Math.min(target * eased, target)
      setValue(Math.floor(current))
      if (progress < duration) {
        raf = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => raf && cancelAnimationFrame(raf)
  }, [active, target, duration])

  const display = format === 'comma' ? value.toLocaleString() : String(value)
  return display
}
