'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from './ThemeToggle'
import { useCart } from '@/lib/cart-context'

export function GlobalNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--bg-primary)' : 'transparent',
        opacity: scrolled ? 0.95 : 1,
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
      }}
    >
      <div className="px-4 py-4 sm:px-6 md:px-8">
        {/* Mobile Nav */}
        <div className="relative flex items-center justify-between md:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-8 w-8 flex-col items-start justify-center gap-1.5"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span
              className={`block h-[1.5px] w-6 transition-all duration-200 ${mobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`}
              style={{ backgroundColor: 'var(--text-primary)' }}
            />
            <span
              className={`block h-[1.5px] w-6 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ backgroundColor: 'var(--text-primary)' }}
            />
            <span
              className={`block h-[1.5px] w-6 transition-all duration-200 ${mobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
              style={{ backgroundColor: 'var(--text-primary)' }}
            />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/Monogram EE.png"
              alt="UNSEEN Monogram"
              width={52}
              height={52}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <Link
            href="/cart"
            className="relative pb-1 border-b border-transparent"
            style={{
              color: 'var(--text-primary)',
              opacity: 0.9,
              fontSize: 'var(--text-mono)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderBottomWidth: '1px',
            }}
          >
            CART ({state.itemCount})
          </Link>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="mt-4 border-t pt-4 md:hidden" style={{ borderColor: 'var(--text-primary)', opacity: 0.85 }}>
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-mono)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/lookbook"
                className="pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-mono)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Lookbook
              </Link>
              <Link
                href="/about"
                className="pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-mono)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Left Links */}
          <div className="flex flex-1 gap-8">
          <Link
            href="/shop"
            className="relative transition-colors pb-1 border-b border-transparent hover:border-blue-600"
            style={{
              color: 'var(--text-primary)',
              opacity: 0.8,
              fontSize: 'var(--text-mono)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderBottomColor: 'transparent',
              borderBottomWidth: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#0000ff'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent'
              e.currentTarget.style.opacity = '0.8'
            }}
          >
            Shop
          </Link>
          <Link
            href="/lookbook"
            className="relative transition-colors pb-1 border-b border-transparent hover:border-blue-600"
            style={{
              color: 'var(--text-primary)',
              opacity: 0.8,
              fontSize: 'var(--text-mono)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderBottomColor: 'transparent',
              borderBottomWidth: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#0000ff'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent'
              e.currentTarget.style.opacity = '0.8'
            }}
          >
            Lookbook
          </Link>
        </div>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/Monogram EE.png"
              alt="UNSEEN Monogram"
              width={64}
              height={64}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Right Links */}
          <div className="flex flex-1 justify-end gap-8 items-center">
          <Link
            href="/about"
            className="relative transition-colors pb-1 border-b border-transparent hover:border-blue-600"
            style={{
              color: 'var(--text-primary)',
              opacity: 0.8,
              fontSize: 'var(--text-mono)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderBottomColor: 'transparent',
              borderBottomWidth: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#0000ff'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent'
              e.currentTarget.style.opacity = '0.8'
            }}
          >
            About
          </Link>
          <Link
            href="/cart"
            className="relative transition-colors pb-1 border-b border-transparent hover:border-blue-600"
            style={{
              color: 'var(--text-primary)',
              opacity: 0.8,
              fontSize: 'var(--text-mono)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderBottomColor: 'transparent',
              borderBottomWidth: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#0000ff'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent'
              e.currentTarget.style.opacity = '0.8'
            }}
          >
            Cart ({state.itemCount})
          </Link>
          <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
