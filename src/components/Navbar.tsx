import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PARTNERS } from '../lib/courseData'

const NAV = [
  { name: 'Home',       href: '#' },
  { name: 'Courses',    href: '#courses' },
  { name: 'Workshops',  href: '#workshops' },
  { name: 'HelpDesk',   href: '#helpdesk' },
  { name: 'PDK',        href: '#pdk' },
  { name: 'Community',  href: 'https://community.echiphub.in/', ext: true },
  { name: 'Alliances',  href: '#alliances' },
  { name: 'More',       href: '#more' },
]

interface NavbarProps {}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [activeHash, setActiveHash] = useState('#')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const secs = ['#alliances', '#virtual-lab', '#learning-paths', '#opensource', '#highlights', '#courses']
      let cur = '#'
      for (const s of secs) {
        const el = document.querySelector(s)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 220 && r.bottom >= 80) { cur = s; break }
        }
      }
      setActiveHash(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-[1000] w-full max-w-full"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #2254C4',
        boxShadow: scrolled ? '0 4px 24px rgba(16,32,64,0.09)' : 'none',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        className={`w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-6 transition-[padding] duration-300 ${
          scrolled ? 'py-2 sm:py-2.5' : 'py-2.5 sm:py-3.5'
        }`}
      >
        {/* ── Institutional partner logos ── */}
        <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-6 shrink min-w-0 overflow-hidden" role="list" aria-label="Partner logos">
          {PARTNERS.map(l => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.name}
              role="listitem"
              className="flex items-center shrink min-w-0 transition-transform duration-300 hover:scale-[1.05]"
            >
              <img
                src={l.src}
                alt={l.name}
                loading="eager"
                className={`w-auto max-w-[52px] min-[380px]:max-w-[70px] sm:max-w-[110px] md:max-w-none object-contain shrink transition-[height] duration-300 ${
                  scrolled ? 'h-6 min-[380px]:h-7 sm:h-8 md:h-9' : 'h-6 min-[380px]:h-8 sm:h-9 md:h-11'
                }`}
              />
            </a>
          ))}
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden xl:block shrink-0" aria-label="Main navigation">
          <ul className="flex items-center gap-6 lg:gap-7">
            {NAV.map(l => {
              const isActive = activeHash === l.href
              return (
                <li key={l.name}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    data-active={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link text-[14.5px] font-semibold transition-colors duration-200 ${
                      isActive ? 'text-[#2254C4]' : 'text-[#1c1d1f] hover:text-[#2254C4]'
                    }`}
                  >
                    {l.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── Auth buttons + hamburger ── */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* removed register button */}
          <a
            href="https://echiphub.in/wp-login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine hidden sm:inline-block px-5 py-2.5 rounded-full text-[13.5px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#0f172a', boxShadow: '0 6px 18px rgba(15,23,42,0.24)' }}
          >
            Login
          </a>
          {/* hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e6ecf5] flex items-center justify-center shrink-0"
          >
            <div className="w-[18px] space-y-[4.5px]">
              <span className={`block h-[2px] rounded bg-[#1c1d1f] transition-all duration-300 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[2px] rounded bg-[#1c1d1f] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[2px] rounded bg-[#1c1d1f] transition-all duration-300 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="xl:hidden bg-white border-t border-[#eef2f8] shadow-lg"
        >
          <ul className="px-5 py-4 space-y-1">
            {NAV.map(l => (
              <li key={l.name}>
                <a
                  href={l.href}
                  {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[15px] font-semibold text-[#1c1d1f] hover:text-[#2254C4] transition-colors rounded-lg px-2"
                >
                  {l.name}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-[#f1f5f9]">
              <a
                href="https://echiphub.in/wp-login.php"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-full text-[14px] font-bold text-white bg-[#0f172a] sm:hidden"
              >
                Login
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
