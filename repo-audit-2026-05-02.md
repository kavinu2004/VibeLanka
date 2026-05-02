# Vibe Lanka Repo Audit — May 2, 2026

**Source:** Claude Code, run inside the `VibeLanka` repo on the founder's local machine.
**Purpose:** Reference document. Findings have been distilled into `decisions.md` (current state, open flags, decision history). This file preserves the full audit verbatim for context.

---

## What this repo actually is

A single 1,604-line `.jsx` file — a marketing landing page for Vibe Lanka, a (proposed) real-time map app for Sri Lanka. There's no `package.json`, no build setup, no other source files. The `.jsx` won't run as-is; it's a prototype dropped into a folder.

The product the copy describes has three pillars:

1. **Map** — editorial picks by area (South Coast, Ella, Colombo, Kandy, Arugam Bay)
2. **Trending** — live crowd density from phones at venues, refreshed every ~2 min
3. **Featured** — paid, vetted, clearly disclosed sponsor slots (one per category per area per month)

Plus a planning feature (save places → auto-routed itinerary with tuk-tuk/walk/car legs and leave-by alerts).

Aesthetic: editorial newspaper. Fraunces serif + DM Mono + Familjen Grotesk on warm paper with an ember accent. The design is genuinely good — that's the main asset here.

## What the goal should be

There are two goals tangled together. Worth separating them:

- **Near-term: ship the marketing site.** Get this prototype running on a real framework, deployable, indexable, with a waitlist form that actually captures emails and a partner inquiry path that works. That's a 1–2 day job from where you are.
- **Long-term: build the app.** Nothing in this repo is the product — the live-presence backend, the mobile app, the venue partner dashboard. That's a separate codebase (Expo + a real-time service) and a separate conversation.

I'd focus on the first one first. The site is the funnel; without it, there's no audience for the app.

## Issues with the current file

- **One file, no project.** Not runnable.
- **All copy and venue data hardcoded as top-level constants** — fine for now, but locks editing to code changes.
- **Inline-style object (`s = {...}`) is ~700 lines.** Hard to scan, no media queries beyond two responsive-grid-* classes, no hover/focus states without JS.
- **Unsplash hot-links for venue images** — TOS-fragile and bad for perf/LCP.
- **`currentClock()` runs once at render** — the "LIVE · {time}" never ticks. Also a hydration mismatch waiting to happen on SSR.
- **No SEO metadata, no OG image, no favicon, no analytics.**
- **"Get the app" buttons are `href="#"`.** Waitlist email is plain `mailto:`.
- **Accessibility:** dropdown opens on `mouseEnter` only — keyboard users can't reach it. Hero `h1` is `clamp(72px, 14vw, 220px)` which on narrow viewports breaks layout.

## Proposed structure (marketing site)

I'd move to **Next.js App Router** (or Astro if you want max static perf — Next is safer if you also want a serverless waitlist form). Then split the file roughly like this:

```
app/
  layout.tsx                  # fonts, metadata, OG
  page.tsx                    # composes the sections
  api/waitlist/route.ts       # POST → Resend / Loops / ConvertKit
components/
  sections/                   # one file each, ~60–200 lines
    Nav.tsx
    Hero.tsx
    CoastStrip.tsx
    PhilosophyBar.tsx
    FeatureExplainer.tsx
    SouthCoastShowcase.tsx
    ThreeWaysToFind.tsx
    PlanShowcase.tsx
    PartnerSection.tsx
    Manifesto.tsx
    CTA.tsx
    Footer.tsx
  ui/
    PlaceCard.tsx
    FindBlock.tsx
    TrendingPreviewRow.tsx
    PlanFeature.tsx
    PhoneMockup.tsx           # + PhoneMapPreview, PhonePlanPreview
    SectionMeta.tsx
    Stat.tsx
    LiveClock.tsx             # useEffect + setInterval, SSR-safe
lib/
  tokens.ts                   # the `tokens` object, typed
  data/
    coast.ts                  # SOUTH_COAST_STRIP
    trending.ts               # TRENDING_TONIGHT
    places.ts                 # PLACE_CARDS
styles/
  globals.css                 # @font import, keyframes, resets
  *.module.css                # per-component, replaces inline `s`
public/
  images/venues/*.jpg         # local, optimized via next/image
  og.png
```

A couple of opinionated calls:

- **CSS Modules over Tailwind.** Your design has bespoke editorial typography (variable-font axes, italic small-caps, ticker animations). Tailwind would flatten it. Keep the tokens in TS, reference them via CSS custom properties set on `:root`, and write component styles in `.module.css`.
- **Keep framer-motion**, but lazy-load the heavy section animations and respect `prefers-reduced-motion` (you already do — preserve that).
- **Move the data constants into `lib/data/`** typed with Zod or just TS interfaces. When you eventually wire up a real "trending" API, only that file changes.
- **Replace Unsplash hot-links** with `next/image` + locally hosted/licensed photos. This also unlocks proper LCP.
- **Add a `<LiveClock />` client component** for the ticking time, rendered as a placeholder on the server.

## Recommendation

Two scaffolding options:

1. **Minimum viable migration** — set up Next.js, split into the structure above, swap inline styles for CSS Modules, wire a working waitlist endpoint. ~1–2 hours of work, leaves the design pixel-identical.
2. **Just split the file** — keep the existing `.jsx` styling approach but break it into per-component files so you can navigate it. ~20 min, no framework decisions.

Recommended: option 1.
