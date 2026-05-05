import { ExternalLink, Link2, Mail } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import imgMinol     from '../assets/images/team_members/minol (2).png'
import imgRanugi    from '../assets/images/team_members/ranugi.jpg'
import imgPasanjith from '../assets/images/team_members/pasanjith.jpg'
import imgTharindu  from '../assets/images/team_members/tharindu.jpg'
import imgUthpala   from '../assets/images/team_members/uthpala_samarakoon_.jpg'

const supervisor = {
  name: 'Uthpala Samarakoon',
  role: 'Supervisor',
  dept: 'Faculty of Computing · SLIIT',
  image: imgUthpala,
}

const team = [
  {
    name: 'Subasinghe S M U',
    id: 'IT22186638',
    role: 'Group Leader · Tree Health Classification',
    initials: 'SU',
    gradient: 'from-green-400 to-emerald-500',
    module: 'SO1',
    image: imgMinol,
    isLeader: true,
    desc: 'Leads the project and develops the CNN-based drone image classification system for coconut tree health assessment.',
  },
  {
    name: 'Panditharathne R.L',
    id: 'IT22266200',
    role: 'Yield Prediction',
    initials: 'PA',
    gradient: 'from-blue-400 to-blue-600',
    module: 'SO2',
    image: imgRanugi,
    desc: 'Builds the dual-level YOLO object detection system to identify coconut bunches and individual nuts for harvest forecasting.',
  },
  {
    name: 'Pasanjith W.A.R',
    id: 'IT22898920',
    role: 'Pest Detection',
    initials: 'PW',
    gradient: 'from-orange-400 to-orange-500',
    module: 'SO3',
    image: imgPasanjith,
    desc: 'Develops EfficientNetB0 and MobileNetV2 models for pest detection with a trilingual AI chatbot for treatment advice.',
  },
  {
    name: 'Karunarathne B G T N',
    id: 'IT22027788',
    role: 'Leaf Disease Detection',
    initials: 'KA',
    gradient: 'from-emerald-400 to-teal-500',
    module: 'SO4',
    image: imgTharindu,
    desc: 'Creates a MobileNetV2-based leaf disease classifier detecting Leaf Rot, Leaf Spot, and Leaf Dieback with 98% accuracy.',
  },
]

const moduleColors = {
  SO1: 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
  SO2: 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400',
  SO3: 'bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400',
  SO4: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
}

function MemberCard({ member, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref}
      className={`card card-hover rounded-2xl overflow-hidden flex flex-col group ${inView ? 'anim-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 110}ms` }}>

      {/* Image section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* module badge — top right */}
        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${moduleColors[member.module]}`}>
          {member.module}
        </span>

        {/* Team leader badge — top left */}
        {member.isLeader && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-400/90 backdrop-blur-sm text-yellow-900 text-[10px] font-bold uppercase tracking-wide">
            ★ Leader
          </span>
        )}

        {/* Name overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-black text-base leading-tight drop-shadow">{member.name}</h3>
          <p className="text-white/60 text-[11px] font-mono mt-0.5">{member.id}</p>
        </div>
      </div>

      {/* Info section */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-green-600 dark:text-green-400 text-xs font-semibold mb-2">{member.role}</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed flex-1">{member.desc}</p>

        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-white/8">
          <a href="#" className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:scale-110 inline-block"><ExternalLink size={15} /></a>
          <a href="#" className="text-gray-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hover:scale-110 inline-block"><Link2 size={15} /></a>
          <a href="#" className="text-gray-300 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-110 inline-block"><Mail size={15} /></a>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const [headRef, headInView] = useInView()
  const [supRef,  supInView]  = useInView()

  return (
    <main className="min-h-screen bg-[#f4f7f4] dark:bg-[#080f1e] pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <div ref={headRef} className={`text-center mb-14 ${headInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Group 25-26J-384
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Our <span className="text-gradient">Team</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            A multidisciplinary team from SLIIT Faculty of Computing, each leading an independent AI research module.
          </p>
        </div>

        {/* Supervisor */}
        <div ref={supRef} className={`max-w-2xl mx-auto mb-14 ${supInView ? 'anim-fade-up delay-100' : 'opacity-0'}`}>
          <div className="card rounded-2xl overflow-hidden group">
            <div className="flex flex-col sm:flex-row">

              {/* Photo */}
              <div className="relative sm:w-56 shrink-0 h-64 sm:h-auto overflow-hidden">
                <img src={supervisor.image} alt={supervisor.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/10" />
              </div>

              {/* Details */}
              <div className="flex-1 p-7 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Research Supervisor
                </span>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{supervisor.name}</h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-5">{supervisor.dept}</p>

                <div className="flex flex-col gap-2">
                  {[
                    'Overseeing all four AI research modules',
                    'Guiding deep learning model development',
                    'Supporting drone data acquisition strategy',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-white/8">
                  <a href="#" className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:scale-110 inline-block"><ExternalLink size={16} /></a>
                  <a href="#" className="text-gray-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hover:scale-110 inline-block"><Link2 size={16} /></a>
                  <a href="#" className="text-gray-300 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-110 inline-block"><Mail size={16} /></a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => <MemberCard key={i} member={member} index={i} />)}
        </div>
      </div>
    </main>
  )
}
