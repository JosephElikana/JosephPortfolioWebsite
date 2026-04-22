'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-24 bg-sand relative overflow-hidden">
      {/* Gradient transition into dark sections below */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-charcoal pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.h2
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('about.heading')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center shadow-lg border-4 border-amber" style={{ background: 'linear-gradient(135deg, #EDE6D8 0%, #FAF6F0 100%)' }}>
                <span className="font-display font-bold text-7xl text-amber">JE</span>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-amber/20" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="font-body text-bark leading-relaxed text-lg">
              {t('about.bio1')}
            </p>
            <p className="font-body text-bark leading-relaxed text-lg">
              {t('about.bio2')}
            </p>
            <p className="font-body text-bark leading-relaxed text-lg">
              {t('about.bio3')}
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block border-2 border-amber text-amber hover:bg-amber hover:text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                {t('about.letsConnect')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
