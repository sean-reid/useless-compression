import { useState } from 'react'
import { pushEgg } from '@/lib/eggBus'

type Props = { size?: number; className?: string; rotate?: number; interactive?: boolean }

const REACTIONS = [
  'he blinked',
  'he saw you',
  'he is still watching',
  'he is closer',
  'he is greg',
  'never poke meme man',
]

export default function MemeMan({ size = 96, className = '', rotate = 0, interactive = true }: Props) {
  const [blink, setBlink] = useState(false)
  const [n, setN] = useState(0)

  function poke() {
    setBlink(true)
    setN((v) => v + 1)
    pushEgg(REACTIONS[n % REACTIONS.length]!, 'info')
    window.setTimeout(() => setBlink(false), 220)
  }

  const eyeRy = blink ? 0.4 : 5
  const Tag = interactive ? 'button' : 'div'

  return (
    <Tag
      type={interactive ? 'button' : undefined}
      aria-label={interactive ? 'poke meme man' : undefined}
      onClick={interactive ? poke : undefined}
      className={`inline-block bg-transparent border-0 cursor-${interactive ? 'pointer' : 'default'} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, padding: 0 }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
        <polygon points="50,8 78,22 88,52 80,78 50,92 22,82 14,52 28,20" fill="#e8c19a" />
        <polygon points="50,8 78,22 88,52 70,46 56,30 50,18" fill="#f4d3a8" />
        <polygon points="22,82 50,92 80,78 70,72 50,76 32,72" fill="#a48464" />
        <polygon points="14,52 28,20 50,18 50,42 38,52" fill="#d2a982" />
        <polygon points="50,42 70,46 80,78 50,76 38,52" fill="#b08864" />
        <ellipse cx="40" cy="48" rx="3" ry={eyeRy} fill="#000" />
        <ellipse cx="62" cy="48" rx="3" ry={eyeRy} fill="#000" />
        <path d="M 40 66 Q 50 70 60 66" stroke="#000" strokeWidth="1.5" fill="none" />
      </svg>
    </Tag>
  )
}
