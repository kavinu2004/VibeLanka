# Vibe Lanka — Release Checklist

Owner chat: **Project Lead.** What's left for v1 launch, manually maintained.
v1 scope and sprint structure come from the 2026-05-19 Track 2 scoping pack
(Overview, Scoping Worksheet ANSWERED, Work Ownership Sheet, Role Briefs).

**Track 1 (marketing site) shipped 2026-05-04, closed out 2026-05-11.** Track 1
audit trail preserved at the bottom of this file under "Track 1 — Done (archive)."

Last updated: 2026-05-22

---

## How to read this file

**Modules** are the top-level cleavage — engineering surface areas (Map,
Intent signals, Planner, Featured) and non-engineering pipelines (Content/SEO,
Venues/Partners).

**Sprint tags** are inline on each item: `[S1]` Sprint 1 spine · `[v1]` later v1
sprint · `[v1.1]` post-launch v1.1 · `[ongoing]` continuous pipeline work.
Items without tags are scoped on completion.

**Owners** are `K` (Kavi) · `S` (Samithu) · `B` (both). The Work Ownership
Sheet (Q15 from the scoping worksheet) is **open and gates first engineering
code.** Engineering Owner column will be unfilled until that bilateral resolves.

**Working-state sections:**
- *In progress* — currently being worked on
- *Blocked* — waiting on an external dependency or open decision
- *Track 1 Carryover* — in-flight marketing-site items not yet shipped
- *Deferred* — explicitly punted, do not work on without reopening

**Update protocol:**
- Move items between sections as state changes
- When closing, move to the relevant module's "Done" with commit SHA, owner, date
- Re-upload to the consolidated Vibe Lanka Project and Vibe Lanka - Ops Project after every commit

---

## Sprint 1 cross-cut

*Single source of truth = each module. This is a view: all items tagged `[S1]`
across the file, in build order. If something is here that isn't in a module
below, that's a bug.*

**The Sprint 1 demo sentence:** *Open the app → see five South Coast venues on
a map → tap one → signal intent → watch the share of intent across locations
move.* Anything not serving that sentence is out of Sprint 1.

**Pre-code blocker:** Q15 (work-ownership cluster assignments) — bilateral
Kavi/Samithu, holds first scaffold commit.

Sprint 1 items, build order:

1. Supabase provisioning (Backend & Data)
2. ~~Database schema design (Backend & Data) — venues, votes, users, areas~~
   **Database schema design (Backend & Data) — `users`, `places` ALTERs, `events`,
   `partners`, `djs`, `events_djs`, `intents`, `intents_audit`, `landmarks`
   (done — `6d51682`, 2026-05-22, Samithu).** RLS enabled on every table including
   `areas` and `places`; policies declared inline. Pending: local apply +
   promote to Supabase project.
3. Repo + deploy pipeline (Shared/Setup) — staging behind a flag
4. Email/Google auth backend + frontend (Backend & Data / Map module)
5. Seed/curated venue data layer (Backend & Data) — South Coast venues
6. Location data model + PostGIS structure (Map module)
7. Mapbox integration, default styling (Map module)
8. Venue geo queries — scoped area lookups (Map module)
9. Map screen — South Coast scoped view with pins (Map module)
10. Venue detail / card (Map module)
11. Intents backend — one account-bound intent per venue per night, percentages
    of intent share across locations computed (Intent signals module)
12. Intent signal UI — tap to signal, percentages of intent share across
    locations visibly moving (Intent signals module)
13. Trending blender plumbing, `intent_weight = 0` (Trending module, wired-not-surfaced)
14. Sprint-1 demo end-to-end assembly (Shared/Setup)

**Sprint 1 done = deployed to staging behind a flag, usable by both founders.**

---

## Module 1: Map (Sprint 1 surface)

The default scoped view. South Coast first, brand-styled from commit one
("approximately on brand" Mapbox default is a hard no).

Shipping this module means:

- [ ] `[S1]` Location data model + PostGIS structure for South Coast and
      sub-areas — Owner: _(pending Q15)_
