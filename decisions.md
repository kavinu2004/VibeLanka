# Vibe Lanka — Decisions Log

**Purpose.** This file is the source of truth for what's been decided, what's open, and what's deferred on Vibe Lanka. Read this first at the start of every conversation. Update it at the end of every substantive conversation. Memory in the chat product is patchy and summary-derived — this file is the actual continuity mechanism.

**How to use it.** When a decision is made, add it to the relevant section with a date and one-line reasoning. When a question is raised that can't be answered yet, add it to Open Flags. When something is consciously deferred ("v3 problem, not v1"), add it to Deferred. Don't re-litigate decisions in this log unless new information genuinely warrants it.

---

## 1. Current State (as of May 2, 2026)

**Built, deployed, and operational:**
- **Live at https://vibelanka.com.** `https://www.vibelanka.com` 307-redirects to apex. Vercel auto-deploys `main` on every push to GitHub.
- **Resend waitlist integration live and verified end-to-end.** Audience ID `0beb6685-c7af-4e27-a35b-90e8b64ec6f6` captures signups. Smoke-tested on the production site — form submission returned the success state and the contact landed in the Resend audience.
- **Email forwarding operational** for `partners@`, `team@`, `press@` → founder Gmail via Cloudflare.
- The `vibe-lanka.jsx` prototype has been migrated to a real Next.js (App Router) project with CSS Modules and a component-split architecture. `npm run dev` serves at `http://localhost:3000`. Production build is clean (`npm run build` passes). Original prototype preserved at `archive/vibe-lanka-prototype.jsx` for reference.
- **Brand direction committed (2026-05-03).** `color-experiment` branch merged into `main`. New palette is the committed direction: steel-blue ink `#5A85A0` + terracotta ember `#D06A48` on cream paper. Bilingual wordmark "Vibe ලංකා" live in the nav (Noto Serif Sinhala via `next/font/google`).
- Marketing site content: desktop hero "The bay, tonight." in Fraunces; South Coast strip as horizontal geographic ribbon on desktop / vertical row stack on mobile (seven towns, heat-graded by relative activity); three-pillar explainer (Map / Trending / Featured); embedded phone mockups for Map and Plan; partner pitch; manifesto; CTA with waitlist form; footer.
- **PhilosophyBar component removed.** Its principles relocated inline as small DM-Mono editorial notes: "LOCALS WROTE THIS" appended to the Manifesto kicker; "TRENDING IS NOT PAID" added under the trending preview head in ThreeWaysToFind; "FEATURED IS PAID, MARKED · NO PLACEHOLDER LISTINGS" added below the partner copy in PartnerSection. Three other principles (phones-not-reviews, midnight-vote-reset, routing-by-tuk-tuk) dropped — no natural home.
- **Three founder venue photos integrated** at `public/images/venues/{smoke-and-bitters,ceylon-sliders,salt-house}.jpeg`. Replaced the Unsplash placeholders for those three Place Cards in `lib/data/places.js`.
- **Trending pillar description honesty fix.** Removed false "phones at location" (we don't passively detect) and false "fed every two minutes" (we don't update at that cadence) claims from the TRENDING `FindBlock` copy. Two parallel cadence references still live in metric / preview-meta — see Open Flags.
- Nav: The Coasts (hover/keyboard dropdown with monsoon seasons: South Nov–Apr, East May–Sep, West year-round, North Mar–Oct) / Trending / Venues / Get the app. Dropdown destinations resolve to `#strip` in v1 — per-coast pages are Track 2. Below 768px, nav links collapse; only logo + CTA show.
- Live clock fixed (no more SSR mismatch, ticks every 30s). Waitlist API route at `app/api/waitlist/route.js` is live. Vercel Analytics mounted in `app/layout.jsx`. Placeholder favicon at `app/icon.svg`.
- **Site mailto routing:** PartnerSection card → `partners@`; CTA tinyPrint → `team@`; Footer Contact → `team@`; Footer Press → `press@`; Footer Become-featured → `partners@`.
- Subhead in Fraunces 22px regular (not the body sans).
- See `repo-audit-2026-05-02.md` for the pre-migration audit.

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
- **Wordmark:** Localized to bilingual format ("Vibe ලංකා") using Noto Serif Sinhala for the Sinhala script. Single-instance — does not propagate to other site copy. All body copy, navigation labels, CTAs, and content remain English. Tamil version deferred until product expands to Tamil-majority regions.
- **Color:** Ink `#5A85A0` (steel blue, Mediterranean register) on paper `#FAF7F2`/cream variants. Ember accent `#D06A48` (terracotta). Replaces the original ember `#D4471C` on cream — pivot tested across multiple iterations on `color-experiment` branch May 2–3, 2026, then committed because the steel-blue + terracotta palette better differentiates Vibe Lanka from generic Sri Lanka tourism aesthetics while maintaining editorial-Swiss positioning.
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
- **Waitlist:** Resend Audiences. POST → `/api/waitlist` → `resend.contacts.create({ audienceId, email })`. Architectural decision committed; live integration awaits production env vars (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`). Same provider planned for transactional email (partner-inquiry replies) when that flow is built.
- **Analytics:** Vercel Analytics (`@vercel/analytics/next`). Mounted in the root layout. No-op outside Vercel deployments.

### Hosting / Operations (operational state, not just intent)
- **Hosting:** Vercel Hobby tier, project name `vibe-lanka`, deploying from `main` on `github.com:kavinu2004/VibeLanka.git`. Auto-deploys on every push.
- **Custom domain:** `vibelanka.com` is the apex (primary). `www.vibelanka.com` 307-redirects to apex. SSL auto-provisioned by Vercel (Let's Encrypt).
- **DNS:** Cloudflare DNS-only (gray cloud) for all Vercel-targeted records — apex CNAME via Cloudflare CNAME flattening, `www` CNAME to the same target. **Orange-cloud / proxy mode explicitly avoided** due to known SSL conflicts with Vercel's edge. Email-routing MX/TXT/SPF/DKIM records preserved through the cutover.
- **Waitlist capture:** Resend, with the account currently under the founder's personal Gmail (`kavinu2004@gmail.com`). Migration to a shared/project-owned account is a pending Open Flag.
- **Production secrets:** `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` live only in Vercel env vars (Production + Preview scopes, marked Sensitive) and the founder's local password manager. Not in the repo, not in `.env.example`. Development scope is intentionally empty — local dev of the waitlist needs a separate `.env.local`.

### Product architecture decisions
- **Two tracks, sequenced.** Track 1 = ship the marketing site (scaffold the prototype into a real Next.js project, deployable, with working waitlist + partner inquiry). Track 2 = build the actual app (live-presence backend, map UI, voting, itinerary). Track 1 first because the site is the funnel; without it there's no audience for the app. Track 2 can have its own subdirectory or eventual separate repo. Do not conflate them — "where do we start" is hard to answer when these two goals are tangled.
- **Web-first, app later.** Native build is shelved, not killed. The desktop marketing site is the current artifact; the next build is the actual web app, not a mobile app port.
- **Vote integrity:** Account-bound votes are the floor. One vote per user per night per location. "Anonymous" means publicly anonymous, not unlinked from account. Votes display as percentages, not named avatars (changed from v2).
- **Location data:** Voluntary check-ins, not passive tracking. The social contract is explicit: opt-in, used for live map and trending only, not sold.
- **Featured:** Paid placement with editorial responsibility (verified by venue, content responsibility on us). Currently empty on the marketing site with a partner-program pitch — keep it that way until real partners exist. An empty Featured section with a pitch is more honest than fake placeholders.
- **Trending visual treatment:** Heat bars, color-graded by intensity. No rank numbers. (Architecture for what feeds those bars is below under "v1 trending signal architecture.")
- **Geography:** South Coast Strip (Mirissa → Hiriketiya, seven sub-areas) is the hero geography. Other coasts exist but the strip carries the load on the marketing site and likely in the live product too, at least initially.
- **Trending + map data unification (Track 2 commitment).** The Track 1 South Coast strip dots and count numbers are heat-graded using the same color scale as the Trending bars — `getHeatColor(pct)` in `lib/tokens.js` (`> 80%` ember, `> 40%` ember-warm, else muted). A town's strip indicator and its Trending bar are the same datum rendered two ways. **Track 2 commitment:** trending and map stay unified at the data layer — one heat scale, one source — not two parallel ranking systems that drift over time.
- **Track 1 scaffolding executed (2026-05-02).** Option (a) shipped: Next.js App Router, per-component file structure under `components/`, CSS Modules per component, design tokens as CSS custom properties on `:root`, `next/font` for Fraunces / DM Mono / Familjen Grotesk. Tactical site decisions made during the migration: pills swept across the nav CTA (sharp + hairline ink border + ember hover), place-card tags, and phone area chips, in line with the existing aesthetic rule. Hero title clamp tightened to `clamp(48px, 14vw, 220px)` so the "The bay, / tonight." composition holds at 360px viewports. Vercel Analytics mounted in the root layout (no-op outside Vercel). Placeholder favicon (`app/icon.svg`): ember square with paper italic "V", serif fallback (Fraunces not baked into the SVG yet).
- **v1 trending signal architecture.** Trending is a **weighted composite**, not a single-source ranker, from day one: editorial picks 60% / venue partner signals 20% / calendar + seasonality 10% / weather 10%. Vote weight grows as real vote data accrues, displacing weight proportionally from the editorial input. **Track 2 architectural note:** the trending blender must be designed as a weighted multi-input system from the first commit, not a vote-count ranker that gets retrofitted with other inputs later. The blender architecture is what survives data sparsity.

### Product positioning (committed 2026-05-05)
1. **Audience: tourist-primary.** Vibe Lanka is designed for travelers visiting Sri Lanka. Locals welcome but not the design center — editorial voice, copy, and feature prioritization assume a traveler context. This shapes everything from hero copy to category prioritization (e.g., nightlife and events weighted over local-only utilities like long-term grocery delivery).
2. **Scope: venues + events as co-primary entities.** Both are first-class in the data model. Events have a foreign key to places. The UI surfaces both. The "Tonight" surface complements the existing Map / Trending / Featured pillars. Marketing copy positions Vibe Lanka as covering "the venues, parties, and pop-ups" without prioritizing one entity type over the other.
3. **Trending signal sources, v1 weighted blender:** editorial 60%, partner-supplied data 20%, calendar 10%, weather 10%. Google Trends as light background augmentation (country-level relative interest, weekly refresh, low weight). Instagram Graph API integration deferred to v2 pending sufficient connected-partner volume to justify Meta Business verification work. User votes/saves: `vote_weight=0.0` in v1, plumbing exists in schema, surface deferred until ~500–1000 weekly active users in a single neighborhood OR median venue has 5+ votes.
4. **Google/Apple OAuth on waitlist: deferred.** Waitlist remains email-only for v1. OAuth belongs in post-launch app authentication, not waitlist capture. Conversion optimization on waitlist to focus on mobile-first CTA placement, button text ("Get early access" vs "Join the waitlist"), and social-proof copy when signup numbers warrant.
5. **Geographic scope, v1: Colombo + South Coast + East Coast.** Three regions explicitly. North and West coasts deferred to v2. South Coast remains the depth focus per existing decisions; Colombo and East Coast added as breadth based on tourist-primary positioning and seasonal monsoon spread (East peaks May–Sep when South is in monsoon).

---

## 3. Open Flags (need decisions or specialist input)

**Founder decisions needed:**
- **Image rights — three founder photos integrated.** Three Place Card images (Smoke & Bitters, Ceylon Sliders, Salt House) replaced with founder's own photography at `public/images/venues/`. Four featured venues still on Unsplash placeholders (Dots Bay House, Galle Face Green, Kabalana Point, Hideaway). Source remaining photos before public marketing push.
- **Salt House image resolution.** `public/images/venues/salt-house.jpeg` is 400×300 — below retina sharpness for the card slot (~462px wide × 360px tall on desktop, full-width on mobile). Replace with a full-resolution original from the founder before launch.
- **Ceylon Sliders Ahangama / Weligama data discrepancy.** The signage in `public/images/venues/ceylon-sliders.jpeg` says **Weligama**. Current data (`lib/data/places.js` and `lib/data/trending.js`) says **Ahangama**. Resolve before launch — pick the correct location and update both files together.
- **Coasts dropdown — illustrated Sri Lanka map.** v1.1 work. Currently the Coasts dropdown is a text list (South / East / West / North + monsoon season). An illustrated map of Sri Lanka with coast highlights would lift it. Deferred unless the map becomes a credibility blocker.
- **Trending pillar cadence claims (2-min) still live in two places.** The description was fixed this session, but `metric="Live · updates every 2 min"` (`ThreeWaysToFind.jsx:28`) and the preview meta `Updated 2m ago · <LiveClock />` (`ThreeWaysToFind.jsx:46-48`) still claim a cadence we don't actually deliver. Resolve before launch.
- **Resend account ownership.** Account is under the founder's personal Gmail (`kavinu2004@gmail.com`), not the project Gmail (`vibelankaa@gmail.com`) or a shared team account. Migrate to a shared/project-owned account before any of: the buddy joins as a full collaborator, the project takes payment from partners, or the founder count exceeds two — whichever comes first.
- **Vercel project ownership.** Same concern, same scope. The `vibe-lanka` Vercel project lives under the founder's personal Vercel account. Migrate to a shared/team account on the same triggers as the Resend account.
- **Vercel Deployment Protection.** Hobby default is auth-gating per-deployment preview URLs. The public site at `vibelanka.com` is **not** auth-gated; only the deployment-specific `*.vercel.app` URLs are. Decide before formal launch whether to keep auth gating on previews (default, slightly safer) or disable it (easier for sharing preview URLs with the buddy or partners pre-launch).
- **Local dev env vars.** Resend env vars are scoped Production + Preview only on Vercel. Local `npm run dev` of the waitlist flow needs a `.env.local` with the same `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` values. Not blocking — just a one-time setup step.
- **OG image generation.** Marketing site has no OG image. Aspirational target: an editorial OG generated at build time per page. Likely depends on the Image rights decision (need brand photography to anchor the composition).
- **Favicon refinement.** Current `app/icon.svg` is a placeholder (ember square + serif-fallback italic "V"). Refinement options: bake a Fraunces subset into the SVG, hand-draw a "V" path so it renders identically across browsers, or pivot to a non-letterform mark.
- **Hero typography under review.** Fraunces is the current pick for the hero "The bay, tonight." composition. Candidate replacement: **Mileast Display Serif**. Decision pending side-by-side comparison with actual hero content. Founder is buying the desktop license separately and will test offline before committing — no implementation work this session.
- **Trending signal definition.** Partially resolved 2026-05-02 (see Product architecture decisions → v1 trending signal architecture). Still open: per-input data sources, update cadence, how vote-weight scales as real data accrues, how the partner-signal weight is computed, what "calendar + seasonality" inputs concretely include.
- **Curated-to-live transition design.** At 12 users the map is curated. At 12,000 it's live. The transition is a designed product moment — who decides when a town/venue flips from curated to live, and what does the visual treatment look like at each end?
- **Confidence display for sparse votes.** "47 votes, mostly from Hiriketiya regulars" vs "847 votes, distributed across the south coast" need different visual treatments. Open question: how aggressively do we expose the underlying confidence to users vs hide complexity?
- **Phone auth priority.** Worth doing for v1 for local-market accessibility, or defer to v2?
- **Partner program pitch.** The marketing site has a partner email — who reads that inbox, what's the response SLA, what's the actual onboarding flow when a venue replies?
- **Dark mode (system preference detection) deferred to its own design+engineering session.** `prefers-color-scheme: dark` detection is technically straightforward but requires a designed dark palette parallel to the current steel-blue + terracotta light palette — not just CSS variable swaps. Cream paper → dark gray (which shade?), steel-blue ink reads differently against dark, terracotta ember intensity shift, photography contrast — all real design decisions. Estimated 3–4 hours design + engineering when prioritized. Not blocking pre-launch.

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
- **Per-coast navigation surfaces.** The Coasts dropdown lists South / East / West / North with monsoon seasons, but every entry currently resolves to `#strip`. Per-coast pages and nav targets are Track 2 work — they need actual product surface (live presence by coast, area-specific trending) before navigation makes sense.

---

## 5. Decision History (append-only)

- **2026-05-02.** Decisions log created. Project state reconciled across three prior conversation threads. Web-first reaffirmed. Native build shelved. Marketing site is the current artifact; next build is the actual web app.
- **2026-05-02.** Repo audit performed by Claude Code (see `repo-audit-2026-05-02.md`). Findings: repo is a single 1,604-line unrunnable JSX file, no framework scaffolding. Committed: two-track split — Track 1 (ship marketing site as real Next.js project) before Track 2 (build the actual app). Surfaced new open flags: waitlist provider, hosting/domain ownership, image rights.
- **2026-05-02.** Track 1 scaffolding scope committed: option (a) — minimum-viable Next.js migration. Prototype splits into per-component files, CSS Modules for styling (Tailwind already rejected), working waitlist endpoint, design pixel-identical to current prototype. Resolves the (a) vs (b) open flag.
- **2026-05-02.** Waitlist provider committed: **Resend**. Captured emails route through a Next.js API route to a Resend audience. Reasons: minimal setup, transactional email available on the same provider for partner inquiry replies later, generous free tier sufficient for pre-launch volume, good Next.js DX. Requires `RESEND_API_KEY` env var; will be documented in `.env.example`.
- **2026-05-02 (continued).** Track 1 scaffolding completed and verified visually at 360 / 390 / 768 / 1024 / 1440 viewports. Pills swept (nav CTA, place-card tags, phone area chips). Mobile hero clamp tightened to `clamp(48px, 14vw, 220px)`. Vercel Analytics mounted. Placeholder favicon added. Coasts dropdown gained keyboard accessibility (focus open, Escape close, `aria-expanded` / `aria-haspopup` / `role="menu"`). Ready for content pass + Resend integration + Vercel deployment as next steps. v1 trending signal architecture decided as a weighted composite (60 / 20 / 10 / 10).
- **2026-05-03.** Nav wordmark localized to bilingual format: "Vibe ලංකා". Latin "Vibe" rendered in Fraunces italic; Sinhala "ලංකා" rendered in Noto Serif Sinhala (added via `next/font/google`, weight 400, sinhala subset). Single-instance — Sinhala script appears only in the navigation wordmark. Footer wordmark, body copy, nav labels, CTAs, and all other site copy remain English. Tamil version deferred until product expands to Tamil-majority regions. Optical defaults: Sinhala at `1.1em` of nav-logo size, `letter-spacing: 0` (overrides Latin's `-0.02em`), baseline-aligned via `inline-flex`.
- **2026-05-03 (continued).** Moving ticker (PhilosophyBar) replaced with a static editorial block on the same dark band — same seven principles, no animation, no duplication, centered wrapping layout. Reasons: animation distracted from editorial gravitas; static read is more confident. South Coast strip activity indicators (SVG dots and count numbers) heat-graded via `lib/tokens.js#getHeatColor` to match the Trending bar color scale (`> 80%` ember, `> 40%` ember-warm, else muted). Strip and Trending now read as the same data shown two ways. Confirmed Track 2 architectural commitment: trending and map share a single heat scale and data source. Hero typography under review — Mileast Display Serif as a candidate for the hero serif; founder buying desktop license separately for offline comparison against Fraunces. No hero changes this session. No mask hero element, no rotating photos — both deferred until further conversation.
- **2026-05-03.** Major work session. Brand pivot to steel-blue + terracotta palette committed after multi-iteration color experiment. PhilosophyBar removed, principles relocated inline. Three founder venue photos integrated. Mobile layout systematically fixed. Bilingual wordmark "Vibe ලංකා" live with Noto Serif Sinhala. `vibelanka.com` registered at Cloudflare with email forwarding for `partners@` / `team@` / `press@`. Trending description corrected for editorial honesty. Marketing site visually launch-ready pending: Resend integration smoke test, Vercel deployment, four remaining venue photos, Ceylon Sliders town data correction, Salt House full-resolution image.
- **2026-05-04 (early morning, continuation of 05-03 session).** Site deployed to production. Vercel Hobby project `vibe-lanka` connected to GitHub `main`. Custom domain `vibelanka.com` wired via Cloudflare DNS-only CNAME records (apex via flattening, `www` redirect). SSL auto-provisioned. Resend integration complete — audience created (id `0beb6685-c7af-4e27-a35b-90e8b64ec6f6`), API key generated, Vercel env vars configured (Production + Preview scopes), redeploy with cache cleared, smoke test passed end-to-end (form submission on live site captured contact in Resend audience). Resend account pending migration from founder personal email to shared/project account. PaperSwitcher dev tool removed in cleanup commit `4b6dc24` prior to deploy. Vibe Lanka is now publicly accessible and capturing real waitlist signups.
- **2026-05-05 (morning).** Architectural alignment session, both founders present. Five product positioning decisions committed: (1) tourist-primary audience, (2) venues + events co-primary scope, (3) v1 trending signal weighted blender (editorial 60% / partner 20% / calendar 10% / weather 10% + Google Trends augmentation, Instagram Graph API deferred, votes deferred), (4) Google/Apple OAuth deferred to post-launch app auth, (5) geographic scope Colombo + South Coast + East Coast for v1. Dark mode logged as Open Flag deferred to its own session. Marketing site copy work and palette saturation experiment scheduled for execution this session.
- **2026-05-06 (early morning, brand redirection session).** Brand redirection executed: palette shifted from steel-blue + terracotta to deeper teal-blue (`#177B9C`) + deep red (`#9C0505`) while keeping Fraunces × DM Mono × Familjen Grotesk typography. ContextSlide body compressed to single paragraph mentioning future community voting. FeatureExplainer deleted; ContextSlide takes over the "what it is" job. Sections renumbered 01→04 sequentially. Plan section body compressed; auto-routing detail clarified to mention walk/tuk-tuk/car. Manifesto rewritten — drops false-precision passive-tracking claim and Bali co-working line, replaced with "tourist guides go stale" framing plus a "three things" thesis paragraph clarifying paid-placement transparency. Yaka illustration provenance corrected — actual artist is Luca (Methni's friend), confirmed by Kavi; footer credit reads "Yaka illustration by Luca". Original work executed by Samithu in a prior session that was never pushed to origin; this session reconstructs it on Kavi's machine.
