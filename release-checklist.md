# Vibe Lanka — Release Checklist

**Purpose.** Asynchronous work tracker for what's left to ship. Both founders pick up items as bandwidth allows; no pre-assigned owners. Pre-launch items are launch-blockers for promoting the marketing site and opening the partner channel. Track 2 items are the actual app build — listed for visibility, not for current execution.

**How to use it.** Update status inline as items move (`[ ]` → `[~]` in progress → `[x]` done). When done, leave the line; don't delete. If a new item surfaces mid-session, add it to the relevant category. If an item resolves an Open Flag in `decisions.md`, update `decisions.md` in a separate commit — this file is execution tracking, not the source of truth for decisions.

**Status legend.**
- `[ ]` — not started
- `[~]` — in progress
- `[x]` — done
- `[!]` — blocked (note blocker inline)
- `[-]` — deferred / out of current scope

---

## Content

Asset and data accuracy. Things that would be embarrassing or factually wrong if launched as-is.

- [ ] Source four remaining venue photos to replace Unsplash placeholders: Dots Bay House, Galle Face Green, Kabalana Point, Hideaway. Update `lib/data/places.js` and `lib/data/trending.js` references where applicable.
- [ ] Replace `public/images/venues/salt-house.jpeg` with full-resolution original. Current 400×300 is sub-retina for the card slot (~462×360 desktop, full-width mobile).
- [ ] Resolve Ceylon Sliders Ahangama / Weligama discrepancy. Signage in photo says Weligama; `lib/data/places.js` and `lib/data/trending.js` say Ahangama. Pick correct location, update both files in a single commit.
- [ ] Yaka source asset optimization. Current `public/images/illustrations/yaka.png` is 2.4MB (was 384KB). Request optimized export from Luca targeting 600–900KB, or commit a 1024px-max-width version. `next/image` handles delivery but source weight stays in git history forever.
- [-] "1,124 now in Hiri" Stat displays fictional seed data as live presence. Deferred to Track 2 blender wiring — at that point, decide whether the Stat displays a heat percentage, an illustrative-with-honest-label count, or gets dropped.

## Brand

Visual stability, design system consistency, unresolved aesthetic calls.

- [ ] **Palette stability check.** Three palette moves in four days. Current teal `#177B9C` + deep red `#9C0505` is committed and live. Both founders need to explicitly sign off that this is *the* palette, not a third iteration still cooling. If committed: name it so future palette changes require "we're reopening" framing. If still cooling: name what would need to be true for a palette to feel committed.
- [ ] **"Layout flexes to accommodate artwork" precedent.** Marketing Lead surfaced 2x on 2026-05-07 as default for future Luca deliveries. Yaka swap shipped as one-time call; precedent needs bilateral sign-off before becoming a Committed Decision. When Samithu has bandwidth: name what classes of surface get "layout flexes" vs "artwork re-crops" (hero, partner band, CTA likely the latter).
- [ ] **Hero typography decision.** Fraunces is current; Mileast Display Serif is candidate. Founder buying desktop license separately for offline comparison. No implementation work until decision lands.
- [ ] **Section seam pattern — apply to PartnerSection and CTA.** Same `max-width: 1400px` + tinted background on `<section>` issue that was fixed for SouthCoastShowcase in `01056de`. Same color seam visible at viewports >1400px. Apply inner-wrapper pattern. Hold as separate commits per section so Marketing Lead can sign off on structural changes to higher-stakes editorial surfaces.
- [ ] **ContextSlide mid-desktop pinch verification (900–1200px).** New Yaka illustration ~57px wider than original. Eyeball at 1024 / 1100 / 1200 viewports. If pinched, fix is lowering `width: 52vw` on `.illustration` in `ContextSlide.module.css` — not re-cropping the asset.
- [ ] **Editorial-vs-structural rule sweep.** Two flagged borders: `.summary` in `PhoneMockup.module.css` (top + bottom around STARTS/ENDS/STOPS) and `.features` top in `PlanShowcase.module.css`. Marketing Lead eyes when convenient. Same question both: structural (load-bearing) or decorative (1px ink-on-paper rendering as competing grey)?
- [ ] OG image generation. No OG image currently. Aspirational target: editorial OG generated at build time per page. Likely depends on brand photography availability.
- [ ] Favicon refinement. Current `app/icon.svg` is placeholder (ember square + serif-fallback italic "V"). Options: bake Fraunces subset into SVG, hand-draw "V" path, or pivot to non-letterform mark.
- [ ] Coasts dropdown — illustrated Sri Lanka map. v1.1 work. Currently text list with monsoon seasons. Deferred unless map becomes credibility blocker.

