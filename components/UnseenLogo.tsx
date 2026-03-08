'use client'

interface UnseenLogoProps {
  variant?: 'white' | 'grey' | 'chrome'
  size?: 'small' | 'medium' | 'large'
  useLineMask?: boolean
  textTransform?: 'lowercase'
}

export function UnseenLogo({
  variant = 'white',
  size = 'large',
  useLineMask = true,
  textTransform = 'lowercase',
}: UnseenLogoProps) {
  const sizeMap = {
    small: 'clamp(24px, 3vw, 40px)',
    medium: 'clamp(40px, 6vw, 80px)',
    large: 'clamp(56px, 13vw, 180px)',
  }

  const colorVariants = {
    white: {
      color: 'var(--text-primary)',
      textShadow: 'none',
    },
    grey: {
      color: 'var(--text-tertiary)',
      textShadow: 'none',
    },
    chrome: {
      background: 'linear-gradient(180deg, #c8c8c8 0%, var(--text-primary) 40%, #5a5a5a 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  }

  const style = {
    fontSize: sizeMap[size],
    fontWeight: 900,
    textTransform,
    letterSpacing: '0.04em',
    fontFamily: "'ASTRO 867', 'Space Grotesk', system-ui, sans-serif",
    lineHeight: 1,
    ...(colorVariants[variant] as any),
    // Horizontal cut-line effect via mask
    ...(useLineMask
      ? {
          backgroundImage:
            variant === 'white' || variant === 'grey'
              ? 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, currentColor 2px, currentColor 4px)'
              : 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #888888 2px, #888888 4px)',
          backgroundSize: '100% 100%',
          backgroundPosition: '0 50%',
          WebkitMaskImage:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, black 2px, black 4px)',
          maskImage:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, black 2px, black 4px)',
        }
      : {
          backgroundImage: 'none',
          WebkitMaskImage: 'none',
          maskImage: 'none',
        }),
    display: 'inline-block',
  }

  return (
    <div style={style}>
      UNSEEN
    </div>
  )
}
