'use client'

import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { UnseenLogo } from '@/components/UnseenLogo'
import { useState, useRef } from 'react'

const chapters = [
  { id: 1, label: 'I. ARRIVAL', content: 'The first glimpse of what was hidden.' },
  { id: 2, label: 'II. MOVEMENT', content: 'Captured in stillness, forever in motion.' },
  { id: 3, label: 'III. DISAPPEAR', content: 'The final act leaves only traces.' },
]

export default function LookbookPage() {
  const [activeChapter, setActiveChapter] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleChapterClick = (idx: number) => {
    setActiveChapter(idx)
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl">
          <p className="text-10 font-mono tracking-widest mb-8" style={{ color: 'var(--text-tertiary)' }}>
            SS26 LOOKBOOK
          </p>

          <h1 className="text-7xl md:text-8xl font-black uppercase leading-none mb-6" style={{ color: 'var(--text-primary)' }}>
            LOOKBOOK
          </h1>

          <h2 className="text-6xl md:text-7xl font-serif italic mb-12" style={{ color: 'var(--text-tertiary)' }}>
            PHANTOM
          </h2>

          <p className="text-13 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            DROP 001 / SPRING SUMMER 2026
          </p>
        </div>
      </section>

      {/* Chapter Navigation */}
      <div
        className="sticky top-20 z-30 backdrop-blur border-y py-4 px-6 md:px-8"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)',
          borderColor: 'var(--border-primary)',
        }}
      >
        <div className="max-w-6xl mx-auto flex justify-center gap-1 md:gap-4 overflow-x-auto">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => handleChapterClick(idx)}
              className="text-11 font-mono tracking-widest whitespace-nowrap px-4 py-2 transition-all border-b-2"
              style={{
                fontSize: 'var(--text-mono)',
                fontWeight: 'var(--text-mono-weight)',
                color: activeChapter === idx ? 'var(--text-primary)' : 'var(--text-tertiary)',
                borderBottomColor: activeChapter === idx ? '#0000ff' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (activeChapter !== idx) {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.borderBottomColor = '#0000ff'
                }
              }}
              onMouseLeave={(e) => {
                if (activeChapter !== idx) {
                  e.currentTarget.style.color = 'var(--text-tertiary)'
                  e.currentTarget.style.borderBottomColor = 'transparent'
                }
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Content */}
      {chapters.map((chapter, idx) => (
        <section
          key={chapter.id}
          ref={el => { sectionRefs.current[idx] = el }}
          className="relative w-full py-12 px-6 md:px-8"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Chapter Header */}
            <div className="mb-12">
              <p className="text-10 font-mono tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>
                {chapter.label}
              </p>
              <p className="text-2xl md:text-3xl font-serif italic max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {chapter.content}
              </p>
            </div>

            {/* Chapter Images */}
            {idx === 0 && (
              /* ARRIVAL - Single full-width image */
              <div className="flex flex-col gap-6">
                <div className="aspect-video flex items-center justify-center border" style={{ borderColor: '#0000ff', backgroundColor: 'var(--bg-secondary)' }}>
                  <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>EDITORIAL IMAGE {idx + 1}</p>
                </div>
                <p className="text-13 font-mono italic" style={{ color: 'var(--text-tertiary)' }}>
                  The underground speaks softly. Only those listening will understand.
                </p>
              </div>
            )}

            {idx === 1 && (
              /* MOVEMENT - Two-column layout */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left column - tall image */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  <div className="aspect-[4/5] flex items-center justify-center border" style={{ borderColor: '#0000ff', backgroundColor: 'var(--bg-secondary)' }}>
                    <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>PORTRAIT {idx + 1}</p>
                  </div>

                  {/* Editorial text */}
                  <div className="text-13 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                    <p className="mb-4">
                      Movement defined by stillness. Action captured in a single frame. The PHANTOM CARGO collection
                      represents a philosophy—where the unseen becomes visible through absence.
                    </p>
                    <p>
                      Each piece is a statement. Each drop is a whisper in the noise. This is not fashion—this is a condition.
                    </p>
                  </div>
                </div>

                {/* Right column - square image */}
                <div className="aspect-square flex items-center justify-center border" style={{ borderColor: '#0000ff', backgroundColor: 'var(--bg-secondary)' }}>
                  <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>DETAIL</p>
                </div>
              </div>
            )}

            {idx === 2 && (
              /* DISAPPEAR - Cinematic full-width with overlay */
              <div className="relative">
                <div className="aspect-video flex items-center justify-center border mb-8" style={{ borderColor: '#0000ff', backgroundColor: 'var(--bg-secondary)' }}>
                  <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>CINEMATIC {idx + 1}</p>
                </div>

                {/* Product CTA */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 border"
                  style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div>
                    <h3 className="text-3xl font-black uppercase mb-2" style={{ color: 'var(--text-primary)' }}>PHANTOM CARGO</h3>
                    <p className="text-11 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>LIMITED EDITION 01/100</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>$285</p>
                    <a href="/product/phantom-cargo">
                      <button
                        className="px-6 py-3 font-mono text-11 tracking-widest uppercase font-bold transition-all border"
                        style={{
                          backgroundColor: 'var(--text-primary)',
                          color: 'var(--bg-primary)',
                          borderColor: 'var(--text-primary)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = '#0000ff'
                          e.currentTarget.style.borderColor = '#0000ff'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--text-primary)'
                          e.currentTarget.style.color = 'var(--bg-primary)'
                          e.currentTarget.style.borderColor = 'var(--text-primary)'
                        }}
                      >
                        SHOP NOW
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      <GlobalFooter />
    </main>
  )
}
