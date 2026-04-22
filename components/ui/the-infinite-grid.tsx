'use client'

import React, { useRef } from "react"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion"

interface InfiniteGridBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function InfiniteGridBackground({
  children,
  className,
}: InfiniteGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40)
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40)
  })

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full overflow-hidden bg-charcoal${className ? " " + className : ""}`}
    >
      {/* Faint base grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <GridPattern id="grid-base" offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Cursor-reveal grid */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern id="grid-reveal" offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-5%] w-[40%] h-[40%] rounded-full bg-orange-500/40 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[5%] w-[40%] h-[40%] rounded-full bg-blue-500/40 blur-[120px]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

function GridPattern({
  id,
  offsetX,
  offsetY,
}: {
  id: string
  offsetX: ReturnType<typeof useMotionValue<number>>
  offsetY: ReturnType<typeof useMotionValue<number>>
}) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
