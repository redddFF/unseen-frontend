import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { ThemeProvider } from '@/lib/theme-context'
import { CursorProvider } from '@/lib/cursor-context'
import { WarningModalProvider } from '@/lib/warning-modal-context'
import { BlueprintCrosshair } from '@/components/BlueprintCrosshair'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'UNSEEN — SS26',
  description: 'Underground streetwear. Limited edition drops. Cinematic design.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider>
          <CursorProvider>
            {/* Hide native cursor on desktop only */}
            <div className="hidden md:block cursor-none fixed inset-0 pointer-events-none" />
            <WarningModalProvider>
              <CartProvider>
                <div className="noise"></div>
                {children}
                <BlueprintCrosshair />
              </CartProvider>
            </WarningModalProvider>
          </CursorProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
