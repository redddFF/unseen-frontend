'use client'

import { useCursor } from '@/lib/cursor-context'
import { useState, useEffect } from 'react'

export function ThinRectangleCursor() {
  const { position, interactive, down, enabled } = useCursor()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleChange)
    return () => motionQuery.removeEventListener('change', handleChange)
  }, [])

  if (!enabled) return null

  // Calculate dimensions based on state
  const width = 2 // px
  const heightIdle = 18 // px
  const heightInteractive = 24 // px
  const heightActive = 12 // px

  let height = heightIdle
  if (down) {
    height = heightActive
  } else if (interactive) {
    height = heightInteractive
  }

  const color = interactive ? '#0000ff' : 'var(--text-primary)'
  const scale = down && !prefersReducedMotion ? 0.94 : 1
  const halfHeight = height / 2

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x - width / 2}px, ${position.y - halfHeight}px) scale(${scale})`,
        willChange: 'transform',
        transition: prefersReducedMotion ? 'none' : 'transform 80ms ease-out',
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
          transition: prefersReducedMotion ? 'none' : 'height 100ms ease-out, background-color 100ms ease-out',
        }}
      />
    </div>
  )
}

// Export as BlueprintCrosshair for backwards compatibility
export { ThinRectangleCursor as BlueprintCrosshair }
