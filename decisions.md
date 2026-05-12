# Vibe Lanka — Decisions Log

**Purpose.** This file is the source of truth for what's been decided, what's open, and what's deferred on Vibe Lanka. Read this first at the start of every conversation. Update it at the end of every substantive conversation. Memory in the chat product is patchy and summary-derived — this file is the actual continuity mechanism.

**How to use it.** When a decision is made, add it to the relevant section with a date and one-line reasoning. When a question is raised that can't be answered yet, add it to Open Flags. When something is consciously deferred ("v3 problem, not v1"), add it to Deferred. Don't re-litigate decisions in this log unless new information genuinely warrants it.

---

## 1. Current State (as of May 8, 2026)

**Built, deployed, and operational:**
- **Live at https://vibelanka.com.** `https://www.vibelanka.com` 307-redirects to apex. Vercel auto-deploys `main` on every push to GitHub.
- **Resend waitlist integration live and verified end-to-end.** Audience ID `0beb6685-c7af-4e27-a35b-90e8b64ec6f6` captures signups. Smoke-tested on the production site — form submission returned the success state and the contact landed in the Resend audience.
- **Email forwarding operational and verified** for `partners@`, `team@`, `press@` → `kavinu2004@gmail.com` via Cloudflare Email Routing. 4 received / 4 forwarded / 0 dropped per Cloudflare dashboard. Inbox monitoring: Kavi.
- The `vibe-lanka.jsx` prototype has been migrated to a real Next.js (App Router) project with CSS Modules and a component-split architecture. `npm run dev` serves at `http://localhost:3000`. Production build is clean (`npm run build` passes). Original prototype preserved at `archive/vibe-lanka-prototype.jsx` for reference.
- **Brand direction committed.** Current palette: teal-blue ink `#177B9C` + deep red ember `#9C0505` on cream paper. Bilingual wordmark "Vibe ලංකා" live in the nav (Noto Serif Sinhala via `next/font/google`). Hero typography: Fraunces (Mileast considered and rejected 2026-05-08).
- Marketing site content: desktop hero "The bay, tonight." in Fraunces; South Coast strip as horizontal geographic ribbon on desktop / vertical row stack on mobile (seven towns, heat-graded by relative activity); ContextSlide ("What you're signing up for") with Yaka illustration; three-pillar explainer (Map / Trending / Featured); embedded phone mockups for Map and Plan; partner pitch; manifesto; CTA with waitlist form; footer.
- **PhilosophyBar component removed.** Its principles relocated inline as small DM-Mono editorial notes: "LOCALS WROTE THIS" appended to the Manifesto kicker; "TRENDING IS NOT PAID" added under the trending preview head in ThreeWaysToFind; "FEATURED IS PAID, MARKED · NO PLACEHOLDER LISTINGS" added below the partner copy in PartnerSection.
- **Three founder venue photos integrated** at `public/images/venues/{smoke-and-bitters,ceylon-sliders,salt-house}.jpeg`. Note: Salt House image is 400×300 (below retina target); Ceylon Sliders signage shows Weligama (venue is actually in Ahangama; data is correct, photo needs replacement). Both flagged for replacement, not blocking Track 2 kickoff.
- **Trending pillar 2-min cadence claims swept across all three surfaces (2026-05-07).** No surviving "2 min" cadence references on the live site.
- **Architectural patterns committed:** full-bleed + inner-wrapper applied across all three editorial bands (SouthCoastShowcase, PartnerSection, CTA). `--rule-quiet` design token registered in `app/globals.css` for muted-grey 1px hairlines on paper backgrounds.
- Nav: The Coasts (hover/keyboard dropdown with monsoon seasons: South Nov–Apr, East May–Sep, West year-round, North Mar–Oct) / Trending / Venues / Get the app. Dropdown destinations resolve to `#strip` in v1 — per-coast pages are Track 2.
- Live clock fixed (no more SSR mismatch, ticks every 30s). Waitlist API route at `app/api/waitlist/route.js` is live. Vercel Analytics mounted in `app/layout.jsx`. Placeholder favicon at `app/icon.svg` pending refinement.
- **Site mailto routing:** PartnerSection card → `partners@`; CTA tinyPrint → `team@`; Footer Contact → `team@`; Footer Press → `press@`; Footer Become-featured → `partners@`.
- Subhead in Fraunces 22px regular (not the body sans).
- See `repo-audit-2026-05-02.md` for the pre-migration audit.

