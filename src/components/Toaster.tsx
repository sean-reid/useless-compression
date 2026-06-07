import { useEffect, useState } from 'react'
import { onEgg } from '@/lib/eggBus'

const POOL = [
  { t: 'fmt#884 saved as fmt#884.', tone: 'info' },
  { t: 'the cube has moved.', tone: 'warn' },
  { t: 'snail crossed the perimeter.', tone: 'warn' },
  { t: '1 new feeling.', tone: 'info' },
  { t: 'greg is online.', tone: 'info' },
  { t: 'greg went offline.', tone: 'info' },
  { t: 'greg is online again.', tone: 'info' },
  { t: 'ORANG sent a fax.', tone: 'warn' },
  { t: 'your file is fine.', tone: 'ok' },
  { t: 'never mind.', tone: 'ok' },
  { t: 'the algorithm runs.', tone: 'info' },
  { t: 'a 4th season was found.', tone: 'warn' },
  { t: 'a 4th season was returned.', tone: 'ok' },
  { t: 'achievement unlocked: present', tone: 'ok' },
  { t: 'wait thats illegal', tone: 'warn' },
  { t: 'they did surgery on a grape', tone: 'info' },
  { t: 'always has been', tone: 'info' },
  { t: 'is this loss', tone: 'warn' },
  { t: 'hampter has approached', tone: 'info' },
  { t: 'hampter has left', tone: 'info' },
  { t: 'long boi is taller', tone: 'warn' },
  { t: 'mum got the camera', tone: 'warn' },
  { t: 'press F (you did)', tone: 'ok' },
  { t: 'we live in a society', tone: 'info' },
  { t: 'they had us in the first half', tone: 'info' },
  { t: 'i sleep', tone: 'info' },
  { t: 'real shit?', tone: 'warn' },
  { t: 'the bee movie has started', tone: 'warn' },
  { t: 'the bee movie has not stopped', tone: 'warn' },
  { t: 'communism has been reversed', tone: 'ok' },
  { t: 'communism has not been reversed', tone: 'warn' },
  { t: 'a number was assigned to you. it is wrong.', tone: 'info' },
]

type Toast = { id: number; t: string; tone: string }

const COLORS: Record<string, string> = {
  info: 'bg-cyan-300 border-cyan-700',
  warn: 'bg-yellow-300 border-yellow-700',
  ok: 'bg-lime-300 border-lime-700',
}

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    let n = 0
    function push(t: string, tone: string) {
      const id = ++n
      setToasts((cur) => [...cur.slice(-3), { id, t, tone }])
      window.setTimeout(() => {
        setToasts((cur) => cur.filter((x) => x.id !== id))
      }, 4500)
    }
    const i = window.setInterval(() => {
      const p = POOL[Math.floor(Math.random() * POOL.length)]!
      push(p.t, p.tone)
    }, 5400)
    const off = onEgg((msg, tone) => push(msg, tone ?? 'info'))
    return () => {
      window.clearInterval(i)
      off()
    }
  }, [])

  return (
    <div className="fixed bottom-10 right-2 md:right-6 z-40 flex flex-col gap-1 items-end pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`text-[12px] font-mono px-2 py-1 border-2 ${COLORS[t.tone]} shadow-[3px_3px_0_#000]`}
          style={{ transform: `rotate(${(t.id % 5 - 2) * 0.6}deg)` }}
        >
          {t.t}
        </div>
      ))}
    </div>
  )
}
