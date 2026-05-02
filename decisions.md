# Vibe Lanka — Decisions Log

**Purpose.** This file is the source of truth for what's been decided, what's open, and what's deferred on Vibe Lanka. Read this first at the start of every conversation. Update it at the end of every substantive conversation. Memory in the chat product is patchy and summary-derived — this file is the actual continuity mechanism.

**How to use it.** When a decision is made, add it to the relevant section with a date and one-line reasoning. When a question is raised that can't be answered yet, add it to Open Flags. When something is consciously deferred ("v3 problem, not v1"), add it to Deferred. Don't re-litigate decisions in this log unless new information genuinely warrants it.

---

## 1. Current State (as of May 2, 2026)

**Built (prototype, not yet runnable):**
- Single 1,604-line `vibe-lanka.jsx` file in the `VibeLanka` repo. No `package.json`, no build setup, no other source files. Will not run as-is — needs framework scaffolding before deployment.
- Content of the prototype: desktop marketing site. Hero "The bay, tonight." in Fraunces; South Coast strip as horizontal geographic ribbon (seven towns, live people-counts); ticker bar; three-pillar explainer (Map / Trending / Featured); embedded phone mockups for Map and Plan; partner pitch; manifesto; CTA; footer.
- Nav: Map / Trending / The Coasts (hover dropdown with monsoon seasons: South Nov–Apr, East May–Sep, West year-round, North Mar–Oct) / Venues / CTA. Three-column grid for uniform spacing.
- Subhead in Fraunces 22px regular (not the body sans).
- See `repo-audit-2026-05-02.md` for full audit including known bugs and structural issues.

**Built but shelved:**
- Expo + React Native + TypeScript native app from an earlier thread. Mobile screens (Home magazine-masthead + Place Details with overlap title card). Supabase schema + seed for `places`. Not currently the active form factor. Treat as reference, not the path.

**Promised by the marketing site, not yet built:**
- The live map (real-time, GIS-driven)
- The voting system (one vote per user per night, anonymous or attributed, in-place on detail pages, percentages only)
- The itinerary planner (multi-stop days/weekends, realistic Sri Lankan travel times)
- Featured (paid placement, currently empty in marketing copy, awaiting partner program)
- Trending (heat bars driven by vote counts)
- All metadata: vibe tags, crowd type, price, noise, indoor/outdoor, view, time-of-day filters

**This is the build queue.**

---

## 2. Committed Decisions

### Aesthetic system (do not drift)
- **Type:** Fraunces (display serif, including italic) × DM Mono (technical voice, kickers, labels, coordinates, timestamps) × Familjen Grotesk (body and UI text). Earlier threads used Inter / Inter Tight as the sans — that has been superseded.
- **Color:** Ember `#D4471C` on paper `#FAF7F2`. Ink for text and structure. Muted for secondary information. Paper backgrounds dominant.
- **Motion:** House easing `cubic-bezier(0.32, 0.72, 0, 1)`. State changes 150–250ms, entrances 400–600ms.
- **Spatial logic:** Editorial generous spacing for narrative surfaces, technical precise spacing for data surfaces. Match the function.
- **Forbidden:** Rounded-full pill buttons. Drop shadows on cards. Gradient backgrounds. Three-feature-card grids. Lucide icons as default. Phone-frame mockups around mobile previews (caused a real bug in v1 — collapsed content to zero height — and is a smoothed-average aesthetic choice anyway).

