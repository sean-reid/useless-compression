import { memo } from 'react'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { wrap: 'text-3xl md:text-4xl', use: 'text-2xl md:text-3xl -top-4 md:-top-5 -left-1' },
  md: { wrap: 'text-5xl md:text-7xl', use: 'text-4xl md:text-6xl -top-6 md:-top-10 -left-2' },
  lg: { wrap: 'text-6xl md:text-9xl', use: 'text-5xl md:text-7xl -top-8 md:-top-14 -left-2' },
}

function HeroTitle({ size = 'lg', className = '' }: Props) {
  const s = sizes[size]
  return (
    <h1
      aria-label="USELESS COMPRESSION"
      className={`relative inline-block font-impact uppercase leading-none tracking-tight ${s.wrap} ${className}`}
    >
      <span className="relative inline-block">
        <span aria-hidden className="relative">
          <span className="relative inline-block">
            LOSS
            {/* the scribble — three strokes, thick, covering all four letters */}
            <svg
              aria-hidden
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full pointer-events-none"
            >
              <path
                d="M2 38 C 40 14, 80 56, 120 22 S 180 52, 198 16"
                stroke="#ff2ea5"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M4 26 C 50 50, 100 12, 150 44 S 190 24, 196 36"
                stroke="#ff2ea5"
                strokeWidth="11"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M6 48 C 30 30, 70 22, 110 36 S 170 14, 198 30"
                stroke="#ff2ea5"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </span>
          LESS COMPRESSION
        </span>
        <span
          aria-hidden
          className={`absolute font-scrawl font-bold text-chaos-marker rotate-[-7deg] ${s.use}`}
          style={{ textShadow: '0 0 1px rgba(0,0,0,0.15)', WebkitTextStroke: '1px #ff2ea5' }}
        >
          USE
        </span>
      </span>
    </h1>
  )
}

export default memo(HeroTitle)
