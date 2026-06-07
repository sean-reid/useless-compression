import { Link } from 'react-router-dom'
import HeroTitle from '@/components/HeroTitle'
import BCompressor from '@/components/BCompressor'
import MemeMan from '@/components/MemeMan'
import Sticker from '@/components/Sticker'
import ActivityLog from '@/components/ActivityLog'
import LoadingBar from '@/components/LoadingBar'
import LossComic from '@/components/LossComic'
import POVBanner from '@/components/POVBanner'
import Hampter from '@/components/Hampter'
import LongBoi from '@/components/LongBoi'
import Classifieds from '@/components/Classifieds'
import Interstitial from '@/components/Interstitial'

const CARDS: Array<{ name: string; tag?: string; bg: string; color?: string; rot: number; font?: string }> = [
  { name: 'MonaLisa.png', tag: 'good', bg: '#a98a40', color: '#fff', rot: -3 },
  { name: 'YellAlgo', tag: 'QUIET ONES GO', bg: '#ff2ea5', color: '#000', rot: 2 },
  { name: 'Procrastinator', tag: '(later)', bg: '#00f0ff', color: '#000', rot: -2 },
  { name: 'JPEG²', tag: '🥵', bg: '#9aff00', color: '#000', rot: 4 },
  { name: 'Schrödinger.7z', tag: '50 / 50', bg: '#ffeb3b', color: '#000', rot: -4 },
  { name: 'VinylSim.flac', tag: 'for purists', bg: '#7e1bca', color: '#fff', rot: 1 },
  { name: 'CRYPTI-ZIP', tag: 'do not open in airport', bg: '#ff8c00', color: '#000', rot: -1 },
  { name: 'STL→Recipe', tag: 'preheat to 350', bg: '#fff', color: '#000', rot: 3 },
  { name: 'CSV→Novel', tag: 'they were a row', bg: '#e0e8ff', color: '#000', rot: -2 },
  { name: 'fmt#884', tag: 'do not feed', bg: '#000', color: '#0f0', rot: 5 },
]

