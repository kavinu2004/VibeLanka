-- migration: create areas + places-geo spatial scaffold for track 2 v1.0
-- date: 2026-05-20
-- decisions referenced: d-001 (south coast only), d-003 (schema baseline),
--   d-006 (postgis), d-007 (supabase provisioning gate), d-010 (kavi owns spatial),
--   d-011 (product geography vs hero geography; 34 sub-areas; path b sequencing).
--
-- this migration creates the spatial layer only. samithu's broader schema pr
-- adds editorial, tag, partner, and operational columns on places via
-- alter table — it does not drop and recreate. see docs/gis-spatial-layer.md.
--
-- path b: 34 sub-areas + 1 parent seed with names, slugs, and parent_id but
-- null coordinates. coordinates land in a follow-up migration when founders
-- source from google maps. the check constraint and trigger logic below
-- explicitly support this two-stage sequence.

-- required for spatial column types (geography), gist indexes, and st_dwithin.
create extension if not exists postgis;

-- gen_random_uuid() lives in pgcrypto on older postgres; supabase enables it
-- by default but declared here for explicitness.
create extension if not exists pgcrypto;

-- boundary representation enum.
-- v1.0 uses 'circle' (center + radius_m) per decision (a) — fast to seed,
-- adequate accuracy for tourist-scale sub-areas. 'polygon' is reserved for
-- v1.1 so future migration is a column populate, not a table rewrite.
create type area_boundary_type as enum ('circle', 'polygon');

-- shared updated_at trigger function. defined once, attached to both tables.
create or replace function trg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- areas: south coast (parent) + 34 sub-areas in v1.0 seed per d-011.
-- self-fk on parent_id supports the parent/sub-area hierarchy without
-- requiring a separate parent_areas table.
create table areas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  parent_id uuid references areas(id) on delete restrict,
  boundary_type area_boundary_type not null default 'circle',
  -- wgs84 (srid 4326). geography (not geometry) so st_dwithin distance
  -- arguments are in meters, not degrees.
  -- nullable during path b scaffold; populated by a follow-up migration.
  center extensions.geography(Point, 4326),
  -- radius in meters. nullable during path b scaffold; populated alongside
  -- center.
  radius_m integer,
  -- reserved for v1.1 polygon support.
  boundary_geom extensions.geography(Polygon, 4326),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- scaffold state (center + radius both null) is intentionally allowed for
  -- path b. populated state requires both. resolve_area_id() skips null-center
  -- rows so partial population is safe.
  constraint areas_boundary_shape_check check (
    (
      boundary_type = 'circle'
      and boundary_geom is null
      and (
        (center is null and radius_m is null)
        or
        (center is not null and radius_m is not null)
      )
    )
    or
    (
      boundary_type = 'polygon'
      and boundary_geom is not null
      and center is null
      and radius_m is null
    )
  )
);

-- partial gist index: only covers populated rows. avoids index bloat during
-- path b scaffold when most rows have null center. gist supports the bbox
-- prefilter that makes st_dwithin fast.
create index idx_areas_center on areas using gist (center) where center is not null;

-- btree on parent_id for the self-fk traversal (list a parent's children).
create index idx_areas_parent_id on areas(parent_id);

-- unique constraint on slug already creates an index; declared explicitly for
-- readability and to make the read path ("look up area by slug") visible at a
-- glance.
create index idx_areas_slug on areas(slug);

create trigger areas_set_updated_at
before update on areas
for each row
execute function trg_set_updated_at();

-- places: sprint 1 spatial scaffold. samithu's schema pr adds editorial,
-- tag, partner, and operational columns via alter table. do not drop and
-- recreate this table on his migration.
create table places (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  -- the spatial column. wgs84 geography for meter-based queries.
  location extensions.geography(Point, 4326) not null,
  -- denormalized fk per decision (b): the spatial trigger populates this at
  -- write time. nullable because the helper may return null if the point
  -- falls outside every populated area (or if no areas have coordinates yet
  -- during path b). on delete set null so deleting an area doesn't cascade
  -- and orphan venue rows.
  area_id uuid references areas(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_places_location on places using gist (location);

-- btree on the denormalized fk for the common read path: "all places in this
-- area." faster than re-running the spatial query on every page load.
create index idx_places_area_id on places(area_id);

create trigger places_set_updated_at
before update on places
for each row
execute function trg_set_updated_at();

-- resolve_area_id: returns the most specific area (smallest radius) containing
-- the given point. returns null if no area matches OR if no areas have
-- populated coordinates yet (path b pre-population state). v1.1 needs
-- st_within for polygon types.
--
-- "smallest radius" ordering ensures a venue inside hiriketiya (small circle)
-- gets assigned to hiriketiya, not dickwella or south coast (larger circles
-- that also contain it). same rule handles dalawella inside the unawatuna
-- bay system, rumassala adjacent to galle, etc.
create or replace function resolve_area_id(loc extensions.geography)
returns uuid
language sql
stable
as $$
  select id
  from areas
  where boundary_type = 'circle'
    and center is not null
    and radius_m is not null
    and extensions.st_dwithin(center, loc, radius_m)
  order by radius_m asc
  limit 1;
$$;

-- spatial enforcement at write time per decision (b). area_id is auto-
-- populated from location; app code never sets area_id directly.
create or replace function trg_places_set_area_id()
returns trigger
language plpgsql
as $$
begin
  if new.location is not null then
    new.area_id := resolve_area_id(new.location);
  end if;
  return new;
end;
$$;

create trigger places_set_area_id
before insert or update of location on places
for each row
execute function trg_places_set_area_id();
