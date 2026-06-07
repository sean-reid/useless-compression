import type { ReactNode, CSSProperties } from 'react'
import { pushEgg } from '@/lib/eggBus'

type Props = {
  children: ReactNode
  rot?: number
  className?: string
  style?: CSSProperties
  onPing?: string
}

export default function Sticker({ children, rot = -4, className = '', style, onPing }: Props) {
  const msg = onPing ?? `you peeled "${typeof children === 'string' ? children : 'a sticker'}"`
  return (
    <button
      type="button"
      onClick={() => pushEgg(msg, 'info')}
      className={`inline-block px-1.5 py-0.5 text-[11px] font-bold tracking-wider uppercase border-2 border-black bg-[#9aff00] text-black shadow-[3px_3px_0_#000] cursor-pointer ${className}`}
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      {children}
    </button>
  )
}
