import { useParams } from 'react-router-dom'

export default function FormatDetail() {
  const { id } = useParams()
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <p className="font-mono text-sm opacity-60">/format/{id}</p>
      <h1 className="font-impact text-4xl uppercase mt-2">not yet</h1>
      <p className="mt-3 typed">this format is real. its just not written down.</p>
    </div>
  )
}
