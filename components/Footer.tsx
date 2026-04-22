'use client'

import { useTranslation } from 'react-i18next'
import { Mail, ArrowUp } from 'lucide-react'

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.certifications', href: '#certifications' },
  { key: 'nav.contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  {
    icon: <LinkedinIcon size={18} />,
    href: 'https://www.linkedin.com/in/josephelikana/',
    label: 'LinkedIn',
  },
  {
    icon: <GithubIcon size={18} />,
    href: 'https://github.com/JosephElikana',
    label: 'GitHub',
  },
  {
    icon: <Mail size={18} />,
    href: 'mailto:josephelikana96@gmail.com',
    label: 'Email',
  },
]

export default function Footer() {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10">
          {/* Left: copyright */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-bold text-xl text-amber">JE</span>
              <span className="font-display font-semibold text-cream text-sm">Joseph Elikana</span>
            </div>
            <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(250, 246, 240, 0.50)' }}>
              {t('footer.copyright')}
            </p>
          </div>

          {/* Center: nav links */}
          <div className="flex flex-wrap gap-3 md:justify-center">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-body text-sm hover:text-amber transition-colors duration-200"
                style={{ color: 'rgba(250, 246, 240, 0.60)' }}
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right: social icons + back to top */}
          <div className="flex items-center justify-start md:justify-end gap-4">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-amber transition-colors duration-200"
                style={{ color: 'rgba(250, 246, 240, 0.50)' }}
              >
                {icon}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label={t('footer.backToTop')}
              className="ml-2 p-2 rounded-full transition-all duration-200 hover:bg-amber hover:text-white"
              style={{ backgroundColor: 'rgba(200, 135, 58, 0.10)', color: '#C8873A' }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="pt-6 text-center" style={{ borderTop: '1px solid rgba(250, 246, 240, 0.10)' }}>
          <p className="font-body text-xs" style={{ color: 'rgba(250, 246, 240, 0.30)' }}>
            Built with Next.js, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
