# Hero 3D Robot Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-column cream Hero with a dark two-column layout — existing text on the left, interactive Spline 3D robot on the right — matching the `hero3D.txt` prompt exactly.

**Architecture:** Create two isolated UI primitives (`SplineScene.tsx`, `Spotlight.tsx`) in `components/ui/`, add the `animate-spotlight` keyframe to `globals.css`, then refactor `Hero.tsx` to use them inside a dark full-viewport section. No new pages, no extra utility libraries.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion (already installed), `@splinetool/react-spline`, `@splinetool/runtime`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `components/ui/SplineScene.tsx` | Create | Lazy Spline loader with spinner fallback |
| `components/ui/Spotlight.tsx` | Create | Aceternity SVG spotlight beam overlay |
| `app/globals.css` | Modify | Add `@keyframes spotlight` + `.animate-spotlight` |
| `components/Hero.tsx` | Modify | Dark two-column layout composing the above |

---

### Task 1: Install Spline dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install packages**

Run in the project root:
```bash
npm install @splinetool/react-spline @splinetool/runtime
```

Expected output: packages added, `package-lock.json` updated.

- [ ] **Step 2: Verify**

```bash
cat package.json | grep spline
```

Expected: both `@splinetool/react-spline` and `@splinetool/runtime` appear under `"dependencies"`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @splinetool/react-spline and @splinetool/runtime"
```

---

### Task 2: Create `components/ui/SplineScene.tsx`

**Files:**
- Create: `components/ui/SplineScene.tsx`

- [ ] **Step 1: Create the `components/ui/` directory and file**

```bash
mkdir -p components/ui
```

Create `components/ui/SplineScene.tsx` with this exact content:

```tsx
'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/SplineScene.tsx
git commit -m "feat: add SplineScene lazy loader component"
```

---

### Task 3: Create `components/ui/Spotlight.tsx` and add CSS keyframe

**Files:**
- Create: `components/ui/Spotlight.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/ui/Spotlight.tsx`**

```tsx
type SpotlightProps = {
  className?: string
  fill?: string
}

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || 'white'}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="spotlight-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  )
}
```

Note: the filter `id` is `spotlight-filter` (not the generic `filter`) to avoid collisions with other SVG filters on the page.

- [ ] **Step 2: Add keyframe to `app/globals.css`**

Append the following at the very end of `app/globals.css`:

```css
@keyframes spotlight {
  0% {
    opacity: 0;
    transform: translate(-72%, -62%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -40%) scale(1);
  }
}

.animate-spotlight {
  animation: spotlight 2s ease 0.75s 1 forwards;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/Spotlight.tsx app/globals.css
git commit -m "feat: add Spotlight SVG component and keyframe animation"
```

---

### Task 4: Refactor `components/Hero.tsx`

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Replace the full contents of `components/Hero.tsx`**

```tsx
'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SplineScene } from '@/components/ui/SplineScene'
import { Spotlight } from '@/components/ui/Spotlight'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black/[0.96] overflow-hidden"
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">

          {/* Left: text content */}
          <div className="flex-1 flex flex-col items-start">
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
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-5"
            >
              {t('hero.greeting')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-xl text-neutral-300 font-medium mb-5"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-neutral-400 text-lg leading-relaxed mb-10 max-w-xl"
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

          {/* Right: 3D robot */}
          <div className="flex-1 relative h-[350px] md:h-[500px] w-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

        </div>
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
          <ChevronDown className="text-neutral-400" size={28} />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start the dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- Hero background is very dark (near-black)
- Spotlight white beam animates in from the upper-left area
- Left column: amber "Hello, World 👋", white heading, neutral-300 subtitle, neutral-400 tagline, two amber CTA buttons
- Right column: amber spinner briefly, then the Spline 3D robot renders and is interactive
- On screens below 768px: text stack on top, robot below at 350px height
- On screens 768px+: side-by-side at 500px height
- Scrolling down transitions naturally into the About section (cream background)
- Scroll chevron pulses in neutral-400 at the bottom centre

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: dark two-column Hero with Spotlight and Spline 3D robot"
```

---

## Notes

- **Spline scene URL** — `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode` is the robot from the `hero3D.txt` prompt. Replace with a custom scene URL when ready.
- **`animate-spotlight` CSS class** — Tailwind v4 does not auto-generate arbitrary animation utilities, so the class is defined as plain CSS in `globals.css`. Without this, the spotlight SVG stays at `opacity: 0` and is invisible.
- **SVG filter id** — Using `spotlight-filter` instead of the original `filter` to avoid collisions with any other SVG filters on the page.
- **No `cn()` utility needed** — Spotlight uses a template literal for className concatenation; no `clsx`/`tailwind-merge` required.