- [ ] `[S1]` Mapbox integration on free tier, default styling — Owner: _(pending Q15)_
- [ ] `[S1]` Venue geo queries — "show venues in this scoped area" — Owner: _(pending Q15)_
- [ ] `[S1]` Map screen — South Coast scoped view with venue pins — Owner: _(pending Q15)_
- [ ] `[S1]` Venue detail / card on pin tap — vibe tags, intent button hook — Owner: _(pending Q15)_
- [ ] `[v1]` Pre-map editorial blurb when picking a location (deferred from
      live intent-driven summary, which is v1.1)
- [ ] `[v1]` Location switcher across three in-scope coasts (Colombo + South +
      East), season-labeled
- [ ] `[v1.1]` Live intent-driven summary replaces editorial blurb (once intent
      data exists)
- [ ] **Brand-styling pass on the map itself** — cream paper, ember accents,
      editorial typography. Not Mapbox default. _(Marketing Lead spec required
      before any custom styling work — defer styling to a later sprint per
      D-013 Mapbox-default-for-v1; revisit when data validates demand.)_

---

## Module 2: Intent signals (Sprint 1 surface)

The demo moment. Anonymous, account-bound, percentages only. Confidence display
for sparse intents; never seed-pad the displayed number.

Shipping this module means:

- [ ] `[S1]` Intents backend — one account-bound intent per venue per night,
      percentages of intent share across locations computed — Owner: _(pending Q15)_
- [ ] `[S1]` Intent signal UI — tap to signal, percentages of intent share
      across locations visibly moving — Owner: _(pending Q15)_
- [ ] `[v1]` Confidence display — hide headline % below threshold, low-confidence
      treatment. Exact threshold is a build-tuning detail with a named owner.
- [ ] `[v1.1]` Phone auth fast-follow — required before real intents go live.
      Gated by PDPA specialist consult (see Cross-cutting gates).
- [x] Append-only audit on intent rows once submitted — shipped as
      `intents_audit` table with `SECURITY DEFINER` trigger
      (`6d51682`, 2026-05-22, Samithu).

---

## Module 3: Auth + Data layer (Sprint 1 surface)

Backend cluster — schema, auth, seed data, trending plumbing. Q15 calls for a
single owner across this cluster. **Don't split schema and auth across two people.**

Shipping this module means:

- [ ] `[S1]` Supabase provisioning — shared account under `kavinu2004@gmail.com`,
      free tier, project running **before any code** (Gate 2) — Owner: _(pending Q15)_
- [x] `[S1]` Database schema design — `users`, `places` ALTERs (editorial / tag /
      partner / operational columns), `events`, `partners`, `djs`, `events_djs`
      (m:n join), `intents`, `intents_audit` (append-only), `landmarks`
      (reserved, unpopulated). Reused `trg_set_updated_at()` and
      `resolve_area_id()` from spatial migration; added
      `trg_landmarks_set_area_id()` mirror. (`6d51682`, 2026-05-22, Samithu).
      Local apply + promote to Supabase project pending, separately tracked.
- [ ] **`[S1]` Open Flag: auth user signup trigger migration.** Gates the auth
      backend. Without it, signups succeed in `auth.users` but the `public.users`
      mirror row is never created, breaking every downstream FK (especially
      `intents.user_id`). Must land via a Build Lead chat before any auth
      backend work ships. Owner: _pending._
- [ ] `[S1]` Auth backend — email / Google sign-in for v1, account creation,
      sessions — Owner: _(pending Q15)_
- [ ] `[S1]` Seed / curated venue data layer — South Coast venues loaded so
      map isn't empty day one — Owner: _(pending Q15)_
- [ ] `[S1]` Auth UI — sign-in / sign-up screens (logic in backend) — Owner: _(pending Q15)_
- [x] `[S1]` RLS policies on every table from first migration (per CLAUDE.md
      Supabase rules) — RLS enabled on all schema tables including `areas` and
      `places` (the spatial migration left RLS off; `6d51682` enables it).
      Policies declared inline: catalogs read-public + service-role-write;
      `partners` and `intents_audit` service-role-only on both reads and writes;
      `intents` user-own + service-role-read-all. (`6d51682`, 2026-05-22,
      Samithu). Runtime verification pending local apply.
