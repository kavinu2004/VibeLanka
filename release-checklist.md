# Vibe Lanka — Release Checklist

Last updated: 2026-05-11

This file tracks remaining work to ship Vibe Lanka. The near-term milestone is **marketing site formal launch** — the point where we actively promote the site and treat the waitlist as live capture. Track 2 (the actual app build) is logged at the bottom for visibility but not actively tracked here.

**How to use this file:**
- Move items between sections as their state changes
- When claiming an item, move it to "In progress" and add your name as Owner
- When done, move it to "Done" with the commit SHA, your name, and date
- Re-upload this file to the consolidated Vibe Lanka Project and the Vibe Lanka - Ops Project after every commit

**Status as of 2026-05-11:** Marketing site is *substantively* structurally done. Track 2 kickoff is unblocked. Remaining marketing-site items run in parallel with early Track 2 work. See "Ready to ship pending assets" and "Pre-launch hygiene" for what's left.

---

## In progress

*(items currently being worked on)*

— *empty —*

---

## Ready to ship pending assets

*(work is unblocked; specs locked; ships immediately when external dependencies — assets, photos — land)*

- [ ] **OG image (`public/og.svg`).** Marketing Lead spec locked 2026-05-08. Build Lead wire-up prompt pre-written. Composition: 1200×630, paper `#F5F4F0` background. Left two-thirds: DM Mono kicker `LIVE · 06°55′N 80°48′E` in muted, then "The bay, tonight." in Fraunces (line break honored, "The bay," in `#177B9C`, "tonight." italic in `#9C0505`), then "Vibe ලංකා" wordmark at ~48-56px. Right one-third: South Coast strip wave rotated vertical, bleeding off right and bottom edges, seven heat-graded dots from `lib/data/coast.js` (Hiriketiya at bottom). Source data must match current `lib/data/coast.js` values; regenerate if data changes.
  - Owner: unclaimed (founder in Figma with Fraunces installed, or Luca production)
  - Production path: free Figma tier sufficient since not using MCP. Export as SVG. Ships in 30 minutes once asset lands.
  - Wire-up: Build Lead adds `openGraph.images` array and `twitter` section to `app/layout.jsx` metadata, points at `/og.svg`.

