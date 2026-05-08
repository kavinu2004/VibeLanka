# Vibe Lanka — Release Checklist

Last updated: 2026-05-09

This file tracks remaining work to ship Vibe Lanka. The near-term milestone is **marketing site formal launch** — the point where we actively promote the site and treat the waitlist as live capture. Track 2 (the actual app build) is logged at the bottom for visibility but not actively tracked here.

**How to use this file:**
- Move items between sections as their state changes
- When claiming an item, move it to "In progress" and add your name as Owner
- When done, move it to "Done" with the commit SHA, your name, and date
- Re-upload this file to all five Projects after every commit

---

## In progress

*(items currently being worked on)*

— *empty —*

---

## Ready to pick up

*(actionable now, no decision needed first)*

### Visual / Asset

- [ ] **Salt House image resolution.** Replace `public/images/venues/salt-house.jpeg` (currently 400×300, below retina sharpness) with a full-resolution original from the founder.
  - Owner: unclaimed
  - Notes: card slot is ~462px wide × 360px tall on desktop, full-width on mobile

- [ ] **Source remaining venue photos.** Four featured venues still on Unsplash placeholders: Dots Bay House, Galle Face Green, Kabalana Point, Hideaway. Get founder-owned imagery before public marketing push.
  - Owner: unclaimed

- [ ] **Yaka source asset optimization.** Current `yaka.png` is 2.4MB (up from 384KB). Request optimized export from Luca (target 600–900KB, no visible quality loss) or commit a 1024px-max-width version. Source weight stays in git history forever once committed.
  - Owner: unclaimed

### Code / Layout

- [ ] **Section seam pattern: PartnerSection and CTA.** Apply the inner-wrapper pattern from commit `01056de` to `components/PartnerSection.jsx` (dark `--ink` band) and `components/CTA.jsx` (`--paper-warm` band). Both have `max-width: 1400px` + tinted background on the same `<section>` element — same color seam visible at viewports >1400px as the bug already fixed in SouthCoastShowcase.
  - Owner: unclaimed
  - Held as separate commits so the pattern can be visually verified across viewport widths and Marketing Lead can sign off on structural changes to two higher-stakes editorial surfaces

### Infra / Operations

- [ ] **Local dev env vars setup.** Add `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` to `.env.local` so `npm run dev` of the waitlist flow works locally. One-time setup per founder machine.
  - Owner: each founder does on their own machine

- [ ] **Vercel Deployment Protection decision and config.** Decide whether to keep auth-gating on preview URLs (default, slightly safer) or disable it (easier for sharing previews pre-launch). Configure accordingly.
  - Owner: unclaimed
  - Notes: production site at `vibelanka.com` is not auth-gated either way; only `*.vercel.app` URLs are affected

---

## Blocked / awaiting decision

*(needs Project Lead call before Build Lead can produce a prompt)*

- [ ] **Ceylon Sliders Ahangama / Weligama discrepancy.** Photo signage in `public/images/venues/ceylon-sliders.jpeg` says Weligama. Data in `lib/data/places.js` and `lib/data/trending.js` says Ahangama. Must be resolved before launch.
  - Blocked by: factual confirmation from founder (which town is the venue actually in?)
  - Likely answer: photo wins (signage is hard evidence) → update data in two files. But needs founder confirmation first.

- [ ] **Palette stability check.** Three palette moves in four days (May 3, May 6). Current palette is committed and live. Open question for both founders: is the May 6 palette *the* palette, or a third iteration still cooling? If committed, name it explicitly so future palette changes require "we're reopening" framing rather than landing as a session decision.
  - Blocked by: deliberate two-founder conversation
  - Owner: both founders

- [ ] **"Layout flexes to accommodate artwork" precedent.** Forward-binding rule for future Luca deliveries. Marketing Lead recommends layout flexes to artwork; Project Lead notes some surfaces (hero, partner band, CTA) have load-bearing typographic compositions where re-cropping is the correct answer. Need to name what classes of surface get "layout flexes" vs "artwork re-crops."
  - Blocked by: explicit two-founder sign-off
  - Owner: both founders

