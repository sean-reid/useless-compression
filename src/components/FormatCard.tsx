import { Link } from 'react-router-dom'
import type { CompressionFormat } from '@/data/formats'
import { isInteractive } from '@/data/formats/interactive'

const MEDIA_COLORS: Record<string, string> = {
  text:     '#fffb00',
  image:    '#ff8c00',
  audio:    '#00f0ff',
  video:    '#ff2ea5',
  '3d':     '#9aff00',
  document: '#fff',
  data:     '#e0e8ff',
  meta:     '#1a1a1a',
}

const STATUS_BADGES: Record<string, { label: string; bg: string; fg: string }> = {
  spec:        { label: 'SPEC',        bg: '#fffce0', fg: '#000' },
  algorithm:   { label: 'ALG',         bg: '#cfe0c5', fg: '#000' },
  interactive: { label: 'RUNS', bg: '#ff2ea5', fg: '#fff' },
}

export default function FormatCard({ f, rot = 0 }: { f: CompressionFormat; rot?: number }) {
  const bg = MEDIA_COLORS[f.mediaType] ?? '#fff'
  const fg = f.mediaType === 'meta' ? '#fffb00' : '#0a0a0a'
  const effectiveStatus = isInteractive(f.id) ? 'interactive' : f.status
  const status = STATUS_BADGES[effectiveStatus]!
  return (
    <Link
      to={`/format/${f.id}`}
      className="block border-2 border-black no-underline relative"
      style={{
        background: bg,
        color: fg,
        transform: `rotate(${rot}deg)`,
        boxShadow: '5px 5px 0 #000',
        textDecoration: 'none',
      }}
    >
      <div className="p-3">
        <div className="font-impact uppercase text-xl leading-none break-words">{f.name}</div>
        <div className="mt-2 font-comic text-[13px] leading-tight">{f.blurb}</div>
        <div className="mt-3 flex flex-wrap gap-1 items-center text-[10px] font-mono uppercase tracking-wider">
          <span className="border border-current px-1">{f.mediaType}</span>
          <span className="border border-current px-1">{f.lossiness}</span>
          <span className="opacity-70">ratio: {f.ratio}</span>
        </div>
      </div>
      <div
        className="absolute -top-2 -right-2 font-mono text-[10px] px-1 py-0.5 border-2 border-black"
        style={{ background: status.bg, color: status.fg, transform: 'rotate(4deg)' }}
      >
        {status.label}
      </div>
    </Link>
  )
}
