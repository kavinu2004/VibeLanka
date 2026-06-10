# Vibe Lanka — Track 2 Checklist

Last updated: 2026-05-22 (decisions catch-up commit)

This file tracks the Track 2 app build. The near-term milestone is **Sprint 1: the map + intent-signals spine on seed data** — open the app, see venues on a scoped South Coast map, tap a pin, signal intent, watch the share of intent across locations move. Everything past Sprint 1 is logged for visibility, not actively tracked here yet.

Ownership was split from the Work Ownership Sheet on 2026-05-20. Kavi takes frontend + GIS. Samithu takes backend + data. Shared/setup rows are flagged B.

**How to use this file:**
- Move items between sections as their state changes
- When starting an item, move it to "In progress"
- When done, move it to "Done" with the commit SHA, owner, and date
- Re-upload this file to the consolidated Vibe Lanka Project after every commit

**Ownership rule from the sheet:** Backend and GIS each have a single owner. Don't split structural work across two people mid-sprint. Frontend can be shared freely.

---

## In progress

*(items currently being worked on)*

— *empty —*

---

## Sprint 1 — Map + intent-signals spine

*(the core sprint; everything below ships together as the first demoable end-to-end flow)*

### Backend & data — Samithu

- [x] **Set up Supabase.** ✓ 2026-05-21 (Samithu, D-013) — project `vibelanka-track2` on `vibelankaa@gmail.com`, free tier, Singapore region, PostGIS 3.3 enabled. See Done section + `infra-state.md`.
- [x] **Design the database schema.** ✓ 2026-05-22 (Samithu, `6d51682`) — `users`, `places` ALTERs, `events`, `partners`, `djs`, `events_djs`, `intents`, `intents_audit` (append-only), `landmarks` (reserved). RLS on every table; policies declared inline. Promoted to remote `vvmrqrtzasitgrkpafzj` 2026-06-10 (bundled with the auth-trigger push). See Done section.
- [x] **Auth user signup trigger migration.** ✓ 2026-06-10 (Samithu, `3ec88bf`) — migration `supabase/migrations/20260610090000_auth_signup_trigger.sql` adds `on_auth_user_created` (AFTER INSERT on `auth.users`) calling `handle_new_user()` (SECURITY DEFINER, `search_path = public` pinned) to insert the `public.users` mirror row. Insert is `(id, email)` only; `display_name` stays NULL per the v1.0 anonymous default. `on conflict (id) do nothing` for idempotency. Committed + pushed to git; **applied remotely to `vvmrqrtzasitgrkpafzj` 2026-06-10** via `supabase db push` (this push also promoted core schema `6d51682`, previously local-only). `supabase migration list` confirms Local == Remote for all three migrations.
- [ ] **Build the login / auth flow.** Email / Google sign-in for v1. Account creation, sessions. _Unblocked 2026-06-10 by the signup trigger above (`3ec88bf`)._
- [ ] **Intents backend.** One account-bound intent per venue per night, percentages of intent share across locations computed.
- [ ] **Seed / curated data layer.** Load curated venues and tags so the map isn't empty day 1.
- [ ] **Trending blender plumbing.** Wire the weighted-input structure now, `intent_weight = 0`. Architecture only.

### GIS & map data — Kavi

- [x] **Location / area data model.** ✓ 2026-05-21 (Kavi, `d84ba0f`) — `areas` table with 35 rows (34 sub-areas + 1 parent "South Coast"), PostGIS `geography` columns scaffolded, `resolve_area_id()` helper landed. See Done section. Schema-qualification convention (D-014) and reference-data-in-migrations convention (D-015) established by this work.
- [ ] **Mapbox integration.** Custom style v2.0.6.1 staged (D-016, moody editorial direction, **pending Samithu cosmetic sign-off**). Map.jsx integration commit pending publish of style URL. Build Lead prompt staged at `build-lead-mapjsx-v2.0.5-custom-coastline-shadow.txt`.
- [ ] **Venue geo queries.** "Show venues in this scoped area" — the spatial lookups behind the map. Unblocked by `6d51682` (places ALTER added editorial/tag/partner/operational columns; spatial scaffold preserved).

### Frontend & UI — Kavi (split with Samithu where useful)

- [ ] **Map screen (South Coast scoped view).** The default view: scoped map, venue pins. Core sprint-1 surface.
- [ ] **Venue detail / card.** Tap a pin → venue, vibe tags, intent button.
- [ ] **Intent signal UI.** The button + the percentages of intent share across locations that visibly move. The demo moment.
- [ ] **Confidence display.** Low-confidence treatment for sparse intents — hide % below a threshold.
- [ ] **Location switcher.** Switch between the 3 in-scope coasts, season-labeled.
- [ ] **Pre-map editorial blurb.** The short written intro when picking a location, before the map loads.
- [ ] **Auth screens (sign-in / sign-up UI).** The front of the login flow. Logic is in Backend.
- [ ] **Empty-Featured state.** The "no partners yet" tab — designed, not a broken blank.

### Shared / setup — B

- [ ] **Repo + deploy pipeline.** Project setup, staging deploy behind a flag (the "sprint done" bar).
- [ ] **Sprint-1 demo assembly.** Wiring it end to end: open → see venues → tap → signal intent → % of intent share across locations moves.

---

## Later sprints

*(scoped, owned, not Sprint 1)*