- [ ] `[v1]` Curated-to-live data transition — the designed moment where a
      place flips from seed to real. Marketing Lead visual spec required.
- [ ] `[v1.1]` Phone auth provider integration (Intent signals module dependency)
- [ ] `[v1.1]` Resend → Supabase waitlist migration — once schema is stable

---

## Module 4: Trending (wired Sprint 1, surfaced v1.1)

The blender architecture is built right from commit one. Surface is deferred
until real intent meaningfulness exists. **This is the single most "wired-not-surfaced"
item — calling it out so it doesn't slip.**

Shipping this module means:

- [ ] `[S1]` Trending blender plumbing — weighted multi-input architecture,
      `intent_weight = 0.0`, editorial 60% / partner 20% / calendar 10% /
      weather 10% — Owner: _(pending Q15)_
- [ ] `[v1.1]` Intent-weight ramp from 0.0 — once real intents have meaningfulness
- [ ] `[v1.1]` Trending surface design — Marketing Lead spec required
- [ ] `[v1.1]` Trending tab visible in app — heat bars driven by blender output

---

## Module 5: Planner (v1, later sprint)

Multi-stop trip planner with realistic Sri Lankan travel times by mode.
Listed in v1 scope but explicitly later than the spine.

Shipping this module means:

- [ ] `[v1]` Planner screen — trip composition UI
- [ ] `[v1]` Realistic Sri Lankan travel-time engine by mode (walk, tuk-tuk,
      car, train) — confirm whether data is hard-coded or geo-computed at scope
- [ ] `[v1]` Multi-stop day/weekend itinerary builder
- [ ] `[v1]` Marketing Lead visual spec for planner surface

---

## Module 6: Featured (designed empty in v1, logic in v1.1)

In v1, Featured is a designed empty-state — the partner pitch surface, not a
broken blank tab. Featured logic and paid placement is v1.1, gated on partner
program operational readiness (see Module 8) and payment rails specialist
(see Cross-cutting gates).

Shipping this module means:

- [ ] `[v1]` Designed empty-Featured state — Marketing Lead spec, on-brand
      partner pitch surface, never a blank screen
- [ ] `[v1.1]` Featured listing schema (DB tables, slot constraints — one per
      category per area per month)
- [ ] `[v1.1]` Sponsored-tag display logic on listings (clearly disclosed)
- [ ] `[v1.1]` Featured admin interface — gated on first paid venue
- [ ] **Cross-cut dependency:** Payment rails specialist required before
      charging partners (see Cross-cutting gates)

---

---

# Pipeline modules (non-engineering)

*Same checklist format, but the unit of progress is cadence and counts — not
commits. AI may draft; only a human voices and publishes.*

---

## Module 7: Content & SEO pipeline (ongoing, non-engineering)

The traffic engine. AI drafts, human voices and publishes. **Cadence is the
unit of progress, not commits.** Tracking by counts shipped.

Owner role brief: Content & Audience.

Shipping this module means (pre-launch and ongoing):

**South Coast sub-area guides — seven pieces, one per sub-area:**

- [ ] `[ongoing]` Mirissa guide (800–1200 words)
- [ ] `[ongoing]` Weligama guide
- [ ] `[ongoing]` Ahangama guide
- [ ] `[ongoing]` Midigama guide
- [ ] `[ongoing]` Unawatuna guide
- [ ] `[ongoing]` Talalla guide
- [ ] `[ongoing]` Hiriketiya guide

**Comparison pages — opinionated, 400–600 words, position-taking:**

