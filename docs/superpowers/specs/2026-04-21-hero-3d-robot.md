# Hero 3D Robot Integration — Design Spec

**Date:** 2026-04-21  
**Status:** Approved

---

## Goal

Integrate the Spline 3D robot scene from `hero3D.txt` into the existing `Hero.tsx`, transforming it from a single-column cream layout into a dark, two-column layout: hero text on the left, interactive 3D robot on the right.

---

## Background

The current `Hero.tsx` is a single-column section with a warm cream background. The `additionalComponents/hero3D.txt` prompt provides a two-column component using `@splinetool/react-spline` for a 3D robot scene and an aceternity Spotlight SVG overlay. The user wants the existing hero text content on the left and the robot on the right, on a very dark background matching the original prompt style.

---

## Architecture

Three files are touched:

| File | Action |
|---|---|
| `components/ui/SplineScene.tsx` | Create — lazy Spline loader with spinner fallback |
| `components/ui/Spotlight.tsx` | Create — aceternity SVG spotlight animation |
| `components/Hero.tsx` | Modify — dark two-column layout composing the above |

No new pages. No new packages beyond `@splinetool/react-spline` and `@splinetool/runtime`.

---

## Hero Layout

- **Background:** `bg-black/[0.96]` (matches original prompt exactly — very dark)
- **Layout:** `flex flex-col md:flex-row` — stacks on mobile, side-by-side on desktop
- **Spotlight:** `<Spotlight>` overlaid on the section, positioned `-top-40 left-0 md:left-60 md:-top-20`, `fill="white"`

**Left column (50% on desktop, 100% on mobile):**  
All existing hero content preserved verbatim — greeting, `hero.greeting` h1, `hero.subtitle`, `hero.tagline`, two amber CTA buttons.  
Text colors flipped for dark background:
- Heading: `text-white`
- Subtitle: `text-neutral-300`
- Tagline: `text-neutral-400`
- Amber buttons unchanged (work on dark background)

**Right column (50% on desktop, 100% on mobile):**  
`<SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />`  
Height: `h-[350px]` on mobile, `lg:h-[500px]` on desktop.

---

## Mobile Behaviour

Below `md` (768px): columns stack vertically — text on top, robot below at `h-[350px]`.

---

## Components

### `SplineScene.tsx`
- `'use client'`
- Lazy-imports `@splinetool/react-spline` via `React.lazy`
- Wraps in `<Suspense>` with a spinning amber/neutral border loader as fallback
- Props: `scene: string`, `className?: string`

### `Spotlight.tsx`
- Server-safe (no `'use client'` needed — pure SVG)
- Aceternity SVG spotlight with `animate-spotlight` class
- Requires `@keyframes spotlight` + `.animate-spotlight` CSS added to `app/globals.css`
- Props: `className?: string`, `fill?: string`

---

## Dependencies

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

No `clsx`, no `tailwind-merge`, no shadcn Card needed — Hero.tsx uses Tailwind directly.

---

## Animations

All existing Framer Motion entrance animations on the left column are preserved. Timing adjusted to use `whileInView` with staggered delays (0.3–0.7s, 0.8s duration, `easeInOut`) matching the dark aesthetic. Scroll chevron colour changes from `text-muted` to `text-neutral-400`.

---

## What Does NOT Change

- All i18next translation keys — no new keys needed
- Component file name (`Hero.tsx`)
- Scroll indicator
- CTA button logic and hrefs
- The rest of the page (About, Skills, etc.) — all still cream background
