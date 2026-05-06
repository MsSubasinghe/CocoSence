import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'Home',      path: '/' },
  { name: 'Research',  path: '/research' },
  { name: 'Documents', path: '/documents' },
  { name: 'Team',      path: '/team' },
  { name: 'Contact',   path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isHero        = location.pathname === '/'
  const isTransparent = isHero && !scrolled

  const solidBg   = 'bg-white/95 dark:bg-[#0d1626]/95 backdrop-blur-md border-b border-gray-200 dark:border-white/8 shadow-sm'
  const linkBase  = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200'
  const linkActive = 'bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-400 font-semibold'
  const linkIdle  = isTransparent
    ? 'text-white/85 hover:text-white hover:bg-white/10'
    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? `${solidBg} py-2` : isHero ? 'bg-transparent py-4' : `${solidBg} py-2`
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="group">
          <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}>
            CocoSence
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className={`${linkBase} ${location.pathname === link.path ? linkActive : linkIdle}`}>
              {link.name}
            </Link>
          ))}

          {/* Dark mode toggle */}
          <button onClick={toggle} aria-label="Toggle theme"
            className={`ml-2 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isTransparent
                ? 'text-white hover:bg-white/15'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white'
            }`}>
            <span key={dark ? 'moon' : 'sun'} className="anim-spin-toggle">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </span>
          </button>

          <Link to="/documents"
            className="ml-2 px-5 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg text-sm transition-all hover:scale-105 shadow-sm hover:shadow-md">
            View Docs
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
              isTransparent ? 'text-white' : 'text-gray-500 dark:text-gray-400'
            }`}>
            <span key={dark ? 'moon' : 'sun'} className="anim-spin-toggle">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`transition-colors ${isTransparent ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0d1626] border-t border-gray-100 dark:border-white/8 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}>
                {link.name}
              </Link>
            ))}
            <Link to="/documents" onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg text-sm text-center">
              View Docs
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
