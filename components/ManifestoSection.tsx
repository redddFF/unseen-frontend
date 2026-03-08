'use client'

import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

export function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lines = useMemo(
    () => ['WHERE YOUR', 'STYLE IS', 'SLICK', 'THE VIBES', 'ARE JUST', 'SICK'],
    []
  )
  // Calculate font sizes inversely proportional to character count so all lines fill same width
  // Responsive: smaller base for mobile, medium for tablet, full size for desktop
  const lineSizes = useMemo(() => {
    const baseSizeMobile = 35 // Mobile base
    const baseSizeTablet = 60 // Tablet base
    const baseSizeDesktop = 85 // Desktop base (unchanged)
    
    return lines.map((line, index) => {
      const charCount = line.replace(/\s/g, '').length
      // Make SICK (last line) bigger but ensure it fits
      const multiplier = index === lines.length - 1 ? 1.15 : 1
      
      const sizeMobile = (baseSizeMobile / charCount) * multiplier
      const sizeTablet = (baseSizeTablet / charCount) * multiplier
      const sizeDesktop = (baseSizeDesktop / charCount) * multiplier
      
      // Mobile-first clamp with breakpoint awareness
      // Mobile: uses smaller min/max, Tablet: medium, Desktop: full size
      return `clamp(${sizeMobile * 0.35}rem, ${sizeDesktop * 1.1}vw, ${sizeDesktop * 1.5}rem)`
    })
  }, [lines])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[96vh] sm:min-h-[112vh] md:min-h-[180vh] px-4 pt-10 pb-0 sm:px-6 sm:pt-16 sm:pb-1 md:px-8 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="sticky top-0 z-10 flex min-h-[70vh] sm:min-h-[76vh] md:min-h-screen items-center justify-center px-3 sm:px-4 md:px-8">
        <div className="w-full">
          <div 
            className="font-black leading-[0.9] sm:leading-[0.86] md:leading-[0.84] tracking-[0.01em]" 
            style={{ color: 'var(--text-primary)', fontFamily: '"Gill Sans Ultra Bold", sans-serif' }}
          >
            {lines.map((line, i) => {
              return (
                <motion.div 
                  key={`${line}-${i}`} 
                  className="[perspective:1200px] w-full overflow-hidden flex items-center justify-center"
                  initial={{ rotateX: 90, opacity: 0, y: 64 }}
                  whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                  viewport={{ 
                    once: true,
                    amount: 0.01,
                    margin: '0px 0px -200px 0px' // Trigger animation 200px before line enters viewport
                  }}
                  transition={{ 
                    duration: 0.7, // Slower animation
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <span
                    className="inline-block origin-bottom text-center"
                    style={{ 
                      fontSize: lineSizes[i], 
                      fontWeight: 900, 
                      backfaceVisibility: 'hidden',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'clip'
                    }}
                  >
                    {line}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
