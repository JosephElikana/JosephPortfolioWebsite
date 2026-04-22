'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    key: 'skills.programmingLanguages',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    key: 'skills.frontend',
    skills: ['HTML5', 'CSS3', 'React.js', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    key: 'skills.backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'PHP'],
  },
  {
    key: 'skills.mobile',
    skills: ['React Native', 'Android (Java)'],
  },
  {
    key: 'skills.databases',
    skills: ['MySQL', 'PostgreSQL', 'Oracle DB', 'Firebase'],
  },
  {
    key: 'skills.csCore',
    skills: [
      'Data Structures & Algorithms',
      'Computer Networking',
      'Cybersecurity',
      'Operating Systems',
      'Software Engineering',
      'Machine Learning',
      'Artificial Intelligence',
      'Cloud Computing',
    ],
  },
  {
    key: 'skills.aiAutomation',
    skills: [
      'Make.com',
      'n8n',
      'Relevance AI',
      'Zapier',
      'Claude (Anthropic)',
      'Prompt Engineering',
      'AI Agent Development',
      'Vibe Coding',
    ],
  },
  {
    key: 'skills.devTools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Docker (basic)'],
  },
]

export default function Skills() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('skills.heading')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map(({ key, skills }, catIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: catIndex * 0.05 }}
              className="bg-sand rounded-card p-6 border border-border"
            >
              <h3 className="font-body font-semibold text-charcoal text-sm uppercase tracking-wider mb-4">
                {t(key)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-body text-sm text-bark bg-cream border border-border px-3 py-1 rounded-full hover:border-amber hover:text-amber transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
