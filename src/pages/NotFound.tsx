import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="relative px-4 py-16">
      <div
        className="font-impact text-[140px] md:text-[220px] leading-none stroke-black text-yellow-300 select-none"
        style={{ transform: 'rotate(-3deg)' }}
      >
        404
      </div>
      <div className="font-comic text-pink-600 text-xl -mt-6">404 (FOUR HUNDRED AND FOUR)</div>
      <p className="typed text-[14px] mt-4 max-w-md">this page was compressed.</p>
      <Link to="/" className="inline-block mt-6 font-mono text-sm underline">
        return
      </Link>
    </div>
  )
}
