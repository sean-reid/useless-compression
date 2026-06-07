import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FORMAT_BY_ID, FORMATS } from '@/data/formats'
import { INTERACTIVE } from '@/data/formats/interactive'

export default function FormatDetail() {
  const { id } = useParams()
  const f = id ? FORMAT_BY_ID[id] : undefined

  // pick 4 related: prefer same mediaType, then random
  const related = useMemo(() => {
    if (!f) return []
    const same = FORMATS.filter((x) => x.id !== f.id && x.mediaType === f.mediaType)
    const other = FORMATS.filter((x) => x.id !== f.id && x.mediaType !== f.mediaType)
    const shuffled = [...same, ...other].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 4)
  }, [f])

  if (!f) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="font-mono text-sm opacity-60">/format/{id}</p>
        <h1 className="font-impact uppercase text-5xl mt-2">not catalogued</h1>
        <p className="mt-3 typed">this format may exist. it has not been written down. greg might know.</p>
        <Link to="/library" className="inline-block mt-6 font-mono underline">← back to the library</Link>
      </div>
    )
  }

  const Interactive = f.interactiveId ? INTERACTIVE[f.interactiveId] : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="font-mono text-[11px] opacity-60">/format/{f.id}</div>
      <h1 className="font-impact uppercase text-5xl md:text-7xl leading-none mt-1 break-words">{f.name}</h1>
      <p className="font-comic text-pink-600 text-xl md:text-2xl mt-1">{f.blurb}</p>

      <div className="mt-4 flex flex-wrap gap-1.5 text-[10px] font-mono uppercase tracking-wider">
        <Pill>{f.mediaType}</Pill>
        <Pill>{f.lossiness}</Pill>
        <Pill>{f.status}</Pill>
        {f.tags.map((t) => <Pill key={t} subtle>{t}</Pill>)}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* spec */}
        <article className="md:col-span-2 bg-[#fff8e0] border-2 border-black p-4" style={{ boxShadow: '5px 5px 0 #000' }}>
          <pre className="font-mono text-[10px] opacity-60 mb-2 whitespace-pre-wrap m-0">
            {`Internet Engineering Task Farce
spec: ${f.id}
status: ${f.status}
year proposed: ${f.yearProposed ?? '????'}
by: ${f.by ?? 'unknown'}`}
          </pre>
          <h2 className="font-impact uppercase text-2xl m-0">specification</h2>
          <pre className="mt-2 font-serif text-[14px] leading-snug whitespace-pre-wrap m-0">{f.spec}</pre>
        </article>

        {/* sidebar */}
        <aside className="space-y-4">
          <div className="bg-white border-2 border-black p-3 font-mono text-[11px]" style={{ boxShadow: '4px 4px 0 #ff2ea5' }}>
            <div className="font-impact uppercase text-base mb-2">stats</div>
            <Stat k="ratio" v={f.ratio} />
            <Stat k="lossiness" v={f.lossiness} />
            <Stat k="downloads" v={f.stats?.downloads ?? '0'} />
            <Stat k="stars" v={f.stats?.stars ?? '★ — unrated'} />
            <Stat k="complaints" v={f.stats?.complaints ?? '0 (none reached us)'} />
            <Stat k="cited by" v={f.stats?.cited_by ?? '0 (work in progress)'} />
          </div>

          <div className="bg-cyan-200 border-2 border-black p-3 font-mono text-[12px]" style={{ transform: 'rotate(-1deg)' }}>
            <div className="font-impact uppercase text-base">compatibility</div>
            <p className="mt-1">windows: no</p>
            <p>macos: no</p>
            <p>linux: probably not</p>
            <p>the cube: yes</p>
          </div>
        </aside>
      </div>

      {/* interactive demo */}
      {Interactive ? (
        <section className="mt-10">
          <h2 className="font-impact uppercase text-3xl">try it</h2>
          <p className="font-comic text-pink-600 text-sm mt-1">it runs. this is its only feature.</p>
          <div className="mt-4 max-w-2xl">
            <Interactive />
          </div>
        </section>
      ) : (
        <section className="mt-10">
          <h2 className="font-impact uppercase text-3xl">try it</h2>
          <p className="font-mono text-[13px] opacity-70 mt-1">
            this format is {f.status === 'spec' ? 'specification only' : 'described but not built'}.
            you cannot run it. nobody can.
          </p>
        </section>
      )}

      {/* related */}
      <section className="mt-12">
        <h2 className="font-impact uppercase text-3xl">related</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {related.map((r, i) => (
            <Link
              key={r.id}
              to={`/format/${r.id}`}
              className="border-2 border-black bg-white p-2 no-underline text-black"
              style={{ transform: `rotate(${(i % 3 - 1) * 0.7}deg)`, boxShadow: '3px 3px 0 #000' }}
            >
              <div className="font-impact uppercase text-base leading-none">{r.name}</div>
              <div className="font-comic text-[11px] mt-1">{r.blurb}</div>
            </Link>
          ))}
        </div>
      </section>

      <Link to="/library" className="inline-block mt-10 font-mono underline">← back to the library</Link>
    </div>
  )
}

function Pill({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) {
  return (
    <span className={`border-2 border-black px-1.5 py-0.5 ${subtle ? 'bg-white' : 'bg-yellow-300'}`}>
      {children}
    </span>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-black/15 py-0.5">
      <span className="opacity-60">{k}</span>
      <span className="text-right truncate">{v}</span>
    </div>
  )
}
