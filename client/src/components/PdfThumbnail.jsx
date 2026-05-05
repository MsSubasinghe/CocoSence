import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { FileText } from 'lucide-react'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function PdfThumbnail({ url, alt }) {
  const canvasRef = useRef(null)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setError(false)
    setLoaded(false)

    pdfjsLib.getDocument(url).promise
      .then(pdf => pdf.getPage(1))
      .then(page => {
        if (cancelled || !canvasRef.current) return
        const viewport = page.getViewport({ scale: 1.2 })
        const canvas = canvasRef.current
        canvas.width = viewport.width
        canvas.height = viewport.height
        return page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
      })
      .then(() => { if (!cancelled) setLoaded(true) })
      .catch(() => { if (!cancelled) setError(true) })

    return () => { cancelled = true }
  }, [url])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-white/5">
        <FileText size={36} className="text-gray-300 dark:text-gray-600" />
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-white/5 animate-pulse">
          <FileText size={36} className="text-gray-300 dark:text-gray-600" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        alt={alt}
        className="w-full h-full object-cover object-top"
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  )
}
