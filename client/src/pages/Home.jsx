import { useRef } from 'react'
import ImageSlider from '../components/ImageSlider'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/HowItWorks'
import { ShieldCheck, BarChart2, Bug, Leaf, ChevronRight, ArrowRight, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
const droneVideo = '/videos/drone_video.mp4'

const modules = [
  { id: 'SO1', icon: <ShieldCheck size={20} />, title: 'Tree Health', sub: 'Classification', stat: '94%+', color: 'green',
    line: 'CNN classifies healthy vs unhealthy trees from drone-captured crown images.' },
  { id: 'SO2', icon: <BarChart2 size={20} />,   title: 'Yield',       sub: 'Prediction',     stat: 'Dual',  color: 'blue',
    line: 'Detects coconut bunches & individual nuts for harvest forecasting.' },
  { id: 'SO3', icon: <Bug size={20} />,          title: 'Pest',        sub: 'Detection',      stat: '96%',   color: 'orange',
    line: 'Identifies 3 major pests from real drone images with a trilingual chatbot.' },
  { id: 'SO4', icon: <Leaf size={20} />,         title: 'Leaf Disease',sub: 'Detection',      stat: '98%',   color: 'emerald',
    line: 'MobileNetV2 classifies 3 leaf diseases in under 1 second on mobile.' },
]

const palette = {
  green:   { card: 'hover:border-green-300   dark:hover:border-green-500/40',   icon: 'bg-green-50   dark:bg-green-500/10  text-green-600  dark:text-green-400  border-green-100  dark:border-green-500/20',  stat: 'text-green-600  dark:text-green-400',  badge: 'bg-green-100   dark:bg-green-500/15  text-green-700  dark:text-green-400'  },
  blue:    { card: 'hover:border-blue-300    dark:hover:border-blue-500/40',    icon: 'bg-blue-50    dark:bg-blue-500/10   text-blue-600   dark:text-blue-400   border-blue-100   dark:border-blue-500/20',   stat: 'text-blue-600   dark:text-blue-400',   badge: 'bg-blue-100    dark:bg-blue-500/15   text-blue-700   dark:text-blue-400'   },
  orange:  { card: 'hover:border-orange-300  dark:hover:border-orange-500/40',  icon: 'bg-orange-50  dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20', stat: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-100  dark:bg-orange-500/15 text-orange-700 dark:text-orange-400' },
  emerald: { card: 'hover:border-emerald-300 dark:hover:border-emerald-500/40', icon: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20', stat: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' },
}

function ModuleCard({ m, index }) {
  const [ref, inView] = useInView()
  const p = palette[m.color]
  return (
    <div ref={ref}
      className={`card card-hover rounded-2xl p-6 cursor-default group ${p.card} ${inView ? 'anim-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 90}ms` }}>
      <div className="flex items-start justify-between mb-5">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${p.icon}`}>
          {m.icon}
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${p.badge}`}>{m.id}</span>
      </div>
      <p className={`text-4xl font-black mb-1 ${p.stat}`}>{m.stat}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">accuracy</p>
      <p className="text-base font-black text-gray-900 dark:text-white leading-tight mb-1">{m.title}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{m.sub}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{m.line}</p>
    </div>
  )
}

function ImpactStat({ num, label, sub, index, last }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref}
      className={`relative flex-1 text-center px-6 py-2 ${inView ? 'anim-fade-up' : 'opacity-0'} ${!last ? 'border-r border-white/8' : ''}`}
      style={{ animationDelay: `${900 + index * 120}ms` }}>
      <p className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight"
        style={{ textShadow: '0 0 40px rgba(74,222,128,0.2)' }}>
        {num}
      </p>
      <p className="text-sm font-bold text-green-400 mb-1">{label}</p>
      <p className="text-xs text-white/35">{sub}</p>
    </div>
  )
}

