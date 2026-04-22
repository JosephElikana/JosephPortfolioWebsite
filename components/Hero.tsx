'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-cream overflow-hidden"
    >
      {/* Warm amber radial gradient decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(232, 164, 90, 0.10)' }} />
        <div className="absolute right-40 top-1/4 w-[400px] h-[400px] rounded-full blur-2xl" style={{ backgroundColor: 'rgba(200, 135, 58, 0.06)' }} />
        <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] rounded-full blur-2xl" style={{ backgroundColor: 'rgba(237, 230, 216, 0.60)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-amber font-medium text-lg mb-3"
        >
          Hello, World 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight mb-5"
        >
          {t('hero.greeting')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-xl text-bark font-medium mb-5"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-muted text-lg leading-relaxed mb-10 max-w-2xl"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="bg-amber hover:bg-amber-dark text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t('hero.viewWork')}
          </a>
          <a
            href="/cv-placeholder.pdf"
            className="border-2 border-amber text-amber hover:bg-amber hover:text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
          >
            {t('hero.downloadCV')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-muted" size={28} />
        </motion.div>
      </motion.div>
    </section>
  )
}
