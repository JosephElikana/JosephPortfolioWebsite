'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'

export default function Education() {
  const { t } = useTranslation()

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent">
      {/* Ambient blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-forest rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display font-bold text-4xl text-cream mb-16 text-center"
        >
          {t('education.heading')}
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8">
            {/* Animated timeline line drawing in top → bottom */}
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-amber"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            />

            {/* Timeline dot with spring pop */}
            <motion.div
              className="absolute -left-[9px] top-0 w-4 h-4 bg-amber rounded-full border-2 border-charcoal"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-xl p-7 hover:border-amber/40 hover:bg-white/10 transition-all duration-300 ml-4"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 rounded-lg bg-amber/20">
                  <GraduationCap className="text-amber" size={22} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-cream">
                    {t('education.degree')}
                  </h3>
                  <p className="font-body font-medium text-amber-light text-sm mt-0.5">
                    {t('education.institution')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm font-body text-white/50">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{t('education.period')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{t('education.location')}</span>
                </div>
              </div>

              <p className="font-body text-white/70 text-sm leading-relaxed">
                <span className="font-semibold text-cream">{t('education.highlightsLabel')} </span>
                {t('education.highlights')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
