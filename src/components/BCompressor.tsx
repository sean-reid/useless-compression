import { useState, useMemo } from 'react'

export default function BCompressor() {
  const [input, setInput] = useState('')

  const output = useMemo(() => {
    let s = ''
    for (let i = 0; i < input.length; i++) {
      const ch = input[i]!
      const seed = (input.charCodeAt(i) * 31 + i * 7) % 100
      if (/[a-zA-Z]/.test(ch) && seed < 23) s += '🅱️'
      else s += ch
    }
    return s
  }, [input])

  const ratio = input.length === 0 ? '—' : `${(output.length / input.length).toFixed(3)}×`

  return (
    <div className="relative">
      <label
        htmlFor="bcomp-in"
        className="font-comic text-pink-600 text-lg block mb-1"
        style={{ transform: 'rotate(-1deg)' }}
      >
        say a thing
      </label>
      <textarea
        id="bcomp-in"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ive been having a normal one"
        className="w-full font-mono text-base p-2 border-4 border-black bg-white focus:outline-none focus:ring-4 focus:ring-pink-500"
        style={{ boxShadow: '6px 6px 0 #000' }}
      />
      <div className="mt-2 typed text-[14px] opacity-80">↓</div>
      <div
        className="min-h-[3em] mt-1 p-2 bg-[#fffb00] border-4 border-black font-mono text-base break-words whitespace-pre-wrap deepfry"
        style={{ boxShadow: '6px 6px 0 #ff2ea5' }}
      >
        {output || <span className="opacity-30">{'<nothing yet>'}</span>}
      </div>
      <p className="mt-1 font-mono text-[12px] opacity-70">ratio: {ratio}</p>
    </div>
  )
}
