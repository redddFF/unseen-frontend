import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'near-black': '#0a0a0a',
        charcoal: '#1a1a1a',
        'dark-grey': '#2a2a2a',
        'mid-grey': '#555555',
        'light-grey': '#888888',
        'off-white': '#e8e8e8',
        white: '#ffffff',
        red: '#ff1a1a',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
        serif: ['Georgia', 'serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
        '16': '128px',
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
        '13': '13px',
        '14': '14px',
        '16': '16px',
      },
      borderRadius: {
        none: '0px',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.15em',
        wider: '0.2em',
        widest: '0.4em',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        slideUp: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropFilter: {
        blur: 'blur(4px)',
      },
    },
  },
  plugins: [],
}

export default config
