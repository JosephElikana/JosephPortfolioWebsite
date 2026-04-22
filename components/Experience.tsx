'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
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

export default function Experience() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('experience.heading')}
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 border-l-2 border-amber space-y-8">
            {ENTRIES.map((entry, index) => (
              <motion.div
                key={entry.roleKey}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-5 w-4 h-4 bg-amber rounded-full border-2 border-cream" />

                <div className="bg-sand rounded-card p-6 border border-border hover:border-amber transition-all duration-300 hover:shadow-md ml-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg mt-0.5" style={{ backgroundColor: 'rgba(200, 135, 58, 0.10)' }}>
                        <Briefcase className="text-amber" size={16} />
                      </div>
                      <div>
                        <h3 className="font-body font-semibold text-charcoal">
                          {t(entry.roleKey)}
                        </h3>
                        <p className="font-body text-sm text-bark mt-0.5">
                          {t(entry.orgKey)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-body text-xs font-medium px-3 py-1 rounded-full border`}
                      style={{
                        backgroundColor: entry.typeKey === 'experience.internship'
                          ? 'rgba(200, 135, 58, 0.10)'
                          : entry.typeKey === 'experience.volunteering'
                          ? 'rgba(74, 124, 89, 0.10)'
                          : 'rgba(44, 36, 22, 0.10)',
                        color: entry.typeKey === 'experience.internship'
                          ? 'rgb(200, 135, 58)'
                          : entry.typeKey === 'experience.volunteering'
                          ? 'rgb(74, 124, 89)'
                          : 'rgb(44, 36, 22)',
                        borderColor: entry.typeKey === 'experience.internship'
                          ? 'rgba(200, 135, 58, 0.20)'
                          : entry.typeKey === 'experience.volunteering'
                          ? 'rgba(74, 124, 89, 0.20)'
                          : 'rgba(44, 36, 22, 0.20)',
                      }}
                    >
                      {t(entry.typeKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-muted text-xs font-body mb-4 ml-9">
                    <Calendar size={12} />
                    <span>{t(entry.periodKey)}</span>
                  </div>

                  <ul className="ml-9 space-y-1.5">
                    {entry.detailKeys.map((dk) => (
                      <li key={dk} className="font-body text-sm text-bark flex gap-2">
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
