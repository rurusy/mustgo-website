import { useEffect, useRef, useState } from 'react'

// Single shared IntersectionObserver for every <Fade> / <Stat> on the page.
// 홈에 30+개의 Fade가 있어 인스턴스를 분산하면 IO가 30+개 생성됨 — 공유 관찰자
// 하나로 묶어 메모리/CPU 부하를 낮추고, 한 번 보이면 unobserve 하여 자동 정리.
const callbacks = new WeakMap()

let sharedObserver = null
function getSharedObserver() {
  if (typeof window === 'undefined') return null
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const cb = callbacks.get(entry.target)
        if (cb) {
          cb()
          callbacks.delete(entry.target)
          sharedObserver.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px' },
  )
  return sharedObserver
}

export function useFadeIn() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = getSharedObserver()
    if (!observer) {
      // SSR / no-IO 환경: 즉시 visible 처리해서 콘텐츠가 숨겨지지 않게.
      setVisible(true)
      return
    }
    callbacks.set(node, () => setVisible(true))
    observer.observe(node)
    return () => {
      callbacks.delete(node)
      observer.unobserve(node)
    }
  }, [])

  return [ref, visible]
}
