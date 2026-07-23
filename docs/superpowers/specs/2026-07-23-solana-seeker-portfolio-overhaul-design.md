# Solana Seeker Portfolio Overhaul — Design

**Date:** 2026-07-23
**Owner:** Matthew Fair (0xmattyiceee / `0xmattyic333.skr`)
**Status:** Approved design → ready for implementation plan

## Goal

Overhaul the existing generic dev portfolio into a distinctive, "full degen"
Solana Mobile portfolio that positions the owner as a developer on a mission to
build dApps for the **Solana Seeker** and the **Solana dApp Store**.

The portfolio is **forward-looking / building-in-public**: the owner is starting
from zero on Solana. It declares intent, tells the mainframe→Web3 origin story,
and reframes existing real projects as proof of shipping ability. No Solana
projects, credentials, or metrics are fabricated.

## Audience & Positioning

- **Audience:** mixed (recruiters, potential collaborators, Solana peers). Because
  it can't over-optimize for one, it leads with what is *distinctive*: a low-level
  systems / mainframe developer going full Solana mobile.
- **Primary action:** understand the mission and connect / follow the build.

## Visual Direction: "Mobile-first Seeker"

The site mimics the Solana Mobile / Seeker product aesthetic — the portfolio
itself reads like a preview of the kind of product the owner wants to build.

### Design tokens (centralized in `src/styles/variables.css`)
- **Background:** near-black `#0b0b0f` (with subtle elevated surfaces).
- **Signature gradient:** Solana purple `#9945FF` → green `#14F195`.
- **Surfaces:** frosted-glass cards (translucent bg, blur, 1px subtle border,
  soft outer glow on hover).
- **Radius:** large rounded corners (16–24px) for the app/mobile feel.
- **Type:** Inter for UI; a monospace accent (e.g. system mono stack) for
  "system/dev" labels — a quiet nod to the mainframe roots.
- **Effects:** gradient glow, pill-shaped tags, glowing CTA buttons.

## Information Architecture (top → bottom)

1. **Navbar** — `mattyice` / `0xmattyic333.skr` logo, section links, glowing
   "Connect" pill CTA. Keeps the existing scroll-shrink behavior.
2. **Hero** — headline "Going full Solana." Subhead: building dApps for the
   Seeker & Solana dApp Store. A **verified `.skr` handle chip** (`0xmattyic333.skr`)
   displayed as a glowing verified badge. Two CTAs: *View Work* / *Follow the build*.
   A **Seeker-style phone mockup** beside the copy showing a mini "app" of the owner.
3. **The Mission** (replaces generic About) — mainframe→Web3 origin story +
   a clear "what I'm building toward" statement. Building-in-public framing.
   Honest, forward-looking tone (never claims Solana expertise).
4. **The Stack** — two honest buckets:
   - *Shipping with* — React, TypeScript, Git, Vite, HTML/CSS, Python (real skills).
   - *Leveling up* — Rust, Anchor, Solana Mobile Stack, Web3.js / Solana Kit,
     Mobile Wallet Adapter (currently learning).
   Includes the **IBM Z Xplore — Concepts verified badge** displayed at a large,
   prominent showcase size (~160–180px) with glow treatment, linking to Credly.
5. **Proof of Work** — the 4 existing real projects as app-store-style cards
   (title, blurb, tags, external link). Reframed copy to emphasize shipping.
   Projects: IBM Z Xplore Mainframe Workspace, Dev Portfolio, Digital Business
   Card, WolfeePackk Team Website.
6. **Contact** — "Let's build on Solana" glowing CTA card. Email + GitHub link.
   Echoes the `0xmattyic333.skr` identity.
7. **Footer** — updated handle, current year, no fabricated claims.

## Content Honesty Rules

- All Solana capability is framed as **mission / learning**, never expertise.
- Existing projects remain factually accurate; only framing/copy is refreshed.
- No invented dApps, deployments, users, or credentials.
- The `.skr` domain and IBM Z Xplore badge are real and used as-is.

## Component / File Plan

Preserve the existing per-component structure (`Component.tsx` + `Component.css`):

- `src/styles/variables.css` — replace palette with Solana tokens (purple/green
  gradient, glass surfaces, radii, glow) as CSS variables so the system stays
  consistent.
- `src/components/Navbar.{tsx,css}` — rebrand logo + Connect pill.
- `src/components/Hero.{tsx,css}` — new headline, `.skr` verified chip, CTAs,
  Seeker phone mockup (CSS-built device frame; no new deps if avoidable).
- Rename/repurpose `About` → **Mission** (`src/components/Mission.{tsx,css}` or
  keep `About` filename with new content — implementation plan decides). New
  origin-story + mission copy.
- `src/components/Stack.{tsx,css}` (from current `About` skills block, or a new
  component) — two skill buckets + enlarged IBM Z badge.
- `src/components/Projects.{tsx,css}` — app-store-style cards, refreshed copy.
- `src/components/Contact.{tsx,css}` — Solana CTA styling, `.skr` echo.
- `src/App.tsx` — updated section order + footer text.

Exact component naming (rename vs. reuse `About`) is deferred to the
implementation plan; the section *content and behavior* above is authoritative.

## Non-Goals (YAGNI)

- No live wallet connection / on-chain integration (portfolio is static).
- No blog, CMS, or backend.
- No new heavy animation libraries; hero motion done with CSS if feasible.
- No fabricated Solana projects or a fake roadmap of "shipped" dApps.

## Success Criteria

- Site clearly communicates the Solana Seeker / dApp Store mission within the
  first screen.
- Visual system reads as cohesive "Solana Mobile" and distinctive vs. a template.
- `0xmattyic333.skr` and the enlarged IBM Z Xplore badge are prominently displayed.
- All content is truthful; no fabricated Solana experience.
- Builds cleanly (`npm run build`), lints (`npm run lint`), and deploys to
  GitHub Pages unchanged.
