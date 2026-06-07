import type { ReactNode } from 'react'

type FilterKey = 'fry' | 'extra' | 'archival' | 'invert' | 'compressed' | 'cyanotype' | 'vhs' | 'mono' | 'jaundice'

const FILTERS: Record<FilterKey, string> = {
  fry:       'contrast(2) saturate(3) brightness(1.05)',
  extra:     'contrast(2.6) saturate(4) brightness(1.18) hue-rotate(14deg)',
  archival:  'grayscale(1) contrast(1.6) sepia(0.45) brightness(1.08)',
  invert:    'invert(0.88) hue-rotate(180deg) contrast(2.2) saturate(3.5)',
  compressed:'contrast(2.4) saturate(2.2) brightness(1.1) blur(0.6px)',
  cyanotype: 'grayscale(1) sepia(1) hue-rotate(180deg) saturate(5) contrast(1.4)',
  vhs:       'contrast(1.4) saturate(2) brightness(1.05) blur(0.8px)',
  mono:      'grayscale(1) contrast(2.4) brightness(1.05)',
  jaundice:  'contrast(2) saturate(4) brightness(1.2) hue-rotate(40deg) sepia(0.4)',
}

type Props = {
  seed: string
  filter?: FilterKey
  className?: string
  children?: ReactNode
  /** for the vhs filter: a horizontal scanline overlay */
  scanlines?: boolean
}

export default function FriedPortrait({ seed, filter = 'fry', className = '', children, scanlines }: Props) {
  const url = `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/400`
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={url}
        alt=""
        loading="lazy"
        className="block w-full h-full object-cover select-none"
        style={{ filter: FILTERS[filter], imageRendering: 'auto' }}
        draggable={false}
        referrerPolicy="no-referrer"
      />
      {scanlines && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px)' }}
        />
      )}
      {children}
    </div>
  )
}
