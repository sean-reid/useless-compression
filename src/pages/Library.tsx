import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FORMATS, MEDIA_TYPES, COUNT_BY_MEDIA } from '@/data/formats'
import FormatCard from '@/components/FormatCard'
import { isInteractive, INTERACTIVE } from '@/data/formats/interactive'

export default function Library() {
  const [q, setQ] = useState('')
  const [media, setMedia] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return FORMATS.filter((f) => {
      if (media && f.mediaType !== media) return false
      if (status === 'interactive' && !isInteractive(f.id)) return false
      if (status && status !== 'interactive' && f.status !== status) return false
      if (needle && !(`${f.name} ${f.blurb} ${f.tags.join(' ')}`.toLowerCase().includes(needle))) return false
      return true
    })
  }, [q, media, status])

  function randomOne() {
    const f = FORMATS[Math.floor(Math.random() * FORMATS.length)]!
    window.location.hash = `#/format/${f.id}`
  }

  return (
    <div className="px-4 md:px-12 py-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-impact uppercase text-6xl md:text-7xl leading-none">the library</h1>
          <p className="font-comic text-pink-600 text-xl mt-1">{FORMATS.length} of 1003 catalogued. the rest are forthcoming.</p>
        </div>
        <button
          onClick={randomOne}
          className="bg-yellow-300 border-2 border-black px-3 py-1 font-impact uppercase text-lg shadow-[3px_3px_0_#000]"
          style={{ transform: 'rotate(-1deg)' }}
        >
          🎲 random one
        </button>
      </div>

      {/* search + filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search (it tries)"
          className="border-2 border-black bg-white px-2 py-1 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-pink-400"
          style={{ boxShadow: '3px 3px 0 #000' }}
        />
        {q && (
          <button onClick={() => setQ('')} className="font-mono text-xs underline">clear</button>
        )}
        <span className="font-mono text-[11px] opacity-60 ml-2">{filtered.length} match</span>
      </div>

      {/* media chips */}
      <div className="mt-3 flex flex-wrap gap-1.5 items-center">
        <span className="font-mono text-[11px] opacity-60">media:</span>
        <Chip active={media === null} onClick={() => setMedia(null)}>all</Chip>
        {MEDIA_TYPES.map((m) => (
          <Chip key={m} active={media === m} onClick={() => setMedia(m)}>
            {m} <span className="opacity-50">({COUNT_BY_MEDIA[m]})</span>
          </Chip>
        ))}
      </div>

      {/* status chips */}
      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
        <span className="font-mono text-[11px] opacity-60">status:</span>
        <Chip active={status === null} onClick={() => setStatus(null)}>any</Chip>
        <Chip active={status === 'spec'} onClick={() => setStatus('spec')}>spec only</Chip>
        <Chip active={status === 'algorithm'} onClick={() => setStatus('algorithm')}>described</Chip>
        <Chip active={status === 'interactive'} onClick={() => setStatus('interactive')}>
          actually runs ({Object.keys(INTERACTIVE).length})
        </Chip>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 typed text-[14px]">nothing matches that. greg looked too.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((f, i) => (
            <FormatCard key={f.id} f={f} rot={((i * 7) % 5 - 2) * 0.6} />
          ))}
        </div>
      )}

      <div className="mt-12 typed text-[13px] max-w-md">
        the catalog is incomplete. the rest are forthcoming. forth and back.
      </div>

      <Link to="/" className="inline-block mt-4 font-mono text-sm underline">← home</Link>
    </div>
  )
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-black px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${active ? 'bg-black text-white' : 'bg-white text-black hover:bg-yellow-100'}`}
    >
      {children}
    </button>
  )
}
