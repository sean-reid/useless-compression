import { useEffect, useState } from 'react'
import { pushEgg } from '@/lib/eggBus'

const TRACKS = [
  'static.wav',
  '01-the_cube.flac',
  'untitled.midi',
  'greg_sings.aac',
  'silence (mono, 44.1khz)',
  'fan_noise.mp4',
  'one_long_beep.mp3',
  'hampter_breathing.wav',
  'long_boi_descending.mid',
  'the_cube_responds.flac',
]

export default function MusicWidget() {
  const [t, setT] = useState(0)
  const [trackIdx, setTrackIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const i = window.setInterval(() => {
      setT((v) => {
        const next = v + 1
        if (next > 100) {
          setTrackIdx((k) => (k + 1) % TRACKS.length)
          return 0
        }
        return next
      })
    }, 700)
    return () => window.clearInterval(i)
  }, [paused])

  function skip() {
    setTrackIdx((k) => (k + 1) % TRACKS.length)
    setT(0)
    pushEgg(`now playing: ${TRACKS[(trackIdx + 1) % TRACKS.length]}`, 'info')
  }
  function back() {
    setTrackIdx((k) => (k - 1 + TRACKS.length) % TRACKS.length)
    setT(0)
    pushEgg('rewound. it sounds the same.', 'info')
  }
  function togglePause() {
    setPaused((v) => !v)
    pushEgg(paused ? 'play (reluctantly)' : 'paused. it continues anyway.', 'info')
  }

  return (
    <div
      className="fixed bottom-8 right-2 md:right-6 z-30 w-[260px] bg-black text-[#0f0] border-2 border-[#0f0] font-mono text-[11px]"
      style={{ transform: 'rotate(0.4deg)', boxShadow: '4px 4px 0 #ff2ea5' }}
    >
      <div className="px-2 py-0.5 border-b border-[#0f0]/40 flex justify-between">
        <span>♪ winamp 2.95</span>
        <span className="opacity-60">— □ ×</span>
      </div>
      <div className="px-2 py-1">
        <div className="truncate">▶ {TRACKS[trackIdx]}</div>
        <div className="h-1 bg-[#0f0]/20 my-1">
          <div className="h-full bg-[#0f0]" style={{ width: `${t}%` }} />
        </div>
        <div className="flex justify-between items-center text-[10px] opacity-90">
          <div className="flex gap-1">
            <button onClick={back} className="px-1 border border-[#0f0]/50 hover:bg-[#0f0]/20" aria-label="back">⏮</button>
            <button onClick={togglePause} className="px-1 border border-[#0f0]/50 hover:bg-[#0f0]/20" aria-label="play/pause">{paused ? '▶' : '⏸'}</button>
            <button onClick={skip} className="px-1 border border-[#0f0]/50 hover:bg-[#0f0]/20" aria-label="skip">⏭</button>
          </div>
          <span>vol: 11</span>
        </div>
      </div>
    </div>
  )
}
