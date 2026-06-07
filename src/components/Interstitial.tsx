import { useEffect, useState } from 'react'

const LINES = [
  { t: 'this content is sponsored by greg', sub: 'greg approves of you' },
  { t: 'this site is brought to you by THE CUBE', sub: 'and by viewers like you' },
  { t: 'a word from our vegetal', sub: 'his word is "remain"' },
  { t: 'paid placement', sub: 'no one paid' },
  { t: 'sponsored by hampter', sub: 'hampter takes no questions' },
  { t: 'paid for by the committee to elect greg', sub: 'greg has already won' },
  { t: 'a message from your local snail', sub: 'still moving. still source.' },
]

export default function Interstitial() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * LINES.length))
  useEffect(() => {
    const t = window.setInterval(() => setIdx((v) => (v + 1) % LINES.length), 8000)
    return () => window.clearInterval(t)
  }, [])
  const l = LINES[idx]!
  return (
    <div className="border-y-4 border-black py-3 px-4 bg-yellow-200 text-center" style={{ transform: 'rotate(-0.4deg)' }}>
      <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">— interstitial —</div>
      <div className="font-impact text-2xl md:text-4xl uppercase mt-1">{l.t}</div>
      <div className="font-comic text-pink-600 text-sm mt-1">{l.sub}</div>
    </div>
  )
}
