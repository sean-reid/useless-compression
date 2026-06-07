import { CLASSIFIEDS } from '@/data/ads'

export default function Classifieds() {
  return (
    <div className="font-mono text-[11px] leading-snug border-2 border-black bg-[#fffce0] p-3 columns-2 md:columns-4 gap-3">
      <div className="font-impact uppercase text-xl break-after-avoid">classifieds</div>
      <div className="opacity-60 break-after-avoid">posted by no one. responses go nowhere.</div>
      {CLASSIFIEDS.map((c, i) => (
        <div key={i} className="break-inside-avoid border-t border-black/20 py-1">
          <span className="font-bold">★</span> {c}
        </div>
      ))}
    </div>
  )
}
