# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint

## Architecture

**Next.js 16 App Router** project using React 19, TypeScript, and Tailwind CSS v4.

### Path Aliases (tsconfig)

- `@/*` → `./` (project root)
- `@/components/*` → `./src/components/*`
- `@/features/*` → `./src/features/*`

### Directory Structure

- `app/` — Next.js App Router pages and API routes. Layout includes Navbar and Footer globally.
- `src/components/ui/` — Pure reusable UI primitives (Button, Card, Input)
- `src/components/common/` — Shared layout components (Navbar, Footer)
- `src/features/` — Feature-based modules. Each feature has its own `components/`, `hooks/`, `services/` subdirs.
- `app/api/send-enquiry/route.ts` — Email enquiry endpoint using nodemailer

### Current Features

The app is currently a single-page landing site (`app/page.tsx`) composed of feature components from `src/features/landing/components/`: Hero, About, Pricing, Statistics, Gallery, Testimonials, Contact.

### Key Libraries

- **framer-motion** — animations
- **@react-three/fiber + drei** — 3D scene (DrivingScene component)
- **lucide-react** — icons
- **nodemailer** — server-side email sending

## Conventions (from ai_rules.md)

- **Feature-based architecture**: each domain feature lives in `src/features/{name}/` with its own components, hooks, services, store subdirs. Do not mix logic between features.
- **Functional components only**, no class components.
- **File naming**: PascalCase for components, `useHookName` for hooks, `camelCase` for utils, `UPPER_CASE` for constants.
- **Styling**: Tailwind CSS first, CSS Modules second, global styles last. Avoid inline styles.
- **API calls** go in service files, never directly in components.
- **State**: local UI state via `useState`; global state in feature-level store files.
- **Import order**: React/Next → third-party → absolute (`@/`) → feature → local → styles.
- **Server Components by default**; use Client Components (`"use client"`) only when necessary.
