import { useEffect, useState } from 'react'

type Snail = {
  ch: string
  speed: number // viewport widths per minute
  y: number    // px from bottom (or top)
  dir: 1 | -1
  top?: boolean
}

const STARTERS: Snail[] = [
  { ch: '🐌', speed: 0.6, y: 30, dir: 1 },
  { ch: '🐌', speed: 0.4, y: 90, dir: 1 },
  { ch: '🐌', speed: 0.9, y: 60, dir: -1 },
  { ch: '🪱', speed: 1.2, y: 15, dir: 1, top: true },
]

export default function SnailCrowd() {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    function loop(now: number) {
      setT((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const vw = typeof window === 'undefined' ? 1200 : window.innerWidth

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-30">
      {STARTERS.map((s, i) => {
        const span = vw + 100
        const period = 60 / s.speed
        const tnow = t + i * 11
        const phase = (tnow % period) / period
        const x = s.dir === 1 ? -50 + phase * span : vw + 50 - phase * span
        const style: React.CSSProperties = s.top
          ? { left: x, top: s.y, fontSize: 22, transform: s.dir === -1 ? 'scaleX(-1)' : undefined, position: 'absolute' }
          : { left: x, bottom: s.y, fontSize: 24, transform: s.dir === -1 ? 'scaleX(-1)' : undefined, position: 'absolute' }
        return <span key={i} style={style}>{s.ch}</span>
      })}
    </div>
  )
}
