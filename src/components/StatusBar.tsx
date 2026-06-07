import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMailbox } from '@/lib/useMailbox'
import { useFileWindows } from '@/lib/useFileWindows'
import { pushEgg } from '@/lib/eggBus'

const ICONS = ['🅱️', '🐌', '📁', '📬', '⚠️', '🔊', '🧊', '🌀']

function fakeTime() {
  const h = Math.floor(Math.random() * 99).toString().padStart(2, '0')
  const m = Math.floor(Math.random() * 199).toString().padStart(2, '0')
  return `${h}:${m}`
}

export default function StatusBar() {
  const [tick, setTick] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const { setOpen: setMailOpen } = useMailbox()
  const { open: openFile, openIds } = useFileWindows()
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const i = window.setInterval(() => setTick((v) => v + 1), 1800)
    return () => window.clearInterval(i)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [menuOpen])

  const time = tick % 3 === 0 ? '??:??' : fakeTime()
  const fmtOpen = openIds.includes('fmt884')
  const untitledOpen = openIds.includes('untitled')

  return (
    <div
      ref={rootRef}
      className="fixed bottom-0 left-0 right-0 z-30 h-6 bg-[#c0c0c0] border-t-2 border-white flex items-center text-[11px] font-mono select-none"
      style={{ boxShadow: 'inset 0 2px 0 #fff, inset 0 -2px 0 #808080' }}
    >
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className={`h-full px-2 border-r border-black/40 bg-[#b0b0b0] flex items-center gap-1 ${menuOpen ? 'bg-[#a0a0a0] shadow-[inset_2px_2px_0_#808080]' : ''}`}
        aria-haspopup
        aria-expanded={menuOpen}
        aria-label="start menu"
      >
        <span className="font-impact">start</span>
        <span className="opacity-50">▾</span>
      </button>

      <div className="flex-1 flex items-center gap-2 px-2 overflow-hidden">
        <TaskBtn icon="📬" label="outlock — inbox" onClick={() => setMailOpen(true)} />
        <TaskBtn icon="📁" label="fmt884.zip" active={fmtOpen} onClick={() => openFile('fmt884')} />
        <TaskBtn icon="📄" label="untitled (do not open)" active={untitledOpen} onClick={() => openFile('untitled')} hideOnMobile />
      </div>

      <div className="px-2 flex items-center gap-1 border-l border-black/40 bg-[#b0b0b0]">
        {ICONS.map((ic, i) => (
          <button
            key={i}
            className={`leading-none ${i === (tick % ICONS.length) ? 'blink' : ''}`}
            onClick={() => pushEgg(`tray icon: ${ic}`, 'info')}
            title="tray"
          >
            {ic}
          </button>
        ))}
        <span className="ml-2 tabular-nums">{time}</span>
      </div>

      {menuOpen && (
        <div
          role="menu"
          aria-label="start menu"
          className="absolute bottom-6 left-0 w-[280px] bg-[#c0c0c0] border-2 border-white shadow-[2px_2px_0_#000] text-[12px] font-mono"
          style={{ borderRightColor: '#000', borderBottomColor: '#000' }}
        >
          <div className="bg-[#000080] text-white font-bold px-2 py-1 flex items-center gap-1">
            <span className="font-impact text-base">USE</span>
            <span className="opacity-80">less compression 98</span>
          </div>
          <ul className="py-1">
            <MenuItem icon="📁" onClick={() => { setMenuOpen(false); navigate('/library') }}>programs ▸ <span className="opacity-70 text-[11px]">all 1003</span></MenuItem>
            <MenuItem icon="📬" onClick={() => { setMenuOpen(false); setMailOpen(true) }}>outlock express</MenuItem>
            <MenuItem icon="🧊" onClick={() => { setMenuOpen(false); navigate('/cube') }}>the cube</MenuItem>
            <MenuItem icon="🐌" onClick={() => { setMenuOpen(false); navigate('/snail') }}>snail census</MenuItem>
            <MenuItem icon="🥦" onClick={() => { setMenuOpen(false); navigate('/vegetal') }}>the vegetal</MenuItem>
            <MenuItem icon="🍲" onClick={() => { setMenuOpen(false); navigate('/soup') }}>soup</MenuItem>
            <MenuItem icon="🧑" onClick={() => { setMenuOpen(false); navigate('/greg') }}>greg (tribute)</MenuItem>
            <MenuItem icon="❓" onClick={() => { setMenuOpen(false); navigate('/wat') }}>wat</MenuItem>
            <li className="border-t border-black/40 my-1" />
            <MenuItem icon="📄" onClick={() => { setMenuOpen(false); openFile('readme') }}>open readme.txt</MenuItem>
            <MenuItem icon="📁" onClick={() => { setMenuOpen(false); openFile('fmt884') }}>open fmt884.zip</MenuItem>
            <MenuItem icon="🧊" onClick={() => { setMenuOpen(false); openFile('cube_folder') }}>open /the_cube/</MenuItem>
            <MenuItem icon="📄" onClick={() => { setMenuOpen(false); openFile('untitled') }}>open untitled.txt</MenuItem>
            <li className="border-t border-black/40 my-1" />
            <MenuItem icon="🔎" onClick={() => { setMenuOpen(false); pushEgg('the codec was here. it isnt now.', 'warn') }}>find ▸ the codec</MenuItem>
            <MenuItem icon="❓" onClick={() => { setMenuOpen(false); pushEgg('no', 'info') }}>help</MenuItem>
            <MenuItem icon="⏯" onClick={() => { setMenuOpen(false); pushEgg('command not found: greg', 'warn') }}>run...</MenuItem>
            <li className="border-t border-black/40 my-1" />
            <MenuItem icon="🚪" onClick={() => { setMenuOpen(false); pushEgg('you cannot log off', 'warn') }}>log off</MenuItem>
            <MenuItem icon="⏻" onClick={() => { setMenuOpen(false); pushEgg('shut down: declined', 'warn') }}>shut down...</MenuItem>
          </ul>
          <div className="border-t border-black/40 px-2 py-1 text-[10px] opacity-70">built without permission</div>
        </div>
      )}
    </div>
  )
}

function TaskBtn({ icon, label, onClick, active, hideOnMobile }: { icon: string; label: string; onClick: () => void; active?: boolean; hideOnMobile?: boolean }) {
  return (
    <button
      className={`${hideOnMobile ? 'hidden md:inline-flex' : 'inline-flex'} items-center gap-1 bg-white border border-black/40 px-1 truncate font-mono text-[11px] cursor-pointer hover:bg-yellow-100 ${active ? 'bg-[#000080] text-white' : ''}`}
      onClick={onClick}
    >
      {icon} {label}
    </button>
  )
}

function MenuItem({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-[#000080] hover:text-white"
      >
        <span className="w-5 text-center">{icon}</span>
        <span>{children}</span>
      </button>
    </li>
  )
}
