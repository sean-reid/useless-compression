import { useEffect, useState } from 'react'

const POOL = ['🅱️', '🅱️', '🅱️', '📁', '💾', '🐌', '⚠️', '🧊', '📎']

type Drop = { id: number; x: number; ch: string; dur: number; size: number; rot: number }

export default function FallingEmojis() {
  const [drops, setDrops] = useState<Drop[]>([])

  useEffect(() => {
    let n = 0
    const i = window.setInterval(() => {
      setDrops((cur) => {
        if (cur.length > 14) cur = cur.slice(-10)
        return [
          ...cur,
          {
            id: ++n,
            x: Math.random() * 100,
            ch: POOL[Math.floor(Math.random() * POOL.length)]!,
            dur: 6 + Math.random() * 9,
            size: 14 + Math.floor(Math.random() * 32),
            rot: -45 + Math.random() * 90,
          },
        ]
      })
    }, 1800)
    return () => window.clearInterval(i)
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {drops.map((d) => (
        <span
          key={d.id}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: '-40px',
            fontSize: d.size,
            transform: `rotate(${d.rot}deg)`,
            animation: `fall ${d.dur}s linear forwards`,
            opacity: 0.85,
          }}
        >
          {d.ch}
        </span>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(${360}deg); } }`}</style>
    </div>
  )
}
