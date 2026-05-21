# supabase/seed

Seed data for the Vibe Lanka Supabase project. Files here are SQL inserts that run against an already-migrated schema. They are not migrations and should not be applied via `supabase db push` — run them with `psql` (or the Supabase SQL editor) once the matching migration has applied.

## Files

### `south_coast_areas.sql`

Seeds the V1.0 South Coast product geography per D-011: one parent area (`south-coast`) plus 34 named tourist sub-areas from Beruwala (west) to Mattala (east, southern expressway terminus). Each sub-area inserts with `boundary_type = 'circle'` and `parent_id` resolved via subselect on the parent's slug.

**When to run:** after `supabase/migrations/20260520120000_create_areas_and_places_geo.sql` has applied. Run before any `places` data lands so the spatial trigger can resolve `area_id` against populated areas.

**Idempotent.** Every insert uses `ON CONFLICT (slug) DO NOTHING`. Re-running the file is safe — duplicate slugs are skipped. Sub-area inserts reference the parent via subselect on `slug = 'south-coast'`, so the parent must exist (or be inserted in the same run) for sub-area rows to land.

**Path B coordinate sequencing.** Coordinates (`center`) and `radius_m` are intentionally NULL for every row in this seed. The migration's CHECK constraint allows the (NULL center, NULL radius_m) scaffold state explicitly. Until a follow-up migration populates coordinates, `resolve_area_id()` returns NULL for every input — meaning any `places` row inserted in the meantime will land with `area_id = NULL`. That's expected and recoverable: once coordinates are populated, a one-shot `UPDATE places SET location = location` re-fires the spatial trigger and backfills `area_id`.
