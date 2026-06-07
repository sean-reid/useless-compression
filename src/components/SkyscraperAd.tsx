import { useEffect, useState } from 'react'

const PITCHES = [
  '↓ DOWNLOAD WINRAR ↓',
  'YOUR FILES MISS YOU',
  'BE GREG',
  'NOW HIRING: GREG',
  'CUBE INSIDE',
  '↑ CLICK ANY WAY ↑',
  'IS THIS LOSS',
  'HAMPTER',
  'we know what you opened',
  '50% OFF SOULS',
  'FAILING UPWARD',
  'WAT',
  'GREG SAYS HI',
  'SOUP IN UR DNS',
]

export default function SkyscraperAd() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % PITCHES.length), 3200)
    return () => window.clearInterval(t)
  }, [])
  return (
    <aside
      aria-hidden
      className="hidden xl:block fixed top-28 left-2 z-30 w-[120px] border-2 border-black bg-fuchsia-500 text-white text-center select-none"
      style={{ boxShadow: '5px 5px 0 #000', transform: 'rotate(-1deg)' }}
    >
      <div className="bg-black text-yellow-300 font-mono text-[10px] py-0.5 px-1 flex justify-between">
        <span>ad</span>
        <span>120×600</span>
      </div>
      <div className="py-4 px-2 min-h-[440px] flex flex-col items-center justify-between">
        <div className="font-impact uppercase text-2xl leading-tight">{PITCHES[i]}</div>
        <div className="text-4xl my-2 blink">🅱️</div>
        <div className="font-comic text-[12px]">click anywhere</div>
        <div className="font-mono text-[10px] opacity-80">(it does nothing)</div>
        <div className="bg-yellow-300 text-black px-2 py-1 mt-2 font-impact text-xs border-2 border-black">
          DOWNLOAD
        </div>
        <div className="text-3xl mt-2">🧊</div>
        <div className="font-mono text-[9px] opacity-60 mt-2">ad serving by greg</div>
      </div>
    </aside>
  )
}
