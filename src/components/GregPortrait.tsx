import type { ReactElement } from 'react'

// greg portraits. all of them are greg. some are not greg.
export type GregVariant = 'classic' | 'side' | 'back' | 'redacted' | 'cube' | 'thumbdrive' | 'mostly' | 'pixelated'

const skinTones = ['#f0c89a', '#e0b282', '#d4a374', '#c4956a']

function Classic({ tone = 0 }: { tone?: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#cfe0c5" />
      <ellipse cx="50" cy="55" rx="28" ry="34" fill={skinTones[tone % skinTones.length]} />
      <path d="M22 40 Q 50 14 78 40 L 78 30 Q 50 4 22 30 Z" fill="#3a2a1c" />
      <ellipse cx="42" cy="56" rx="2" ry="3" fill="#000" />
      <ellipse cx="58" cy="56" rx="2" ry="3" fill="#000" />
      <path d="M40 76 Q 50 80 60 76" stroke="#000" strokeWidth="1.5" fill="none" />
      <rect x="34" y="86" width="32" height="14" fill="#7a4d22" />
    </svg>
  )
}

function Side() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#c8d4dc" />
      <path d="M68 24 Q 84 50 70 76 L 30 76 Q 16 50 30 24 Z" fill="#e0b282" />
      <path d="M68 24 Q 84 18 70 14 L 30 14 Q 26 22 30 24 Z" fill="#3a2a1c" />
      <ellipse cx="58" cy="50" rx="2" ry="3" fill="#000" />
      <path d="M70 60 Q 78 60 76 66" stroke="#000" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function Back() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#d8c8e0" />
      <ellipse cx="50" cy="55" rx="30" ry="34" fill="#3a2a1c" />
    </svg>
  )
}

function Redacted() {
  return (
    <div className="w-full h-full bg-black grid place-items-center">
      <span className="font-impact text-white text-sm uppercase tracking-wider">[redacted by greg]</span>
    </div>
  )
}

function CubeView() {
  return (
    <div className="w-full h-full bg-[#1a1a3a] grid place-items-center">
      <span className="text-6xl">🧊</span>
    </div>
  )
}

function ThumbDrive() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#e8e0c0" />
      <rect x="14" y="40" width="64" height="22" fill="#444" />
      <rect x="78" y="44" width="10" height="14" fill="#888" />
      <text x="46" y="55" fill="#aaa" fontFamily="monospace" fontSize="8" textAnchor="middle">USB</text>
      <text x="50" y="80" fill="#000" fontFamily="serif" fontSize="9" textAnchor="middle">greg adjacent</text>
    </svg>
  )
}

function Mostly() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="#f0e6d2" />
      <ellipse cx="50" cy="55" rx="28" ry="34" fill="#e0b282" opacity="0.18" />
      <path d="M22 40 Q 50 14 78 40 L 78 30 Q 50 4 22 30 Z" fill="#3a2a1c" opacity="0.18" />
      <text x="50" y="56" fill="#000" fontFamily="serif" fontSize="9" textAnchor="middle" opacity="0.7">(blurry. it is greg.)</text>
    </svg>
  )
}

function Pixelated() {
  // an 8x8 greg in big pixels
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" shapeRendering="crispEdges">
      <rect width="80" height="80" fill="#e0d6c2" />
      {/* hair top */}
      <g fill="#3a2a1c">
        <rect x="20" y="12" width="40" height="10" />
        <rect x="14" y="22" width="52" height="6" />
      </g>
      {/* face */}
      <g fill="#e0b282">
        <rect x="20" y="22" width="40" height="40" />
      </g>
      {/* hair overlap */}
      <g fill="#3a2a1c">
        <rect x="14" y="22" width="6" height="14" />
        <rect x="60" y="22" width="6" height="14" />
      </g>
      {/* eyes */}
      <g fill="#000">
        <rect x="28" y="36" width="4" height="6" />
        <rect x="48" y="36" width="4" height="6" />
      </g>
      {/* mouth */}
      <rect x="32" y="50" width="16" height="3" fill="#000" />
      {/* shirt */}
      <rect x="14" y="62" width="52" height="18" fill="#a05a40" />
    </svg>
  )
}

const renderers: Record<GregVariant, () => ReactElement> = {
  classic: () => <Classic tone={0} />,
  side: () => <Side />,
  back: () => <Back />,
  redacted: () => <Redacted />,
  cube: () => <CubeView />,
  thumbdrive: () => <ThumbDrive />,
  mostly: () => <Mostly />,
  pixelated: () => <Pixelated />,
}

export default function GregPortrait({ variant }: { variant: GregVariant }) {
  return <div className="w-full h-full">{renderers[variant]()}</div>
}