## Ops

Infrastructure, accounts, deployment hygiene. Not user-visible but blocks scaling or causes future pain.

- [ ] **Resend account migration.** Currently under `kavinu2004@gmail.com`. Migrate to shared/project-owned account before any of: buddy joins as full collaborator, project takes payment from partners, founder count exceeds two.
- [ ] **Vercel project ownership migration.** `vibe-lanka` Vercel project under founder personal account. Same migration triggers as Resend.
- [ ] **Vercel Deployment Protection decision.** Hobby default auth-gates `*.vercel.app` preview URLs (public site is unaffected). Decide before formal launch: keep gating (safer) or disable (easier preview sharing).
- [ ] Local `.env.local` setup for waitlist dev. Resend env vars are Production + Preview scope only on Vercel. Local `npm run dev` of waitlist flow needs `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` in `.env.local`. One-time setup.
- [ ] Pin Node version in `.nvmrc` (per `CLAUDE.md` repo conventions, currently TBD post-Track-1-scaffolding).
- [ ] Document partner-inquiry response flow. Marketing site exposes `partners@vibelanka.com` — define who reads inbox, response SLA, onboarding flow when venues reply. Currently a published email with no defined process.
- [ ] Dark mode implementation. Logged as Open Flag deferred to its own design+engineering session. ~3–4 hours when prioritized. Not pre-launch blocking.

## Specialist consultations

Work that needs to be *queued* — not work the founders or Claude execute directly. Listing here so the conversation gets started, not so it gets resolved internally.

- [ ] **Sri Lankan PDPA compliance.** Personal Data Protection Act No. 9 of 2022. Needs Sri Lankan privacy counsel for data inventory, lawful basis for processing, user rights mechanisms, possible DPO appointment, cross-border transfer rules. Required before live presence / voting features collect real user data.
- [ ] **Trademark/IP for "Vibe Lanka" name.** Verify availability in Sri Lanka and key tourist-origin markets before further brand investment.
- [-] Payment rails for Featured monetization. Sri Lankan local payment infrastructure differs from Stripe-default assumptions. Needs payments specialist familiar with local market. Deferred until first paying partner conversation.
- [-] Production security architecture review. Specialist job when product hits real traffic with real PII. Deferred until post-launch.
- [-] GIS performance review. PostGIS is fine for Phase 1–2. Specialist consultation at Phase 3 (10k+ users, dense map queries). Deferred.

## Track 2 — the actual app

Out of scope for current execution. Listed for visibility only. Do not start without explicit founder approval per `CLAUDE.md` working agreements. Each item below is a multi-week build, not a checklist item.

- [-] Live map (real-time, GIS-driven, Mapbox GL JS, PostGIS-backed)
- [-] Voting system (account-bound, one vote per user per night per location, anonymous-public, percentage display)
- [-] Itinerary planner (multi-stop, realistic Sri Lankan travel times, leave-by alerts)
- [-] Trending blender implementation (weighted composite: editorial 60% / partner 20% / calendar 10% / weather 10%, vote_weight=0.0 in v1)
- [-] Featured slot infrastructure (paid placement, editorial verification flow, one slot per category per area per month)
- [-] Place metadata schema (vibe tags, crowd type, price, noise, indoor/outdoor, view, time-of-day filters)
- [-] Auth (Supabase Auth, email + Google + Apple minimum, phone auth open question for local market)
- [-] Real-time backend (Supabase Realtime or Pusher)
- [-] Curated-to-live transition design (who decides when a town/venue flips, what visual treatment looks like at each end)
- [-] Confidence display for sparse votes (how aggressively to expose underlying confidence to users)

---

**Last updated:** 2026-05-09
**Companion document:** `decisions.md` (source of truth for committed decisions, open flags, deferred items)
