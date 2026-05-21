-- migration: spatial layer + south coast product geography (consolidated)
-- date: 2026-05-20
-- decisions referenced: d-001 (south coast only), d-003 (schema baseline),
--   d-006 (postgis), d-007 (supabase provisioning gate), d-010 (kavi owns spatial),
--   d-011 (product geography vs hero geography; 34 sub-areas),
--   d-014 (schema-qualify postgis as extensions.*),
--   d-015 (reference data lives in migrations, not seeds).
--
-- this migration creates the spatial layer and seeds the v1.0 south coast
-- product geography (1 parent + 34 sub-areas, all with populated coordinates).
-- samithu's broader schema pr adds editorial, tag, partner, and operational
-- columns on places via alter table — it does not drop and recreate. see
-- docs/gis-spatial-layer.md.

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

-- areas: south coast (parent) + 34 sub-areas in v1.0 reference data per d-011.
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
  center extensions.geography(Point, 4326) not null,
  -- radius in meters.
  radius_m integer not null,
  -- reserved for v1.1 polygon support.
  boundary_geom extensions.geography(Polygon, 4326),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- gist supports the bbox prefilter that makes st_dwithin fast. the
-- `where center is not null` clause is retained from the prior partial-index
-- form; with center now not null it matches every row, so the partial form is
-- equivalent to a full index here.
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
  -- falls outside every area. on delete set null so deleting an area doesn't
  -- cascade and orphan venue rows.
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
-- the given point. returns null if no area matches. v1.1 needs st_within for
-- polygon types.
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

-- v1.0 south coast product geography — reference data per d-015.
-- 1 parent + 34 sub-areas from beruwala (west) to mattala (east, southern
-- expressway terminus). coordinates sourced from
-- scripts/geocode-south-coast.mjs (commit 8427a68) with manual overrides for:
--   - south-coast (parent): radius 70000m, geometric override
--   - midigama: google returned wrong town inland
--   - hiriketiya: google returned wrong hiriketiya near kalutara
--
-- idempotent: parent insert uses on conflict do nothing; sub-area insert
-- cross joins on the parent slug subselect, so re-running is safe and does
-- not require pre-generated uuids for parent referential integrity.
insert into areas (slug, name, parent_id, center, radius_m, boundary_type)
values (
  'south-coast', 'South Coast', null,
  extensions.st_makepoint(80.42, 5.97)::extensions.geography, 70000, 'circle'
)
on conflict (slug) do nothing;

insert into areas (slug, name, parent_id, center, radius_m, boundary_type)
select v.slug, v.name, parent.id, v.center, v.radius_m, 'circle'::area_boundary_type
from (values
  -- galle district (west to east).
  ('beruwala',           'Beruwala',            extensions.st_makepoint(79.98414369999999, 6.475923499999999)::extensions.geography, 2500),
  ('kosgoda',            'Kosgoda',             extensions.st_makepoint(80.0289158,        6.33847)::extensions.geography,            2500),
  ('ahungalla',          'Ahungalla',           extensions.st_makepoint(80.0409178,        6.313277600000001)::extensions.geography,  2500),
  ('balapitiya',         'Balapitiya',          extensions.st_makepoint(80.0403047,        6.2783546)::extensions.geography,          2500),
  ('bentota',            'Bentota',             extensions.st_makepoint(80.002455,         6.4187604)::extensions.geography,          2500),
  ('ambalangoda',        'Ambalangoda',         extensions.st_makepoint(80.0590804,        6.2441521)::extensions.geography,          2500),
  ('hikkaduwa',          'Hikkaduwa',           extensions.st_makepoint(80.1090375,        6.1396164)::extensions.geography,          2500),
  ('rumassala',          'Rumassala',           extensions.st_makepoint(80.24188989999999, 6.021239599999999)::extensions.geography, 1500),
  ('galle',              'Galle',               extensions.st_makepoint(80.2167912,        6.032894799999999)::extensions.geography, 2500),
  ('unawatuna',          'Unawatuna',           extensions.st_makepoint(80.2488596,        6.017446899999999)::extensions.geography, 2500),
  ('dalawella',          'Dalawella',           extensions.st_makepoint(80.2593131,        6.0039238)::extensions.geography,          1500),
  ('thalpe-habaraduwa',  'Thalpe & Habaraduwa', extensions.st_makepoint(80.2781262,        6.0009954)::extensions.geography,          2500),
  ('koggala',            'Koggala',             extensions.st_makepoint(80.3352364,        6.000704)::extensions.geography,           2500),
  ('ahangama',           'Ahangama',            extensions.st_makepoint(80.36215949999999, 5.973974699999999)::extensions.geography, 2500),
  ('midigama',           'Midigama',            extensions.st_makepoint(80.3925,           5.9742)::extensions.geography,             2500),
  -- matara district (west to east).
  ('weligama',           'Weligama',            extensions.st_makepoint(80.4293545,        5.973710899999999)::extensions.geography, 2500),
  ('mirissa',            'Mirissa',             extensions.st_makepoint(80.4715866,        5.948262)::extensions.geography,           2500),
  ('madiha',             'Madiha',              extensions.st_makepoint(80.5158699,        5.9361336)::extensions.geography,          800),
  ('polhena',            'Polhena',             extensions.st_makepoint(80.5257863,        5.9400607)::extensions.geography,          1500),
  ('matara',             'Matara',              extensions.st_makepoint(80.54685289999999, 5.9496309)::extensions.geography,         2500),
  ('devundara',          'Devundara',           extensions.st_makepoint(80.5892815,        5.928180299999999)::extensions.geography, 2500),
  ('talalla',            'Talalla',             extensions.st_makepoint(80.62436629999999, 5.9534956)::extensions.geography,         2500),
  ('dickwella',          'Dickwella',           extensions.st_makepoint(80.69863169999999, 5.9768617)::extensions.geography,         2500),
  ('hiriketiya',         'Hiriketiya',          extensions.st_makepoint(80.7028,           5.9614)::extensions.geography,             800),
  -- hambantota district (west to east, terminating at mattala).
  ('goyambokka',         'Goyambokka',          extensions.st_makepoint(80.7805868,        6.0091578)::extensions.geography,          800),
  ('tangalle',           'Tangalle',            extensions.st_makepoint(80.794658,         6.028548799999999)::extensions.geography, 2500),
  ('rekawa',             'Rekawa',              extensions.st_makepoint(80.8516173,        6.0514652)::extensions.geography,          1500),
  ('kalametiya',         'Kalametiya',          extensions.st_makepoint(80.93736229999999, 6.092186)::extensions.geography,          2500),
  ('hambantota',         'Hambantota',          extensions.st_makepoint(81.124773,         6.125941399999999)::extensions.geography, 2500),
  ('bundala',            'Bundala',             extensions.st_makepoint(81.2408689,        6.1969138)::extensions.geography,          1500),
  ('weerawila',          'Weerawila',           extensions.st_makepoint(81.229209,         6.2421494)::extensions.geography,          2500),
  ('tissamaharama',      'Tissamaharama',       extensions.st_makepoint(81.28603149999999, 6.277565999999999)::extensions.geography, 2500),
  ('yala',               'Yala',                extensions.st_makepoint(81.47188469999999, 6.463961299999999)::extensions.geography, 800),
  ('mattala',            'Mattala',             extensions.st_makepoint(81.11409119999999, 6.305154300000001)::extensions.geography, 2500)
) as v(slug, name, center, radius_m)
cross join (select id from areas where slug = 'south-coast') as parent
on conflict (slug) do nothing;
