export default function Cube() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-[140px] md:text-[220px] leading-none select-none" style={{ transform: 'rotate(-3deg)' }}>
        🧊
      </div>
      <p className="font-comic text-pink-600 mt-2">you found the cube</p>
      <p className="font-mono text-[11px] opacity-60 mt-1">it is the cube</p>
    </div>
  )
}
