'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const devicon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}`

const simpleicon = (slug: string) => `https://cdn.simpleicons.org/${slug}`

interface Skill {
  name: string
  icon: string | null
  percent: number
}

const SKILL_CATEGORIES: { key: string; skills: Skill[] }[] = [
  {
    key: 'skills.programmingLanguages',
    skills: [
      { name: 'C', icon: devicon('c/c-original.svg'), percent: 60 },
      { name: 'C++', icon: devicon('cplusplus/cplusplus-original.svg'), percent: 55 },
      { name: 'Java', icon: devicon('java/java-original.svg'), percent: 70 },
      { name: 'Python', icon: devicon('python/python-original.svg'), percent: 75 },
      { name: 'JavaScript', icon: devicon('javascript/javascript-original.svg'), percent: 85 },
      { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg'), percent: 80 },
    ],
  },
  {
    key: 'skills.frontend',
    skills: [
      { name: 'HTML5', icon: devicon('html5/html5-original.svg'), percent: 90 },
      { name: 'CSS3', icon: devicon('css3/css3-original.svg'), percent: 85 },
      { name: 'React.js', icon: devicon('react/react-original.svg'), percent: 80 },
      { name: 'Next.js', icon: devicon('nextjs/nextjs-original.svg'), percent: 75 },
      { name: 'Tailwind CSS', icon: devicon('tailwindcss/tailwindcss-original.svg'), percent: 85 },
      { name: 'Responsive Design', icon: null, percent: 80 },
    ],
  },
  {
    key: 'skills.backend',
    skills: [
      { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg'), percent: 70 },
      { name: 'Express.js', icon: devicon('express/express-original.svg'), percent: 68 },
      { name: 'REST APIs', icon: null, percent: 75 },
      { name: 'PHP', icon: devicon('php/php-original.svg'), percent: 60 },
    ],
  },
  {
    key: 'skills.mobile',
    skills: [
      { name: 'React Native', icon: devicon('react/react-original.svg'), percent: 65 },
      { name: 'Android (Java)', icon: devicon('android/android-original.svg'), percent: 60 },
    ],
  },
  {
    key: 'skills.databases',
    skills: [
      { name: 'MySQL', icon: devicon('mysql/mysql-original.svg'), percent: 75 },
      { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original.svg'), percent: 70 },
      { name: 'Oracle DB', icon: simpleicon('oracle'), percent: 55 },
      { name: 'Firebase', icon: devicon('firebase/firebase-original.svg'), percent: 65 },
    ],
  },
  {
    key: 'skills.csCore',
    skills: [
      { name: 'Data Structures & Algorithms', icon: null, percent: 70 },
      { name: 'Computer Networking', icon: null, percent: 65 },
      { name: 'Cybersecurity', icon: null, percent: 60 },
      { name: 'Operating Systems', icon: null, percent: 65 },
      { name: 'Software Engineering', icon: null, percent: 75 },
      { name: 'Machine Learning', icon: null, percent: 60 },
      { name: 'Artificial Intelligence', icon: null, percent: 65 },
      { name: 'Cloud Computing', icon: null, percent: 55 },
    ],
  },
  {
    key: 'skills.aiAutomation',
    skills: [
      { name: 'Make.com', icon: simpleicon('make'), percent: 80 },
      { name: 'n8n', icon: simpleicon('n8n'), percent: 75 },
      { name: 'Relevance AI', icon: null, percent: 80 },
      { name: 'Zapier', icon: simpleicon('zapier'), percent: 70 },
      { name: 'Claude (Anthropic)', icon: simpleicon('anthropic'), percent: 85 },
      { name: 'Prompt Engineering', icon: null, percent: 85 },
      { name: 'AI Agent Development', icon: null, percent: 80 },
      { name: 'Vibe Coding', icon: null, percent: 85 },
    ],
  },
  {
    key: 'skills.devTools',
    skills: [
      { name: 'Git', icon: devicon('git/git-original.svg'), percent: 85 },
      { name: 'GitHub', icon: devicon('github/github-original.svg'), percent: 85 },
      { name: 'VS Code', icon: devicon('vscode/vscode-original.svg'), percent: 90 },
      { name: 'Postman', icon: devicon('postman/postman-original.svg'), percent: 80 },
      { name: 'Linux', icon: devicon('linux/linux-original.svg'), percent: 70 },
      { name: 'Docker (basic)', icon: devicon('docker/docker-original.svg'), percent: 45 },
    ],
  },
]

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay }}
      className="group flex flex-col items-center gap-2 cursor-default"
    >
      <div className="relative w-16 h-16 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden hover:border-amber/60 hover:shadow-[0_0_16px_rgba(200,135,58,0.35)] transition-all duration-300 hover:-translate-y-0.5">
        {skill.icon && !imgError ? (
          <img
            src={skill.icon}
            alt={skill.name}
            width={38}
            height={38}
            className="w-[38px] h-[38px] object-contain p-0.5"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-body font-bold text-amber-light text-lg leading-none">
            {skill.name[0].toUpperCase()}
          </span>
        )}
        <div className="absolute inset-0 rounded-full bg-amber/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white font-body font-bold text-sm leading-none">
            {skill.percent}%
          </span>
        </div>
      </div>
      <p className="font-body text-xs text-white/70 text-center leading-tight max-w-[72px]">
        {skill.name}
      </p>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-forest rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-amber-light rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-cream mb-16 text-center"
        >
          {t('skills.heading')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map(({ key, skills }, catIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: catIndex * 0.07 }}
              className="bg-white/[0.07] backdrop-blur-md border border-white/15 rounded-xl p-6 hover:border-amber/40 hover:bg-white/[0.12] transition-all duration-300"
            >
              <h3 className="font-body font-semibold text-amber-light text-sm uppercase tracking-wider mb-4">
                {t(key)}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={catIndex * 0.07 + skillIndex * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
