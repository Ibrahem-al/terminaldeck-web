import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DOWNLOADS } from '../../config/downloads'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="text-xl font-mono font-bold">
            <span className="text-cyan group-hover:text-glow transition-all">{'>'}</span>
            <span className="text-text">_</span>
          </span>
          <span className="hidden sm:block text-xs font-semibold tracking-[0.25em] uppercase text-text-mid">
            TerminalDeck
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {[
            { label: 'Demo', href: '#demo' },
            { label: 'Features', href: '#all-features' },
            { label: 'Showcase', href: '#showcase' },
          ].map(item => (
            <a key={item.label} href={item.href}
              className="text-[13px] text-text-mid hover:text-cyan transition-colors">
              {item.label}
            </a>
          ))}
          <a href="#download"
            className="px-4 py-1.5 rounded-md text-[13px] font-medium text-cyan border border-cyan/20 hover:bg-cyan/10 transition-all">
            Download
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
