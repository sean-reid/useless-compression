import { useEffect, useState } from 'react'
import { useMailbox } from '@/lib/useMailbox'

function relTime(ts: number) {
  const diff = Math.max(0, (Date.now() - ts) / 1000)
  if (diff < 60) return `${Math.floor(diff)}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

export default function MailPopup() {
  const { inbox, open, setOpen, selectedId, select, unreadCount, markAllRead } = useMailbox()
  const [, force] = useState(0)

  useEffect(() => {
    if (!open) return
    const i = window.setInterval(() => force((v) => v + 1), 1000)
    return () => window.clearInterval(i)
  }, [open])

  if (!open) return null
  const selected = inbox.find((m) => m.id === selectedId) ?? inbox[0] ?? null

  return (
    <div
      role="dialog"
      aria-label="mailbox"
      className="fixed z-50 top-10 right-2 md:right-6 w-[min(640px,calc(100vw-1rem))] shadow-[8px_8px_0_#000]"
      style={{ transform: 'rotate(-0.6deg)', height: 480 }}
    >
      <div className="border-2 border-black bg-[#c0c0c0] flex flex-col h-full">
        {/* title bar */}
        <div className="shrink-0 bg-[linear-gradient(90deg,#000080,#1084d0)] text-white px-2 py-1 flex justify-between items-center text-[12px] font-bold">
          <span>📬 inbox — outlock express 98</span>
          <div className="flex gap-1">
            <button
              className="px-2 bg-[#c0c0c0] text-black border border-black"
              onClick={markAllRead}
              title="mark all read"
            >
              ✓
            </button>
            <button
              className="px-2 bg-[#c0c0c0] text-black border border-black"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="shrink-0 border-b border-black/40 bg-[#d4d0c8] text-[11px] font-mono px-2 py-1 flex gap-3">
          <span>file</span><span>edit</span><span>view</span>
          <span className="opacity-50">go</span>
          <span className="ml-auto">{unreadCount} unread</span>
        </div>

        {/* body: grid that grows, with min-h-0 so children can constrain themselves */}
        <div className="grid grid-cols-12 flex-1 min-h-0 overflow-hidden" style={{ minHeight: 280 }}>
          <ul className="col-span-5 border-r border-black/40 bg-white overflow-y-auto text-[12px] font-mono min-h-0">
            {inbox.map((m) => {
              const isSel = selected && selected.id === m.id
              return (
                <li
                  key={m.id}
                  onClick={() => select(m.id)}
                  className={`cursor-pointer px-2 py-1 border-b border-black/10 ${isSel ? 'bg-[#000080] text-white' : ''} ${!m.read ? 'font-bold' : ''}`}
                >
                  <div className="flex justify-between gap-2">
                    <span className="truncate">{m.from || '(unknown)'}</span>
                    <span className={`text-[10px] ${isSel ? 'text-white/80' : 'text-black/50'}`}>{relTime(m.ts)}</span>
                  </div>
                  <div className={`truncate text-[11px] ${isSel ? 'text-white/90' : 'text-black/70'} ${m.read ? 'font-normal' : 'font-bold'}`}>
                    {m.subject || '(no subject)'}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="col-span-7 bg-white p-2 overflow-y-auto min-h-0">
            {!selected ? (
              <div className="text-black/40 font-mono text-[12px]">click a message</div>
            ) : (
              <div className="font-serif text-[13px]">
                <div className="border-b border-black/30 pb-1 mb-2 font-mono text-[11px] leading-snug">
                  <div><b>from:</b> {selected.from || '(unknown)'}</div>
                  <div><b>subject:</b> {selected.subject || '(no subject)'}</div>
                  <div className="opacity-60"><b>received:</b> {relTime(selected.ts)} ago</div>
                </div>
                <div className="whitespace-pre-wrap leading-snug">
                  {selected.body || <span className="opacity-30">(no body)</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-black/40 bg-[#d4d0c8] text-[10px] font-mono px-2 py-0.5 opacity-70">
          drag here (you cant)
        </div>
      </div>
    </div>
  )
}
