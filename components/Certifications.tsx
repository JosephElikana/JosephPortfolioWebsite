'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { Award } from 'lucide-react'

const CERTS = [
  { titleKey: 'certifications.cert1Title' },
  { titleKey: 'certifications.cert2Title' },
]

export default function Certifications() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('certifications.heading')}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
          {CERTS.map(({ titleKey }, index) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.95 }
              }
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-sand border border-border rounded-card p-8 flex flex-col items-center gap-4 hover:border-amber hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-64"
            >
              <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(200, 135, 58, 0.10)' }}>
                <Award className="text-amber" size={32} />
              </div>
              <div className="text-center">
                <h3 className="font-display font-semibold text-charcoal text-lg leading-snug mb-2">
                  {t(titleKey)}
                </h3>
                <p className="font-body text-sm text-amber font-medium">
                  {t('certifications.issuer')}
                </p>
                <p className="font-body text-xs text-muted mt-1">
                  {t('certifications.year')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
