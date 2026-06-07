const ITEMS = [
  ['MP2', '-0.5kHz'],
  ['ZIP', '+infinity'],
  ['RAR', '?'],
  ['JPEG²', '🥵'],
  ['AverageColor', '#beigE'],
  ['Schrödinger.7z', '50/50'],
  ['STL→Recipe', 'preheat'],
  ['CSV→Novel', 'they were a row'],
  ['VinylSim', '+20MB'],
  ['B-Compress', '+23%'],
  ['CRYPTI-ZIP', '🔒❓'],
  ['the cube', 'closer'],
  ['fmt#884', 'requesting water'],
  ['ORANG', '↑↑↑'],
  ['greg', 'still posting'],
  ['the void', '—'],
  ['MonaLisa.png', 'good'],
  ['snail.gif', 'arriving'],
]

export default function StockTicker() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div aria-hidden className="overflow-hidden bg-black text-[#0f0] border-y border-black font-mono text-[12px] py-[3px] select-none">
      <div className="inline-flex marquee-h whitespace-nowrap">
        {row.map(([name, val], i) => (
          <span key={i} className="mx-4">
            <span className="opacity-70">{name}</span>{' '}
            <span className={String(val).startsWith('-') ? 'text-red-400' : 'text-[#0f0]'}>
              {val}
            </span>
            <span className="mx-2 opacity-30">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