**Built but shelved:**
- Expo + React Native + TypeScript native app from an earlier thread. Mobile screens (Home magazine-masthead + Place Details with overlap title card). Supabase schema + seed for `places`. Not currently the active form factor. Treat as reference, not the path.

**Marketing site closeout status (2026-05-08):**
The marketing site is *substantively* structurally done. Track 2 kickoff is unblocked. Remaining marketing-site items run in parallel — see § 3 Open Flags. Items pending external dependencies (OG image SVG, favicon SVG, two replacement photos) have specs locked and Build Lead wire-up prompts pre-written; ship in a 30-minute Build Lead session the moment assets land.

**Promised by the marketing site, not yet built (Track 2 build queue):**
- The live map (real-time, GIS-driven)
- The voting system (one vote per user per night, anonymous or attributed, in-place on detail pages, percentages only)
- The itinerary planner (multi-stop days/weekends, realistic Sri Lankan travel times)
- Featured (paid placement, currently empty in marketing copy, awaiting partner program)
- Trending (heat bars driven by vote counts)
- All metadata: vibe tags, crowd type, price, noise, indoor/outdoor, view, time-of-day filters

---

## 2. Committed Decisions

### Aesthetic system (do not drift)
- **Type:** Fraunces (display serif, including italic) × DM Mono (technical voice, kickers, labels, coordinates, timestamps) × Familjen Grotesk (body and UI text). Earlier threads used Inter / Inter Tight as the sans — that has been superseded.
- **Hero typography committed (2026-05-08):** Fraunces. Mileast Display Serif considered as candidate replacement and rejected after offline comparison.
- **Wordmark:** Localized to bilingual format ("Vibe ලංකා") using Noto Serif Sinhala for the Sinhala script. Single-instance — does not propagate to other site copy. All body copy, navigation labels, CTAs, and content remain English. Tamil version deferred until product expands to Tamil-majority regions.
- **Color (committed 2026-05-08, future changes require explicit reopening):** Ink `#177B9C` (teal-blue) on paper `#F5F4F0`/cream variants. Ember accent `#9C0505` (deep red). Replaces earlier directions (`#D4471C` ember-on-cream → `#5A85A0` + `#D06A48` steel-blue + terracotta on 2026-05-03 → current). Three palette moves in four days; current direction is committed and any future palette change requires "we're reopening" framing rather than landing as a session decision.
- **Motion:** House easing `cubic-bezier(0.32, 0.72, 0, 1)`. State changes 150–250ms, entrances 400–600ms.
- **Spatial logic:** Editorial generous spacing for narrative surfaces, technical precise spacing for data surfaces. Match the function.
- **Layout flexes to accommodate artwork (committed 2026-05-08).** When an illustration's aspect ratio shifts on delivery, layout adapts to the artwork rather than re-cropping the asset. Forward-binding default for future Luca deliveries. Originated from the Yaka aspect ratio shift on 2026-05-07; promoted to committed precedent after bilateral founder alignment 2026-05-08.
- **Forbidden:** Rounded-full pill buttons. Drop shadows on cards. Gradient backgrounds. Three-feature-card grids. Lucide icons as default. Phone-frame mockups around mobile previews (caused a real bug in v1 — collapsed content to zero height — and is a smoothed-average aesthetic choice anyway).
- **Lift hero copy for derivative surfaces, don't write parallel copy (committed 2026-05-11).** Single source of truth principle. OG taglines, social cards, partner one-pagers lift "The bay, tonight." from the hero rather than writing surface-specific copy. Prevents drift between hero and derivative surfaces; OGs and similar are previews of the site, not parallel marketing.
- **Background should match the room being entered (committed 2026-05-11).** Any surface that previews the site (OG, share previews, partner-facing mockups) defaults to the site's dominant register — paper — rather than being styled "specially" with ink-tint or third register. The doorway should match the room.
- **Cultural-weight illustration earns its placement through editorial scaffolding (committed 2026-05-11).** The Yaka belongs to ContextSlide because the manifesto framing and Luca credit make it legible. Stripped of that scaffolding, it risks reading as exotic-Sri-Lanka-decoration. Structural brand elements (South Coast strip wave, wordmark, typographic register) carry standalone — that's the right anchor for OG-style derivative surfaces. Future illustration-driven assets follow the same rule: cultural-weight imagery needs the scaffolding; structural elements stand alone.