export default function Home() {
  const [secRef,  secInView]  = useInView()
  const [modRef,  modInView]  = useInView()
  const [droneRef, droneInView] = useInView()
  const [ctaRef,  ctaInView]  = useInView()
  const videoRef = useRef(null)

  function handleTimeUpdate() {
    if (videoRef.current && videoRef.current.currentTime >= 20) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  return (
    <main>
      <HeroSection />

      {/* Key numbers */}
      <section className="py-16 px-6" style={{ background: '#0b1120' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 divide-white/8">
            <ImpactStat num="4"    label="AI Modules"    sub="Integrated platform"   index={0} />
            <ImpactStat num="98%"  label="Top Accuracy"  sub="Leaf disease detection" index={1} />
            <ImpactStat num="3"    label="Languages"     sub="EN · SI · TA"          index={2} />
            <ImpactStat num="<3s"  label="Processing"    sub="Per image on mobile"   index={3} last />
          </div>
        </div>
      </section>

      {/* Problem — minimal */}
      <section className="py-20 px-6 bg-[#f4f7f4] dark:bg-[#080f1e]">
        <div className="max-w-6xl mx-auto">
          <div ref={secRef} className={`grid md:grid-cols-2 gap-16 items-center ${secInView ? 'anim-fade-up' : 'opacity-0'}`}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-5">
                Manual inspection of{' '}
                <span className="text-gradient">20–30m</span>{' '}
                tall coconut trees is unsustainable.
              </h2>
              <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-6">
                Sri Lanka's coconut industry suffers from dangerous, costly ground-level inspections
                that miss early-stage diseases — causing preventable crop loss at scale.
              </p>
              <Link to="/research"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors">
                See our solution <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { num: '20–30m', label: 'Tree height', sub: 'Unsafe manual inspection' },
                { num: '4',      label: 'Pest types',  sub: 'Undetectable from ground' },
                { num: '3',      label: 'Diseases',    sub: 'Missed in early stages'   },
                { num: '↓',      label: 'Yield loss',  sub: 'Due to late detection'    },
              ].map((s, i) => (
                <div key={i} className="card rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{s.num}</p>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-0.5">{s.label}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-6 bg-white dark:bg-[#0d1626]">
        <div className="max-w-6xl mx-auto">
          <div ref={modRef} className={`text-center mb-12 ${modInView ? 'anim-fade-up' : 'opacity-0'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Four AI Modules
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
              One Drone. <span className="text-gradient">Four Models.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {modules.map((m, i) => <ModuleCard key={i} m={m} index={i} />)}
          </div>
          <div className="text-center">
            <Link to="/research"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-600 transition-colors">
              Full methodology <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Gallery */}
      <ImageSlider />

      {/* Drone Video */}
      <section className="py-16 px-6 bg-[#f4f7f4] dark:bg-[#080f1e]">
        <div className="max-w-5xl mx-auto">
          <div ref={droneRef} className="card rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">

              {/* Left — video */}
              <div className={`md:w-[52%] shrink-0 bg-black relative min-h-[360px] ${droneInView ? 'anim-slide-l' : 'opacity-0'}`}
                style={{ animationDelay: '500ms', animationDuration: '0.8s' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={droneVideo}
                  autoPlay
                  muted
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                  <Video size={11} className="text-green-400" />
                  <span className="text-[10px] text-white font-medium">Drone Footage</span>
                </div>
              </div>

              {/* Right — description */}
              <div className={`flex-1 p-8 flex flex-col justify-center ${droneInView ? 'anim-slide-r' : 'opacity-0'}`}
                style={{ animationDelay: '700ms', animationDuration: '0.8s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-wider">
                    Field Data Collection
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 leading-snug">
                  Drone-Captured Aerial Imagery
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  All four research modules are trained on real-world data captured using drone aerial surveys over coconut plantations in Sri Lanka.
                  High-resolution RGB footage provides crown-level visibility that is impossible to achieve from ground level.
                </p>
                <ul className="space-y-2">
                  {[
                    'Crown-area imaging — no manual tree climbing required',
                    'Consistent altitude & angle for model generalization',
                    'Covers large plantation areas in a single flight session',
                    'Raw footage processed into labeled training datasets',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-green-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white dark:bg-[#0d1626]">
        <div className="max-w-5xl mx-auto">
          <div ref={ctaRef}
            className={`relative rounded-3xl overflow-hidden p-12 text-center ${ctaInView ? 'anim-scale-in' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7,#d1fae5)', border: '1px solid #bbf7d0' }}>
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-green-200/30 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-emerald-200/25 pointer-events-none" />
            <p className="relative text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">Research Repository</p>
            <h2 className="relative text-3xl md:text-4xl font-black text-gray-800 mb-6">
              Read the Full Research
            </h2>
            <Link to="/documents"
              className="relative inline-flex items-center gap-2 px-7 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-md text-sm">
              Browse Documents <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
