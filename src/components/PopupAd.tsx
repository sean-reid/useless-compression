import { useEffect, useState } from 'react'
import { ADS, type Ad } from '@/data/ads'

type Live = { id: number; ad: Ad; rot: number; pos: { top?: number; bottom?: number; left?: number; right?: number } }

function randomPos(): Live['pos'] {
  const corners: Live['pos'][] = [
    { top: 60, left: 12 },
    { top: 90, right: 12 },
    { bottom: 60, left: 24 },
    { bottom: 90, right: 24 },
    { top: 280, left: 36 },
    { bottom: 200, right: 60 },
  ]
  return corners[Math.floor(Math.random() * corners.length)]!
}

export default function PopupAd() {
  const [live, setLive] = useState<Live[]>([])
  const [seq, setSeq] = useState(0)

  useEffect(() => {
    let cancelled = false
    let n = 0
    function schedule() {
      const delay = 9000 + Math.random() * 14000
      window.setTimeout(() => {
        if (cancelled) return
        const ad = ADS[Math.floor(Math.random() * ADS.length)]!
        setLive((cur) => {
          const next: Live = {
            id: ++n,
            ad,
            rot: (Math.random() * 6) - 3,
            pos: randomPos(),
          }
          return [...cur.slice(-2), next] // up to 3 onscreen at once
        })
        setSeq((s) => s + 1)
        schedule()
      }, delay)
    }
    const first = window.setTimeout(() => {
      const ad = ADS[Math.floor(Math.random() * ADS.length)]!
      setLive([{ id: ++n, ad, rot: (Math.random() * 6) - 3, pos: randomPos() }])
      schedule()
    }, 4500)
    return () => { cancelled = true; window.clearTimeout(first) }
  }, [])

  function dismiss(id: number) {
    setLive((cur) => cur.filter((x) => x.id !== id))
  }

  if (live.length === 0) return null

  return (
    <>
      {live.map((l) => (
        <AdFrame key={`${l.id}_${seq}`} live={l} onClose={() => dismiss(l.id)} />
      ))}
    </>
  )
}

function AdFrame({ live, onClose }: { live: Live; onClose: () => void }) {
  const { ad, pos, rot } = live
  const style: React.CSSProperties = {
    transform: `rotate(${rot}deg)`,
    top: pos.top,
    bottom: pos.bottom,
    left: pos.left,
    right: pos.right,
  }
  const variant = ad.variant ?? 'win98'
  return (
    <div role="dialog" aria-label="ad" className="fixed z-50 w-[300px] max-w-[90vw]" style={style}>
      {variant === 'win98' && <Win98 ad={ad} onClose={onClose} />}
      {variant === 'system' && <SystemAd ad={ad} onClose={onClose} />}
      {variant === 'spam' && <SpamAd ad={ad} onClose={onClose} />}
      {variant === 'tabloid' && <TabloidAd ad={ad} onClose={onClose} />}
      {variant === 'banner' && <BannerAd ad={ad} onClose={onClose} />}
      {variant === 'classified' && <ClassifiedAd ad={ad} onClose={onClose} />}
    </div>
  )
}

function Win98({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  return (
    <div className="border-2 border-black bg-[#c0c0c0] shadow-[6px_6px_0_#000]">
      <div className="bg-[linear-gradient(90deg,#800,#e22)] text-white px-2 py-1 flex justify-between items-center text-[12px] font-bold">
        <span>📢 ADVERTISEMENT</span>
        <button onClick={onClose} aria-label="close" className="px-2 bg-[#c0c0c0] text-black border border-black">×</button>
      </div>
      <div className="p-3 text-center">
        <div className="font-impact uppercase text-xl leading-none">{ad.t}</div>
        {ad.sub && <div className="font-comic text-pink-600 text-sm mt-1">{ad.sub}</div>}
        <button className="mt-3 inline-block bg-yellow-300 px-3 py-1 border-2 border-black font-mono text-[12px]" onClick={onClose}>
          {ad.cta || 'CLICK HERE'}
        </button>
      </div>
    </div>
  )
}

function SystemAd({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0_#000]">
      <div className="bg-[#1084d0] text-white px-2 py-1 flex justify-between items-center text-[12px] font-bold font-mono">
        <span>⚠ system notice</span>
        <button onClick={onClose} aria-label="close" className="px-2 bg-[#c0c0c0] text-black border border-black">×</button>
      </div>
      <div className="p-3 font-mono text-[12px] flex gap-2">
        <span className="text-3xl">⚠</span>
        <div>
          <div className="font-bold leading-tight">{ad.t}</div>
          {ad.sub && <div className="opacity-70 mt-1">{ad.sub}</div>}
          <div className="mt-2 flex gap-1">
            <button onClick={onClose} className="bg-[#c0c0c0] border border-black px-2 text-[11px]">OK</button>
            <button onClick={onClose} className="bg-[#c0c0c0] border border-black px-2 text-[11px]">cancel</button>
            <button onClick={onClose} className="bg-[#c0c0c0] border border-black px-2 text-[11px]">maybe</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SpamAd({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  return (
    <div className="border-4 border-double border-yellow-500 bg-[#330000] text-white shadow-[6px_6px_0_#ff2ea5] p-3">
      <div className="flex justify-between items-start">
        <div className="font-impact uppercase text-base text-yellow-300 stroke-black leading-tight">{ad.t}</div>
        <button onClick={onClose} aria-label="close" className="ml-2 text-white border border-white px-1 text-xs">×</button>
      </div>
      {ad.sub && <div className="font-comic text-pink-300 text-sm mt-1">{ad.sub}</div>}
      <div className="mt-2 text-center">
        <button onClick={onClose} className="bg-yellow-300 text-black px-3 py-1 border-2 border-yellow-500 font-impact text-sm uppercase">
          🅱️ CLICK 🅱️
        </button>
      </div>
    </div>
  )
}

function TabloidAd({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  return (
    <div className="border-2 border-black bg-white p-3 shadow-[5px_5px_0_#000]">
      <div className="flex justify-between items-start">
        <div className="font-impact uppercase text-lg text-red-700 leading-tight">{ad.t}</div>
        <button onClick={onClose} aria-label="close" className="ml-2 text-black border border-black px-1 text-xs bg-white">×</button>
      </div>
      <div className="mt-1 font-serif italic text-sm">{ad.sub}</div>
      <div className="mt-2 text-center">
        <button onClick={onClose} className="text-blue-700 underline font-mono text-[12px]">read more →</button>
      </div>
    </div>
  )
}

function BannerAd({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  return (
    <div className="border-2 border-black bg-cyan-200 p-3 shadow-[4px_4px_0_#ff2ea5]">
      <div className="flex justify-between items-start">
        <div className="font-impact uppercase text-base leading-tight">{ad.t}</div>
        <button onClick={onClose} aria-label="close" className="ml-2 border border-black px-1 text-xs bg-white">×</button>
      </div>
      {ad.sub && <div className="font-comic text-sm mt-1">{ad.sub}</div>}
    </div>
  )
}

function ClassifiedAd({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  return (
    <div className="border-2 border-black bg-[#fffce0] p-2 font-mono text-[12px] shadow-[3px_3px_0_#000]">
      <div className="flex justify-between items-start">
        <div className="font-bold uppercase tracking-wider">{ad.t}</div>
        <button onClick={onClose} aria-label="close" className="ml-2 border border-black px-1 text-xs">×</button>
      </div>
      {ad.sub && <div className="mt-1 opacity-80">{ad.sub}</div>}
    </div>
  )
}
