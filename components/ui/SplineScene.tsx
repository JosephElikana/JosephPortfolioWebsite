'use client'

import { Suspense, lazy, Component, ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-2xl">
      {/* Animated ambient orbs */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #C8873A, transparent)',
          animation: 'orb1 6s ease-in-out infinite',
          top: '10%',
          left: '20%',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #E8A45A, transparent)',
          animation: 'orb2 8s ease-in-out infinite',
          bottom: '15%',
          right: '15%',
        }}
      />
      {/* Central icon */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="w-24 h-24 rounded-full border-2 border-amber flex items-center justify-center"
          style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="16" r="6" fill="#C8873A" opacity="0.9" />
            <rect x="16" y="24" width="16" height="12" rx="3" fill="#C8873A" opacity="0.7" />
            <circle cx="18" cy="38" r="3" fill="#C8873A" opacity="0.6" />
            <circle cx="30" cy="38" r="3" fill="#C8873A" opacity="0.6" />
            <rect x="10" y="26" width="5" height="8" rx="2" fill="#E8A45A" opacity="0.5" />
            <rect x="33" y="26" width="5" height="8" rx="2" fill="#E8A45A" opacity="0.5" />
          </svg>
        </div>
        <p className="font-body text-muted text-sm text-center">Interactive 3D<br />robot here</p>
      </div>
      <style>{`
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

interface ErrorBoundaryState {
  hasError: boolean
}

class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className}>
      <SplineErrorBoundary fallback={<WebGLFallback />}>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  )
}
