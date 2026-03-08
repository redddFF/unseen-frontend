'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface CursorContextType {
  position: { x: number; y: number }
  interactive: boolean
  down: boolean
  enabled: boolean
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [interactive, setInteractive] = useState(false)
  const [down, setDown] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if mobile and toggle enabled state
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768
      setEnabled(!isMobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('resize', checkMobile)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smooth 60fps tracking
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  const handleMouseDown = useCallback(() => {
    setDown(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setDown(false)
  }, [])

  useEffect(() => {
    if (!enabled) {
      return
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Check for interactive elements on hover using mouseover
    const handleInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Check for data-cursor="interactive" attribute
      const hasDataCursor = target.closest('[data-cursor="interactive"]')
      
      // Check for naturally interactive elements
      const isNaturallyInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])'
      )

      setInteractive(!!(hasDataCursor || isNaturallyInteractive))
    }

    window.addEventListener('mouseover', handleInteractive, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleInteractive)
    }
  }, [enabled, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <CursorContext.Provider value={{ position, interactive, down, enabled }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
