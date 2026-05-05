import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { ShieldCheck, BarChart2, Bug, Leaf, AlertCircle, Target, Cpu, Video, Brain, Smartphone, ScanEye } from 'lucide-react'
import { SiPython, SiTensorflow, SiKeras, SiOpencv, SiReact, SiNodedotjs, SiExpress, SiMongodb } from 'react-icons/si'
const droneVideo = '/videos/drone_video.mp4'

const objectives = [
  {
    id: 'SO1',
    icon: <ShieldCheck size={24} />,
    color: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-500/20',
    accent: 'border-l-green-500',
    title: 'Tree Health Classification',
    member: 'Subasinghe S M U',
    studentId: 'IT22186638',
    stat: '94%+',
    gap: 'No existing system uses drone-captured aerial imagery combined with AI to classify overall coconut tree health from the crown area.',
    objective: 'Classify trees as Healthy or Unhealthy using drone-captured leaf and branch images via a CNN deep learning model.',
    features: [
      'Drone captures crown area — no manual tree climbing',
      'Analyzes leaf color, shape, and texture patterns',
      'Binary classification: Healthy vs Unhealthy',
      'Early warning for nutrient deficiency & disease stress',
    ],
    tech: ['CNN', 'Deep Learning', 'RGB Images', 'Binary Classification'],
  },
  {
    id: 'SO2',
    icon: <BarChart2 size={24} />,
    color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
    accent: 'border-l-blue-500',
    title: 'Coconut Yield Prediction',
    member: 'Panditharathne R.L',
    studentId: 'IT22266200',
    stat: 'Dual',
    gap: 'Manual counting of coconuts across large plantations is time-consuming, inaccurate and impractical at scale.',
    objective: 'Dual-level YOLO detection of coconut bunches and individual nuts for reliable harvest yield forecasting.',
    features: [
      'Detects bunches (primary) and nuts (sub-units)',
      '640×640 high-resolution with custom augmentation',
      'Brightness/exposure preprocessing for canopy shadows',
      'Supports harvest planning and income estimation',
    ],
    tech: ['YOLO', 'Object Detection', 'Custom Augmentation', '640×640 Input'],
  },
  {
    id: 'SO3',
    icon: <Bug size={24} />,
    color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20',
    accent: 'border-l-orange-500',
    title: 'Pest Detection',
    member: 'Pasanjith W.A.R',
    studentId: 'IT22898920',
    stat: '96.08%',
    gap: 'Early-stage pest infections are invisible from ground level. No system uses real drone-captured aerial images for pest detection.',
    objective: 'Detect Coconut Mite, Caterpillar & White Fly from real drone images with multilingual AI treatment advice.',
    features: [
      'Trained on REAL drone-captured images',
      'Mite: EfficientNetB0 + Focal Loss → 91.44%',
      'Caterpillar & White Fly: MobileNetV2 → 96.08%',
      'AI chatbot in English · Sinhala · Tamil',
    ],
    tech: ['EfficientNetB0', 'MobileNetV2', 'Focal Loss', 'Trilingual AI'],
  },
  {
    id: 'SO4',
    icon: <Leaf size={24} />,
    color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    accent: 'border-l-emerald-500',
    title: 'Leaf Disease Detection',
    member: 'Karunarathne B G T N',
    studentId: 'IT22027788',
    stat: '98%',
    gap: 'No mobile-ready solution exists for classifying multiple coconut leaf diseases from drone imagery at scale.',
    objective: 'MobileNetV2 model detecting Leaf Rot, Leaf Spot & Leaf Dieback in under 1 second on mobile devices.',
    features: [
      'MobileNetV2 optimized for mobile deployment',
      '4 classes: 3 diseases + Not Coconut filter',
      'Focal Loss handles class imbalance in training',
      'Sub-second processing per image on mobile',
    ],
    tech: ['MobileNetV2', 'Focal Loss', '4-Class CNN', '<1s Mobile'],
  },
]

