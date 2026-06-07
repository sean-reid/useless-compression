export default function Library() {
  return (
    <div className="px-4 md:px-12 py-8">
      <h1 className="font-impact uppercase text-5xl md:text-6xl leading-none">the library</h1>
      <p className="font-comic text-pink-600 mt-1">(under construction)</p>

      <div className="mt-6 max-w-md">
        <div className="font-mono text-[11px]">0 / 1003 catalogued (i lied earlier)</div>
        <div className="mt-1 h-3 border border-black bg-white">
          <div className="h-full bg-pink-500" style={{ width: '0.099%' }} />
        </div>
      </div>

      <div className="mt-8 construction-tape h-6" aria-hidden />
      <p className="mt-3 typed text-[13px] max-w-md">come back later. or dont.</p>
    </div>
  )
}