### Foundational principles (filter every feature through these)
1. **Data sparsity is the real problem.** Every feature must answer the "does this work with 12 users?" question. Itinerary works at 12 (single-user value); voting and live map don't (require crowd). Cold-start strategies required for crowd-features before they ship. Curated content with visually-distinct treatment is the bridge from zero to live.
2. **The competition is Instagram, not other apps.** Voting is the moat (produces signal Instagram can't). Featured tag must mean editorially-verified, not just paid. Aesthetic premium is a trust signal.
3. **Sri Lanka is the differentiator.** Geographic taxonomy reflects how people actually travel (South Coast Strip is one cognitive unit, Arugam Bay is a season, Ella is a vibe). Monsoon seasons drive defaults. Cultural calendar (poya, festivals, school holidays, surf seasons) shapes recommendations. Bilingual respect (English primary, Sinhala/Tamil secondary, Sinhala greeting on cultural occasions).

### Stack starting positions
- **Frontend:** Next.js (App Router) for production. Vercel for hosting. Migrate inline styles to CSS Modules or vanilla-extract — Tailwind is rejected because variable font axes and per-element letter-spacing are load-bearing and Tailwind handles them awkwardly.
- **Maps:** Mapbox GL JS over Google Maps. Reasons: editorial-grade styling control, better pricing at low–medium volume, vector tiles align with the design language.
- **Backend:** Next.js API routes for early stage. Path to extract to dedicated services as load grows.
- **Database:** PostgreSQL with PostGIS extension. Supabase for managed Postgres + auth + realtime through Phase 2.
- **Realtime:** Supabase Realtime or Pusher. Do not build from scratch.
- **Auth:** Supabase Auth or Clerk. Email + Google + Apple at minimum. Phone auth for the local market is a real consideration.

### Product architecture decisions
- **Two tracks, sequenced.** Track 1 = ship the marketing site (scaffold the prototype into a real Next.js project, deployable, with working waitlist + partner inquiry). Track 2 = build the actual app (live-presence backend, map UI, voting, itinerary). Track 1 first because the site is the funnel; without it there's no audience for the app. Track 2 can have its own subdirectory or eventual separate repo. Do not conflate them — "where do we start" is hard to answer when these two goals are tangled.
- **Web-first, app later.** Native build is shelved, not killed. The desktop marketing site is the current artifact; the next build is the actual web app, not a mobile app port.
- **Vote integrity:** Account-bound votes are the floor. One vote per user per night per location. "Anonymous" means publicly anonymous, not unlinked from account. Votes display as percentages, not named avatars (changed from v2).
- **Location data:** Voluntary check-ins, not passive tracking. The social contract is explicit: opt-in, used for live map and trending only, not sold.
- **Featured:** Paid placement with editorial responsibility (verified by venue, content responsibility on us). Currently empty on the marketing site with a partner-program pitch — keep it that way until real partners exist. An empty Featured section with a pitch is more honest than fake placeholders.
- **Trending:** Heat bars, color-graded. No rank numbers. Driven by vote counts.
- **Geography:** South Coast Strip (Mirissa → Hiriketiya, seven sub-areas) is the hero geography. Other coasts exist but the strip carries the load on the marketing site and likely in the live product too, at least initially.

---

## 3. Open Flags (need decisions or specialist input)

**Founder decisions needed:**
- **Track 1 scaffolding scope.** Two options surfaced by the audit: (a) minimum-viable migration — Next.js, split into per-component files, CSS Modules, working waitlist endpoint, ~1–2 hours, design pixel-identical; or (b) just split the file into per-component pieces without changing framework, ~20 min, no framework decision. (a) is the recommended path — committing the prototype as-is leaves it unrunnable.
- **Waitlist provider.** Where do captured emails go? Resend / Loops / ConvertKit / Mailchimp / homegrown Supabase table? Track 1 needs this answered before the form gets wired.
- **Hosting account ownership.** Vercel project under whose account — personal, or a Vibe Lanka shared account? Domain registration — is `vibelanka.com` (or whatever variant) registered, where, who pays?
- **Image rights.** Marketing site currently uses Unsplash hot-links (TOS-fragile, bad LCP). Need locally-hosted licensed photos. Either commission, license stock, or use the founders' own Sri Lanka photography. Decide before Track 1 ships.
- **Trending signal definition.** The prompt implies vote-driven, which probably resolves the older "editorial toggle vs behavioral score" question — but confirm: is trending purely vote-count-derived, or does it also factor venue check-ins / external signals (Instagram mentions, etc.)? If purely votes, it inherits the cold-start problem in section 1.
- **Curated-to-live transition design.** At 12 users the map is curated. At 12,000 it's live. The transition is a designed product moment — who decides when a town/venue flips from curated to live, and what does the visual treatment look like at each end?
- **Confidence display for sparse votes.** "47 votes, mostly from Hiriketiya regulars" vs "847 votes, distributed across the south coast" need different visual treatments. Open question: how aggressively do we expose the underlying confidence to users vs hide complexity?
- **Phone auth priority.** Worth doing for v1 for local-market accessibility, or defer to v2?
- **Partner program pitch.** The marketing site has a partner email — who reads that inbox, what's the response SLA, what's the actual onboarding flow when a venue replies?

**Specialist consultations required (do not YOLO):**
- **Sri Lankan PDPA (Personal Data Protection Act No. 9 of 2022).** Compliance requires data inventory, lawful basis for processing, user rights mechanisms, possible DPO appointment, cross-border transfer rules. Needs Sri Lankan privacy counsel, not a Claude bluff.
- **Payment rails for Featured monetization.** Sri Lankan local payment infrastructure differs from Stripe-default assumptions. Needs a payments specialist familiar with the local market.
- **Production security architecture.** When the product hits real traffic with real PII, security review is a specialist job, not a project-lead job.
- **GIS performance at scale.** PostGIS is fine for Phase 1–2. At Phase 3 (10k+ users, dense map queries) this needs a specialist.
- **Trademark / IP for the Vibe Lanka name.** Verify availability in Sri Lanka and key tourist-origin markets before money goes into the brand.

---

## 4. Explicitly Deferred (v3 problems, not v1)

- **Custom Mapbox styling.** Default styling for launch. Custom only after data validates demand.
- **Custom auth flow.** Supabase Auth out-of-the-box for v1.
- **Native mobile app.** Web-first. Native is post-launch.
- **Multi-language UI.** English-primary for v1. Sinhala/Tamil surface elements (greeting cards, festival moments) before full localization.
- **Advanced fraud / Sybil detection.** Account-bound votes + IP reputation for v1. Device fingerprinting and behavioral fraud detection deferred until vote manipulation actually happens.
- **Architecture extraction from Next.js API routes.** Stays monolithic until load forces the split.
- **Phase 3 infrastructure (10k+ users).** Re-evaluate when we get close. "Moved fast on Supabase" is the right answer for Phase 1.

---

## 5. Decision History (append-only)

- **2026-05-02.** Decisions log created. Project state reconciled across three prior conversation threads. Web-first reaffirmed. Native build shelved. Marketing site is the current artifact; next build is the actual web app.
- **2026-05-02.** Repo audit performed by Claude Code (see `repo-audit-2026-05-02.md`). Findings: repo is a single 1,604-line unrunnable JSX file, no framework scaffolding. Committed: two-track split — Track 1 (ship marketing site as real Next.js project) before Track 2 (build the actual app). Surfaced new open flags: waitlist provider, hosting/domain ownership, image rights.
