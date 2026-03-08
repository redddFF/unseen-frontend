'use client'

import { UnseenLogo } from './UnseenLogo'
import Reveal from './animations/Reveal'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function HeroSection() {
  const [dotPos, setDotPos] = useState(0)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotPos(prev => (prev + 1) % 40)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIntroComplete(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* UNSEEN Logo */}
      <div className="relative flex items-center justify-center w-full h-full">
        <motion.div
          className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3"
          initial={{ opacity: 1, x: 0 }}
          animate={introComplete ? { opacity: 0, x: -80 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: introComplete ? 0 : 1, x: introComplete ? -60 : 0 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <UnseenLogo variant="chrome" size="medium" useLineMask={true} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={introComplete ? { opacity: 1, scale: 1.22 } : { opacity: 0, scale: 0.92 }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-30"
        >
          <UnseenLogo variant="chrome" size="large" useLineMask={true} />
        </motion.div>
      </div>

      {/* Divider + Text */}
        <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ x: 'clamp(120px, 24vw, 420px)' }}
        animate={{
          x: introComplete ? 0 : 'clamp(120px, 24vw, 420px)',
          y: introComplete ? '15vh' : '0vh',
        }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
        <Reveal delay={0.3}>
              <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{ scale: introComplete ? 0.52 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="origin-bottom"
              >
                <Image
                  src="/sweater.png"
                  alt="UNSEEN sweater"
                  width={420}
                  height={420}
                  className="w-[200px] sm:w-[280px] md:w-[360px] h-auto"
                  priority
                />
              </motion.div>
            <div className="w-32 h-px" style={{ backgroundColor: '#0000ff' }} />
            <p className="text-10 font-mono font-bold tracking-widest" style={{ color: 'var(--text-secondary)' }}>SS26 — DROP 001</p>
          </div>
        </Reveal>
        </motion.div>

      {/* Bottom Left - Location */}
      <div className="absolute bottom-8 left-8">
        <p className="text-10 font-mono font-bold tracking-widest" style={{ color: 'var(--text-tertiary)' }}>TUNISIA</p>
      </div>

      {/* Bottom Right - Scroll Indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3">
        <div className="w-px h-8" style={{ backgroundColor: 'var(--text-primary)', opacity: 0.3 }} />
        <div
          className="w-1 h-1 rounded-full"
          style={{
            backgroundColor: 'var(--text-primary)',
            transform: `translateY(${dotPos}px)`,
            transition: 'none',
          }}
        />
      </div>
    </section>
  )
}
