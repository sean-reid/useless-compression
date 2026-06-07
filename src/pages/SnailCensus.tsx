export default function SnailCensus() {
  const rows = [
    { name: 'snail #1', speed: 'medium', state: 'moving' },
    { name: 'snail #2', speed: 'slow', state: 'moving' },
    { name: 'snail #3', speed: 'fast', state: 'moving (wrong way)' },
    { name: 'snail #4', speed: '?', state: 'discovered yesterday' },
    { name: 'a worm', speed: 'unknown', state: 'top floor only' },
    { name: 'snail #5', speed: '—', state: 'not yet born' },
    { name: 'snail #6', speed: '—', state: 'not yet born' },
  ]
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="font-impact uppercase text-5xl">snail census</h1>
      <p className="font-comic text-pink-600 mt-1">conducted by no one</p>
      <table className="mt-6 w-full font-mono text-[12px]">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left">name</th>
            <th className="text-left">speed</th>
            <th className="text-left">status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-black/20">
              <td>{r.name}</td>
              <td>{r.speed}</td>
              <td>{r.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 font-mono text-[11px] opacity-70">
        official population: 4. unofficial: ??? (rising)
      </p>
    </div>
  )
}