- [ ] **Editorial-vs-structural rule sweep.** Two more `1px solid var(--ink)` borders flagged out-of-scope on 2026-05-07: `.summary` in `PhoneMockup.module.css` (top + bottom rules around STARTS/ENDS/STOPS) and `.features` top in `PlanShowcase.module.css`. May or may not have the same 1px-on-paper issue that drove the CoastStrip and SouthCoastShowcase calls.
  - Blocked by: Marketing Lead review of whether each rule is structural or decorative
  - Owner: unclaimed (awaiting Marketing Lead pass)

- [ ] **Trending pillar 2-min cadence claims removal — final copy.** Already partially fixed (commit `f61780c`). Remaining cleanup: confirm replacement strings for any surviving cadence references match the editorial-honesty principle.
  - Blocked by: Project Lead confirmation that f61780c closed this fully, or identification of remaining surfaces
  - Notes: was logged as closed on 2026-05-07; verify before checking off

- [ ] **Partner program pitch — operational readiness.** Marketing site has `partners@vibelanka.com` as a contact. Need to define: who reads that inbox, what's the response SLA, what's the actual onboarding flow when a venue replies?
  - Blocked by: founder decision on partner-flow ownership
  - Owner: unclaimed

- [ ] **Hero typography — Mileast vs Fraunces.** Founder testing Mileast Display Serif as candidate replacement for Fraunces in the hero. Decision pending offline comparison.
  - Blocked by: founder side-by-side test with desktop license
  - Owner: Kavi (license purchase + offline test)

---

## Pre-launch hygiene checks

*(things to verify or polish before formal launch announcement)*

- [ ] **OG image generation.** No OG image currently. Aspirational target: editorial OG generated at build time per page. Likely depends on Image Rights resolution (need brand photography to anchor composition).
  - Blocked by: image rights for featured venues

- [ ] **Favicon refinement.** Current `app/icon.svg` is a placeholder (ember square + serif-fallback italic "V"). Refinement options: bake a Fraunces subset into the SVG, hand-draw a "V" path, or pivot to a non-letterform mark.
  - Owner: unclaimed

- [ ] **"1,124 now in Hiri" South Coast Stat.** Illustrative seed data, no live source. Cadence claim removed 2026-05-07. Decision deferred until Track 2 blender wiring: heat percentage, illustrative-with-honest-label count, or drop entirely.
  - Blocked by: Track 2 trending blender architecture

- [ ] **ContextSlide mid-desktop viewport pinch (900–1200px).** New Yaka illustration renders ~57px wider than original. Founder verified at deploy and approved; deliberate eyeball at 1024 / 1100 / 1200 still warranted. Fix if needed: lower `width: 52vw` on `.illustration` in `ContextSlide.module.css` (do not re-crop asset).
  - Owner: unclaimed (visual QA pass)

- [ ] **Coasts dropdown — illustrated Sri Lanka map.** Currently text list (South / East / West / North + monsoon season). Illustrated map with coast highlights would lift it. v1.1 work — deferred unless map becomes a credibility blocker.
  - Owner: unclaimed (low priority)

---

## Operational migrations

*(infra ownership, security, and account hygiene before formal launch)*

- [ ] **Resend account ownership migration.** Account currently under Kavi's personal Gmail (`kavinu2004@gmail.com`). Migrate to shared/project-owned account (`vibelankaa@gmail.com` or team account) before any of: Samithu joins as full collaborator, project takes payment from partners, founder count exceeds two.
  - Owner: unclaimed (Ops Lead can scope)
  - Trigger: any of the three conditions above

- [ ] **Vercel project ownership migration.** Same concern as Resend. `vibe-lanka` project lives under Kavi's personal Vercel account. Migrate to shared/team account on the same triggers.
  - Owner: unclaimed (Ops Lead can scope)

- [ ] **Email forwarding diagnostic.** Forwarding from `partners@` / `team@` / `press@` → `kavinu2004@gmail.com` may be broken. Cloudflare config or destination verification issue, never fully diagnosed.
  - Owner: unclaimed (Ops Lead)

---

## Done

*(keep this section append-only; oldest at top)*

