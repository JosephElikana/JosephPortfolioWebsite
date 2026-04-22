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
    <section id="certifications" className="py-24 relative overflow-hidden bg-charcoal">
      {/* Ambient blobs */}
      <div className="absolute -top-20 left-1/3 w-[480px] h-[480px] bg-amber rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[380px] h-[380px] bg-forest rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-cream mb-16 text-center"
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
              className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-xl p-8 flex flex-col items-center gap-4 hover:border-amber/40 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(200,135,58,0.15)] transition-all duration-300 hover:-translate-y-1 w-64"
            >
              <div className="p-4 rounded-full bg-amber/20">
                <Award className="text-amber" size={32} />
              </div>
              <div className="text-center">
                <h3 className="font-display font-semibold text-cream text-lg leading-snug mb-2">
                  {t(titleKey)}
                </h3>
                <p className="font-body text-sm text-amber-light font-medium">
                  {t('certifications.issuer')}
                </p>
                <p className="font-body text-xs text-white/50 mt-1">
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
