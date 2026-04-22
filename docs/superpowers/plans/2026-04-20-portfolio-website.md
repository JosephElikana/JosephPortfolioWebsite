# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete bilingual (EN/SW) single-page portfolio website for Joseph Elikana using Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and i18next.

**Architecture:** All section components are client components (required for Framer Motion `useInView` and `useTranslation` hooks). i18next is initialized synchronously on the client via an `I18nProvider` wrapper component injected in the root layout. Each section component owns its own animation logic. Locale JSON files are imported directly (no file-system reads at runtime).

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, i18next + react-i18next, Lucide React

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Dependencies |
| `next.config.ts` | Next.js config (no image domains needed — local images only) |
| `tailwind.config.ts` | Custom color palette + font families |
| `tsconfig.json` | TypeScript config with `@/*` path alias |
| `app/globals.css` | Tailwind directives, smooth scroll, base body styles |
| `app/layout.tsx` | Root layout: Google Fonts (Playfair Display + DM Sans), I18nProvider |
| `app/page.tsx` | Imports all section components in order |
| `locales/en.json` | All English UI strings |
| `locales/sw.json` | All Kiswahili UI strings |
| `components/I18nProvider.tsx` | Client component that initializes i18next and wraps app |
| `components/Navbar.tsx` | Fixed navbar with logo, nav links, lang toggle, hamburger |
| `components/Hero.tsx` | Full-viewport hero with animated text reveal |
| `components/About.tsx` | Two-column about section with photo placeholder |
| `components/Skills.tsx` | Skill badge pills grouped by category |
| `components/Education.tsx` | Timeline card for MoCU |
| `components/Experience.tsx` | Vertical timeline of 4 experience entries |
| `components/Projects.tsx` | Two-group card grid (Web + AI/Automation) |
| `components/Certifications.tsx` | HP Foundation cert badge cards |
| `components/Contact.tsx` | Contact info cards + form with UI-only success state |
| `components/Footer.tsx` | Footer with links, socials, back-to-top |
| `public/images/placeholder-photo.jpg` | Created as a 1x1 transparent placeholder |

---

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css` (via create-next-app)

- [ ] **Step 1: Run create-next-app in the portfolio directory**

```bash
cd "C:/Users/J CODE/Desktop/JosephPortfolioWebsite"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Project scaffolded with `app/`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`, `package.json`.

- [ ] **Step 2: Verify the project runs**

```bash
npm run dev
```

Expected: Server starts at http://localhost:3000 with default Next.js page. Stop with Ctrl+C.

- [ ] **Step 3: Commit initial scaffold**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js project"
```

---

### Task 2: Install additional dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Framer Motion, i18next, react-i18next, Lucide React**

```bash
npm install framer-motion i18next react-i18next lucide-react
```

Expected: `node_modules/framer-motion`, `node_modules/i18next`, `node_modules/react-i18next`, `node_modules/lucide-react` appear. No errors.

- [ ] **Step 2: Verify TypeScript build passes**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion, i18next, react-i18next, lucide-react"
```

---

### Task 3: Configure Tailwind with custom design system

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace tailwind.config.ts with custom palette and font config**

Replace the entire contents of `tailwind.config.ts` with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F0',
        sand: '#EDE6D8',
        charcoal: '#2C2416',
        bark: '#5C4A2A',
        muted: '#8A7860',
        amber: '#C8873A',
        'amber-dark': '#9E6420',
        'amber-light': '#E8A45A',
        forest: '#4A7C59',
        border: '#D8CDB8',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '12px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure Tailwind with custom design system colors and fonts"
```

---

### Task 4: Create locale files

**Files:**
- Create: `locales/en.json`
- Create: `locales/sw.json`

- [ ] **Step 1: Create locales directory and en.json**