export default function Home() {
  return (
    <div className="relative">

      {/* slow vertical marquee, far left, behind everything */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-7 overflow-hidden text-[10px] font-mono text-black/30 select-none pointer-events-none"
      >
        <div className="vert marquee-v-slow">
          {'1003 formats · zero tested · ratified by no body · property of nobody · the cube · '.repeat(6)}
        </div>
      </div>

      {/* TITLE BLOCK — pushed left, junk in the negative space */}
      <section className="relative pl-8 md:pl-16 pt-6 pr-3">
        <div className="inline-block text-left">
          <HeroTitle size="lg" />
        </div>

        <div
          className="absolute font-comic text-pink-600 text-base leading-tight pointer-events-none"
          style={{ top: '0.5rem', right: '8%', maxWidth: 200, transform: 'rotate(-6deg)' }}
        >
          i fixed it w marker
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Sticker rot={-5}>certified real</Sticker>
          <Sticker rot={3} className="!bg-pink-500 !text-white">do not eat</Sticker>
          <Sticker rot={-2} className="!bg-cyan-300">v0.0.0001a</Sticker>
          <span className="font-impact text-2xl text-orange-600 stroke-black">★★★★★ — me</span>
        </div>

        <nav aria-label="primary" className="mt-4 font-mono text-[13px] flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link to="/library" className="bg-yellow-300 px-1" style={{ transform: 'rotate(-1deg)' }}>/library</Link>
          <Link to="/about" className="px-1" style={{ transform: 'rotate(1deg)' }}>/about</Link>
          <span className="opacity-40 line-through">/forum</span>
          <span className="opacity-40 line-through">/downloads</span>
        </nav>

        <div className="absolute hidden md:block" style={{ top: '40%', right: '4%', transform: 'rotate(-8deg)' }}>
          <MemeMan size={140} />
          <div className="font-comic text-xs text-center mt-1">he watches</div>
        </div>
      </section>

      {/* TYPED NOTE — with a LOSS comic stuck to the side */}
      <section className="relative mt-16 px-8 md:px-32 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 max-w-xl">
            <p className="typed text-[15px] leading-snug">
              hi. theres a thousand and three compression formats on this site. i
              wrote them all. some are real. one of them runs. i wont say which.
              my brother says i should learn welding. ive made my peace.
            </p>
            <p className="typed text-[13px] leading-snug mt-3 opacity-80">
              if a format compresses your file to 0 bytes please understand. i did
              not mean for that. i also did. do you see.
            </p>
          </div>
          <div className="md:mt-2" style={{ transform: 'rotate(3deg)' }}>
            <LossComic />
          </div>
        </div>

        <div className="mt-6">
          <POVBanner />
        </div>
      </section>

      {/* DEEP FRIED BANNER */}
      <section className="relative mt-20 mb-10">
        <div
          className="ad py-5 px-4 md:px-8 mx-2 md:mx-[-1rem] text-center"
          style={{ transform: 'rotate(-1.2deg)' }}
        >
          <div className="font-impact uppercase text-3xl md:text-6xl leading-none text-black stroke-white">
            buy one (1) zip get one (1) rar
          </div>
          <div className="font-comic text-lg mt-1 text-black">OFFER VOID. BLAME GREG</div>
          <div className="mt-2 text-[11px] font-mono">
            🅱️🅱️🅱️🅱️🅱️ <span className="underline blink">CLICK HERE</span> 🅱️🅱️🅱️🅱️🅱️
          </div>
        </div>
      </section>

      {/* OVERLAPPING TEXT MESSAGE + RFC + FORUM + MP2 STICKER */}
      <section className="relative mt-10 min-h-[640px] md:min-h-[520px]">
        <article
          className="absolute font-serif text-[13px] leading-snug bg-[#fff8e0] border border-black p-3 max-w-[480px] z-10"
          style={{ top: 0, left: '4%', transform: 'rotate(-1.4deg)', boxShadow: '5px 5px 0 #000' }}
        >
          <pre className="font-mono text-[9px] opacity-60 mb-1 whitespace-pre-wrap m-0">
            {`Internet Engineering Task Farce         M. Meme
RFC 0009000
Category: Mostly Informational              april ?, ????`}
          </pre>
          <h3 className="font-impact uppercase text-base m-0">
            §1. averageColor.jpeg
          </h3>
          <p className="m-0 mt-1">
            the codec encodes any input image as a single 1×1 pixel of the
            mean RGB value. decoder MUST produce a rectangle. decoder SHOULD
            produce feelings. lossy. extremely. citation needed. citation
            still needed.
          </p>
          <Link to="/format/averagecolor-jpeg" className="block mt-1 text-[12px]">→ the rest of the rfc</Link>
        </article>

        <div className="absolute z-20" style={{ top: 80, right: '3%', transform: 'rotate(2deg)' }}>
          <div className="w-[260px] bg-white border-2 border-black p-2 font-sans text-[13px] shadow-[6px_6px_0_#000]">
            <div className="text-center text-[10px] uppercase tracking-wider opacity-50 mb-1 font-mono">
              wed 2:14 am · greg
            </div>
            <div className="bg-gray-200 rounded-2xl px-3 py-1 mb-1 inline-block max-w-[80%]">
              do u have the codec
            </div>
            <div className="block text-right">
              <span className="bg-blue-500 text-white rounded-2xl px-3 py-1 inline-block max-w-[80%]">which one</span>
            </div>
            <div className="bg-gray-200 rounded-2xl px-3 py-1 mt-1 inline-block max-w-[80%]">
              the one where the file gets bigger but it sounds like crying
            </div>
            <div className="bg-gray-200 rounded-2xl px-3 py-1 mt-1 inline-block max-w-[80%]">greg</div>
            <div className="bg-gray-200 rounded-2xl px-3 py-1 mt-1 inline-block max-w-[80%]">greg pls</div>
            <div className="text-right mt-1"><span className="text-[10px] opacity-50">delivered</span></div>
          </div>
        </div>

        <article
          className="absolute z-0 bg-[#e0e8ff] border border-black p-2 font-mono text-[12px] max-w-[360px]"
          style={{ top: 240, left: '20%', transform: 'rotate(-3deg)', boxShadow: '4px 4px 0 #ff2ea5' }}
        >
          <div className="flex gap-2 border-b border-black/30 pb-1 mb-1">
            <div className="w-9 h-9 bg-white border border-black grid place-items-center text-[8px] leading-none text-center">
              [no
              <br />
              avatar]
            </div>
            <div className="text-[10px] leading-tight">
              <div><b>greggorman84</b> — POWER USER (47 posts)</div>
              <div className="opacity-60">thurs 4:12am</div>
            </div>
          </div>
          <p>
            i had it on a thumb drive but the thumb drive got divorced. anyway
            if anyone has it. or knows. its for my daughter
          </p>
          <p className="opacity-60 mt-1">[ replies: 0 ]</p>
        </article>

        <div
          className="absolute z-30 bg-orange-500 text-white p-2 text-center deepfry-extra"
          style={{ top: 320, right: '10%', transform: 'rotate(-12deg)', width: 180, boxShadow: '0 0 0 4px #000' }}
        >
          <div className="font-impact text-4xl leading-none uppercase">
            MP<span className="text-yellow-300">2</span>
          </div>
          <div className="text-[10px] mt-2 font-mono">★★★★★ — i cant hear out of one eye</div>
        </div>

        {/* a sticky note that mostly covers the forum post */}
        <div
          className="absolute z-40 bg-yellow-300 p-2 font-comic text-[14px] text-black shadow-[3px_3px_0_#000]"
          style={{ top: 380, left: '32%', transform: 'rotate(-7deg)', width: 160 }}
        >
          ignore the bit below. its for greg
        </div>
      </section>

      {/* B-COMPRESS — broken out of grid */}
      <section className="relative mt-32 px-4 md:px-12">
        <h2
          className="font-impact text-4xl md:text-5xl uppercase inline-block fried-text"
          style={{ transform: 'rotate(-1deg)' }}
        >
          one (1) of these runs
        </h2>
        <div className="mt-2 typed text-[13px] opacity-80 max-w-md">
          B-Compress. real.
        </div>

        <div className="mt-6 relative">
          <div className="md:max-w-2xl">
            <BCompressor />
          </div>

          {/* sidebar items scattered around the textarea */}
          <div
            className="absolute font-mono text-[12px] border-l-4 border-pink-500 pl-3 max-w-[220px]"
            style={{ top: -8, right: '2%', transform: 'rotate(-1deg)' }}
          >
            <b>v0.0.0001a</b><br />
            i forgot how to push tags
          </div>
          <div
            className="absolute font-mono text-[12px] border-l-4 border-cyan-500 pl-3 max-w-[220px]"
            style={{ top: 120, right: '0%', transform: 'rotate(2deg)' }}
          >
            <b>roadmap.</b><br />
            B-Decompress. cannot.
          </div>
          <div
            className="absolute font-mono text-[12px] border-l-4 border-yellow-500 pl-3 max-w-[220px]"
            style={{ top: 240, right: '5%', transform: 'rotate(-0.5deg)' }}
          >
            <b>known issues.</b><br />
            the algorithm runs.
          </div>
        </div>
      </section>

      {/* PINK BANNER */}
      <section className="mt-24 relative">
        <div
          className="ad-yellow font-impact text-2xl md:text-4xl uppercase text-center py-3 px-4 mx-[-1rem]"
          style={{ transform: 'rotate(0.7deg)' }}
        >
          🅱️ FILES ARE THE WRONG SIZE 🅱️
        </div>
      </section>

      {/* INTERSTITIAL */}
      <section className="mt-12 mx-2 md:mx-[-1rem]">
        <Interstitial />
      </section>

      {/* HORIZONTAL SCROLL BAND, scattered */}
      <section className="mt-12 overflow-x-auto">
        <div className="flex gap-5 px-4 md:px-12 pb-4 pt-4 items-end" style={{ width: 'max-content' }}>
          {CARDS.map((c, i) => (
            <Link
              to={`/format/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              key={i}
              className="block flex-shrink-0 border-2 border-black p-3 no-underline"
              style={{
                background: c.bg,
                color: c.color ?? '#000',
                transform: `rotate(${c.rot}deg) translateY(${(i % 3) * -8}px)`,
                boxShadow: '5px 5px 0 #000',
                width: 200 + ((i * 37) % 80),
              }}
            >
              <div className="font-impact uppercase text-xl leading-none">{c.name}</div>
              {c.tag && <div className="font-comic text-[12px] mt-2">{c.tag}</div>}
            </Link>
          ))}
        </div>
        <p className="px-4 md:px-12 font-mono text-[11px] opacity-60 mt-1">
          ← scroll. theres more.
        </p>
      </section>

      {/* WEIRD FORMATTING SECTION: a news item with mixed type, broken columns */}
      <section className="mt-24 max-w-2xl mx-auto px-4">
        <div className="border-y-2 border-black py-3">
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            NEWS · ????? · BREAKING
          </div>
          <h3 className="font-serif text-2xl leading-tight">
            local man finishes 4th compression format, no one tells him others exist
          </h3>
          <div className="text-[13px] font-serif mt-2 columns-1 md:columns-2 gap-4">
            <p>
              in a quiet moment, area resident (28) double-clicked his own
              .exe and was changed forever. <span className="font-comic text-pink-600">authorities have not been contacted.</span>
            </p>
            <p className="mt-2 typed">
              when reached for comment <span className="font-impact uppercase tracking-wider">he said the following</span>:
              "yeah."
            </p>
            <p className="mt-2 vert h-32 inline-block opacity-80">that was the comment</p>
          </div>
          <Link to="/library" className="font-mono text-[11px] inline-block mt-2">→ 999 other formats</Link>
        </div>
      </section>

      {/* SIDE BY SIDE: live log + loading bar */}
      <section className="mt-20 px-4 md:px-12 grid md:grid-cols-2 gap-6 items-start">
        <ActivityLog />
        <div className="flex flex-col gap-6 items-start">
          <div style={{ transform: 'rotate(-1deg)' }}>
            <LoadingBar />
            <div className="mt-2 font-comic text-pink-600 text-sm">
              ↑ it gets close. it doesnt finish.
            </div>
          </div>
          <div className="flex items-end gap-6">
            <Hampter />
            <LongBoi />
            <Hampter label="not the same one" />
          </div>
        </div>
      </section>

      {/* MID-PAGE INTERRUPTING SURREAL ELEMENTS */}
      <section className="mt-20 px-4 md:px-12">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="font-impact text-2xl uppercase">also present:</div>
          <Link to="/soup" className="bg-red-200 px-2 border-2 border-black font-comic" style={{ transform: 'rotate(-2deg)' }}>soup</Link>
          <Link to="/greg" className="bg-yellow-300 px-2 border-2 border-black font-comic" style={{ transform: 'rotate(1deg)' }}>greg</Link>
          <Link to="/snail" className="bg-lime-300 px-2 border-2 border-black font-comic" style={{ transform: 'rotate(-1deg)' }}>snail census</Link>
          <Link to="/wat" className="bg-cyan-300 px-2 border-2 border-black font-comic" style={{ transform: 'rotate(2deg)' }}>wat</Link>
          <Link to="/vegetal" className="bg-purple-300 px-2 border-2 border-black font-comic" style={{ transform: 'rotate(-1.5deg)' }}>vegetal</Link>
          <Link to="/cube" className="bg-black text-white px-2 border-2 border-black font-comic" style={{ transform: 'rotate(0.8deg)' }}>cube</Link>
          <span className="font-mono text-[11px] opacity-50">(more exist but were not invited)</span>
        </div>
      </section>

      {/* CLASSIFIEDS */}
      <section className="mt-12 px-4 md:px-12">
        <Classifieds />
      </section>

      {/* you missed it */}
      <section className="mt-32 text-center pb-4">
        <div className="inline-block opacity-60" style={{ transform: 'rotate(-3deg)' }}>
          <HeroTitle size="sm" />
        </div>
        <p className="font-comic text-pink-600 text-sm mt-2">thanks</p>
      </section>
    </div>
  )
}
