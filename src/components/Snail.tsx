import { useEffect, useState } from 'react'

// the snail crawls across the bottom of the screen, slowly.
// it ignores you. it has nowhere to be.
export default function Snail() {
  const [x, setX] = useState(-40)
  const [y, setY] = useState(60)

  useEffect(() => {
    let raf: number
    let start = performance.now()
    function tick(now: number) {
      const t = (now - start) / 1000
      // 0.6 viewport widths / minute. very slow.
      const vw = window.innerWidth
      const nextX = -40 + ((t * vw * 0.6) / 60)
      if (nextX > vw + 50) {
        start = now
        setY(20 + Math.random() * 60)
        setX(-40)
      } else {
        setX(nextX)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      aria-hidden
      className="fixed bottom-0 pointer-events-none select-none z-30 text-xl"
      style={{ left: x, transform: `translateY(-${y}px) scaleX(1)`, transition: 'transform 1.6s linear' }}
      title="snail"
    >
      🐌
    </div>
  )
}
