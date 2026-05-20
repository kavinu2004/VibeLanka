# Vibe Lanka — Track 2 Checklist

Last updated: 2026-05-20

This file tracks the Track 2 app build. The near-term milestone is **Sprint 1: the map + voting spine on seed data** — open the app, see venues on a scoped South Coast map, tap a pin, cast a vote, watch the percentage move. Everything past Sprint 1 is logged for visibility, not actively tracked here yet.

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

## Sprint 1 — Map + voting spine

*(the core sprint; everything below ships together as the first demoable end-to-end flow)*

### Backend & data — Samithu

- [ ] **Set up Supabase.** Create the shared account (Kavi's Gmail, free tier), project running before any code.
- [ ] **Design the database schema.** Tables for venues, votes, users, areas. Everything else builds on this.
- [ ] **Build the login / auth flow.** Email / Google sign-in for v1. Account creation, sessions.
- [ ] **Voting backend.** One account-bound vote per venue per night, percentages computed.
- [ ] **Seed / curated data layer.** Load curated venues and tags so the map isn't empty day 1.
- [ ] **Trending blender plumbing.** Wire the weighted-input structure now, vote weight = 0. Architecture only.

### GIS & map data — Kavi

- [ ] **Location / area data model.** How South Coast + sub-areas are structured for the scoped map. PostGIS.
- [ ] **Mapbox integration.** Free tier, default styling. Map rendering with venue pins.
- [ ] **Venue geo queries.** "Show venues in this scoped area" — the spatial lookups behind the map.

### Frontend & UI — Kavi (split with Samithu where useful)

- [ ] **Map screen (South Coast scoped view).** The default view: scoped map, venue pins. Core sprint-1 surface.
- [ ] **Venue detail / card.** Tap a pin → venue, vibe tags, vote button.
- [ ] **Voting UI.** The button + the percentage that visibly moves. The demo moment.
- [ ] **Confidence display.** Low-confidence treatment for sparse votes — hide % below a threshold.
- [ ] **Location switcher.** Switch between the 3 in-scope coasts, season-labeled.
- [ ] **Pre-map editorial blurb.** The short written intro when picking a location, before the map loads.
- [ ] **Auth screens (sign-in / sign-up UI).** The front of the login flow. Logic is in Backend.
- [ ] **Empty-Featured state.** The "no partners yet" tab — designed, not a broken blank.

### Shared / setup — B

- [ ] **Repo + deploy pipeline.** Project setup, staging deploy behind a flag (the "sprint done" bar).
- [ ] **Sprint-1 demo assembly.** Wiring it end to end: open → see venues → tap → vote → % moves.

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

- [x] **2026-05-20** — Track 2 ownership split confirmed bilaterally. Samithu takes backend + data cluster (Supabase, schema, auth, voting backend, seed layer, trending blender plumbing). Kavi takes GIS cluster (location data model, Mapbox, venue geo queries) and frontend (map screen, venue detail, voting UI, confidence display, location switcher, editorial blurb, auth screens, empty-Featured state). Shared/setup rows (repo + deploy pipeline, Sprint-1 demo assembly) flagged B. Ownership rule: structural work (backend, GIS) stays single-owner; frontend can be shared freely.
