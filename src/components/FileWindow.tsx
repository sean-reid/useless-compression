import { useFileWindows } from '@/lib/useFileWindows'
import { FILES } from '@/data/files'

// each open file window. stacked + offset so they don't all sit on top.
export default function FileWindows() {
  const { openIds, close, bringToFront } = useFileWindows()
  return (
    <>
      {openIds.map((id, i) => {
        const spec = FILES[id]
        if (!spec) return null
        const offset = i * 28
        return (
          <div
            key={id}
            role="dialog"
            aria-label={spec.title}
            className="fixed z-40"
            style={{
              top: 80 + offset,
              left: 80 + offset,
              width: spec.width ?? 460,
              maxWidth: 'calc(100vw - 1rem)',
            }}
            onMouseDown={() => bringToFront(id)}
          >
            <div className="bg-[#c0c0c0] border-2 border-white shadow-[3px_3px_0_#000] flex flex-col" style={{ borderRightColor: '#000', borderBottomColor: '#000', height: spec.height ?? 320 }}>
              <div className="shrink-0 bg-[linear-gradient(90deg,#000080,#1084d0)] text-white px-2 py-1 flex justify-between items-center text-[12px] font-bold">
                <span className="truncate">{spec.icon} {spec.title}</span>
                <div className="flex gap-1">
                  <button className="px-2 bg-[#c0c0c0] text-black border border-black" aria-label="minimize" disabled>_</button>
                  <button className="px-2 bg-[#c0c0c0] text-black border border-black" aria-label="maximize" disabled>□</button>
                  <button className="px-2 bg-[#c0c0c0] text-black border border-black" aria-label="close" onClick={() => close(id)}>×</button>
                </div>
              </div>
              <div className="shrink-0 border-b border-black/40 bg-[#d4d0c8] text-[11px] font-mono px-2 py-0.5 flex gap-3">
                <span>file</span><span>edit</span><span>view</span><span className="opacity-50">help</span>
              </div>
              <div className="flex-1 overflow-auto min-h-0">
                {spec.render()}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