Create `locales/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "projects": "Projects",
    "certifications": "Certifications",
    "contact": "Contact",
    "hireMe": "Hire Me"
  },
  "hero": {
    "greeting": "Hi, I'm Joseph Elikana",
    "subtitle": "Software Developer · AI Automation Specialist · Freelancer",
    "tagline": "Designing impactful digital solutions since 2024. I specialize in creating high quality web apps, mobile apps, workflow automations, and revenue-generating digital products that blend creativity with strategy.",
    "viewWork": "View My Work",
    "downloadCV": "Download CV"
  },
  "about": {
    "heading": "About Me",
    "bio1": "I am a Computer Science graduate from Mwenge Catholic University (MWECAU), based in Tanzania. My journey in tech started with a strong academic foundation and grew into real-world experience through internships, volunteering, and freelance projects.",
    "bio2": "I am passionate about building digital solutions that solve real problems — from custom web systems and mobile apps to intelligent AI agents and workflow automations. I believe that great software is not just functional, it is purposeful.",
    "bio3": "Outside of coding, I enjoy exploring new technologies, especially in the AI and automation space, and finding ways to apply them to everyday business challenges.",
    "letsConnect": "Let's Connect"
  },
  "skills": {
    "heading": "Skills & Technologies",
    "programmingLanguages": "Programming Languages",
    "frontend": "Frontend Development",
    "backend": "Backend Development",
    "mobile": "Mobile Development",
    "databases": "Databases",
    "csCore": "Computer Science Core",
    "aiAutomation": "AI & Automation Tools",
    "devTools": "Developer Tools"
  },
  "education": {
    "heading": "Education",
    "degree": "Bachelor of Science in Computer Science",
    "institution": "Mwenge Catholic University",
    "location": "Moshi, Tanzania",
    "period": "2021 – 2024",
    "highlights": "Computer Science fundamentals, Software Engineering, Networking, AI & Machine Learning, Database Systems, Final Year Project"
  },
  "experience": {
    "heading": "Experience",
    "internship": "Internship",
    "volunteering": "Volunteering",
    "freelance": "Freelance",
    "intern2022Role": "Field Practical Training",
    "intern2022Org": "Moshi Co-operative University (MoCU) — ICT Department",
    "intern2022Period": "March 2022 – May 2022",
    "intern2022Detail": "Gained hands-on experience in ICT operations and support within the university environment.",
    "intern2023Role": "Field Practical Training",
    "intern2023Org": "Moshi Co-operative University (MoCU) — ICT Department",
    "intern2023Period": "March 2023 – May 2023",
    "intern2023Detail": "Deepened practical skills in IT systems, networking, and technical support.",
    "volunteerRole": "ICT Volunteer",
    "volunteerOrg": "Moshi Co-operative University (MoCU)",
    "volunteerPeriod": "June 2025 – December 2025",
    "volunteerDetail": "Supported ICT operations and contributed technical skills to university projects and systems.",
    "freelanceRole": "Freelance Software Developer",
    "freelanceOrg": "Self-employed / Various Clients",
    "freelancePeriod": "2025 – Present",
    "freelanceDetail1": "Built custom web applications for individuals and organizations",
    "freelanceDetail2": "Developed a Church Asset Management System integrated with QR codes, enabling real-time tracking and record-keeping of church assets and their status",
    "freelanceDetail3": "Delivered AI automation tools and workflow solutions for business clients"
  },
  "projects": {
    "heading": "Projects",
    "webGroup": "Web & Systems Projects",
    "aiGroup": "AI & Automation Projects",
    "viewGitHub": "View on GitHub",
    "requestDemo": "Request Demo",
    "comingSoon": "Coming Soon",
    "church": {
      "title": "Church Asset Management System",
      "description": "A web-based asset management system for a church organization, integrated with QR code scanning for real-time tracking and record-keeping of assets and their operational status."
    },
    "portfolio": {
      "title": "Portfolio Website",
      "description": "This personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Bilingual (English/Swahili) with smooth animations and warm professional design."
    },
    "placeholder": {
      "title": "Web App Project",
      "description": "Add your project description here."
    },
    "leadQual": {
      "title": "Lead Qualification Automation",
      "description": "An intelligent lead qualification workflow built on Make.com that automatically scores and routes incoming leads based on custom criteria, saving hours of manual sales work."
    },
    "companyAnalyzer": {
      "title": "Company Analyzer Tool",
      "description": "An AI-powered tool built on Relevance AI that analyzes a company's profile, industry, and key data points to generate structured intelligence reports for sales and research."
    },
    "prospectIntel": {
      "title": "Prospect Intelligence Tool",
      "description": "A Relevance AI tool that takes a prospect's LinkedIn URL and company name and returns a detailed profile — background, role context, and key talking points for outreach."
    },
    "customerSupport": {
      "title": "Customer Support Intelligence Agent",
      "description": "An AI agent built on Relevance AI that uses the Company Analyzer and Prospect Intelligence tools together to generate a full prospect report and interview preparation summary."
    },
    "automation5": {
      "title": "Automation Project 5",
      "description": "Coming soon. An advanced workflow automation built to solve a specific business problem."
    },
    "automation6": {
      "title": "Automation Project 6",
      "description": "Coming soon. An AI-powered tool designed to streamline business operations."
    }
  },
  "certifications": {
    "heading": "Certifications",
    "cert1Title": "AI for Beginners",
    "cert2Title": "AI for Business Professionals",
    "issuer": "HP Foundation",
    "year": "Year TBC"
  },
  "contact": {
    "heading": "Let's Work Together",
    "emailLabel": "Email",
    "linkedinLabel": "LinkedIn",
    "githubLabel": "GitHub",
    "namePlaceholder": "Your Name",
    "emailPlaceholder": "Your Email",
    "messagePlaceholder": "Tell me about your project...",
    "send": "Send Message",
    "success": "Thank you! Your message has been received. I'll get back to you soon.",
    "nameLabel": "Name",
    "emailFieldLabel": "Email",
    "messageLabel": "Message"
  },
  "footer": {
    "copyright": "© 2025 Joseph Elikana. All rights reserved.",
    "backToTop": "Back to top"
  }
}
```