- [ ] `[ongoing]` First three live (e.g. "Mirissa vs Hiriketiya," "is Mirissa
      worth it," "south coast in low season")
- [ ] `[ongoing]` Cadence: one published piece per week (across all surfaces).
      Rate limit is the voice pass, deliberately.

**Itineraries:**

- [ ] `[ongoing]` First five itineraries live (AI-drafted, human-rewritten —
      target 5–7)

**Distribution surfaces:**

- [ ] `[ongoing]` Reddit + Quora answering routine — 30 min/day, 5 days/week,
      tracked in a sheet
- [ ] `[ongoing]` Instagram — three posts per week (1 editorial + 1
      observational + 1 repost/partner spotlight)
- [ ] `[ongoing]` Welcome email to Resend signups — within 24h, in voice
- [ ] `[ongoing]` Monthly waitlist nurture update — one venue + one editorial +
      ETA
- [ ] `[ongoing]` Resend list segmentation by signup date (enables subject-line
      testing later)

**Influencer + press:**

- [ ] `[ongoing]` Micro-influencer list — 50 creators across travel, food,
      surf, Sri Lankan lifestyle (5K–30K band)
- [ ] `[v1]` 10–15 micro-influencer collaborations by launch _(hold larger
      pushes until trademark search clears)_
- [ ] `[v1]` Press list built — Condé Nast Traveler, Time Out, Roads & Kingdoms,
      Roar Media, Daily Mirror lifestyle, Atlas Obscura, The Discoverer
- [ ] `[v1]` 3–5 launch-window press placements _(hold all pitches until app
      actually launches)_

**Community:**

- [ ] `[ongoing]` Daily check on comments / DMs / `team@vibelanka.com` — 24h
      response weekdays

---

## Module 8: Venues & Partners pipeline (ongoing, non-engineering)

The revenue model. "FEATURED IS PAID, MARKED · NO PLACEHOLDER LISTINGS" lives
or dies on the vetting gate. Until real venues are signed, Featured stays empty
(see Module 6).

Owner role brief: Venues & Partners.

Shipping this module means (pre-launch and ongoing):

**Pipeline build:**

- [ ] `[v1]` Venue pipeline spreadsheet — 50–100 South Coast venues to start.
      Columns: name, area, category, Instagram, owner, contact email, status,
      notes. Don't pad — quality > quantity.

**Operational readiness — bilateral founder discussion (open from Track 1):**

- [ ] **Partner program operational policy — bilateral, blocks outreach.**
      Four positions to align: response SLA, vetting questionnaire, rate sheet
      stance, **vetting standard** (load-bearing — the brand claim rests on this).
      Samithu drafted proposal pre-2026-05-09; current resolution state needs
      confirmation. _(Once aligned, write to `decisions.md` and unblock outreach.)_

**Outreach:**

- [ ] `[ongoing]` Cold outreach to venues from pipeline list — `partners@`
      sends, under 150 words, editorial introduction. One follow-up after 5
      business days, then mark cold. _(Blocked until partner program
      operational policy is committed.)_
- [ ] `[ongoing]` Vetting + onboarding for replying venues — questionnaire,
      decision (with one founder signoff), warm decline if not the bar,
      onboarding pack if signed

**Distribution partnerships:**

- [ ] `[v1]` Guesthouse + hostel QR cards — 20–30 properties pre-launch
      (Negombo, Colombo Fort, south coast we already know). Card design routes
      through Marketing Lead.
- [ ] `[v1.1]` QR partnerships scale — 100+ properties post-launch, layer in
      cafés + tour drivers
- [ ] `[v1]` Tuk-tuk + tour driver relationship-building — identify 5–10
      drivers pre-launch
- [ ] `[v1.1]` Tuk-tuk + tour driver formalization — featured drivers in app

**Retention + reporting:**

- [ ] `[ongoing]` Monthly 15-min check-in per signed partner (post first signing)
- [ ] `[ongoing]` Weekly pipeline report to founders — Friday EOD, numbers not
      narrative, blockers flagged

---

## Cross-cutting v1 launch gates

*Gates apply across modules. Roughly equivalent to PilotOS's "Cross-cutting
launch gates" section.*

**Hard gates (block code or block launch):**

- [ ] **Q15 — Work ownership bilateral.** _Gates first engineering code._
      Single owner for Backend & Data cluster (Supabase, schema, auth, intents
      backend); single owner for GIS & Map data cluster. Frontend can be split
      or shared (B is fine there). Kavi + Samithu sign + date the Work
      Ownership Sheet.
- [ ] **Partner program operational policy committed.** Blocks venue outreach
      (see Module 8).
- [ ] **PDPA specialist consultation.** Parallel during Sprint 1 (seed data
      only — under "real user data at scale" trigger). **Must complete before
      phone-auth fast-follow enables real intents.**
- [ ] **Trademark search for "Vibe Lanka"** — Sri Lanka + key tourist-origin
      markets. Launch-adjacent risk. _Carried over from Track 1 pre-launch
      hygiene._ Owner: unclaimed. _Hold larger influencer + press pushes until
      this clears._

**Infrastructure gates:**

- [ ] Supabase provisioned before any Sprint 1 code (Gate 2)
- [ ] Staging deploy pipeline with feature flags ("sprint done" bar)
- [x] RLS policies verified on every table from first migration — declared
      in `6d51682` (2026-05-22); runtime verification pending local apply
- [ ] Branch protection + secret scanning enabled
- [ ] Pre-commit secret-scanning hook wired locally (per CLAUDE.md Security)
- [ ] Mapbox usage watch — free tier is 50k loads/month, comfortable
      pre-launch; watch if traction hits

**Specialist consults (later triggers, tracked for visibility):**

- [ ] **Payment rails for Featured monetization** — trigger: when charging
      Featured partners (Module 6 v1.1)
- [ ] **Production security architecture** — trigger: real traffic with real PII
- [ ] **GIS performance at scale** — trigger: Phase 3 (10k+ users, dense map
      queries). PostGIS fine for Phase 1–2.

---

## Track 1 — Carryover (in-flight)

*Marketing-site items that didn't ship before Track 2 started. Not blocking
Sprint 1; ship in parallel as bandwidth allows. Tick off in place as work
completes. Items here are still actionable — when fully shipped, they
graduate into the Track 1 Done archive below.*

- [ ] **OG image (`public/og.svg`).** Marketing Lead spec locked 2026-05-08.
      Composition: 1200×630, paper bg, "The bay, tonight." in Fraunces, South
      Coast strip wave with seven heat-graded dots. Ships in 30 min once SVG
      lands. Owner: unclaimed (Figma or Luca).
- [ ] **Favicon (`app/icon.svg`).** Marketing Lead spec locked 2026-05-08 —
      Fraunces italic V, option (a). Ships in 5 min once asset lands. Owner:
      unclaimed.
- [ ] **Salt House full-resolution photo.** Replace blurry 400×300 placeholder.
      Confirmed non-blocking. Owner: unclaimed (founder-sourced).
- [ ] **Yaka source asset optimization.** Current 2.4MB. `next/image` handles
      delivery; repo bloat only. Low priority. Samithu pre-2026-05-09 was going
      to message Luca for 600–900KB re-export — state unconfirmed.
- [ ] **Coasts dropdown illustrated Sri Lanka map.** v1.1 polish. Low priority.

---

## Deferred (post-launch / v3)

*Explicitly punted. Do not work on without reopening.*

- [ ] Dark mode — own design + engineering session, ~3–4 hours when prioritized
- [ ] Custom Mapbox styling — default for launch, custom only after data
      validates demand
- [ ] Custom auth flow — Supabase Auth out-of-the-box for v1
- [ ] Native mobile app — web-first, native post-launch
- [ ] Multi-language UI — English-primary for v1, Sinhala/Tamil surface
      elements before full localization
- [ ] Advanced fraud / Sybil detection — account-bound + IP reputation for v1
- [ ] Architecture extraction from Next.js API routes — monolithic until load
      forces split
- [ ] Phase 3 infrastructure (10k+ users) — re-evaluate near
- [ ] Per-coast navigation surfaces — Track 2 work, needs actual product
      surface first
- [ ] Build-time / runtime OG generation per page — v1.1 question, single
      homepage OG sufficient for now
- [ ] "1,124 now in Hiri" South Coast stat — illustrative seed data. Resolve
      when Trending blender wires up.
- [ ] Figma MCP integration — considered 2026-05-08, deferred until volume
      design assets justify cost
- [ ] North + West coasts — not built in v1, not merely off-season

---

<details>
<summary><strong>Track 1 — Done (archive)</strong></summary>

*Marketing site shipped 2026-05-04, closeout 2026-05-11. Preserved verbatim
from `release-checklist.md` last updated 2026-05-11. Append-only; oldest at top.*

- [x] **2026-05-02** — Track 1 scaffolding: Next.js App Router, per-component
      file structure, CSS Modules, design tokens as CSS custom properties,
      next/font for typefaces. Vercel Analytics mounted. Placeholder favicon.
      Coasts dropdown keyboard accessibility.
- [x] **2026-05-03** — Brand pivot to steel-blue + terracotta palette (since
      superseded). Bilingual wordmark "Vibe ලංකා" with Noto Serif Sinhala.
      PhilosophyBar removed. Three founder venue photos integrated. Trending
      description honesty fix.
- [x] **2026-05-04** — Site deployed to production. Custom domain
      `vibelanka.com` wired via Cloudflare DNS-only CNAME. SSL auto-provisioned.
      Resend integration end-to-end (audience id
      `0beb6685-c7af-4e27-a35b-90e8b64ec6f6`). Smoke test passed.
- [x] **2026-05-06** — Brand redirection: palette to teal-blue `#177B9C` +
      deep red `#9C0505`. ContextSlide compressed. FeatureExplainer deleted,
      sections renumbered 01→04. Plan section compressed. Manifesto rewritten
      ("tourist guides go stale"). Yaka credit corrected to Luca.
- [x] **2026-05-07** — Six commits: codebase snapshot script (`ab3bbea`),
      full-bleed inner-wrapper pattern on SouthCoastShowcase (`01056de`),
      2-min cadence claims removed (`f61780c`), CoastStrip border removed
      (`4575dc7`), SouthCoast stats divider softened (`83b23cc`), Yaka asset
      replaced (`85be228`).
- [x] **2026-05-08** — Marketing-site closeout pass. Two commits:
      PartnerSection + CTA full-bleed pattern (`2869f77`), `--rule-quiet`
      token introduction + editorial-vs-structural sweep (`a397dc1`). Founder
      calls finalized: hero typography Fraunces, palette stability committed,
      "layout flexes" precedent committed, Ceylon Sliders data confirmed,
      Vercel/Resend ownership shared-account, Vercel Deployment Protection
      keep, Resend→Supabase deferred to Track 2, email forwarding resolved.
      ContextSlide pinch verified no-pinch. Marketing Lead OG + favicon specs
      locked, production deferred to real-tool path.
- [x] **2026-05-09** — `CLAUDE.md` updated to reflect Samithu's repo path
      `~/Desktop/VibeLanka` (`29a1a24`).
- [x] **2026-05-11** — Bundled session: Ceylon Sliders image replaced
      (`37a1c21`); Gmail Send-mail-as configured for all three aliases
      (`partners@`, `team@`, `press@`) routing through `vibelankaa@gmail.com`
      via SMTP app password; project consolidation completed (five Projects →
      two: consolidated Vibe Lanka + standalone Ops); three editorial voice
      principles promoted to Aesthetic system in `decisions.md`.

**Track 1 operational decisions (closed 2026-05-08):**

- [x] Vercel + Resend account ownership: shared single account
      (`kavinu2004` access). Acknowledged tradeoff: no per-founder audit trail,
      recovery hinges on Kavi's Gmail. Revisit if third collaborator joins or
      billing complicates.
- [x] Resend → Supabase waitlist migration: deferred to Track 2 trigger
      (now active — see Module 3 `[v1.1]`).
- [x] Vercel Deployment Protection: keep current state. Production open,
      previews auth-gated. Revisit if sharing preview URLs becomes friction.
- [x] Email forwarding diagnostic: resolved. Cloudflare confirms 4 received /
      4 forwarded / 0 failed. Inbox monitoring: Kavi.

</details>