### Design token rules (committed 2026-05-08)
- **`--rule-quiet`** (`rgba(138, 133, 126, 0.35)`, `--muted` at 0.35 opacity): registered token for muted-grey 1px hairlines on paper backgrounds.
- **Decision rule for hairlines:** muted-grey divider register → `--rule-quiet`; cream divider register → `--paper-deep`; structural editorial rules → `--ink`. Future implementers reference the token, don't reach for `var(--ink)` reflexively.

### Architectural patterns (committed)
- **Full-bleed + inner-wrapper pattern (committed across all three editorial bands 2026-05-08).** When a section needs a tinted background that runs edge-to-edge with content constrained to 1400px: outer `<section>` carries the background only, inner `<div>` carries `max-width` + `padding`. Mobile padding override targets `.inner` not `.section`. Applied to SouthCoastShowcase (`01056de`, 2026-05-07), PartnerSection and CTA (`2869f77`, 2026-05-08). Future tinted-band sections inherit it.
- **OG composition principle (committed 2026-05-08).** OG visuals derive from existing site visual elements, not OG-specific assets. Marketing Lead's 2026-05-08 OG spec uses the South Coast strip wave (existing brand element from CoastStrip) rather than a new visual register. Future OG variants inherit this principle — strip wave, Yaka illustration, wordmark, palette tokens are the visual primitives; no parallel design language for share previews.

