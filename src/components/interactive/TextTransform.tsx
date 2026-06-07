import { useState, useMemo } from 'react'

type Props = {
  transform: (s: string) => string
  placeholder?: string
  ratioFn?: (input: string, output: string) => string
}

// generic text in → text out demo. shared by 20+ format pages.
export default function TextTransform({ transform, placeholder = 'type here', ratioFn }: Props) {
  const [input, setInput] = useState('')
  const output = useMemo(() => transform(input), [input, transform])

  const ratio = useMemo(() => {
    if (input.length === 0) return '—'
    if (ratioFn) return ratioFn(input, output)
    const r = output.length / input.length
    return `${r.toFixed(3)}×`
  }, [input, output, ratioFn])

  return (
    <div className="relative">
      <label htmlFor="ti" className="font-comic text-pink-600 text-lg block mb-1" style={{ transform: 'rotate(-1deg)' }}>
        input
      </label>
      <textarea
        id="ti"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full font-mono text-base p-2 border-4 border-black bg-white focus:outline-none focus:ring-4 focus:ring-pink-500"
        style={{ boxShadow: '6px 6px 0 #000' }}
      />
      <div className="mt-2 typed text-[14px] opacity-80">↓</div>
      <div
        className="min-h-[4em] mt-1 p-2 bg-[#fffb00] border-4 border-black font-mono text-base break-words whitespace-pre-wrap"
        style={{ boxShadow: '6px 6px 0 #ff2ea5' }}
      >
        {output || <span className="opacity-30">{'<nothing yet>'}</span>}
      </div>
      <p className="mt-1 font-mono text-[12px] opacity-70">ratio: {ratio}</p>
    </div>
  )
}
