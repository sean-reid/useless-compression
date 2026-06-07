import FriedPortrait from '@/components/FriedPortrait'
import {
  PinkScribble, CircleAround, CensorBar, RedactedStamp, LensFlare,
  EmojiSpray, CornerTag, HandwrittenArrow, NoiseOverlay, CornerCube, CrtCorners,
} from '@/components/PortraitOverlays'

// 12 panels. each is a high-fidelity surreal interpretation of greg.
// images sourced from picsum (random, public-domain feel), heavily deep-fried
// + composited with scribbles, stamps, lens flares, censor bars, emoji sprays.
// no two panels treat greg the same way.

export default function Greg() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-impact uppercase text-6xl md:text-7xl leading-none">greg</h1>
          <p className="font-comic text-pink-600 text-xl mt-1">a tribute (high resolution)</p>
        </div>
        <div className="font-mono text-[11px] opacity-70 text-right">
          curator: not me<br />
          archive integrity: <span className="text-red-600 font-bold">questionable</span><br />
          last verified: ?
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {/* 1. classic deep fry, B sticker */}
        <Panel rot={-1.4} caption="greg, 2003. before.">
          <FriedPortrait seed="greg-young-1" filter="fry" className="aspect-square">
            <CornerTag corner="tl">📸 2003</CornerTag>
            <span className="absolute -top-3 -right-3 text-5xl" style={{ filter: 'saturate(2) contrast(1.6)' }}>🅱️</span>
            <NoiseOverlay />
          </FriedPortrait>
        </Panel>

        {/* 2. classic again, but recompressed */}
        <Panel rot={1.4} caption="greg, 2003. after.">
          <FriedPortrait seed="greg-young-1" filter="extra" className="aspect-square">
            <CornerTag corner="tr">re-saved (43)</CornerTag>
            <NoiseOverlay />
          </FriedPortrait>
        </Panel>

        {/* 3. side profile, censor bar */}
        <Panel rot={-2} caption="greg from the side. nothing visible.">
          <FriedPortrait seed="greg-side-3" filter="archival" className="aspect-square">
            <CensorBar top={38} height={18} />
            <HandwrittenArrow x={42} y={66} label="him" />
          </FriedPortrait>
        </Panel>

        {/* 4. behind, mostly hair */}
        <Panel rot={1} caption="greg from behind.">
          <FriedPortrait seed="greg-back-4" filter="compressed" className="aspect-square">
            <CornerTag corner="bl">no face detected</CornerTag>
          </FriedPortrait>
        </Panel>

        {/* 5. lens flares */}
        <Panel rot={-1.2} caption="greg sees you.">
          <FriedPortrait seed="greg-flare-7" filter="extra" className="aspect-square">
            <LensFlare x={40} y={48} />
            <LensFlare x={62} y={48} />
            <CornerTag corner="tr" >POV</CornerTag>
          </FriedPortrait>
        </Panel>

        {/* 6. redacted */}
        <Panel rot={-1.8} caption="redacted by greg.">
          <FriedPortrait seed="greg-redact-9" filter="mono" className="aspect-square">
            <RedactedStamp />
          </FriedPortrait>
        </Panel>

        {/* 7. inverted, "compressed" */}
        <Panel rot={1.6} caption="greg has been compressed.">
          <FriedPortrait seed="greg-invert-11" filter="invert" className="aspect-square">
            <NoiseOverlay />
            <CornerTag corner="bl">ratio: 0.0003×</CornerTag>
          </FriedPortrait>
        </Panel>

        {/* 8. vhs vibes */}
        <Panel rot={-0.8} caption="found in a vhs binder.">
          <FriedPortrait seed="greg-vhs-13" filter="vhs" scanlines className="aspect-square">
            <div className="absolute top-1 left-1 font-mono text-[10px] bg-black text-yellow-300 px-1">▌REC ● 88:88</div>
            <CrtCorners />
          </FriedPortrait>
        </Panel>

        {/* 9. greg-adjacent thumb drive */}
        <Panel rot={2} caption="no greg in frame. the thumb drive is here.">
          <FriedPortrait seed="thumbdrive-greg-14" filter="archival" className="aspect-square">
            <CircleAround x={50} y={60} r={26} />
            <div className="absolute top-1 right-1 font-comic text-pink-500 text-sm" style={{ transform: 'rotate(8deg)' }}>(unverified)</div>
          </FriedPortrait>
        </Panel>

        {/* 10. emoji sprayed */}
        <Panel rot={-1.4} caption="greg with codec.">
          <FriedPortrait seed="greg-emoji-15" filter="extra" className="aspect-square">
            <EmojiSpray ch="🅱️" n={9} />
            <CornerTag corner="bl">codec.flac</CornerTag>
          </FriedPortrait>
        </Panel>

        {/* 11. cyanotype */}
        <Panel rot={1} caption="greg, archival print.">
          <FriedPortrait seed="greg-cyan-17" filter="cyanotype" className="aspect-square">
            <CornerTag corner="tr">est. 1894</CornerTag>
            <NoiseOverlay />
          </FriedPortrait>
        </Panel>

        {/* 12. cube intrusion */}
        <Panel rot={-2} caption="greg inside the cube. cannot see him.">
          <FriedPortrait seed="cube-greg-19" filter="jaundice" className="aspect-square">
            <CornerCube size={64} />
            <PinkScribble />
          </FriedPortrait>
        </Panel>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-impact uppercase text-3xl">timeline</h2>
          <ul className="mt-2 font-mono text-[13px] space-y-1">
            <li>1989 — greg is born</li>
            <li>1991 — greg makes a sound</li>
            <li>1996 — greg gets a thumb drive</li>
            <li>2003 — greg joins WinFormatForum</li>
            <li>2003 — greg posts</li>
            <li>2004 — greg posts again</li>
            <li>2011 — greg is briefly two people</li>
            <li>2024 — the thumb drive comes back</li>
            <li>2024 — it brought somebody</li>
            <li>present — greg pls</li>
          </ul>
        </div>
        <div>
          <h2 className="font-impact uppercase text-3xl">FAQ</h2>
          <dl className="mt-2 font-serif text-[14px] space-y-2">
            <div>
              <dt className="font-bold">is greg ok</dt>
              <dd className="opacity-80">no</dd>
            </div>
            <div>
              <dt className="font-bold">where is greg now</dt>
              <dd className="opacity-80">inside the cube. also possibly the thumb drive.</dd>
            </div>
            <div>
              <dt className="font-bold">can i be greg</dt>
              <dd className="opacity-80">you already are. statistically.</dd>
            </div>
            <div>
              <dt className="font-bold">why does greg keep emailing</dt>
              <dd className="opacity-80">unclear. it is keeping him going.</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-10 font-mono text-[11px] opacity-60 text-center">
        all photographs reproduced under fair use of a license that does not exist
      </p>
    </div>
  )
}

function Panel({ children, caption, rot }: { children: React.ReactNode; caption: string; rot: number }) {
  return (
    <figure
      className="border-2 border-black bg-white shadow-[5px_5px_0_#000]"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <div className="relative">{children}</div>
      <figcaption className="text-center font-mono text-[11px] py-1 px-2 bg-[#fffce0] border-t-2 border-black">
        {caption}
      </figcaption>
    </figure>
  )
}