- [ ] **Planner screen (v1).** Trip planner with realistic Sri Lankan travel times. Owner: Kavi (frontend).

---

## Specialist consultations triggered by Track 2

*(from release-checklist.md, re-flagged here because Track 2 is when these fire)*

- [ ] **Sri Lankan PDPA compliance** — Personal Data Protection Act No. 9 of 2022. Trigger: when processing real user data at scale. Backend owner (Samithu) routes this.
- [ ] **Production security architecture** — when product hits real traffic with real PII. Backend owner (Samithu) routes this.
- [ ] **GIS performance at scale** — PostGIS fine for Phase 1–2. Phase 3 (10k+ users, dense map queries) needs a specialist. GIS owner (Kavi) routes this.
- [ ] **Payment rails for Featured monetization** — Sri Lankan local payment infrastructure. Trigger: when charging Featured partners. Not Sprint 1.

---

## Done

*(append-only; oldest at top)*

- [x] **2026-05-20** — Track 2 ownership split confirmed bilaterally. Samithu takes backend + data cluster (Supabase, schema, auth, intents backend, seed layer, trending blender plumbing). Kavi takes GIS cluster (location data model, Mapbox, venue geo queries) and frontend (map screen, venue detail, intent signal UI, confidence display, location switcher, editorial blurb, auth screens, empty-Featured state). Shared/setup rows (repo + deploy pipeline, Sprint-1 demo assembly) flagged B. Ownership rule: structural work (backend, GIS) stays single-owner; frontend can be shared freely.
- [x] **2026-05-21** — Supabase Gate 2 closed (D-013). Project `vibelanka-track2` provisioned on `vibelankaa@gmail.com` (Track 2 infra account precedent, distinct from Track 1's `kavinu2004@gmail.com`), free tier, Singapore region (`ap-southeast-1`), PostGIS 3.3 enabled at provisioning, `uuid-ossp` + `pgcrypto` verified. Project ref `vvmrqrtzasitgrkpafzj`. Local `psql` reachability confirmed; "reachable from a deployed environment" half of D-007 deferred to Sprint 1 staging pipeline. Resend → Supabase waitlist consolidation deferred to schema-design landing. Auth providers (Google OAuth) configured during auth flow build, not at provisioning. Full operational state in `infra-state.md`.
- [x] **2026-05-21** — Spatial layer shipped: areas table + product geography seeded. Three commits: `4b50bf9` (gitignore `supabase/.temp/`), `6fde142` (schema-qualify PostGIS as `extensions.*` — established D-014 convention), `d84ba0f` (consolidated `supabase/migrations/20260520120000_create_areas_and_places_geo.sql` with 35 area rows inline — established D-015 reference-data-in-migrations convention). PostGIS schema-qualification (D-014) and reference-data-lives-in-migrations (D-015) are now project standards. Verification: 35/35 area rows present; Mirissa harbor resolves to `mirissa` sub-area; offshore Galle falls back to `south-coast` parent. Three open questions remaining in `docs/gis-spatial-layer.md`: RLS on `areas` (closed 2026-05-22 by `6d51682`), `resolve_area_id` RPC exposure (open), boundary-edge venue assignment (open). Owner: Kavi.
- [x] **2026-05-22** — Sprint 1 Module 3 (database schema) shipped: commit `6d51682`, migration `supabase/migrations/20260522100324_create_core_schema.sql` (474 lines). ALTER on `places` (editorial / tag / partner / operational columns; spatial scaffold preserved). 8 new tables: `users`, `events`, `partners`, `djs`, `events_djs` (m:n join), `intents`, `intents_audit` (append-only), `landmarks` (reserved, unpopulated). RLS enabled on every table including `areas` and `places` (the spatial migration left RLS off; this one enables it). Policies declared inline: catalogs read-public + service-role-write; `partners` and `intents_audit` service-role-only on both reads and writes; `intents` user-own + service-role-read-all. Reused `trg_set_updated_at()` and `resolve_area_id()` from spatial migration; added `trg_landmarks_set_area_id()` mirror. `intents_audit` trigger uses `SECURITY DEFINER` with explicit `search_path = public`. Local apply + promote to Supabase project pending.
- [x] **2026-06-10** — Auth signup trigger shipped: commit `3ec88bf`, migration `supabase/migrations/20260610090000_auth_signup_trigger.sql`. Adds `on_auth_user_created` (AFTER INSERT on `auth.users`, FOR EACH ROW) calling `handle_new_user()` — SECURITY DEFINER with `search_path = public` pinned — to insert the `public.users` mirror row on signup. Insert is `(id, email)` only; `display_name` stays NULL per the v1.0 anonymous default. `on conflict (id) do nothing` for idempotency. Closes the high-priority open flag that blocked all auth backend work: before this, `auth.users` signups left `public.users` empty and every `intents.user_id` FK failed. The login / auth flow is now unblocked. Mirrors the proven `intents_audit` SECURITY DEFINER pattern from `6d51682`. Owner: Samithu. Committed + pushed to git; **applied remotely to `vvmrqrtzasitgrkpafzj` 2026-06-10** via `supabase db push` (no local Docker on this machine, so verification landed with the remote push). The same push also promoted core schema `6d51682` (previously local-only) — `supabase migration list` confirms Local == Remote for all three migrations (`20260520120000`, `20260522100324`, `20260610090000`). The `6d51682` "promote to Supabase project pending" note in the 2026-05-22 entry above is hereby closed.
