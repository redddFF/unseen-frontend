'use client'

import { UnseenLogo } from './UnseenLogo'

export function GlobalFooter() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-primary)' }}>
      <div className="px-6 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo + Location */}
          <div className="flex flex-col gap-4">
            <UnseenLogo variant="white" size="small" useLineMask={false} textTransform="lowercase" />
            <p className="text-11 font-mono font-bold tracking-wider text-mid-grey">
             TUNIS, TUNISIA
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <a href="/" className="text-11 font-mono font-bold tracking-wider text-mid-grey hover:text-light-grey">
              SHOP
            </a>
            <a href="/lookbook" className="text-11 font-mono font-bold tracking-wider text-mid-grey hover:text-light-grey">
              LOOKBOOK
            </a>
            <a href="/about" className="text-11 font-mono font-bold tracking-wider text-mid-grey hover:text-light-grey">
              ABOUT
            </a>
          </div>

          {/* Copyright + Social */}
          <div className="flex flex-col gap-4">
            <p className="text-11 font-mono font-bold tracking-wider text-mid-grey">
              © 2026 UNSEEN STUDIOS
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-11 font-mono font-bold tracking-wider text-mid-grey hover:text-light-grey">
                Instagram
              </a>
              <a href="#" className="text-11 font-mono font-bold tracking-wider text-mid-grey hover:text-light-grey">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-charcoal pt-8">
          <p className="text-10 font-mono font-bold tracking-wider text-dark-grey">
            ALL PIECES LIMITED EDITION. CRAFTED WITH INTENTION.
          </p>
        </div>
      </div>
    </footer>
  )
}
