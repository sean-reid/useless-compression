import { useEffect, useState } from 'react'
import { useFileWindows } from '@/lib/useFileWindows'
import { FILES } from '@/data/files'

function useViewport() {
  const [v, setV] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }))
  useEffect(() => {
    const fn = () => setV({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return v
}

// deterministic pseudo-random jitter per (id, axis) so positions are stable
// across re-renders. otherwise the window would dance every state change.
function jitter(seed: string, salt: string, max: number) {
  let h = 2166136261
  const s = seed + ':' + salt
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = (h * 16777619) >>> 0
  }
  return (h % 1000) / 1000 * max
}

// chaotically positioned on every screen, but the right edge (close button)
// always stays inside the viewport.
export default function FileWindows() {
  const { openIds, close, bringToFront } = useFileWindows()
  const { w: vw, h: vh } = useViewport()
  const isMobile = vw < 768
  const margin = 8

  return (
    <>
      {openIds.map((id, i) => {
        const spec = FILES[id]
        if (!spec) return null

        // window width — capped so we still have horizontal room to wiggle
        const desiredW = spec.width ?? 460
        const maxW = vw - margin * 2 - 24
        const width = Math.min(desiredW, isMobile ? Math.max(260, maxW) : desiredW)

        // horizontal slack — how much room we have to slide the window around.
        // on mobile this might be 30-60px; on desktop a few hundred.
        const slack = Math.max(0, vw - width - margin * 2)
        const baseLeft = isMobile
          ? margin + jitter(id, 'x', slack)
          : 80 + i * 28
        const left = Math.min(Math.max(margin, baseLeft), vw - width - margin)

        // vertical — staggered + jittered. each window pushed down a bit so they
        // don't perfectly overlap. on mobile we shift further (less vertical room).
        const baseTop = isMobile
          ? 56 + i * 36 + jitter(id, 'y', 20)
          : 80 + i * 28
        const desiredH = spec.height ?? 320
        const maxH = vh - baseTop - 36 // leave room for status bar
        const height = Math.max(180, Math.min(desiredH, maxH))

        // a small stable rotation per window. mobile = slightly more
        const rot = (jitter(id, 'r', 1) - 0.5) * (isMobile ? 4 : 1.6)

        return (
          <div
            key={id}
            role="dialog"
            aria-label={spec.title}
            className="fixed z-40"
            style={{
              top: baseTop,
              left,
              width,
              transform: `rotate(${rot.toFixed(2)}deg)`,
              transformOrigin: 'top left',
            }}
            onMouseDown={() => bringToFront(id)}
          >
            <div
              className="bg-[#c0c0c0] border-2 border-white shadow-[3px_3px_0_#000] flex flex-col"
              style={{ borderRightColor: '#000', borderBottomColor: '#000', height }}
            >
              <div className="shrink-0 bg-[linear-gradient(90deg,#000080,#1084d0)] text-white px-2 py-1 flex justify-between items-center text-[12px] font-bold gap-2">
                <span className="truncate min-w-0">{spec.icon} {spec.title}</span>
                <div className="flex gap-1 shrink-0">
                  <button
                    className="px-2 bg-[#c0c0c0] text-black border border-black hidden sm:inline"
                    aria-label="minimize"
                    disabled
                  >
                    _
                  </button>
                  <button
                    className="px-2 bg-[#c0c0c0] text-black border border-black hidden sm:inline"
                    aria-label="maximize"
                    disabled
                  >
                    □
                  </button>
                  <button
                    className="px-3 bg-[#c0c0c0] text-black border border-black font-bold"
                    aria-label="close"
                    onClick={() => close(id)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="shrink-0 border-b border-black/40 bg-[#d4d0c8] text-[11px] font-mono px-2 py-0.5 flex gap-3">
                <span>file</span>
                <span>edit</span>
                <span>view</span>
                <span className="opacity-50">help</span>
              </div>
              <div className="flex-1 overflow-auto min-h-0">{spec.render()}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}
