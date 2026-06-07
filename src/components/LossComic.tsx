// the LOSS comic, minimalist edition. the perfect reference for a site
// whose title is the word LOSS with LOSS crossed out.
// the joke is recognizing it. don't label it.
export default function LossComic() {
  const panels = [
    ['|', '||'],
    ['||', '|'],
    ['|', '|—'],
    ['||', '|_'],
  ]
  return (
    <div
      aria-hidden
      className="inline-block border-2 border-black bg-white p-1 select-none"
      style={{ boxShadow: '4px 4px 0 #000' }}
    >
      <div className="grid grid-cols-2 gap-1">
        {panels.map((p, i) => (
          <div
            key={i}
            className="bg-white border border-black/40 flex items-end justify-center gap-3 px-3 pt-4 pb-1 font-impact text-[28px] leading-none h-[64px]"
          >
            <span>{p[0]}</span>
            <span className="translate-y-[1px]">{p[1]}</span>
          </div>
        ))}
      </div>
      <div className="text-center font-mono text-[9px] mt-1 opacity-60">fig 1.</div>
    </div>
  )
}
