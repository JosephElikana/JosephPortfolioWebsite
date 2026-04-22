'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Mail, Clock } from 'lucide-react'

type ProjectCard = {
  titleKey: string
  descKey: string
  tags: string[]
  ctaType: 'github' | 'demo' | 'coming-soon'
  ctaHref?: string
}

const WEB_PROJECTS: ProjectCard[] = [
  {
    titleKey: 'projects.church.title',
    descKey: 'projects.church.description',
    tags: ['React', 'Node.js', 'MySQL', 'QR Code API'],
    ctaType: 'github',
    ctaHref: 'https://github.com/JosephElikana',
  },
  {
    titleKey: 'projects.portfolio.title',
    descKey: 'projects.portfolio.description',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'i18next'],
    ctaType: 'github',
    ctaHref: 'https://github.com/JosephElikana',
  },
  {
    titleKey: 'projects.placeholder.title',
    descKey: 'projects.placeholder.description',
    tags: ['React', 'TypeScript'],
    ctaType: 'github',
    ctaHref: 'https://github.com/JosephElikana',
  },
]

const AI_PROJECTS: ProjectCard[] = [
  {
    titleKey: 'projects.leadQual.title',
    descKey: 'projects.leadQual.description',
    tags: ['Make.com', 'Automation', 'Lead Generation'],
    ctaType: 'demo',
    ctaHref: 'mailto:josephelikana96@gmail.com',
  },
  {
    titleKey: 'projects.companyAnalyzer.title',
    descKey: 'projects.companyAnalyzer.description',
    tags: ['Relevance AI', 'AI Agent', 'Data Analysis'],
    ctaType: 'demo',
    ctaHref: 'mailto:josephelikana96@gmail.com',
  },
  {
    titleKey: 'projects.prospectIntel.title',
    descKey: 'projects.prospectIntel.description',
    tags: ['Relevance AI', 'LinkedIn', 'AI Agent'],
    ctaType: 'demo',
    ctaHref: 'mailto:josephelikana96@gmail.com',
  },
  {
    titleKey: 'projects.customerSupport.title',
    descKey: 'projects.customerSupport.description',
    tags: ['Relevance AI', 'AI Agent', 'Customer Support'],
    ctaType: 'demo',
    ctaHref: 'mailto:josephelikana96@gmail.com',
  },
  {
    titleKey: 'projects.automation5.title',
    descKey: 'projects.automation5.description',
    tags: ['n8n', 'Automation'],
    ctaType: 'coming-soon',
  },
  {
    titleKey: 'projects.automation6.title',
    descKey: 'projects.automation6.description',
    tags: ['AI', 'Automation'],
    ctaType: 'coming-soon',
  },
]

function ProjectCard({ card }: { card: ProjectCard }) {
  const { t } = useTranslation()

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-xl p-6 hover:border-amber/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(200,135,58,0.15)] flex flex-col h-full">
      <h3 className="font-display font-semibold text-lg text-cream mb-3">
        {t(card.titleKey)}
      </h3>
      <p className="font-body text-sm text-white/70 leading-relaxed mb-4 flex-1">
        {t(card.descKey)}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs text-white/50 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {card.ctaType === 'github' && (
        <a
          href={card.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-cream font-body font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-200 self-start"
        >
          <ExternalLink size={14} />
          {t('projects.viewGitHub')}
        </a>
      )}

      {card.ctaType === 'demo' && (
        <a
          href={card.ctaHref}
          className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-body font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-200 self-start"
        >
          <Mail size={14} />
          {t('projects.requestDemo')}
        </a>
      )}

      {card.ctaType === 'coming-soon' && (
        <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 font-body font-medium text-sm px-5 py-2.5 rounded-full self-start cursor-not-allowed">
          <Clock size={14} />
          {t('projects.comingSoon')}
        </span>
      )}
    </div>
  )
}

function ProjectGroup({
  titleKey,
  projects,
  delay,
}: {
  titleKey: string
  projects: ProjectCard[]
  delay: number
}) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mb-16">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay }}
        className="font-display font-semibold text-2xl text-cream mb-8 flex items-center gap-3"
      >
        <span className="block w-8 h-0.5 bg-amber" />
        {t(titleKey)}
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((card, i) => (
          <motion.div
            key={card.titleKey}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: delay + i * 0.07 }}
            className="h-full"
          >
            <ProjectCard card={card} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      {/* Ambient blobs */}
      <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] bg-amber rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-forest rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-amber-light rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-cream mb-16 text-center"
        >
          {t('projects.heading')}
        </motion.h2>

        <ProjectGroup titleKey="projects.webGroup" projects={WEB_PROJECTS} delay={0.1} />
        <ProjectGroup titleKey="projects.aiGroup" projects={AI_PROJECTS} delay={0.1} />
      </div>
    </section>
  )
}
