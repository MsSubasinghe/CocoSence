import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn, Images } from 'lucide-react'

const imageModules = import.meta.glob('../assets/images/hero/*.{jpg,jpeg,png,webp}', { eager: true })
const IMAGES = Object.values(imageModules).map(m => m.default)

const FALLBACKS = [
  'linear-gradient(135deg, #bbf7d0, #34d399)',
  'linear-gradient(135deg, #a7f3d0, #6ee7b7)',
  'linear-gradient(135deg, #d1fae5, #a7f3d0)',
  'linear-gradient(135deg, #6ee7b7, #059669)',
]

const hasImages = IMAGES.length > 0
const ITEMS = hasImages ? IMAGES : FALLBACKS
const count = ITEMS.length

function getIndex(i) {
  return ((i % count) + count) % count
}

export default function ImageSlider() {
  const [current,   setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)
  const [lightbox,  setLightbox]  = useState(false)
  const [lbVisible, setLbVisible] = useState(false)
  const [progress,  setProgress]  = useState(0)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setProgress(0)
    setCurrent(getIndex(index))
    setTimeout(() => setAnimating(false), 600)
  }, [animating])

  const next  = useCallback(() => goTo(current + 1), [current, goTo])
  const prev_ = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-slide + progress bar
  useEffect(() => {
    if (count <= 1 || lightbox) return
    setProgress(0)
    const start = Date.now()
    const duration = 4500
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / duration) * 100, 100))
    }, 30)
    const slide = setTimeout(next, duration)
    return () => { clearInterval(tick); clearTimeout(slide) }
  }, [current, lightbox, next, count])

  const openLightbox = () => { setLightbox(true); setTimeout(() => setLbVisible(true), 10) }
  const closeLightbox = () => { setLbVisible(false); setTimeout(() => setLightbox(false), 350) }

  useEffect(() => {
    if (!lightbox) return
    const fn = (e) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev_()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox, next, prev_])

  if (count === 0) return null

  const positions = [
    { offset: -1, scale: 0.80, opacity: 0.50, z: 1, blur: true  },
    { offset:  0, scale: 1.00, opacity: 1.00, z: 3, blur: false },
    { offset:  1, scale: 0.80, opacity: 0.50, z: 1, blur: true  },
  ]

  return (
    <>
      {/* ── Gallery Section ── */}
      <div className="relative w-full py-20 overflow-hidden bg-[#f4f7f4] dark:bg-[#080f1e] transition-colors duration-300">

        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06] dark:opacity-[0.08]"
            style={{ background: 'radial-gradient(ellipse, #16a34a 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-widest">
                  <Images size={11} /> Field Research
                </span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Research Gallery</h2>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Drone-captured imagery from real plantation sites in Sri Lanka
              </p>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500 tabular-nums">
                {String(current + 1).padStart(2, '0')}
                <span className="text-gray-300 dark:text-gray-700 mx-1">/</span>
                {String(count).padStart(2, '0')}
              </span>
              <button onClick={prev_}
                className="w-11 h-11 rounded-full bg-white dark:bg-white/8 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/15 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-500/40 transition-all duration-300 hover:scale-110 shadow-sm">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next}
                className="w-11 h-11 rounded-full bg-white dark:bg-white/8 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/15 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-500/40 transition-all duration-300 hover:scale-110 shadow-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden">
            {positions.map(({ offset, scale, opacity, z, blur }) => {
              const idx      = getIndex(current + offset)
              const isCenter = offset === 0
              return (
                <div key={`${idx}-${offset}`}
                  onClick={() => isCenter ? openLightbox() : goTo(current + offset)}
                  className={`absolute rounded-3xl overflow-hidden transition-all duration-600 ease-in-out group ${isCenter ? 'cursor-zoom-in' : 'cursor-pointer'}`}
                  style={{
                    width:  '65%',
                    height: '100%',
                    transform: `translateX(${offset * 63}%) scale(${scale})`,
                    opacity,
                    zIndex: z,
                    filter: blur ? 'blur(2px)' : 'none',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease, filter 0.6s ease',
                    boxShadow: isCenter
                      ? '0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)'
                      : '0 8px 32px rgba(0,0,0,0.10)',
                  }}>

                  {hasImages
                    ? <img src={ITEMS[idx]} alt={`slide-${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    : <div className="w-full h-full" style={{ background: ITEMS[idx] }} />
                  }

                  {/* Center image overlays */}
                  {isCenter && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-400 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                          <ZoomIn size={22} className="text-gray-800" />
                        </div>
                      </div>
                      {/* Image number badge */}
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-bold">
                        {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress dots + bar */}
          <div className="flex flex-col items-center gap-3 mt-7">
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Image ${i + 1}`}
                  className="rounded-full transition-all duration-400 overflow-hidden relative"
                  style={{ width: i === current ? 32 : 8, height: 8, background: i === current ? 'transparent' : '#d1d5db' }}>
                  {i === current && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-green-200 dark:bg-green-900/60" />
                      <span className="absolute inset-0 rounded-full bg-green-500 origin-left"
                        style={{ transform: `scaleX(${progress / 100})`, transition: 'transform 0.03s linear' }} />
                    </>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">
              Click image to expand · Use arrow keys to navigate
            </p>
          </div>

        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          style={{
            background: `rgba(0,0,0,${lbVisible ? 0.88 : 0})`,
            backdropFilter: lbVisible ? 'blur(16px)' : 'blur(0px)',
            transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
          }}
          onClick={closeLightbox}>

          <div className="relative max-w-5xl w-full"
            style={{
              transform:  lbVisible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(28px)',
              opacity:    lbVisible ? 1 : 0,
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
            }}
            onClick={e => e.stopPropagation()}>

            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              {hasImages
                ? <img src={ITEMS[current]} alt="Expanded" className="w-full max-h-[80vh] object-contain bg-black" />
                : <div className="w-full h-[60vh]" style={{ background: ITEMS[current] }} />
              }
            </div>

            <button onClick={closeLightbox}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-xl hover:bg-gray-100 transition-all hover:scale-110 z-10">
              <X size={18} />
            </button>

            {count > 1 && (
              <>
                <button onClick={prev_}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
                  <ChevronLeft size={22} />
                </button>
                <button onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
              {Array.from({ length: count }).map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === current ? 22 : 7,
                    height: 7,
                    background: i === current ? '#86efac' : 'rgba(255,255,255,0.3)',
                  }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
