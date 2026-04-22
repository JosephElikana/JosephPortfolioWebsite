'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_428swtk'
const TEMPLATE_ID = 'template_q1u0ikg'
const PUBLIC_KEY = 'EDYuDcZQn23UwLc31'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sendError, setSendError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(form.email)) {
      setEmailError(t('contact.invalidEmail'))
      return
    }
    setEmailError('')
    setSendError('')
    setLoading(true)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          title: 'Portfolio Contact Form',
          name: form.name,
          email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      )
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setSendError(t('contact.errorMessage'))
    } finally {
      setLoading(false)
    }
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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute -top-32 right-1/4 w-[480px] h-[480px] bg-amber rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-[420px] h-[420px] bg-forest rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-light rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display font-bold text-4xl text-cream mb-16 text-center"
        >
          {t('contact.heading')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info cards — staggered slide from left */}
          <div className="space-y-4">
            {INFO_CARDS.map(({ icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="flex items-center gap-4 bg-white/[0.07] backdrop-blur-xl rounded-card p-5 border border-white/15 hover:border-amber/50 hover:bg-white/[0.12] hover:shadow-[0_0_20px_rgba(200,135,58,0.15)] transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-amber/20 shrink-0">{icon}</div>
                <div>
                  <p className="font-body text-xs text-cream/50 uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <p className="font-body text-sm text-cream/80 group-hover:text-amber transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact form — slides from right */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {submitted ? (
              <div className="bg-white/[0.07] backdrop-blur-xl rounded-card p-8 border border-white/15 flex flex-col items-center justify-center h-full gap-4 text-center">
                <CheckCircle2 className="text-forest" size={48} />
                <p className="font-body text-cream/80 text-lg">{t('contact.success')}</p>
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
                className="bg-white/[0.07] backdrop-blur-xl rounded-card p-8 border border-white/15 space-y-5"
              >
                <div>
                  <label className="font-body text-sm font-medium text-cream block mb-1.5">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full font-body text-sm text-cream bg-white/[0.08] border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-cream/35"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-cream block mb-1.5">
                    {t('contact.emailFieldLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setEmailError('') }}
                    placeholder={t('contact.emailPlaceholder')}
                    className={`w-full font-body text-sm text-cream bg-white/[0.08] border rounded-lg px-4 py-3 focus:outline-none transition-colors duration-200 placeholder:text-cream/35 ${emailError ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-amber'}`}
                  />
                  {emailError && (
                    <p className="font-body text-xs text-red-400 mt-1">{emailError}</p>
                  )}
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-cream block mb-1.5">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full font-body text-sm text-cream bg-white/[0.08] border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-cream/35 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm py-3.5 rounded-full transition-all duration-200 hover:shadow-md"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? t('contact.sending') : t('contact.send')}
                </button>
                {sendError && (
                  <p className="font-body text-xs text-red-400 text-center">{sendError}</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
