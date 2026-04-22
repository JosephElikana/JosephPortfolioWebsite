'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import i18n from 'i18next'

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.certifications', href: '#certifications' },
  { key: 'nav.contact', href: '#contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    const next = lang === 'en' ? 'sw' : 'en'
    setLang(next)
    i18n.changeLanguage(next)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal/88 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl text-amber group-hover:scale-105 transition-transform duration-200">
              JE
            </span>
            <span className="font-display font-semibold text-cream text-sm hidden sm:block">
              Joseph Elikana
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-body text-sm text-cream/70 hover:text-amber transition-colors duration-200"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="font-body text-sm text-cream/70 hover:text-amber transition-colors duration-200 font-medium"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'EN | SW' : 'SW | EN'}
            </button>
            <a
              href="#contact"
              className="bg-amber hover:bg-amber-dark text-white font-body font-medium text-sm px-5 py-2 rounded-full transition-all duration-200 hover:shadow-md"
            >
              {t('nav.hireMe')}
            </a>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="font-body text-xs text-cream/70 hover:text-amber transition-colors duration-200 font-medium"
            >
              {lang === 'en' ? 'EN' : 'SW'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1 shadow-lg">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block font-body text-cream/70 hover:text-amber hover:bg-white/5 transition-all duration-200 py-2 px-3 rounded-lg"
            >
              {t(key)}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block bg-amber hover:bg-amber-dark text-white font-body font-medium text-sm px-5 py-2.5 rounded-full text-center transition-colors duration-200"
            >
              {t('nav.hireMe')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
