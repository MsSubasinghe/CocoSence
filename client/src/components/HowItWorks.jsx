import { useInView } from '../hooks/useInView'

import img1 from '../assets/images/app_screenShots/WhatsApp Image 2026-05-05 at 12.20.31.jpeg'
import img2 from '../assets/images/app_screenShots/WhatsApp Image 2026-05-05 at 12.20.31 (1).jpeg'
import img3 from '../assets/images/app_screenShots/WhatsApp Image 2026-05-05 at 12.20.31 (2).jpeg'
import img4 from '../assets/images/app_screenShots/WhatsApp Image 2026-05-05 at 12.20.30.jpeg'
import img5 from '../assets/images/app_screenShots/WhatsApp Image 2026-05-05 at 12.20.30 (1).jpeg'
import img6 from '../assets/images/app_screenShots/WhatsApp Image 2026-05-05 at 12.20.30 (2).jpeg'

const steps = [
  {
    step: '01',
    img: img1,
    title: 'Open the App',
    desc: 'Access all AI-powered features from one intuitive dashboard — pest detection, leaf health, tree analysis, and more.',
  },
  {
    step: '02',
    img: img2,
    title: 'Select a Module',
    desc: 'Choose your detection type — identify Coconut Mite, Caterpillar damage, or White Fly with dedicated AI models.',
  },
  {
    step: '03',
    img: img3,
    title: 'Capture or Upload',
    desc: 'Use your phone camera for close-up shots or connect a drone for aerial imagery — both sources are fully supported.',
  },
  {
    step: '04',
    img: img4,
    title: 'Analyse Tree Health',
    desc: 'The AI analyses the full tree image and instantly classifies it as healthy or unhealthy with 99.72% accuracy.',
  },
  {
    step: '05',
    img: img5,
    title: 'Detect Leaf Disease',
    desc: 'Select coconut type — baby or mature — and let MobileNetV2 identify Leaf Dieback and other diseases in under a second.',
  },
  {
    step: '06',
    img: img6,
    title: 'Count Bunches & Predict Yield',
    desc: 'Upload two photos from opposite sides of the tree for accurate bunch counting and harvest forecasting.',
  },
]

function StepRow({ s, index }) {
  const [ref, inView] = useInView()
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-14
        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
        ${inView ? (isEven ? 'anim-slide-l' : 'anim-slide-r') : 'opacity-0'}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Screenshot — phone frame */}
      <div className="w-full md:w-[280px] shrink-0 group">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-gray-200 dark:ring-white/10 bg-black mx-auto"
          style={{ maxWidth: '260px' }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-10" />
          <img
            src={s.img}
            alt={s.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ aspectRatio: '9/19' }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2.5 mb-4">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-500 text-white text-xs font-black shadow-md">
            {s.step}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
            Step {s.step}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight">
          {s.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
          {s.desc}
        </p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const [headRef, headInView] = useInView()

  return (
    <section className="py-20 px-6 bg-[#f4f7f4] dark:bg-[#080f1e]">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div ref={headRef} className={`text-center mb-16 ${headInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Mobile App
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            From opening the app to getting an AI diagnosis — six simple steps put precision agriculture in every farmer's pocket.
          </p>
        </div>

        {/* Zig-zag rows */}
        <div className="flex flex-col gap-16 md:gap-20">
          {steps.map((s, i) => <StepRow key={i} s={s} index={i} />)}
        </div>

      </div>
    </section>
  )
}
