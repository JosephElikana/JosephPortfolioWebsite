'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SplineScene } from '@/components/ui/SplineScene'
import { Spotlight } from '@/components/ui/Spotlight'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-hero-bg overflow-hidden"
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">

          {/* Left: text content */}
          <div className="flex-1 flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-5"
            >
              {t('hero.greeting')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-xl text-sand font-medium mb-5"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-muted text-lg leading-relaxed mb-10 max-w-xl"
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
                href="/cv.pdf"
                download="Joseph_Elikana_CV.pdf"
                className="border-2 border-amber text-amber hover:bg-amber hover:text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                {t('hero.downloadCV')}
              </a>
            </motion.div>
          </div>

          {/* Right: 3D robot */}
          <div className="flex-1 relative h-[350px] md:h-[500px] w-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

        </div>
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
          transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-muted" size={28} />
        </motion.div>
      </motion.div>

      {/* Gradient fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-hero-bg to-charcoal pointer-events-none" />
    </section>
  )
}