### Foundational principles (filter every feature through these)
1. **Data sparsity is the real problem.** Every feature must answer the "does this work with 12 users?" question. Itinerary works at 12 (single-user value); voting and live map don't (require crowd). Cold-start strategies required for crowd-features before they ship. Curated content with visually-distinct treatment is the bridge from zero to live.
2. **The competition is Instagram, not other apps.** Voting is the moat (produces signal Instagram can't). Featured tag must mean editorially-verified, not just paid. Aesthetic premium is a trust signal.
3. **Sri Lanka is the differentiator.** Geographic taxonomy reflects how people actually travel (South Coast Strip is one cognitive unit, Arugam Bay is a season, Ella is a vibe). Monsoon seasons drive defaults. Cultural calendar (poya, festivals, school holidays, surf seasons) shapes recommendations. Bilingual respect (English primary, Sinhala/Tamil secondary, Sinhala greeting on cultural occasions).

### Stack starting positions
- **Frontend:** Next.js (App Router) for production. Vercel for hosting. CSS Modules for styling — Tailwind rejected because variable font axes and per-element letter-spacing are load-bearing and Tailwind handles them awkwardly.
- **Maps:** Mapbox GL JS over Google Maps. Reasons: editorial-grade styling control, better pricing at low–medium volume, vector tiles align with the design language.
- **Backend:** Next.js API routes for early stage. Path to extract to dedicated services as load grows.
- **Database:** PostgreSQL with PostGIS extension. Supabase for managed Postgres + auth + realtime through Phase 2.
- **Realtime:** Supabase Realtime or Pusher. Do not build from scratch.
- **Auth:** Supabase Auth or Clerk. Email + Google + Apple at minimum. Phone auth for the local market is a real consideration.
- **Waitlist:** Resend Audiences (live, verified). POST → `/api/waitlist` → `resend.contacts.create({ audienceId, email })`. Migration to Supabase deferred to Track 2 trigger — when Supabase is provisioned for Track 2 app data, evaluate consolidating waitlist storage onto the same provider.
- **Analytics:** Vercel Analytics (`@vercel/analytics/next`). Mounted in the root layout. No-op outside Vercel deployments.

### Hosting / Operations (operational state, not just intent)
- **Hosting:** Vercel Hobby tier, project name `vibe-lanka`, deploying from `main` on `github.com:kavinu2004/VibeLanka.git`. Auto-deploys on every push.
- **Account ownership (committed 2026-05-08):** Vercel and Resend accounts both under Kavi's personal Gmail (`kavinu2004@gmail.com`), with Samithu sharing access via the same login. No team-account migration. Acknowledged tradeoffs: no per-founder audit trail in dashboard logs; account recovery hinges on Kavi's Gmail. Acceptable for two-founder pre-launch. Revisit if a third collaborator joins, billing complicates, or trust friction emerges between founders.
- **Vercel Deployment Protection (committed 2026-05-08):** keep current state. Production (`vibelanka.com`) open; preview URLs auth-gated. Sharing previews with non-Vercel-account folks will be friction if it comes up; revisit then.
- **Custom domain:** `vibelanka.com` is the apex (primary). `www.vibelanka.com` 307-redirects to apex. SSL auto-provisioned by Vercel (Let's Encrypt).
- **DNS:** Cloudflare DNS-only (gray cloud) for all Vercel-targeted records — apex CNAME via Cloudflare CNAME flattening, `www` CNAME to the same target. **Orange-cloud / proxy mode explicitly avoided** due to known SSL conflicts with Vercel's edge. Email-routing MX/TXT/SPF/DKIM records preserved through the cutover.
- **Production secrets:** `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` live only in Vercel env vars (Production + Preview scopes, marked Sensitive) and the founders' password managers. Not in the repo, not in `.env.example`. Development scope is intentionally empty — local dev of the waitlist needs a `.env.local` with the same values.

### Product architecture decisions
- **Two tracks, sequenced.** Track 1 = ship the marketing site (scaffold the prototype into a real Next.js project, deployable, with working waitlist + partner inquiry). Track 2 = build the actual app (live-presence backend, map UI, voting, itinerary). Track 1 substantively done as of 2026-05-08; Track 2 unblocked.
- **Web-first, app later.** Native build is shelved, not killed. The desktop marketing site is the current artifact; the next build is the actual web app, not a mobile app port.
- **Vote integrity:** Account-bound votes are the floor. One vote per user per night per location. "Anonymous" means publicly anonymous, not unlinked from account. Votes display as percentages, not named avatars (changed from v2).
- **Location data:** Voluntary check-ins, not passive tracking. The social contract is explicit: opt-in, used for live map and trending only, not sold.
- **Featured:** Paid placement with editorial responsibility (verified by venue, content responsibility on us). Currently empty on the marketing site with a partner-program pitch — keep it that way until real partners exist. An empty Featured section with a pitch is more honest than fake placeholders.
- **Trending visual treatment:** Heat bars, color-graded by intensity. No rank numbers. (Architecture for what feeds those bars is below under "v1 trending signal architecture.")
- **Geography:** South Coast Strip (Mirissa → Hiriketiya, seven sub-areas) is the hero geography. Other coasts exist but the strip carries the load on the marketing site and likely in the live product too, at least initially.
- **Trending + map data unification (Track 2 commitment).** The Track 1 South Coast strip dots and count numbers are heat-graded using the same color scale as the Trending bars — `getHeatColor(pct)` in `lib/tokens.js`. A town's strip indicator and its Trending bar are the same datum rendered two ways. **Track 2 commitment:** trending and map stay unified at the data layer — one heat scale, one source — not two parallel ranking systems that drift over time.
- **v1 trending signal architecture.** Trending is a **weighted composite**, not a single-source ranker, from day one: editorial picks 60% / venue partner signals 20% / calendar + seasonality 10% / weather 10%. Vote weight grows as real vote data accrues, displacing weight proportionally from the editorial input. **Track 2 architectural note:** the trending blender must be designed as a weighted multi-input system from the first commit, not a vote-count ranker that gets retrofitted with other inputs later. The blender architecture is what survives data sparsity.

### Product positioning (committed 2026-05-05)
1. **Audience: tourist-primary.** Vibe Lanka is designed for travelers visiting Sri Lanka. Locals welcome but not the design center — editorial voice, copy, and feature prioritization assume a traveler context.
2. **Scope: venues + events as co-primary entities.** Both are first-class in the data model. Events have a foreign key to places. The UI surfaces both.
3. **Trending signal sources, v1 weighted blender:** editorial 60%, partner-supplied data 20%, calendar 10%, weather 10%. Google Trends as light background augmentation. Instagram Graph API integration deferred to v2 pending sufficient connected-partner volume to justify Meta Business verification work. User votes/saves: `vote_weight=0.0` in v1, plumbing exists in schema, surface deferred until ~500–1000 weekly active users in a single neighborhood OR median venue has 5+ votes.
4. **Google/Apple OAuth on waitlist: deferred.** Waitlist remains email-only for v1. OAuth belongs in post-launch app authentication, not waitlist capture.
5. **Geographic scope, v1: Colombo + South Coast + East Coast.** North and West coasts deferred to v2.

---

## 3. Open Flags (need decisions or specialist input)

**Founder decisions needed:**

- **Salt House photo replacement.** `public/images/venues/salt-house.jpeg` is 400×300 (below retina sharpness for the ~462×360 desktop card slot). Founder-sourcing in progress 2026-05-11. Ceylon Sliders replacement shipped 2026-05-11. Not blocking Track 2 kickoff — runs in parallel during early Track 2 work.

- **OG image + favicon production pending.** Marketing Lead specs locked (2026-05-08). Build Lead wire-up prompts pre-written. Founder produces SVGs in Figma with Fraunces installed (free tier sufficient since not using MCP), or Luca produces, or any real-tool path. Ships in 30-minute Build Lead session the moment SVGs land. Not blocking Track 2 kickoff. Chat-direct SVG output considered and rejected: pulling Fraunces glyphs at specific variable-font axis values is a font-tooling task; "approximately Fraunces" on brand-defining typographic surfaces undercuts the editorial-precision the brand has committed to.

- **Partner program operational readiness — partial closure.** Inbox monitoring resolved 2026-05-08 (Kavi reads `partners@`/`team@`/`press@`). Two pieces still open: (a) response SLA — default suggestion is "within 48h weekdays, longer weekends," defensible without over-promising; (b) onboarding flow when a venue replies — vetting questionnaire, rate sheet, case-by-case negotiation. Bilateral founder discussion needed before formal launch promotion. Not blocking Track 2 kickoff.

- **Trademark search for "Vibe Lanka" — Sri Lanka + key tourist-origin markets.** Cheapest of the specialist consultations and the only one with launch-adjacent risk (someone else registers the name first). A few hundred dollars, real trademark lawyer in actual jurisdictions. Worth doing before formal launch promotion. Not blocking Track 2 kickoff.

- **Coasts dropdown — illustrated Sri Lanka map.** v1.1 work. Currently the Coasts dropdown is a text list (South / East / West / North + monsoon season). An illustrated map of Sri Lanka with coast highlights would lift it. Deferred unless the map becomes a credibility blocker.

- **"1,124 now in Hiri" South Coast Stat — illustrative seed data, no live source.** Cadence claim attached to the Stat was removed 2026-05-07 (commit `f61780c`). Underlying number is fictional seed data presented in a Stat that implies live presence. Decision deferred until Track 2 blender wiring: at that point, decide whether the Stat displays a heat percentage (matches what the blender produces), an illustrative-with-honest-label count, or gets dropped from the section.

- **ContextSlide mid-desktop viewport pinch (900–1200px).** Yaka illustration renders ~57px wider than original at the same height. Founder verified at deploy and approved; deliberate eyeball at 1024 / 1100 / 1200 still warranted. If it pinches, fix is lowering `width: 52vw` on `.illustration` in `ContextSlide.module.css` — not re-cropping the asset.

- **Yaka source asset optimization (2.4MB).** `next/image` handles delivery optimization, but the source weight stays in git history forever. Marketing Lead recommends requesting an optimized export from Luca (600–900KB target, no visible quality loss) or committing a 1024px-max-width version. Not blocking.

- **Trending signal definition.** Partially resolved 2026-05-02 (see Product architecture decisions → v1 trending signal architecture). Still open: per-input data sources, update cadence, how vote-weight scales as real data accrues, how the partner-signal weight is computed, what "calendar + seasonality" inputs concretely include.

- **Curated-to-live transition design.** At 12 users the map is curated. At 12,000 it's live. The transition is a designed product moment — who decides when a town/venue flips from curated to live, and what does the visual treatment look like at each end?

- **Confidence display for sparse votes.** "47 votes, mostly from Hiriketiya regulars" vs "847 votes, distributed across the south coast" need different visual treatments. Open question: how aggressively do we expose the underlying confidence to users vs hide complexity?

- **Phone auth priority.** Worth doing for v1 for local-market accessibility, or defer to v2?

- **Dark mode (system preference detection) deferred to its own design+engineering session.** `prefers-color-scheme: dark` detection is technically straightforward but requires a designed dark palette parallel to the current light palette — not just CSS variable swaps. Estimated 3–4 hours design + engineering when prioritized. Not blocking pre-launch.

**Specialist consultations required (do not YOLO):**
- **Sri Lankan PDPA (Personal Data Protection Act No. 9 of 2022).** Compliance requires data inventory, lawful basis for processing, user rights mechanisms, possible DPO appointment, cross-border transfer rules. Trigger: when processing real user data at scale.
- **Payment rails for Featured monetization.** Sri Lankan local payment infrastructure differs from Stripe-default assumptions. Trigger: when charging Featured partners.
- **Production security architecture.** When the product hits real traffic with real PII, security review is a specialist job, not a project-lead job.
- **GIS performance at scale.** PostGIS is fine for Phase 1–2. Phase 3 (10k+ users, dense map queries) needs a specialist.
- **Trademark / IP for the Vibe Lanka name.** See above under founder decisions.

---

## 4. Explicitly Deferred (v3 problems, not v1)

- **Custom Mapbox styling.** Default styling for launch. Custom only after data validates demand.
- **Custom auth flow.** Supabase Auth out-of-the-box for v1.
- **Native mobile app.** Web-first. Native is post-launch.
- **Multi-language UI.** English-primary for v1. Sinhala/Tamil surface elements (greeting cards, festival moments) before full localization.
- **Advanced fraud / Sybil detection.** Account-bound votes + IP reputation for v1. Device fingerprinting and behavioral fraud detection deferred until vote manipulation actually happens.
- **Architecture extraction from Next.js API routes.** Stays monolithic until load forces the split.
- **Phase 3 infrastructure (10k+ users).** Re-evaluate when we get close.
- **Per-coast navigation surfaces.** Track 2 work, needs actual product surface first.
- **Build-time / runtime OG generation per page.** v1.1 question. Single homepage OG sufficient for now.
- **Figma MCP integration for design tooling.** Considered 2026-05-08 for OG/favicon production; deferred. ~$360/year + setup overhead not justified for two assets. Revisit when Track 2 starts producing volume design assets.

---

## 5. Decision History (append-only)

- **2026-05-02.** Decisions log created. Project state reconciled across three prior conversation threads. Web-first reaffirmed. Native build shelved. Marketing site is the current artifact; next build is the actual web app.
- **2026-05-02.** Repo audit performed by Claude Code (see `repo-audit-2026-05-02.md`). Findings: repo is a single 1,604-line unrunnable JSX file, no framework scaffolding. Committed: two-track split — Track 1 (ship marketing site as real Next.js project) before Track 2 (build the actual app).
- **2026-05-02.** Track 1 scaffolding scope committed: option (a) — minimum-viable Next.js migration. Prototype splits into per-component files, CSS Modules for styling (Tailwind rejected), working waitlist endpoint, design pixel-identical to current prototype.
- **2026-05-02.** Waitlist provider committed: **Resend**. Captured emails route through a Next.js API route to a Resend audience.
- **2026-05-02 (continued).** Track 1 scaffolding completed and verified. Pills swept (nav CTA, place-card tags, phone area chips). Vercel Analytics mounted. Placeholder favicon added. Coasts dropdown gained keyboard accessibility. v1 trending signal architecture decided as a weighted composite (60 / 20 / 10 / 10).
- **2026-05-03.** Nav wordmark localized to bilingual format: "Vibe ලංකා" (Latin Fraunces italic + Sinhala Noto Serif Sinhala). Single-instance — Sinhala script appears only in the navigation wordmark.
- **2026-05-03 (continued).** Moving ticker (PhilosophyBar) replaced with a static editorial block. South Coast strip activity indicators heat-graded via `lib/tokens.js#getHeatColor`. Track 2 architectural commitment: trending and map share a single heat scale and data source.
- **2026-05-03.** Major work session. Brand pivot to steel-blue + terracotta palette committed. PhilosophyBar removed, principles relocated inline. Three founder venue photos integrated. Mobile layout systematically fixed. `vibelanka.com` registered at Cloudflare with email forwarding for `partners@` / `team@` / `press@`. Trending description corrected for editorial honesty.
- **2026-05-04.** Site deployed to production. Vercel Hobby project `vibe-lanka` connected to GitHub `main`. Custom domain `vibelanka.com` wired via Cloudflare DNS-only CNAME records. SSL auto-provisioned. Resend integration complete and smoke-tested. Vibe Lanka publicly accessible and capturing real waitlist signups.
- **2026-05-05.** Architectural alignment session, both founders present. Five product positioning decisions committed: tourist-primary audience; venues + events co-primary scope; v1 trending signal weighted blender; OAuth deferred to post-launch app auth; geographic scope Colombo + South Coast + East Coast for v1.
- **2026-05-06.** Brand redirection: palette shifted from steel-blue + terracotta to teal-blue (`#177B9C`) + deep red (`#9C0505`) while keeping Fraunces × DM Mono × Familjen Grotesk typography. ContextSlide compressed. FeatureExplainer deleted. Manifesto rewritten ("tourist guides go stale"). Yaka illustration credit corrected to Luca.
- **2026-05-07 (long session, six commits to main, prod live).** Marketing Lead landed four brand-voice / hairline calls; Build Lead executed and pushed.

  Commits shipped (origin/main):
  1. `ab3bbea` — feat(tooling): codebase snapshot script for Build Lead chat context.
  2. `01056de` — fix(south-coast-showcase): full-bleed `--paper-deep` tint via inner-wrapper pattern. Removed visible color seam at viewports >1400px.
  3. `f61780c` — fix(copy): removed false 2-min cadence claims from three surfaces (TRENDING `<FindBlock>` metric, trending preview meta, SouthCoast third Stat). Closes the cadence open flag from 2026-05-02.
  4. `4575dc7` — fix(coast-strip): removed `border-bottom: 1px solid var(--ink)` on `.labels`.
  5. `83b23cc` — fix(south-coast-showcase): softened `.stats` divider from `var(--ink)` to muted-low-opacity.
  6. `85be228` — chore(assets): replaced `yaka.png` (1024×1536, was 723×1280). **Asset replacement was the actual fix for the original grey-hairline bug** — the line was a baked-in pixel artifact in the source PNG, not a CSS issue.

  Aligned: Kavi this session, Samithu looped in.

- **2026-05-07 (architectural pattern: full-bleed + inner-wrapper).** Pattern provisionally committed; PartnerSection and CTA flagged as same bug class for follow-up. Promoted to fully-committed pattern across all three editorial bands on 2026-05-08.

- **2026-05-08 (long session, marketing-site closeout pass).** Worked across Project Lead, Marketing Lead, Build Lead. Two commits shipped to origin/main; multiple committed decisions resolved or promoted from Open Flag.

  Commits shipped (origin/main):
  1. `2869f77` — fix(layout): applied full-bleed inner-wrapper pattern to PartnerSection and CTA, identical to `01056de` (SouthCoastShowcase). Outer `<section>` carries background; inner `<div>` carries max-width + padding. **Closes Open Flag from 2026-05-07** ("PartnerSection + CTA same bug class"). Side effect: CTA inner content now caps at 1400px where it previously had no ceiling — founder eyeballed at deploy and approved.
  2. `a397dc1` — refactor(tokens): introduced `--rule-quiet` design token (`rgba(138, 133, 126, 0.35)` — `--muted` at 0.35 opacity). Applied to `.stats` (SouthCoastShowcase), `.summary` top + bottom (PhoneMockup). `.features` top in PlanShowcase moved to `var(--paper-deep)` per Marketing Lead's local-consistency call. **Closes Open Flag from 2026-05-07** ("Editorial-vs-structural rule sweep").

  Founder calls finalized this session (promoted from Open Flag to committed):
  - **Hero typography: Fraunces.** Mileast Display Serif considered and rejected. Closes the Open Flag from 2026-05-03.
  - **Palette stability: `#177B9C` + `#9C0505` is the committed palette.** Future palette changes require explicit "we're reopening" framing rather than landing as a session decision. Closes the Open Flag from 2026-05-07.
  - **"Layout flexes to accommodate artwork" — committed precedent for future Luca deliveries.** Closes the Open Flag from 2026-05-07.
  - **Ceylon Sliders Ahangama/Weligama discrepancy resolved as photo-not-data.** Venue is in Ahangama; data files are correct. The Weligama signage means the photo doesn't represent Ceylon Sliders — replacement photo needed. Closes the Open Flag from 2026-05-02 on the data-vs-photo question; new flag opens for the photo replacement itself.
  - **Vercel Deployment Protection: keep current state.** Production stays open; previews stay auth-gated.
  - **Vercel + Resend account ownership: shared single account, no migration.** Acceptable for two-founder pre-launch. Closes the Open Flags from 2026-05-02 on Vercel + Resend ownership migration.
  - **Resend → Supabase waitlist migration deferred to Track 2 trigger.** Resend stays as waitlist backend through MVP launch.
  - **Email forwarding diagnostic resolved.** Cloudflare confirms 4 received / 4 forwarded / 0 failed. Inbox monitoring: Kavi.

  Architectural patterns committed:
  - **`--rule-quiet` token** registered in `app/globals.css`. Decision rule: muted-grey divider register → `--rule-quiet`; cream divider register → `--paper-deep`; structural editorial rules → `--ink`.
  - **Full-bleed + inner-wrapper pattern** promoted from "candidate pattern with one application" to "committed structural pattern across editorial bands." Now applied to SouthCoastShowcase, PartnerSection, and CTA.
  - **OG composition principle:** OG visuals derive from existing site visual elements, not OG-specific assets. Marketing Lead's 2026-05-08 OG spec uses the South Coast strip wave rather than a new visual register.

  Aligned: Kavi this session. Samithu looped in.

- **2026-05-08 (Marketing Lead OG + favicon spec produced; production deferred to real-tool path).** Marketing Lead delivered tight specs for both the OG image (1200×630, paper background, "The bay, tonight." in Fraunces with line break, South Coast strip wave rotated vertical with seven heat-graded dots) and the favicon (option (a) — Fraunces italic V baked into SVG, same axes as nav wordmark). Chat-direct SVG output considered and rejected: pulling Fraunces glyphs at specific variable-font axis values is a font-tooling task. Both assets logged in `release-checklist.md` under "ready to ship pending assets" — Marketing Lead spec is locked, Build Lead wire-up prompt pre-written, ships in a 30-minute session the moment real-tool-produced SVGs land. Aligned: Kavi this session, Samithu looped in.
- **2026-05-11 (operational consolidation + hygiene pass).** Project structure consolidated and three operational items closed.

  Project consolidation: Five Claude Projects collapsed to two. The four planning-and-build Projects (Project Lead, Build Lead, Marketing Lead, Checklist Lead) and Scratch consolidated into a single "Vibe Lanka" Project. Ops Lead remains in its own separate Vibe Lanka - Ops Project for operational isolation (credentials, account ownership, infrastructure decisions). Role invocation moved from Project-level system prompts to chat-level invocation against a shared `roles.md` in the consolidated Project's knowledge — start each new chat with the role name as the first line. Memory snapshots from the four pre-consolidation role chats preserved as `<role>-memory-2026-05-09.md` files in project knowledge. Original Projects archived (not deleted) for recovery.

  Considered and rejected:
  - Single consolidated Project including Ops — rejected because Track 2 will fan out Ops's surface (Supabase, payments, PDPA), and isolating credential-handling chats from planning-and-build chats is operationally cleaner.
  - Keeping the five-Project structure — rejected because the file re-upload friction (every substantive session re-uploaded 4 files × 5 Projects = 20 upload actions) wasn't paying back the role isolation benefit, especially since all five Projects carried the same reference files.

  Aligned: Both founders. Samithu proposed the pattern (imported from PilotOS); Kavi drove the execution.

  Three editorial voice principles applied across Track 1 promoted to committed (see Section 2 Aesthetic system):
  - Lift hero copy for derivative surfaces, don't write parallel copy
  - Background should match the room being entered
  - Cultural-weight illustration earns its placement through editorial scaffolding

  Other items resolved this session:
  - **Gmail "Send mail as" configuration shipped** for `partners@`, `team@`, `press@` aliases (all routing through `vibelankaa@gmail.com` via Gmail SMTP with app password). Reply behavior set to "Reply from the same address the message was sent to." Tested end-to-end. Closes the Open Flag from 2026-05-08.
  - **Ceylon Sliders photo replaced** with correct Ahangama venue image (commit `37a1c21`). Closes half of the Salt House + Ceylon Sliders Open Flag.

  Aligned: Kavi this session, Samithu looped in.
