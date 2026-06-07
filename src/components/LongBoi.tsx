import { useState } from 'react'
import { pushEgg } from '@/lib/eggBus'

export default function LongBoi() {
  const [stretches, setStretches] = useState(0)
  const reactions = ['long boi is longer', 'long boi cannot be made shorter', 'long boi has reached the ceiling', 'long boi is going through the ceiling', 'long boi is gone']
  function stretch() {
    setStretches((v) => Math.min(v + 1, 5))
    pushEgg(reactions[stretches]!, 'info')
  }
  const neckH = 160 + stretches * 30
  return (
    <button
      type="button"
      onClick={stretch}
      aria-label="stretch long boi"
      className="inline-block text-center bg-transparent border-0 cursor-pointer"
      style={{ padding: 0 }}
    >
      <div className="relative mx-auto" style={{ width: 24 }} aria-hidden>
        <div className="w-6 h-5 bg-amber-500 rounded-t-full border border-black border-b-0" />
        <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full" />
        <div className="absolute top-2 -left-1 w-2 h-1 bg-orange-500" />
        <div className="w-3 mx-auto border-l border-r border-black bg-amber-500 transition-all" style={{ height: neckH }} />
        <div className="w-9 h-7 -ml-1.5 bg-amber-500 rounded-b-3xl border border-black" />
        <div className="flex gap-2 justify-center mt-0.5">
          <div className="w-0.5 h-3 bg-orange-500" />
          <div className="w-0.5 h-3 bg-orange-500" />
        </div>
      </div>
      <div className="font-comic text-[11px] text-pink-600 mt-1">long boi {stretches > 0 ? `(+${stretches})` : ''}</div>
    </button>
  )
}
