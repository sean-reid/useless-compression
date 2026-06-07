// reusable overlay decorations for FriedPortrait. each absolute-positioned
// inside the portrait container. mix and match per panel.

export function PinkScribble({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    >
      <path d="M10 80 C 60 30, 140 180, 190 60 S 100 200, 30 130" stroke="#ff2ea5" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.95" />
      <path d="M20 40 C 80 150, 150 50, 180 170" stroke="#ff2ea5" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}

export function CircleAround({ x = 50, y = 50, r = 30 }: { x?: number; y?: number; r?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
      <circle cx={x} cy={y} r={r} stroke="#ff2ea5" strokeWidth="3" fill="none" strokeDasharray="6 4" />
      <circle cx={x} cy={y} r={r + 6} stroke="#ff2ea5" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  )
}

export function CensorBar({ top = 38, height = 16 }: { top?: number; height?: number }) {
  return (
    <div
      aria-hidden
      className="absolute left-0 right-0 bg-black pointer-events-none"
      style={{ top: `${top}%`, height: `${height}%` }}
    />
  )
}

export function RedactedStamp() {
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none">
      <span
        className="font-impact uppercase tracking-widest text-[32px] md:text-[44px]"
        style={{
          color: '#c20a0a',
          border: '4px solid #c20a0a',
          padding: '4px 14px',
          transform: 'rotate(-8deg)',
          background: 'transparent',
          mixBlendMode: 'multiply',
          opacity: 0.92,
          fontFamily: 'Anton, Impact, sans-serif',
        }}
      >
        REDACTED
      </span>
    </div>
  )
}

export function LensFlare({ x = 50, y = 50 }: { x?: number; y?: number }) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: 110,
        height: 110,
        marginLeft: -55,
        marginTop: -55,
        background: 'radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,.6) 28%, rgba(255,255,200,.2) 55%, transparent 70%)',
        mixBlendMode: 'screen',
        filter: 'blur(2px)',
      }}
    />
  )
}

export function EmojiSpray({ ch = '🅱️', n = 7 }: { ch?: string; n?: number }) {
  const placed: Array<{ x: number; y: number; s: number; r: number }> = []
  for (let i = 0; i < n; i++) {
    placed.push({
      x: 8 + ((i * 41) % 84),
      y: 12 + ((i * 67) % 78),
      s: 22 + ((i * 13) % 28),
      r: (i % 5) * 18 - 36,
    })
  }
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {placed.map((p, i) => (
        <span key={i} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.s, transform: `rotate(${p.r}deg)` }}>{ch}</span>
      ))}
    </div>
  )
}

export function CornerTag({ children, corner = 'tr' }: { children: React.ReactNode; corner?: 'tl' | 'tr' | 'bl' | 'br' }) {
  const pos: Record<string, string> = {
    tl: 'top-1 left-1',
    tr: 'top-1 right-1',
    bl: 'bottom-1 left-1',
    br: 'bottom-1 right-1',
  }
  return (
    <span className={`absolute ${pos[corner]} bg-yellow-300 text-black font-mono text-[10px] px-1 border border-black pointer-events-none`}>
      {children}
    </span>
  )
}

export function HandwrittenArrow({ x = 40, y = 50, label = 'him' }: { x?: number; y?: number; label?: string }) {
  return (
    <div
      className="absolute font-scrawl text-pink-500 text-[28px] leading-none pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, textShadow: '0 0 1px rgba(0,0,0,.35)', transform: 'rotate(-10deg)' }}
    >
      ↘ {label}
    </div>
  )
}

export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/></svg>\")",
      }}
    />
  )
}

export function CornerCube({ size = 48 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="absolute bottom-1 right-1 pointer-events-none"
      style={{ fontSize: size, filter: 'drop-shadow(2px 2px 0 #000)' }}
    >
      🧊
    </span>
  )
}

export function CrtCorners() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 60px 4px rgba(0,0,0,.6)' }}
    />
  )
}
