'use client'

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'

function LinkedinIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  const INFO_CARDS = [
    {
      icon: <Mail className="text-amber" size={20} />,
      label: t('contact.emailLabel'),
      value: 'josephelikana96@gmail.com',
      href: 'mailto:josephelikana96@gmail.com',
    },
    {
      icon: <LinkedinIcon className="text-amber" size={20} />,
      label: t('contact.linkedinLabel'),
      value: 'linkedin.com/in/josephelikana',
      href: 'https://www.linkedin.com/in/josephelikana/',
    },
    {
      icon: <GithubIcon className="text-amber" size={20} />,
      label: t('contact.githubLabel'),
      value: 'github.com/JosephElikana',
      href: 'https://github.com/JosephElikana',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('contact.heading')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {INFO_CARDS.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-cream rounded-card p-5 border border-border hover:border-amber hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: 'rgba(200, 135, 58, 0.10)' }}>{icon}</div>
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <p className="font-body text-sm text-bark group-hover:text-amber transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-cream rounded-card p-8 border border-border flex flex-col items-center justify-center h-full gap-4 text-center">
                <CheckCircle2 className="text-forest" size={48} />
                <p className="font-body text-bark text-lg">{t('contact.success')}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-amber font-body text-sm underline hover:text-amber-dark transition-colors duration-200"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-cream rounded-card p-8 border border-border space-y-5"
              >
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-1.5">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full font-body text-sm text-charcoal bg-sand border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-1.5">
                    {t('contact.emailFieldLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full font-body text-sm text-charcoal bg-sand border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-1.5">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full font-body text-sm text-charcoal bg-sand border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-muted resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber hover:bg-amber-dark text-white font-body font-semibold text-sm py-3.5 rounded-full transition-all duration-200 hover:shadow-md"
                >
                  {t('contact.send')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