- [ ] **Step 2: Create sw.json (Kiswahili translations)**

Create `locales/sw.json`:

```json
{
  "nav": {
    "home": "Nyumbani",
    "about": "Kuhusu",
    "skills": "Ujuzi",
    "experience": "Uzoefu",
    "projects": "Miradi",
    "certifications": "Vyeti",
    "contact": "Wasiliana",
    "hireMe": "Niajiri"
  },
  "hero": {
    "greeting": "Habari, Mimi ni Joseph Elikana",
    "subtitle": "Mtengenezaji wa Programu · Mtaalamu wa AI · Mfanyakazi Huru",
    "tagline": "Kutengeneza suluhisho za kidijitali zenye athari tangu 2024. Ninabobea katika kuunda programu za wavuti, programu za simu, mifumo ya otomatiki, na bidhaa za kidijitali zinazozalisha mapato zinazochanganya ubunifu na mkakati.",
    "viewWork": "Angalia Kazi Zangu",
    "downloadCV": "Pakua CV"
  },
  "about": {
    "heading": "Kuhusu Mimi",
    "bio1": "Mimi ni mhitimu wa Sayansi ya Kompyuta kutoka Chuo Kikuu Katoliki cha Mwenge (MoCU), nikiishi Tanzania. Safari yangu katika teknolojia ilianza na msingi imara wa kielimu na kukua kupitia uzoefu wa vitendo wa mafunzo, kujitolea, na miradi ya kujitegemea.",
    "bio2": "Nina shauku ya kujenga suluhisho za kidijitali ambazo zinatatua matatizo ya kweli — kuanzia mifumo ya wavuti na programu za simu hadi mawakala wa AI na mifumo ya otomatiki. Ninaamini kwamba programu nzuri si tu ya kufanya kazi, bali ina kusudi.",
    "bio3": "Nje ya kuandika msimbo, ninafurahia kuchunguza teknolojia mpya, hasa katika nafasi ya AI na otomatiki, na kutafuta njia za kuzitumia katika changamoto za biashara za kila siku.",
    "letsConnect": "Tuungane"
  },
  "skills": {
    "heading": "Ujuzi na Teknolojia",
    "programmingLanguages": "Lugha za Programu",
    "frontend": "Maendeleo ya Frontend",
    "backend": "Maendeleo ya Backend",
    "mobile": "Maendeleo ya Simu",
    "databases": "Hifadhidata",
    "csCore": "Misingi ya Sayansi ya Kompyuta",
    "aiAutomation": "Zana za AI na Otomatiki",
    "devTools": "Zana za Msanidi"
  },
  "education": {
    "heading": "Elimu",
    "degree": "Shahada ya Kwanza ya Sayansi ya Kompyuta",
    "institution": "Chuo Kikuu Katoliki cha Mwenge (MoCU)",
    "location": "Moshi, Tanzania",
    "period": "20XX – 20XX",
    "highlights": "Misingi ya Sayansi ya Kompyuta, Uhandisi wa Programu, Mitandao, AI na Ujifunzaji wa Mashine, Mifumo ya Hifadhidata, Mradi wa Mwaka wa Mwisho"
  },
  "experience": {
    "heading": "Uzoefu",
    "internship": "Mafunzo",
    "volunteering": "Kujitolea",
    "freelance": "Kazi Huru",
    "intern2022Role": "Mafunzo ya Vitendo Shambani",
    "intern2022Org": "Chuo Kikuu Katoliki cha Mwenge (MoCU) — Idara ya TEHAMA",
    "intern2022Period": "Machi 2022 – Mei 2022",
    "intern2022Detail": "Alipata uzoefu wa vitendo katika uendeshaji na usaidizi wa TEHAMA ndani ya mazingira ya chuo kikuu.",
    "intern2023Role": "Mafunzo ya Vitendo Shambani",
    "intern2023Org": "Chuo Kikuu Katoliki cha Mwenge (MoCU) — Idara ya TEHAMA",
    "intern2023Period": "Machi 2023 – Mei 2023",
    "intern2023Detail": "Aliongeza ujuzi wa vitendo katika mifumo ya IT, mitandao, na usaidizi wa kiufundi.",
    "volunteerRole": "Mjitolea wa TEHAMA",
    "volunteerOrg": "Chuo Kikuu Katoliki cha Mwenge (MoCU)",
    "volunteerPeriod": "Juni 2025 – Desemba 2025",
    "volunteerDetail": "Alisaidia uendeshaji wa TEHAMA na kuchangia ujuzi wa kiufundi kwa miradi na mifumo ya chuo kikuu.",
    "freelanceRole": "Mtengenezaji wa Programu Huru",
    "freelanceOrg": "Kujitegemea / Wateja Mbalimbali",
    "freelancePeriod": "2025 – Sasa",
    "freelanceDetail1": "Alijenga programu za wavuti maalum kwa watu binafsi na mashirika",
    "freelanceDetail2": "Alitengeneza Mfumo wa Usimamizi wa Mali za Kanisa ulioingizwa na nambari za QR, kuruhusu ufuatiliaji wa wakati halisi na kuhifadhi kumbukumbu za mali za kanisa",
    "freelanceDetail3": "Alitoa zana za otomatiki za AI na suluhisho za mtiririko wa kazi kwa wateja wa biashara"
  },
  "projects": {
    "heading": "Miradi",
    "webGroup": "Miradi ya Wavuti na Mifumo",
    "aiGroup": "Miradi ya AI na Otomatiki",
    "viewGitHub": "Angalia kwenye GitHub",
    "requestDemo": "Omba Onyesho",
    "comingSoon": "Inakuja Hivi Karibuni",
    "church": {
      "title": "Church Asset Management System",
      "description": "Mfumo wa usimamizi wa mali wa wavuti kwa shirika la kanisa, uliounganishwa na uchanganuzi wa nambari za QR kwa ufuatiliaji wa wakati halisi na kuhifadhi kumbukumbu za mali."
    },
    "portfolio": {
      "title": "Portfolio Website",
      "description": "Tovuti hii ya kibinafsi ya portfolio iliyojengwa kwa Next.js, Tailwind CSS, na Framer Motion. Ina lugha mbili (Kiingereza/Kiswahili) na michoro laini na muundo wa kitaalamu wenye joto."
    },
    "placeholder": {
      "title": "Mradi wa Programu ya Wavuti",
      "description": "Ongeza maelezo ya mradi wako hapa."
    },
    "leadQual": {
      "title": "Lead Qualification Automation",
      "description": "Mtiririko wa kazi wa kuhitimu viongozi uliojengwa kwenye Make.com ambao hupanga na kuelekeza viongozi vinavyoingia kiotomatiki kulingana na vigezo maalum."
    },
    "companyAnalyzer": {
      "title": "Company Analyzer Tool",
      "description": "Zana inayotumia AI iliyojengwa kwenye Relevance AI inayochanganua wasifu wa kampuni, sekta, na data muhimu kutengeneza ripoti za akili kwa mauzo na utafiti."
    },
    "prospectIntel": {
      "title": "Prospect Intelligence Tool",
      "description": "Zana ya Relevance AI inayochukua URL ya LinkedIn ya mtarajiwa na jina la kampuni na kurudisha wasifu wa kina — muktadha wa historia, jukumu, na pointi muhimu za mawasiliano."
    },
    "customerSupport": {
      "title": "Customer Support Intelligence Agent",
      "description": "Wakala wa AI uliojengwa kwenye Relevance AI ambao hutumia zana za Company Analyzer na Prospect Intelligence pamoja kutengeneza ripoti kamili ya mtarajiwa."
    },
    "automation5": {
      "title": "Automation Project 5",
      "description": "Inakuja hivi karibuni. Otomatiki ya hali ya juu ya mtiririko wa kazi iliyoundwa kutatua tatizo maalum la biashara."
    },
    "automation6": {
      "title": "Automation Project 6",
      "description": "Inakuja hivi karibuni. Zana inayotumia AI iliyoundwa kurahisisha shughuli za biashara."
    }
  },
  "certifications": {
    "heading": "Vyeti",
    "cert1Title": "AI kwa Wanaoanza",
    "cert2Title": "AI kwa Wataalamu wa Biashara",
    "issuer": "HP Foundation",
    "year": "Mwaka TBC"
  },
  "contact": {
    "heading": "Tufanye Kazi Pamoja",
    "emailLabel": "Barua Pepe",
    "linkedinLabel": "LinkedIn",
    "githubLabel": "GitHub",
    "namePlaceholder": "Jina Lako",
    "emailPlaceholder": "Barua Pepe Yako",
    "messagePlaceholder": "Niambie kuhusu mradi wako...",
    "send": "Tuma Ujumbe",
    "success": "Asante! Ujumbe wako umepokelewa. Nitawasiliana nawe hivi karibuni.",
    "nameLabel": "Jina",
    "emailFieldLabel": "Barua Pepe",
    "messageLabel": "Ujumbe"
  },
  "footer": {
    "copyright": "© 2025 Joseph Elikana. Haki zote zimehifadhiwa.",
    "backToTop": "Rudi juu"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add locales/
git commit -m "feat: add EN and SW locale files"
```

