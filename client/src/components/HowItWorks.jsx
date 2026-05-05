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

function StepCard({ s, index }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`card card-hover rounded-2xl overflow-hidden flex flex-row group cursor-default
        ${inView ? 'anim-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Left — full screenshot */}
      <div className="relative w-[42%] shrink-0 bg-gray-100 dark:bg-[#0d1a2e] overflow-hidden">
        <img
          src={s.img}
          alt={s.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Step badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-[11px] font-black shadow-lg">
            {s.step}
          </span>
        </div>
      </div>

      {/* Right — description */}
      <div className="flex-1 p-5 flex flex-col justify-center">
        <h3 className="text-sm font-black text-gray-900 dark:text-white mb-2 leading-snug">
          {s.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
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
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headRef} className={`text-center mb-12 ${headInView ? 'anim-fade-up' : 'opacity-0'}`}>
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

        {/* Cards — 2 columns, each card is image left + description right */}
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((s, i) => <StepCard key={i} s={s} index={i} />)}
        </div>

      </div>
    </section>
  )
}
