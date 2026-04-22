'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

type ExperienceEntry = {
  roleKey: string
  orgKey: string
  periodKey: string
  typeKey: string
  detailKeys: string[]
}

const ENTRIES: ExperienceEntry[] = [
  {
    roleKey: 'experience.intern2022Role',
    orgKey: 'experience.intern2022Org',
    periodKey: 'experience.intern2022Period',
    typeKey: 'experience.internship',
    detailKeys: ['experience.intern2022Detail'],
  },
  {
    roleKey: 'experience.intern2023Role',
    orgKey: 'experience.intern2023Org',
    periodKey: 'experience.intern2023Period',
    typeKey: 'experience.internship',
    detailKeys: ['experience.intern2023Detail'],
  },
  {
    roleKey: 'experience.volunteerRole',
    orgKey: 'experience.volunteerOrg',
    periodKey: 'experience.volunteerPeriod',
    typeKey: 'experience.volunteering',
    detailKeys: ['experience.volunteerDetail'],
  },
  {
    roleKey: 'experience.freelanceRole',
    orgKey: 'experience.freelanceOrg',
    periodKey: 'experience.freelancePeriod',
    typeKey: 'experience.freelance',
    detailKeys: [
      'experience.freelanceDetail1',
      'experience.freelanceDetail2',
      'experience.freelanceDetail3',
    ],
  },
]

function badgeClass(typeKey: string) {
  if (typeKey === 'experience.internship')
    return 'bg-amber/15 text-amber border-amber/25'
  if (typeKey === 'experience.volunteering')
    return 'bg-forest/15 text-forest border-forest/25'
  return 'bg-white/10 text-cream border-white/20'
}

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-transparent">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-amber rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-forest rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-amber-light rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display font-bold text-4xl text-cream mb-16 text-center"
        >
          {t('experience.heading')}
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 space-y-8">
            {/* Timeline line draws from top to bottom */}
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-amber"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
            />

            {ENTRIES.map((entry, index) => (
              <motion.div
                key={entry.roleKey}
                initial={{ opacity: 0, x: -30, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
                className="relative"
              >
                {/* Timeline dot pops in with spring */}
                <motion.div
                  className="absolute -left-[9px] top-5 w-4 h-4 bg-amber rounded-full border-2 border-charcoal"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.1 + 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                />

                <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-xl p-6 hover:border-amber/40 hover:bg-white/10 transition-all duration-300 ml-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg mt-0.5 bg-amber/20">
                        <Briefcase className="text-amber" size={16} />
                      </div>
                      <div>
                        <h3 className="font-body font-semibold text-cream">
                          {t(entry.roleKey)}
                        </h3>
                        <p className="font-body text-sm text-white/60 mt-0.5">
                          {t(entry.orgKey)}
                        </p>
                      </div>
                    </div>
                    <span className={`font-body text-xs font-medium px-3 py-1 rounded-full border ${badgeClass(entry.typeKey)}`}>
                      {t(entry.typeKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-body mb-4 ml-9">
                    <Calendar size={12} />
                    <span>{t(entry.periodKey)}</span>
                  </div>

                  <ul className="ml-9 space-y-1.5">
                    {entry.detailKeys.map((dk) => (
                      <li key={dk} className="font-body text-sm text-white/70 flex gap-2">
                        <span className="text-amber mt-1.5 shrink-0">•</span>
                        <span>{t(dk)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
