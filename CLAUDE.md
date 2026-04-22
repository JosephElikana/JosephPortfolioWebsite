# CLAUDE.md — Joseph Elikana Portfolio

This file is read automatically by Claude Code at the start of every session.
Do not delete it. Update it as the project evolves.

---

## Project Overview

This is a personal portfolio website for **Joseph Elikana**, a Software Developer and AI Automation Specialist based in Tanzania. The goal is to showcase his skills, education, work experience, projects (web + AI/automation), and certifications — and allow visitors to contact him.

The site is **bilingual (English and Kiswahili)** and has a **warm, professional** design aesthetic.

---

## Owner & Contact Details

- **Name:** Joseph Elikana
- **Email:** josephelikana96@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/josephelikana/
- **GitHub:** https://github.com/JosephElikana
- **Role:** Software Developer · AI Automation Specialist · Freelancer
- **Tagline:** "Designing impactful digital solutions since 2024"

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Internationalization | i18next + react-i18next |
| Icons | Lucide React |
| Deployment | Vercel |

Never suggest replacing any of these with alternatives unless explicitly asked.

---

## Folder Structure

```
/portfolio
  /app
    layout.tsx         # Root layout, fonts, i18n provider
    page.tsx           # Imports all section components
    globals.css        # Global styles, Tailwind base
  /components
    Navbar.tsx         # Fixed navbar, lang toggle, mobile menu
    Hero.tsx           # Full viewport hero section
    About.tsx          # Two-column about section
    Skills.tsx         # Skill badges grouped by category
    Education.tsx      # Timeline card for MoCU
    Experience.tsx     # Vertical timeline of internships + freelance
    Projects.tsx       # Card grid — web projects + AI/automation
    Certifications.tsx # Badge cards for HP Foundation certs
    Contact.tsx        # Contact info + form
    Footer.tsx         # Footer with links and socials
  /locales
    en.json            # All English UI text
    sw.json            # All Kiswahili UI text
  /public
    /images
      placeholder-photo.jpg  # Profile photo placeholder
  tailwind.config.ts
  next.config.ts
  tsconfig.json
  package.json
  CLAUDE.md            # This file
```

---

## Design System

### Colors (defined as custom Tailwind colors)

| Name | Hex | Usage |
|---|---|---|
| cream | #FAF6F0 | Main background |
| sand | #EDE6D8 | Card / section backgrounds |
| charcoal | #2C2416 | Primary headings and text |
| bark | #5C4A2A | Secondary text |
| muted | #8A7860 | Muted/hint text |
| amber | #C8873A | Primary accent — buttons, highlights |
| amber-dark | #9E6420 | Hover state for amber elements |
| amber-light | #E8A45A | Light amber accents |
| forest | #4A7C59 | Success states, badges |
| border | #D8CDB8 | Card and section borders |

### Typography

- **Display / Headings:** Playfair Display (Google Fonts) — weights 400, 600, 700
- **Body / UI:** DM Sans (Google Fonts) — weights 300, 400, 500, 600

### Component Rules

- Button shape: pill (border-radius: 9999px)
- Card shape: rounded-xl (border-radius: 12px)
- Shadows: soft warm shadows only — no harsh drop shadows
- Hover: all cards and buttons must have smooth hover transitions (200–300ms)
- Scroll animations: every section uses Framer Motion fade-in + slide-up on scroll
- Smooth scroll: enabled globally

---

## Bilingual Setup (i18next)

- Language files live in `/locales/en.json` and `/locales/sw.json`
- The navbar has an **EN | SW** toggle button
- Switching languages must happen instantly — no page reload
- Default language: **English**

### What to translate:
- Section headings
- Navigation link labels
- Button labels (Hire Me, View My Work, Download CV, Send, etc.)
- Bio and About Me text
- Skill category names
- Experience and education descriptions
- Certification names
- Contact section text and form labels
- Footer text

### What NOT to translate:
- Project titles
- Tech stack tags
- Tool names (Make.com, Relevance AI, n8n, etc.)
- URLs and email addresses
- Proper nouns (MoCU, HP Foundation, etc.)
- Code

---

## Site Sections (in order)

1. **Navbar** — Logo (JE + Joseph Elikana), nav links, EN/SW toggle, Hire Me CTA
2. **Hero** — Full viewport, name, subtitle, tagline, two CTAs (View My Work + Download CV)
3. **About Me** — Photo placeholder + bio text, Let's Connect button
4. **Skills** — Badge pills grouped by: Programming Languages, Frontend, Backend, Mobile, Databases, CS Core, AI & Automation, Developer Tools
5. **Education** — MoCU, BSc Computer Science, timeline card
6. **Experience** — Vertical timeline: 2 internships (2022, 2023), 1 volunteer (2025), 1 freelance (2025–present)
7. **Projects** — Two groups: Web & Systems (3+ cards) + AI & Automation (6 cards, CTA = Request Demo or Coming Soon)
8. **Certifications** — HP Foundation: AI for Beginners + AI for Business Professionals
9. **Contact** — Info cards (email, LinkedIn, GitHub) + contact form (no backend, just UI feedback)
10. **Footer** — Copyright, nav links, social icons, back to top button