- [ ] **Favicon refinement (`app/icon.svg`).** Marketing Lead spec locked 2026-05-08, option (a) — Fraunces italic V baked into SVG. Same axes as nav wordmark (`opsz` 144, `SOFT` warm, italic). Composition: ember V on paper square (flipped from placeholder's paper V on ember). Validate light + dark browser tab visibility before shipping.
  - Owner: unclaimed (founder pulls glyph via Glyphr Studio / FontForge / Figma with Fraunces, or Luca)
  - Production path: pull glyph from Fraunces variable font at correct axes, output as `<path>` in SVG. Total under 5KB. Ships in 5 minutes once asset lands.

- [ ] **Salt House full-resolution photo.** Replace `public/images/venues/salt-house.jpeg` (currently 400×300, blurry on desktop). Card slot is ~462×360 desktop, full-width on mobile.
  - Owner: unclaimed (founder-sourced)
  - Confirmed 2026-05-08: not blocking Track 2 kickoff. Runs in parallel.

---

## Pre-launch hygiene

*(things to verify or polish before formal launch promotion — not blocking Track 2 kickoff)*

- [ ] **Partner program operational readiness.** Inbox monitoring resolved 2026-05-08 (Kavi reads `partners@`/`team@`/`press@`). Two pieces still open:
  - Response SLA (default suggestion: "within 48h weekdays, longer weekends")
  - Onboarding flow when a venue replies (vetting questionnaire? rate sheet? case-by-case?)
  - Owner: bilateral founder discussion

- [ ] **Trademark search for "Vibe Lanka" — Sri Lanka + key tourist-origin markets.** Cheapest specialist consultation, only one with launch-adjacent risk. A few hundred dollars, real trademark lawyer.
  - Owner: unclaimed
  - Trigger: before formal launch promotion

- [ ] **Yaka source asset optimization.** Current `yaka.png` is 2.4MB (up from 384KB). `next/image` handles delivery; source weight stays in git history forever. Request optimized export from Luca (target 600–900KB) or commit a 1024px-max-width version.
  - Owner: unclaimed (low priority, not blocking)

- [ ] **Coasts dropdown — illustrated Sri Lanka map.** Currently text list with monsoon seasons. Illustrated map would lift it. v1.1 work.
  - Owner: unclaimed (low priority)

---

## Operational migrations

*(infra ownership decisions resolved 2026-05-08 — no migrations needed for now)*

- [x] **2026-05-08** — Vercel + Resend account ownership decided: shared single account (Kavi + Samithu share `kavinu2004` access). Acknowledged tradeoff: no per-founder audit trail, recovery hinges on Kavi's Gmail. Acceptable for two-founder pre-launch. Revisit if third collaborator joins or billing complicates.

- [x] **2026-05-08** — Resend → Supabase waitlist migration deferred to Track 2 trigger. Resend stays through MVP launch. When Supabase is provisioned for Track 2 app data, evaluate migrating waitlist for consolidation.

- [x] **2026-05-08** — Vercel Deployment Protection: keep current state. Production open, previews auth-gated. Revisit if sharing preview URLs becomes friction.

- [x] **2026-05-08** — Email forwarding diagnostic resolved. Cloudflare confirms 4 received / 4 forwarded / 0 failed. Inbox monitoring: Kavi.

---

## Done

*(append-only; oldest at top)*

- [x] **2026-05-02** — Track 1 scaffolding: Next.js App Router, per-component file structure, CSS Modules, design tokens as CSS custom properties, next/font for typefaces. Vercel Analytics mounted. Placeholder favicon. Coasts dropdown keyboard accessibility.
- [x] **2026-05-03** — Brand pivot to steel-blue + terracotta palette (since superseded). Bilingual wordmark "Vibe ලංකා" with Noto Serif Sinhala. PhilosophyBar removed. Three founder venue photos integrated. Trending description honesty fix.
- [x] **2026-05-04** — Site deployed to production. Custom domain `vibelanka.com` wired via Cloudflare DNS-only CNAME. SSL auto-provisioned. Resend integration end-to-end (audience id `0beb6685-c7af-4e27-a35b-90e8b64ec6f6`). Smoke test passed.
- [x] **2026-05-06** — Brand redirection: palette to teal-blue `#177B9C` + deep red `#9C0505`. ContextSlide compressed. FeatureExplainer deleted, sections renumbered 01→04. Plan section compressed. Manifesto rewritten ("tourist guides go stale"). Yaka credit corrected to Luca.
- [x] **2026-05-07** — Six commits: codebase snapshot script (`ab3bbea`), full-bleed inner-wrapper pattern on SouthCoastShowcase (`01056de`), 2-min cadence claims removed (`f61780c`), CoastStrip border removed (`4575dc7`), SouthCoast stats divider softened (`83b23cc`), Yaka asset replaced (`85be228`).
- [x] **2026-05-09** — `CLAUDE.md` updated to reflect Samithu's repo path `~/Desktop/VibeLanka` (`29a1a24`).
- [x] **2026-05-08** — Marketing-site closeout pass. Two commits: PartnerSection + CTA full-bleed pattern (`2869f77`), `--rule-quiet` token introduction + editorial-vs-structural sweep (`a397dc1`). Founder calls finalized: hero typography Fraunces, palette stability committed, "layout flexes" precedent committed, Ceylon Sliders data confirmed, Vercel/Resend ownership shared-account, Vercel Deployment Protection keep, Resend→Supabase deferred to Track 2, email forwarding resolved. ContextSlide pinch verified no-pinch. Marketing Lead OG + favicon specs locked, production deferred to real-tool path.
- [x] **2026-05-11** — Bundled session: Ceylon Sliders image replaced (`37a1c21`); Gmail Send-mail-as configured for all three aliases (`partners@`, `team@`, `press@`) routing through vibelankaa@gmail.com via SMTP app password; project consolidation completed (five Projects → two: consolidated Vibe Lanka + standalone Ops); three editorial voice principles promoted to Aesthetic system in `decisions.md`.

---

## Deferred (post-launch / v3)

*(explicitly punted; do not work on without reopening)*

- [ ] **Dark mode** — its own design + engineering session, ~3-4 hours when prioritized.
- [ ] **Custom Mapbox styling** — default styling for launch. Custom only after data validates demand.
- [ ] **Custom auth flow** — Supabase Auth out-of-the-box for v1.
- [ ] **Native mobile app** — web-first. Native is post-launch.
- [ ] **Multi-language UI** — English-primary for v1. Sinhala/Tamil surface elements before full localization.
- [ ] **Advanced fraud / Sybil detection** — account-bound votes + IP reputation for v1.
- [ ] **Architecture extraction from Next.js API routes** — stays monolithic until load forces the split.
- [ ] **Phase 3 infrastructure (10k+ users)** — re-evaluate when we get close.
- [ ] **Per-coast navigation surfaces** — Track 2 work, needs actual product surface first.
- [ ] **Build-time / runtime OG generation per page** — v1.1 question. Single homepage OG sufficient for now.
- [ ] **"1,124 now in Hiri" South Coast Stat** — illustrative seed data. Decision deferred until Track 2 blender wiring: heat percentage, illustrative-with-honest-label count, or drop entirely.
- [ ] **Figma MCP integration for design tooling** — considered 2026-05-08, deferred. Revisit when Track 2 starts producing volume design assets that justify $360/year + setup overhead.

---

## Specialist consultations needed

*(do not YOLO; specialist required before this can ship)*

- [ ] **Sri Lankan PDPA compliance** — Personal Data Protection Act No. 9 of 2022. Trigger: when processing real user data at scale.
- [ ] **Payment rails for Featured monetization** — Sri Lankan local payment infrastructure. Trigger: when charging Featured partners.
- [ ] **Production security architecture** — when product hits real traffic with real PII.
- [ ] **GIS performance at scale** — PostGIS fine for Phase 1–2. Phase 3 (10k+ users, dense map queries) needs a specialist.
- [ ] **Trademark / IP for Vibe Lanka name** — see "Pre-launch hygiene" above. Cheapest of the five, only one with launch-adjacent risk.

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
- Resend → Supabase waitlist consolidation (when Supabase provisioned for Track 2)
