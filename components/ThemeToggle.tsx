'use client'

import { useTheme } from '@/lib/theme-context'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
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
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
