# GIS spatial layer — design note for schema integration

**Author:** Kavi
**Date:** 2026-05-20
**Status:** Sprint 1 spatial scaffold, ready for backend schema integration

---

## What this is

The spatial layer of the Track 2 schema, per D-006 (PostGIS as the spatial backend) and the GIS cluster ownership in D-010 (Kavi owns the spatial layer; Samithu owns the broader schema). The migration `20260520120000_create_areas_and_places_geo.sql` adds two tables (`areas`, `places` — minimum spatial scaffolding only), one enum (`area_boundary_type`), one helper function (`resolve_area_id`), three triggers (`places_set_area_id`, `set_updated_at` on each table), and partial GIST indexes (`WHERE center IS NOT NULL` on `areas.center`; full coverage on `places.location`).

Not applied yet — gated on D-007 (Supabase provisioned before any Sprint 1 code lands). Migration + seed files run when provisioning happens.

## Decisions encoded

- **(A) Area boundary representation.** `center + radius_m` for V1.0. `boundary_type` enum allows `'circle'` (default) and `'polygon'` (reserved for v1.1), so a future polygon migration is a column populate, not a table rewrite. Check constraint enforces shape consistency per row.
- **(B) Area-to-place linking.** Denormalized FK `places.area_id`, auto-populated at write time by a BEFORE INSERT/UPDATE trigger that calls `resolve_area_id(location)`. Smallest-radius-wins ordering handles nested areas — a venue inside Hiriketiya gets Hiriketiya, not Dickwella or South Coast, even though all three circles contain it.
- **(C) Path B coordinate sequencing.** All 35 rows (1 parent + 34 sub-areas) seed with `center` and `radius_m` set to NULL. The CHECK constraint explicitly allows this scaffold state for `'circle'` rows. A follow-up migration populates coordinates from founder-sourced Google Maps data. `resolve_area_id()` skips NULL-center rows, so partial population is safe — places inserted before populate-day land with `area_id = NULL`, and a one-shot `UPDATE places SET location = location` re-fires the trigger to backfill.
- **(D-011) Product geography differs from hero geography.** Track 1's seven-town strip (Mirissa → Hiriketiya in `lib/data/coast.js`) is the marketing-site **hero geography** — a curated editorial subset for the homepage. Track 2's spatial seed is **product geography** — 34 named tourist sub-areas from Beruwala (west) to Mattala (east). The strip is a subset; strip towns reference the same `areas` rows as their product-geography counterparts. `lib/data/coast.js` stays unchanged.

## Integration path for the broader places schema

Your schema PR should `ALTER TABLE places ADD COLUMN ...` for the editorial, tag, partner, and operational columns — **do not drop and recreate the table.** The spatial columns (`location`, `area_id`), their indexes, and the `places_set_area_id` trigger stay. The minimum scaffold is intentional: enough to validate the spatial layer end-to-end without claiming ownership of columns you're going to design.

`slug` and `name` on `places` are placeholders. If your schema design renames or restructures them, that's an ALTER too — no objection from my side, just don't drop the table.

RLS on `places` is your call. Recommendation: read the spatial columns under the same policy as the row generally — no separate RLS on `location` or `area_id`. The spatial data isn't more sensitive than the editorial data; treating it as a privileged column would just add complexity.

The `resolve_area_id` helper is `STABLE` and runs entirely within the trigger. App code never calls it. If your auth/voting code needs the inverse query ("which places are inside this area"), that's a straightforward `WHERE area_id = ?` — already indexed.

## Open questions for Samithu

- **RLS on `areas`.** Read-public, write-admin-only seems right (areas are a foundational lookup, not user-generated). Confirm — if you want different policies, easier to land them on your migration than to amend this one.
- **`resolve_area_id` exposure.** Currently server-side only, invoked via the trigger. Leaning toward keeping it that way — clients should never need to ask "what area is this point in" outside of the insert path. If voting or any other flow needs it client-side, expose as an RPC then; otherwise leave it.
- **Boundary-edge venue assignment.** When a venue's `location` falls inside the radii of two sibling sub-areas, the smallest-radius rule deterministically picks one. Acceptable for V1.0 or do we want explicit handling — admin-overridable `area_id`, multi-area linkage, something else? My read is V1.0-acceptable; flagging in case you see it differently.
- **Nested-area handling.** Hiriketiya inside Dickwella, Dalawella inside the Unawatuna bay system, Rumassala adjacent to Galle. Smallest-radius resolves these correctly once radii are tuned. The follow-up coordinate-population migration must size parent radii to encompass nested children without false-resolving siblings to the parent — a sizing call I'll make at populate time and run past you before committing.

## Follow-up migrations expected

1. **Coordinate population.** `UPDATE` statements setting `center` + `radius_m` for all 34 sub-areas + parent. Founder-sourced from Google Maps. Filename pattern: `..._populate_south_coast_coordinates.sql`. Path B.
2. **Samithu's schema PR.** `ALTER TABLE places` to add editorial, tag, partner, operational columns. RLS policies on both tables.
3. **Landmarks layer (deferred per Open Flag).** When the first non-venue, non-event place needs to enter the data layer — Dondra Head lighthouse, Mulkirigala Rock Temple, Bundala ecosystem features, etc. — decide whether landmarks live as tagged rows in `places`, get their own `landmarks` table, or stay deferred.