- [x] **2026-05-02** — Track 1 scaffolding: Next.js App Router, per-component file structure, CSS Modules, design tokens as CSS custom properties, next/font for typefaces. Vercel Analytics mounted. Placeholder favicon. Coasts dropdown keyboard accessibility.
- [x] **2026-05-03** — Brand pivot to steel-blue + terracotta palette (since superseded). Bilingual wordmark "Vibe ලංකා" with Noto Serif Sinhala. PhilosophyBar removed. Three founder venue photos integrated. Trending description honesty fix.
- [x] **2026-05-04** — Site deployed to production. Custom domain `vibelanka.com` wired via Cloudflare DNS-only CNAME. SSL auto-provisioned. Resend integration end-to-end (audience id `0beb6685-c7af-4e27-a35b-90e8b64ec6f6`). Smoke test passed.
- [x] **2026-05-06** — Brand redirection: palette to teal-blue `#177B9C` + deep red `#9C0505`. ContextSlide compressed. FeatureExplainer deleted, sections renumbered 01→04. Plan section compressed. Manifesto rewritten ("tourist guides go stale"). Yaka credit corrected to Luca.
- [x] **2026-05-07** — Six commits: codebase snapshot script (`ab3bbea`), full-bleed inner-wrapper pattern on SouthCoastShowcase (`01056de`), 2-min cadence claims removed (`f61780c`), CoastStrip border removed (`4575dc7`), SouthCoast stats divider softened (`83b23cc`), Yaka asset replaced (`85be228` — actual fix for grey-hairline bug).
- [x] **2026-05-09** — `CLAUDE.md` updated to reflect Samithu's new repo path `~/Desktop/VibeLanka` (`29a1a24`).

---

## Deferred (post-launch / v3)

*(explicitly punted; do not work on without reopening)*

- [ ] **Dark mode** — its own design + engineering session, ~3-4 hours when prioritized. Not blocking pre-launch.
- [ ] **Custom Mapbox styling** — default styling for launch. Custom only after data validates demand.
- [ ] **Custom auth flow** — Supabase Auth out-of-the-box for v1.
- [ ] **Native mobile app** — web-first. Native is post-launch.
- [ ] **Multi-language UI** — English-primary for v1. Sinhala/Tamil surface elements (greeting cards, festival moments) before full localization.
- [ ] **Advanced fraud / Sybil detection** — account-bound votes + IP reputation for v1. Device fingerprinting deferred until vote manipulation actually happens.
- [ ] **Architecture extraction from Next.js API routes** — stays monolithic until load forces the split.
- [ ] **Phase 3 infrastructure (10k+ users)** — re-evaluate when we get close.
- [ ] **Per-coast navigation surfaces** — Track 2 work, needs actual product surface first.

---

## Specialist consultations needed

*(do not YOLO; specialist required before this can ship)*

- [ ] **Sri Lankan PDPA compliance** — Personal Data Protection Act No. 9 of 2022. Data inventory, lawful basis for processing, user rights mechanisms, possible DPO appointment, cross-border transfer rules. Needs Sri Lankan privacy counsel.
- [ ] **Payment rails for Featured monetization** — Sri Lankan local payment infrastructure differs from Stripe-default assumptions. Needs payments specialist familiar with local market.
- [ ] **Production security architecture** — when product hits real traffic with real PII, security review is a specialist job.
- [ ] **GIS performance at scale** — PostGIS fine for Phase 1–2. Phase 3 (10k+ users, dense map queries) needs a specialist.
- [ ] **Trademark / IP for Vibe Lanka name** — verify availability in Sri Lanka and key tourist-origin markets before money goes into the brand.

---

## Future / Track 2 (the actual app)

*(not actively tracked here; for visibility only — Track 2 gets its own checklist when scoped)*

- The live map (real-time, GIS-driven)
- The voting system (one vote per user per night, anonymous or attributed, in-place on detail pages, percentages only)
- The itinerary planner (multi-stop days/weekends, realistic Sri Lankan travel times)
- Featured (paid placement, currently empty in marketing copy, awaiting partner program)
- Trending (heat bars driven by vote counts)
- All metadata: vibe tags, crowd type, price, noise, indoor/outdoor, view, time-of-day filters
- v1 trending signal architecture wiring (editorial 60% / partner 20% / calendar 10% / weather 10%)
- Curated-to-live transition design (12 users → 12,000 users visual treatment)
- Confidence display for sparse votes
- Phone auth priority decision (v1 vs v2)
