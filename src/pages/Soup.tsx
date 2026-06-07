const WORDS = Array.from({ length: 220 }).map((_, i) => (i === 117 ? 'broth' : 'soup'))

export default function Soup() {
  return (
    <div className="px-3 py-8 leading-tight font-serif text-xl break-words" lang="en">
      {WORDS.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            margin: '2px 4px',
            transform: `rotate(${(i * 17) % 8 - 4}deg) scale(${0.7 + ((i * 13) % 7) / 10})`,
            color: w === 'broth' ? '#c20a0a' : i % 6 === 0 ? '#ff2ea5' : i % 5 === 0 ? '#00f0ff' : '#000',
          }}
        >
          {w}
        </span>
      ))}
    </div>
  )
}
