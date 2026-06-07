import { useState } from 'react'
import { pushEgg } from '@/lib/eggBus'

export default function Hampter({ className = '', label = 'hampter' }: { className?: string; label?: string }) {
  const [pets, setPets] = useState(0)
  const reactions = ['hampter accepted', 'hampter is content', 'hampter remembers this', 'hampter wants no more', 'hampter has left', 'hampter is back']
  function pet() {
    setPets((v) => v + 1)
    pushEgg(reactions[pets % reactions.length]!, 'ok')
  }
  return (
    <button
      type="button"
      onClick={pet}
      aria-label="pet hampter"
      className={`inline-block text-center bg-transparent border-0 cursor-pointer ${className}`}
      style={{ padding: 0 }}
    >
      <div
        className="relative w-16 h-12 mx-auto bg-[#d1a06c] rounded-[40%] transition-transform"
        style={{ boxShadow: 'inset -4px -4px 0 #a87a4b', transform: `scale(${1 + Math.min(pets, 6) * 0.05})` }}
        aria-hidden
      >
        <div className="absolute -top-2 left-1 w-3 h-3 bg-[#d1a06c] rounded-full" />
        <div className="absolute -top-2 right-1 w-3 h-3 bg-[#d1a06c] rounded-full" />
        <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-black rounded-full" />
        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-black rounded-full" />
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full" />
      </div>
      <div className="font-comic text-[11px] text-pink-600 mt-1">{label} {pets > 0 ? `(${pets})` : ''}</div>
    </button>
  )
}