---

## Key Content

### Skills by Category

- **Programming Languages:** C, C++, Java, Python, JavaScript, TypeScript
- **Frontend:** HTML5, CSS3, React.js, Next.js, Tailwind CSS, Responsive Design
- **Backend:** Node.js, Express.js, REST APIs, PHP
- **Mobile:** React Native, Android (Java)
- **Databases:** MySQL, PostgreSQL, Oracle DB, Firebase
- **CS Core:** Data Structures & Algorithms, Computer Networking, Cybersecurity, Operating Systems, Software Engineering, Machine Learning, Artificial Intelligence, Cloud Computing
- **AI & Automation:** Make.com, n8n, Relevance AI, Zapier, Claude (Anthropic), Prompt Engineering, AI Agent Development, Vibe Coding
- **Developer Tools:** Git, GitHub, VS Code, Postman, Linux, Docker (basic)

### Experience Entries

1. Field Practical Training — MoCU ICT Dept — March–May 2022 — Internship
2. Field Practical Training — MoCU ICT Dept — March–May 2023 — Internship
3. ICT Volunteer — MoCU — June–December 2025 — Volunteering
4. Freelance Software Developer — Self-employed — 2025–Present

Notable freelance project: Church Asset Management System with QR code integration for real-time asset tracking and record-keeping.

### AI & Automation Projects (links hidden — use "Request Demo" CTA → email)

1. Lead Qualification Automation — Make.com
2. Company Analyzer Tool — Relevance AI
3. Prospect Intelligence Tool — Relevance AI (uses LinkedIn URL + company name)
4. Customer Support Intelligence Agent — Relevance AI (combines tools 2 & 3)
5. Placeholder Automation Project 5 — n8n — "Coming Soon"
6. Placeholder Automation Project 6 — AI/Automation — "Coming Soon"

All AI/Automation project CTAs go to: mailto:josephelikana96@gmail.com
Do NOT link directly to Make.com or Relevance AI tool URLs.

### Certifications

1. AI for Beginners — HP Foundation
2. AI for Business Professionals — HP Foundation

---

## Coding Conventions

- Use **TypeScript** everywhere — no plain `.js` files in `/app` or `/components`
- Use **functional components** with hooks only — no class components
- Component file names: **PascalCase** (e.g. `Navbar.tsx`, `Hero.tsx`)
- Use Tailwind utility classes — avoid writing custom CSS unless absolutely necessary
- All custom colors must use the Tailwind config values (e.g. `bg-amber`, `text-charcoal`) — never hardcode hex values in components
- Use `next/image` for all images
- Use `next/link` for all internal links
- Keep each component self-contained — data/content goes inside the component or pulled from the locale files
- Use Framer Motion `useInView` + `motion.div` for scroll animations on every section

---

## What Claude Should NEVER Do

- Do not change the tech stack without being asked
- Do not use any color values that are not in the design system above
- Do not use Arial, Inter, Roboto, or system fonts — always use Playfair Display and DM Sans
- Do not add purple gradients or generic "AI portfolio" aesthetics
- Do not link directly to any Relevance AI or Make.com tool URLs
- Do not use class components or legacy React patterns
- Do not use inline styles when a Tailwind class exists
- Do not create additional pages — this is a single-page app
- Do not remove or rename any existing components without being asked

---

## Current Status

- [ ] Project scaffolded
- [ ] Tailwind config with custom colors set up
- [ ] i18next configured with en.json and sw.json
- [ ] Navbar component built
- [ ] Hero component built
- [ ] About component built
- [ ] Skills component built
- [ ] Education component built
- [ ] Experience component built
- [ ] Projects component built
- [ ] Certifications component built
- [ ] Contact component built
- [ ] Footer component built
- [ ] Mobile responsiveness checked
- [ ] Framer Motion animations added to all sections
- [ ] Bilingual toggle tested (EN/SW)
- [ ] Deployed to Vercel

Update this checklist as you complete each section.

---

## Notes for Future Sessions

- Profile photo not yet added — placeholder is at `/public/images/placeholder-photo.jpg`
- Certification years need to be filled in once confirmed
- University start/graduation years need to be filled in
- More GitHub project links to be added once repos are ready
- Social media links (beyond LinkedIn and GitHub) to be added later
- A contact form backend (e.g. Resend, EmailJS, or Formspree) can be added in a future phase