---

### Task 5: Set up i18n provider

**Files:**
- Create: `components/I18nProvider.tsx`

- [ ] **Step 1: Create the I18nProvider client component**

Create `components/I18nProvider.tsx`:

```typescript
'use client'

import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import en from '@/locales/en.json'
import sw from '@/locales/sw.json'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      sw: { translation: sw },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/I18nProvider.tsx
git commit -m "feat: add i18next provider with EN/SW resources"
```

---

### Task 6: Set up globals.css and app layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css**

Replace the entire contents of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-cream text-charcoal;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #EDE6D8;
}

::-webkit-scrollbar-thumb {
  background: #C8873A;
  border-radius: 3px;
}
```

- [ ] **Step 2: Replace app/layout.tsx**

Replace the entire contents of `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import I18nProvider from '@/components/I18nProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Joseph Elikana — Software Developer & AI Automation Specialist',
  description:
    'Portfolio of Joseph Elikana, Software Developer and AI Automation Specialist based in Tanzania. Designing impactful digital solutions since 2024.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: configure layout with Google Fonts and i18n provider"
```

---

### Task 7: Build Navbar component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

Create `components/Navbar.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import i18n from 'i18next'

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.certifications', href: '#certifications' },
  { key: 'nav.contact', href: '#contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    const next = lang === 'en' ? 'sw' : 'en'
    setLang(next)
    i18n.changeLanguage(next)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl text-amber group-hover:scale-105 transition-transform duration-200">
              JE
            </span>
            <span className="font-display font-semibold text-charcoal text-sm hidden sm:block">
              Joseph Elikana
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-body text-sm text-bark hover:text-amber transition-colors duration-200"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="font-body text-sm text-bark hover:text-amber transition-colors duration-200 font-medium"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'EN | SW' : 'SW | EN'}
            </button>
            <a
              href="#contact"
              className="bg-amber hover:bg-amber-dark text-white font-body font-medium text-sm px-5 py-2 rounded-full transition-all duration-200 hover:shadow-md"
            >
              {t('nav.hireMe')}
            </a>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="font-body text-xs text-bark hover:text-amber transition-colors duration-200 font-medium"
            >
              {lang === 'en' ? 'EN' : 'SW'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-cream border-t border-border px-4 py-4 space-y-1 shadow-md">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block font-body text-bark hover:text-amber hover:bg-sand transition-all duration-200 py-2 px-3 rounded-lg"
            >
              {t(key)}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block bg-amber hover:bg-amber-dark text-white font-body font-medium text-sm px-5 py-2.5 rounded-full text-center transition-colors duration-200"
            >
              {t('nav.hireMe')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar with language toggle, mobile hamburger, scroll blur"
```

---

### Task 8: Build Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

Create `components/Hero.tsx`:

```typescript
'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-cream overflow-hidden"
    >
      {/* Warm amber radial gradient decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-light/10 rounded-full blur-3xl" />
        <div className="absolute right-40 top-1/4 w-[400px] h-[400px] bg-amber/8 rounded-full blur-2xl" />
        <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] bg-sand/60 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-amber font-medium text-lg mb-3"
        >
          Hello, World 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight mb-5"
        >
          {t('hero.greeting')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-xl text-bark font-medium mb-5"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-muted text-lg leading-relaxed mb-10 max-w-2xl"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="bg-amber hover:bg-amber-dark text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t('hero.viewWork')}
          </a>
          <a
            href="/cv-placeholder.pdf"
            className="border-2 border-amber text-amber hover:bg-amber hover:text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
          >
            {t('hero.downloadCV')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-muted" size={28} />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with Framer Motion reveal animations"
```

---

### Task 9: Build About component

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create About.tsx**

Create `components/About.tsx`:

```typescript
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
    <section id="about" className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
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
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-sand to-cream border-4 border-amber flex items-center justify-center shadow-lg">
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
                className="inline-block border-2 border-amber text-amber hover:bg-amber hover:text-white font-body font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About section with photo placeholder and scroll animation"
```

---

### Task 10: Build Skills component

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

Create `components/Skills.tsx`:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: add Skills section with categorized badge pills"
```

---

### Task 11: Build Education component

**Files:**
- Create: `components/Education.tsx`

- [ ] **Step 1: Create Education.tsx**

Create `components/Education.tsx`:

```typescript
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
                <div className="bg-amber/10 p-2.5 rounded-lg">
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Education.tsx
git commit -m "feat: add Education section with timeline card"
```

---

### Task 12: Build Experience component

**Files:**
- Create: `components/Experience.tsx`

- [ ] **Step 1: Create Experience.tsx**

Create `components/Experience.tsx`:

```typescript
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
  typeBadgeColor: string
}

const ENTRIES: ExperienceEntry[] = [
  {
    roleKey: 'experience.intern2022Role',
    orgKey: 'experience.intern2022Org',
    periodKey: 'experience.intern2022Period',
    typeKey: 'experience.internship',
    detailKeys: ['experience.intern2022Detail'],
    typeBadgeColor: 'bg-amber/10 text-amber border-amber/20',
  },
  {
    roleKey: 'experience.intern2023Role',
    orgKey: 'experience.intern2023Org',
    periodKey: 'experience.intern2023Period',
    typeKey: 'experience.internship',
    detailKeys: ['experience.intern2023Detail'],
    typeBadgeColor: 'bg-amber/10 text-amber border-amber/20',
  },
  {
    roleKey: 'experience.volunteerRole',
    orgKey: 'experience.volunteerOrg',
    periodKey: 'experience.volunteerPeriod',
    typeKey: 'experience.volunteering',
    detailKeys: ['experience.volunteerDetail'],
    typeBadgeColor: 'bg-forest/10 text-forest border-forest/20',
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
    typeBadgeColor: 'bg-charcoal/10 text-charcoal border-charcoal/20',
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
                <div className="absolute -left-[41px] top-5 w-4 h-4 bg-amber rounded-full border-2 border-cream" />

                <div className="bg-sand rounded-card p-6 border border-border hover:border-amber/40 hover:shadow-md transition-all duration-300 ml-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber/10 p-2 rounded-lg mt-0.5">
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
                      className={`font-body text-xs font-medium px-3 py-1 rounded-full border ${entry.typeBadgeColor}`}
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: add Experience section with vertical timeline"
```

---

### Task 13: Build Projects component

**Files:**
- Create: `components/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

Create `components/Projects.tsx`:

```typescript
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
    <div className="bg-sand rounded-card p-6 border border-border hover:border-amber/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <h3 className="font-display font-semibold text-lg text-charcoal mb-3">
        {t(card.titleKey)}
      </h3>
      <p className="font-body text-sm text-bark leading-relaxed mb-4 flex-1">
        {t(card.descKey)}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs text-muted bg-cream border border-border px-2.5 py-0.5 rounded-full"
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
          className="inline-flex items-center gap-2 bg-charcoal hover:bg-bark text-cream font-body font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-200 self-start"
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
        <span className="inline-flex items-center gap-2 bg-border text-muted font-body font-medium text-sm px-5 py-2.5 rounded-full self-start cursor-not-allowed">
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
        className="font-display font-semibold text-2xl text-charcoal mb-8 flex items-center gap-3"
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
    <section id="projects" className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('projects.heading')}
        </motion.h2>

        <ProjectGroup titleKey="projects.webGroup" projects={WEB_PROJECTS} delay={0.1} />
        <ProjectGroup titleKey="projects.aiGroup" projects={AI_PROJECTS} delay={0.1} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx
git commit -m "feat: add Projects section with Web and AI/Automation card grids"
```

---

### Task 14: Build Certifications component

**Files:**
- Create: `components/Certifications.tsx`

- [ ] **Step 1: Create Certifications.tsx**

Create `components/Certifications.tsx`:

```typescript
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
              className="bg-sand border border-border rounded-card p-8 flex flex-col items-center gap-4 hover:border-amber/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-64"
            >
              <div className="bg-amber/10 p-4 rounded-full">
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Certifications.tsx
git commit -m "feat: add Certifications section with badge cards"
```

---

### Task 15: Build Contact component

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

Create `components/Contact.tsx`:

```typescript
'use client'

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  const INFO_CARDS = [
    {
      icon: <Mail className="text-amber" size={20} />,
      label: t('contact.emailLabel'),
      value: 'josephelikana96@gmail.com',
      href: 'mailto:josephelikana96@gmail.com',
    },
    {
      icon: <Linkedin className="text-amber" size={20} />,
      label: t('contact.linkedinLabel'),
      value: 'linkedin.com/in/josephelikana',
      href: 'https://www.linkedin.com/in/josephelikana/',
    },
    {
      icon: <Github className="text-amber" size={20} />,
      label: t('contact.githubLabel'),
      value: 'github.com/JosephElikana',
      href: 'https://github.com/JosephElikana',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl text-charcoal mb-16 text-center"
        >
          {t('contact.heading')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {INFO_CARDS.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-cream rounded-card p-5 border border-border hover:border-amber/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-amber/10 p-2.5 rounded-lg shrink-0">{icon}</div>
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <p className="font-body text-sm text-bark group-hover:text-amber transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-cream rounded-card p-8 border border-forest/30 flex flex-col items-center justify-center h-full gap-4 text-center">
                <CheckCircle2 className="text-forest" size={48} />
                <p className="font-body text-bark text-lg">{t('contact.success')}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-amber font-body text-sm underline hover:text-amber-dark transition-colors duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-cream rounded-card p-8 border border-border space-y-5"
              >
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-1.5">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full font-body text-sm text-charcoal bg-sand border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-1.5">
                    {t('contact.emailFieldLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full font-body text-sm text-charcoal bg-sand border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-1.5">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full font-body text-sm text-charcoal bg-sand border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-amber transition-colors duration-200 placeholder:text-muted resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber hover:bg-amber-dark text-white font-body font-semibold text-sm py-3.5 rounded-full transition-all duration-200 hover:shadow-md"
                >
                  {t('contact.send')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact section with info cards and UI-only form"
```

---

### Task 16: Build Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

Create `components/Footer.tsx`:

```typescript
'use client'

import { useTranslation } from 'react-i18next'
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.certifications', href: '#certifications' },
  { key: 'nav.contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  {
    icon: <Linkedin size={18} />,
    href: 'https://www.linkedin.com/in/josephelikana/',
    label: 'LinkedIn',
  },
  {
    icon: <Github size={18} />,
    href: 'https://github.com/JosephElikana',
    label: 'GitHub',
  },
  {
    icon: <Mail size={18} />,
    href: 'mailto:josephelikana96@gmail.com',
    label: 'Email',
  },
]

export default function Footer() {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-cream border-t border-bark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10">
          {/* Left: copyright */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-bold text-xl text-amber">JE</span>
              <span className="font-display font-semibold text-cream text-sm">Joseph Elikana</span>
            </div>
            <p className="font-body text-xs text-cream/50 leading-relaxed">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Center: nav links */}
          <div className="flex flex-wrap gap-3 md:justify-center">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-body text-sm text-cream/60 hover:text-amber transition-colors duration-200"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right: social icons + back to top */}
          <div className="flex items-center justify-start md:justify-end gap-4">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream/50 hover:text-amber transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label={t('footer.backToTop')}
              className="ml-2 bg-amber/10 hover:bg-amber text-amber hover:text-white p-2 rounded-full transition-all duration-200"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 text-center">
          <p className="font-body text-xs text-cream/30">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with nav links, social icons, back-to-top"
```

---

### Task 17: Wire up page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with all section components in order**

Replace the entire contents of `app/page.tsx`:

```typescript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Verify full TypeScript build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up all sections in page.tsx"
```

---

### Task 18: Final build and smoke test

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes successfully. No TypeScript errors. No build warnings about missing modules.

- [ ] **Step 2: Start production server and visually verify**

```bash
npm run start
```

Open http://localhost:3000 and verify:
- Navbar shows logo, nav links, EN | SW toggle, Hire Me button
- Hero section fills viewport with animated text
- Language toggle switches all UI text to Kiswahili instantly
- All sections scroll smoothly and animate in on scroll
- Projects section shows Web group (3 cards) and AI group (6 cards)
- Contact form shows success message on submit
- Footer has social icons and back-to-top button
- Site is responsive on mobile (test at 375px viewport)

Stop server with Ctrl+C.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete Joseph Elikana portfolio website"
```
