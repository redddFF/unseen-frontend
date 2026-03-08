'use client'

import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { UnseenLogo } from '@/components/UnseenLogo'
import { useState, useEffect, useRef } from 'react'

export default function AboutPage() {
  const [glitchActive, setGlitchActive] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGlitchActive(true)
          const timer = setTimeout(() => setGlitchActive(false), 600)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />

      {/* Hero with Glitch Effect */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

        <div className="relative z-10">
          {glitchActive ? (
            <div className="glitch-wrapper">
              <UnseenLogo variant="chrome" size="large" />
              <UnseenLogo variant="chrome" size="large" />
              <UnseenLogo variant="chrome" size="large" />
            </div>
          ) : (
            <UnseenLogo variant="chrome" size="large" />
          )}
        </div>

        <style jsx>{`
          .glitch-wrapper {
            position: relative;
            display: inline-block;
          }

          .glitch-wrapper > div {
            position: absolute;
            top: 0;
            left: 0;
          }

          .glitch-wrapper > div:nth-child(2) {
            animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
            color: #ff1a1a;
            z-index: 2;
          }

          .glitch-wrapper > div:nth-child(3) {
            animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
            color: #00ffff;
            z-index: 1;
          }

          @keyframes glitch-1 {
            0% {
              clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
              transform: translate(-2px, -2px);
            }
            50% {
              clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
              transform: translate(2px, 2px);
            }
            100% {
              clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
              transform: translate(-2px, -2px);
            }
          }

          @keyframes glitch-2 {
            0% {
              clip-path: polygon(0 33%, 100% 33%, 100% 67%, 0 67%);
              transform: translate(2px, 2px);
            }
            50% {
              clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
              transform: translate(-2px, -2px);
            }
            100% {
              clip-path: polygon(0 33%, 100% 33%, 100% 67%, 0 67%);
              transform: translate(2px, 2px);
            }
          }
        `}</style>
      </section>

      {/* Manifesto Sections */}
      <section className="relative px-6 md:px-8 py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-24">
          {/* Section 001 */}
          <div className="text-center">
            <p className="text-6xl md:text-8xl font-mono font-black mb-8" style={{ color: 'var(--border-primary)' }}>
              001.
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              UNSEEN IS NOT A BRAND.
              <br />
              IT IS A CONDITION.
            </h1>
            <p className="text-13 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We operate in the spaces between visibility and obscurity. Our pieces are not commodities—they are statements
              of intentionality. Each garment carries the weight of deliberate craft, designed for those who understand
              that true luxury exists in absence.
            </p>
          </div>

          {/* Section 002 */}
          <div className="text-center">
            <p className="text-6xl md:text-8xl font-mono font-black mb-8" style={{ color: 'var(--border-primary)' }}>
              002.
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
              LIMITED DROPS. UNLIMITED INTENTION.
            </h2>
            <p className="text-13 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We reject the culture of endless consumption. Each collection is a finite expression—numbered, tracked, and
              honored. Production runs are intentionally small. Distribution is carefully considered. This is not hype.
              This is respect for scarcity and those who seek it.
            </p>
          </div>

          {/* Section 003 */}
          <div className="text-center">
            <p className="text-6xl md:text-8xl font-mono font-black mb-8" style={{ color: 'var(--border-primary)' }}>
              003.
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
              THE DROP SYSTEM
            </h2>
            <p className="text-13 leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              SS26 introduces a quarterly drop model. Each drop is a chapter. Each collection tells a story of the unseen—
              what exists in darkness, what remains hidden, what only the initiated will discover.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t" style={{ borderColor: 'var(--border-primary)' }}>
              <div>
                <p className="text-11 font-mono tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>DROP 001 / SS26</p>
                <p className="text-2xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>PHANTOM CARGO</p>
                <p className="text-13" style={{ color: 'var(--text-secondary)' }}>Military-grade construction. 100 pieces. Available now.</p>
              </div>
              <div>
                <p className="text-11 font-mono tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>COMING SOON</p>
                <p className="text-2xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>DROP 002</p>
                <p className="text-13" style={{ color: 'var(--text-secondary)' }}>June 2026. Details to be revealed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Credits */}
      <section
        className="relative border-t px-6 md:px-8 py-24"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-12" style={{ color: 'var(--text-primary)' }}>CREDITS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-11 font-mono tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>CREATIVE DIRECTION</p>
              <p className="text-13" style={{ color: 'var(--text-secondary)' }}>UNSEEN COLLECTIVE</p>
            </div>
            <div>
              <p className="text-11 font-mono tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>PRODUCTION</p>
              <p className="text-13" style={{ color: 'var(--text-secondary)' }}>UNDERGROUND STUDIOS</p>
            </div>
            <div>
              <p className="text-11 font-mono tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>DIGITAL</p>
              <p className="text-13" style={{ color: 'var(--text-secondary)' }}>UNSEEN LABS</p>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </main>
  )
}
