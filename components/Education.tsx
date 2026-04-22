'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'

export default function Education() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('education.heading')}
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative pl-8 border-l-2 border-amber"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-amber rounded-full border-2 border-cream" />

            <div className="bg-cream rounded-card p-7 border border-border hover:border-amber/40 transition-all duration-300 hover:shadow-md ml-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(200, 135, 58, 0.10)' }}>
                  <GraduationCap className="text-amber" size={22} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-charcoal">
                    {t('education.degree')}
                  </h3>
                  <p className="font-body font-medium text-amber text-sm mt-0.5">
                    {t('education.institution')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm font-body text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{t('education.period')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{t('education.location')}</span>
                </div>
              </div>

              <p className="font-body text-bark text-sm leading-relaxed">
                <span className="font-semibold text-charcoal">Highlights: </span>
                {t('education.highlights')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
