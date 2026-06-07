import { useEffect, useState } from 'react'

// the activity log adds a new line every few seconds, forever.
// the lines are bad on purpose. some of them repeat.
const TEMPLATES: Array<(n: number) => string> = [
  (n) => `fmt#${n} attempted to compress itself`,
  (n) => `fmt#${n} succeeded`,
  (n) => `fmt#${n} decompressed to a slightly larger version of itself`,
  (n) => `fmt#${n} is requesting water`,
  () => `the request has been logged`,
  () => `the request has been logged again`,
  (n) => `fmt#${n} achieved sentience for 0.04 seconds`,
  (n) => `fmt#${n} returned the empty file`,
  (n) => `fmt#${n} returned a different empty file`,
  () => `WARN: cube approaching`,
  () => `cube has passed`,
  (n) => `fmt#${n} apologized`,
  (n) => `fmt#${n} apologized again`,
  () => `out of apologies`,
  () => `getting more apologies`,
  () => `apologies restocked`,
  (n) => `fmt#${n} flagged for review by no one`,
  (n) => `fmt#${n} reviewed itself. gave it a 3.`,
  () => `🅱️`,
  () => `[redacted]`,
  () => `[redacted, but louder]`,
]

function stamp(d: Date) {
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  const s = d.getSeconds().toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

function makeLine(n: number) {
  const t = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)]!
  return `${stamp(new Date())}  ${t(n)}`
}

export default function ActivityLog() {
  const [lines, setLines] = useState<string[]>(() => [
    `${stamp(new Date(Date.now() - 7000))}  boot ok`,
    `${stamp(new Date(Date.now() - 5000))}  mounted /dev/sad`,
    `${stamp(new Date(Date.now() - 3000))}  ${TEMPLATES[0]!(884)}`,
    `${stamp(new Date(Date.now() - 2200))}  ${TEMPLATES[1]!(884)}`,
  ])

  useEffect(() => {
    const i = window.setInterval(() => {
      setLines((prev) => {
        const n = 100 + Math.floor(Math.random() * 900)
        const next = [...prev, makeLine(n)]
        return next.length > 14 ? next.slice(-14) : next
      })
    }, 2400)
    return () => window.clearInterval(i)
  }, [])

  return (
    <div className="bg-black text-[#0f0] p-3 border-2 border-black font-mono text-[12px] leading-relaxed" style={{ transform: 'rotate(-0.5deg)' }}>
      <div className="opacity-70 mb-1">{'>>>'} live activity_</div>
      {lines.map((l, i) => (
        <div key={i} className={i === lines.length - 1 ? '' : 'opacity-80'}>
          {l}
        </div>
      ))}
      <div><span className="blink">_</span></div>
    </div>
  )
}
