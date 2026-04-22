'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Spline scene={scene} className="w-full h-full" />
      </Suspense>
    </div>
  )
}
