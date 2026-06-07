import { useState, useRef, useEffect } from 'react'

type Props = {
  /** mutate the canvas in place using the supplied source image */
  transform: (sourceImage: HTMLImageElement, canvas: HTMLCanvasElement) => void
  hint?: string
  /** if provided, label of the output file when downloaded */
  downloadName?: string
}

// generic image in → image out demo. file upload, draws into canvas, transforms.
export default function ImageTransform({ transform, hint = 'upload an image', downloadName = 'compressed.png' }: Props) {
  const [src, setSrc] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!src || !canvasRef.current) return
    setBusy(true)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      try {
        transform(img, canvas)
      } catch (e) {
        console.error('transform crashed', e)
      } finally {
        setBusy(false)
      }
    }
    img.onerror = () => setBusy(false)
    img.src = src
  }, [src, transform])

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = downloadName
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="relative">
      <label className="font-comic text-pink-600 text-lg block mb-1" style={{ transform: 'rotate(-1deg)' }}>
        {hint}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onPick}
        className="block font-mono text-sm border-2 border-black p-1 bg-white"
        style={{ boxShadow: '4px 4px 0 #000' }}
      />
      {!src && <p className="mt-3 typed text-[13px] opacity-70">a file will appear below. probably.</p>}
      {src && (
        <>
          <div className="mt-3 typed text-[14px]">↓ {busy ? 'compressing...' : 'compressed'}</div>
          <div
            className="mt-1 p-2 bg-[#fffb00] border-4 border-black inline-block"
            style={{ boxShadow: '6px 6px 0 #ff2ea5', maxWidth: '100%' }}
          >
            <canvas
              ref={canvasRef}
              className="block max-w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <div className="mt-2">
            <button
              type="button"
              onClick={download}
              className="bg-yellow-300 border-2 border-black px-3 py-1 font-mono text-sm"
              style={{ boxShadow: '3px 3px 0 #000' }}
            >
              ⬇ download (you regret it)
            </button>
          </div>
        </>
      )}
    </div>
  )
}
