import { useEffect, useState } from 'react'
import { pushEgg } from '@/lib/eggBus'

const LABELS = [
  'compressing',
  'recompressing',
  'apologizing',
  'looking for the cube',
  'finding fmt#884',
  'feeding fmt#884',
  'rendering shame',
  'asking greg',
  'no longer asking greg',
]

export default function LoadingBar() {
  const [pct, setPct] = useState(87)
  const [labelIdx, setLabelIdx] = useState(0)

  useEffect(() => {
    const i = window.setInterval(() => {
      setPct((p) => {
        const delta = Math.random() < 0.2 ? -(20 + Math.random() * 40) : (Math.random() * 4 - 1)
        const next = p + delta
        if (next > 99) return 14 + Math.random() * 60
        if (next < 1) return 50 + Math.random() * 30
        return next
      })
      if (Math.random() < 0.25) setLabelIdx((k) => (k + 1) % LABELS.length)
    }, 700)
    return () => window.clearInterval(i)
  }, [])

  function panic() {
    setPct(14)
    pushEgg('progress reset. you did this.', 'warn')
  }

  return (
    <button
      type="button"
      onClick={panic}
      className="border-2 border-black bg-[#c0c0c0] p-2 inline-block max-w-md text-left cursor-pointer hover:bg-[#d0d0d0]"
      aria-label="reset progress"
    >
      <div className="text-[11px] font-mono mb-1 flex justify-between">
        <span>{LABELS[labelIdx]}…</span>
        <span>{Math.floor(pct)}%</span>
      </div>
      <div className="h-3 bg-white border border-black flex">
        <div
          className="h-full bg-[#000080]"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%`, transition: 'width 0.4s linear' }}
        />
      </div>
      <div className="text-[10px] font-mono mt-1 opacity-60">click to panic</div>
    </button>
  )
}
