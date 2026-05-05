import { Link } from 'react-router-dom'
import { Mail, Globe } from 'lucide-react'

const navLinks = [
  { name: 'Home',      path: '/' },
  { name: 'Research',  path: '/research' },
  { name: 'Documents', path: '/documents' },
  { name: 'Team',      path: '/team' },
]

const modules = [
  { label: 'Tree Health Classification', id: 'SO1' },
  { label: 'Coconut Yield Prediction',   id: 'SO2' },
  { label: 'Pest Detection',             id: 'SO3' },
  { label: 'Leaf Disease Detection',     id: 'SO4' },
]

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#080f1e] border-t border-gray-100 dark:border-white/8">

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Coco<span className="text-green-500">Sense</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-5 max-w-xs">
            AI-powered coconut health monitoring and yield prediction platform.
            Built on drone imagery and deep learning for Sri Lanka's farming community.
          </p>
          <div className="flex items-center gap-3">
            <a href="mailto:cocosense@sliit.lk"
              className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-500/40 transition-all duration-200">
              <Mail size={15} />
            </a>
            <a href="https://www.sliit.lk" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-500/40 transition-all duration-200">
              <Globe size={15} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
            Navigation
          </p>
          <ul className="space-y-2.5">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Research Modules */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
            Research Modules
          </p>
          <ul className="space-y-2.5">
            {modules.map(m => (
              <li key={m.id}>
                <Link to="/research"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 group">
                  <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 font-mono group-hover:text-green-400 transition-colors">
                    {m.id}
                  </span>
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2025 CocoSense · SLIIT Faculty of Computing
          </p>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[11px] font-semibold">
              Group 25-26J-384
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-600">IT4010 · PP2</span>
          </div>
        </div>
      </div>

    </footer>
  )
}