const techStack = [
  { name: 'Python',         icon: <SiPython />,      color: '#3776AB', bg: '#3776AB15' },
  { name: 'TensorFlow',     icon: <SiTensorflow />,  color: '#FF6F00', bg: '#FF6F0015' },
  { name: 'Keras',          icon: <SiKeras />,        color: '#D00000', bg: '#D0000015' },
  { name: 'EfficientNetB0', icon: <Brain size={16} />,color: '#8B5CF6', bg: '#8B5CF615' },
  { name: 'MobileNetV2',    icon: <Smartphone size={16} />, color: '#06B6D4', bg: '#06B6D415' },
  { name: 'YOLO',           icon: <ScanEye size={16} />,    color: '#F59E0B', bg: '#F59E0B15' },
  { name: 'OpenCV',         icon: <SiOpencv />,       color: '#5C3EE8', bg: '#5C3EE815' },
  { name: 'React Native',   icon: <SiReact />,        color: '#61DAFB', bg: '#61DAFB15' },
  { name: 'Node.js',        icon: <SiNodedotjs />,    color: '#339933', bg: '#33993315' },
  { name: 'Express.js',     icon: <SiExpress />,      color: '#888888', bg: '#88888815' },
  { name: 'MongoDB',        icon: <SiMongodb />,      color: '#47A248', bg: '#47A24815' },
]

function ObjectiveCard({ item, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref}
      className={`card rounded-2xl overflow-hidden border-l-4 ${item.accent} ${inView ? (index % 2 === 0 ? 'anim-slide-l' : 'anim-slide-r') : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-600 font-mono">{item.id}</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">{item.stat}</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.studentId} · {item.member}</p>
          </div>
        </div>

        {/* Research Gap */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2">
            <AlertCircle size={12} /> Research Gap
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.gap}</p>
        </div>

        {/* Objective */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">
            <Target size={12} /> Main Objective
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.objective}</p>
        </div>

        {/* Key features */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-2">
            <Cpu size={12} /> Key Features
          </div>
          <ul className="space-y-1.5">
            {item.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-green-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/8">
          {item.tech.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Research() {
  const [headRef, headInView] = useInView()
  const [droneRef, droneInView] = useInView()
  const [archRef, archInView] = useInView()
  const [techRef, techInView] = useInView()
  const videoRef = useRef(null)

  function handleTimeUpdate() {
    if (videoRef.current && videoRef.current.currentTime >= 20) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f4] dark:bg-[#080f1e] pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headRef} className={`mb-14 ${headInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">
            IT4010 · PP2 · Group 25-26J-384
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Research <span className="text-gradient">Modules</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Four independent deep learning components, unified into one drone-powered platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {objectives.map((o, i) => <ObjectiveCard key={i} item={o} index={i} />)}
        </div>

        {/* Drone Video Section */}
        <div ref={droneRef} className="card rounded-2xl overflow-hidden mb-6">
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
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                <Video size={12} className="text-green-400" />
                <span className="text-xs text-white font-medium">Drone Footage</span>
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

        {/* Architecture */}
        <div ref={archRef}
          className={`card rounded-2xl p-8 mb-6 ${archInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-5">System Architecture</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { e: '📱', t: 'Frontend',  d: 'React Native · Trilingual UI (EN/SI/TA)' },
              { e: '⚙️', t: 'Backend',   d: 'Node.js + Express.js · REST APIs'        },
              { e: '🗄️', t: 'Database',  d: 'MongoDB · Results & model metadata'      },
            ].map((a, i) => (
              <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{a.e}</div>
                <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">{a.t}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{a.d}</p>
              </div>
            ))}
          </div>
          <div className="bg-green-50 dark:bg-green-500/8 rounded-xl p-4 border border-green-100 dark:border-green-500/15">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              Drone → Mobile App → Express API → Python ML Server → MongoDB → Mobile UI
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div ref={techRef}
          className={`bg-white dark:bg-[#162035] rounded-2xl p-8 border border-gray-100 dark:border-white/8 shadow-sm ${techInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((t, i) => (
              <div key={t.name}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-default
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                  bg-gray-50 dark:bg-white/4 border-gray-200 dark:border-white/10
                  ${techInView ? 'anim-scale-in' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 50}ms`,
                  '--tw-shadow-color': t.color,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = t.color + '80'
                  e.currentTarget.style.backgroundColor = t.bg
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.backgroundColor = ''
                }}>
                <span className="text-lg leading-none transition-transform duration-300 group-hover:scale-110"
                  style={{ color: t.color }}>
                  {t.icon}
                </span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
