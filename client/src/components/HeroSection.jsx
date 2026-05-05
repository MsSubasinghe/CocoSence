import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Smartphone } from 'lucide-react'
const heroVideo = '/videos/hero_video.mp4'

const stats = [
  { value: '98%',  label: 'Best Accuracy' },
  { value: '4',    label: 'AI Models'     },
  { value: '<3s',  label: 'Processing'    },
]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#09122b] dark:bg-[#060d1f] flex items-center justify-center">

      {/* ── Hero background video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0d1a0e]/30 dark:bg-[#0a130b]/40" />

      {/* ── Animated blob background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large slow blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 70%)', animation: 'blobDrift1 12s ease-in-out infinite' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)', animation: 'blobDrift2 15s ease-in-out infinite' }} />
        <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)', animation: 'blobDrift3 10s ease-in-out infinite' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }} />

        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[320, 520, 720, 920].map((size, i) => (
            <div key={i} className="absolute rounded-full border border-green-500/10"
              style={{
                width: size, height: size,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `ringPulse ${5 + i * 1.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }} />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-green-400"
            style={{
              width:  Math.random() * 3 + 1.5,
              height: Math.random() * 3 + 1.5,
              left:   `${10 + Math.random() * 80}%`,
              top:    `${10 + Math.random() * 80}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `particleFloat ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }} />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className={`${mounted ? 'anim-scale-in delay-0' : 'opacity-0'} inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/25 bg-green-500/8 text-green-400 text-xs font-semibold uppercase tracking-widest mb-8`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Active Research · SLIIT · 2024
        </div>

        {/* Heading */}
        <h1 className={`${mounted ? 'anim-fade-up delay-100' : 'opacity-0'} text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-5`}>
          AI Powered{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #34d399, #6ee7b7)' }}>
              Coconut Health
            </span>
          </span>
          <br />
          Monitoring &{' '}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #4ade80)' }}>
            Yield Prediction
          </span>
          {' '}System
        </h1>

        {/* Subtitle */}
        <p className={`${mounted ? 'anim-fade-up delay-200' : 'opacity-0'} text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-9 leading-relaxed`}>
          Deep learning-driven diagnostics that detect diseases and predict yield
          in real-time — putting precision agriculture in every farmer's hands.
        </p>

        {/* CTAs */}
        <div className={`${mounted ? 'anim-fade-up delay-300' : 'opacity-0'} flex flex-col sm:flex-row gap-3 justify-center mb-14`}>
          <Link to="/research"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30">
            Explore Research
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link to="/documents"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-white/6 hover:bg-white/10 border border-white/12 hover:border-white/25 text-white font-medium rounded-xl text-sm transition-all duration-300">
            View Documents
          </Link>
          <a href="https://drive.google.com/uc?export=download&id=1B07ynsHw-yYIK1rJFvEXzcL27MfzKVkW"
            target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/6 hover:bg-green-500/20 border border-white/12 hover:border-green-500/40 text-white font-medium rounded-xl text-sm transition-all duration-300">
            <Smartphone size={15} className="text-green-400" />
            Download App
          </a>
        </div>

        {/* Stats */}
        <div className={`${mounted ? 'anim-fade-up delay-400' : 'opacity-0'} flex justify-center gap-10`}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-white mb-0.5">{s.value}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10 dark:hidden"
        style={{ background: 'linear-gradient(to bottom, transparent, #f4f7f4)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10 hidden dark:block"
        style={{ background: 'linear-gradient(to bottom, transparent, #080f1e)' }} />
    </section>
  )
}
