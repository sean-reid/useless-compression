import { useEffect, useState } from 'react'

const POVS = [
  'you are the cube',
  'you are greg',
  'you are the codec',
  'you have always been the cube',
  'you are the file. you are also opening yourself.',
  'you are inside greg',
  'you are the snail. you are the source.',
  'you are the empty subject line',
  'you are the bottom emoji',
  'you are the .zip',
  'you are the average color',
  'you are an MP2 of yourself',
  'you have been compressed once. it did not take.',
]

export default function POVBanner() {
  const [i, setI] = useState(() => Math.floor(Math.random() * POVS.length))
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % POVS.length), 5500)
    return () => window.clearInterval(t)
  }, [])
  return (
    <div
      aria-hidden
      className="inline-block px-2 py-1 bg-black text-white font-impact uppercase tracking-wider text-sm md:text-base"
      style={{ transform: 'rotate(-1deg)' }}
    >
      POV: <span className="text-yellow-300">{POVS[i]}</span>
    </div>
  )
}
