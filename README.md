# UNSEEN Platform Frontend

UNSEEN is a cinematic, editorial streetwear storefront built with Next.js App Router, focused on strong typography, motion, and a high-contrast dark/light visual identity.

This frontend includes:
- Landing experience with staged hero animations
- Product teaser and product detail flows
- Cart and checkout flows (mock checkout)
- Global dark/light mode support
- Custom desktop cursor experience
- Responsive navigation with mobile hamburger menu

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (UI/scroll/intro transitions)
- next/image for optimized assets
- Vercel Analytics

## Core Features

### 1. Theme System (Dark/Light)
- Global theme state via `data-theme` attribute.
- Theme variables are defined in `app/globals.css`:
  - `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
  - `--text-primary`, `--text-secondary`, `--text-tertiary`
  - `--border-primary`, `--border-secondary`
- Theme toggle is available in the global navbar.
- Main pages and route transitions are theme-aware.

### 2. Hero Experience
- Intro sequence in `components/HeroSection.tsx`:
  - 3 stacked `UNSEEN` words on the left
  - Opposing sweater visual + line + label on the right
  - Transition into a larger centered `UNSEEN`
- Supporting micro elements:
  - moving indicator dot
  - editorial divider label (`SS26 - DROP 001`)

### 3. Global Navigation
- `components/GlobalNav.tsx`
- Desktop:
  - left links, right links, centered monogram logo
- Mobile:
  - left hamburger trigger
  - centered monogram logo
  - right cart entry
  - collapsible menu panel

### 4. Product System
- Data source: `lib/products.ts`
- Product teaser:
  - Left panel renders `product.images[0]`
- Product detail page:
  - Main gallery image uses selected index from `product.images`
  - Thumbnails map directly from `product.images`
  - Product info, size selector, quantity controls, and add-to-cart

### 5. Cart and Checkout
- Cart state is managed in `lib/cart-context.tsx`.
- Items persist in `localStorage`.
- Checkout is mocked and shows custom confirmation modal.

### 6. Custom Warning Modal (No Browser Alerts)
- Reusable modal provider in `lib/warning-modal-context.tsx`
- Used for warnings/confirmations instead of native `alert()`
- Styled with platform fonts, spacing, and theme variables

### 7. Custom Cursor (Desktop)
- Cursor logic: `lib/cursor-context.tsx`
- Cursor render: `components/BlueprintCrosshair.tsx`
- Behavior:
  - hidden on mobile
  - reduced-motion aware
  - interactive state changes color
  - base cursor color follows theme (`--text-primary`)

## Route Map

- `/` Home
- `/shop` Shop listing
- `/product/[slug]` Product details
- `/cart` Cart
- `/checkout` Checkout (mock)
- `/about` About / manifesto
- `/lookbook` Lookbook

## Project Structure

- `app/` App Router pages and layout
- `components/` Reusable UI and section components
- `lib/` App state, data, motion helpers, providers
- `public/` Static assets (logos, product images, etc.)
- `styles/` Additional style files

## Local Development

## Prerequisites
- Node.js 20+
- npm (or pnpm)

## Install

Using npm:
```bash
npm install
```

Using pnpm:
```bash
pnpm install
```

## Run Dev Server

Using npm:
```bash
npm run dev
```

Using pnpm:
```bash
pnpm dev
```

Open `http://localhost:3000`.

## Build and Start

Using npm:
```bash
npm run build
npm run start
```

Using pnpm:
```bash
pnpm build
pnpm start
```

## Lint

Using npm:
```bash
npm run lint
```

Using pnpm:
```bash
pnpm lint
```

## Scripts

Defined in `package.json`:
- `dev` - start dev server
- `build` - production build
- `start` - start production server
- `lint` - run ESLint

## Notes

- Checkout is currently a mock flow (no real payment integration).
- Product image availability depends on assets present in `public/`.
- This codebase includes many reusable UI primitives under `components/ui/` for future extension.

## Future Improvements

- Add backend/API for real inventory and checkout.
- Add CMS integration for products and lookbook content.
- Add E2E tests for cart and checkout flow.
- Add image loading states/skeletons for galleries.
