-- South Coast product geography seed (Path B scaffold)
-- Parent: South Coast (slug: south-coast)
-- 34 sub-areas from Beruwala (west) to Mattala (east, southern expressway terminus)
-- Coordinates intentionally NULL — populated by a later migration (Path B per founder call 2026-05-20)
-- Scope per D-011 (product geography vs hero geography)
-- Inserts are idempotent (ON CONFLICT DO NOTHING on slug)

-- parent first. sub-area inserts below reference its id via subselect on slug
-- so the seed remains idempotent under re-runs (no returning clause that
-- could return zero rows after a no-op insert).
insert into areas (slug, name, boundary_type, parent_id)
values ('south-coast', 'South Coast', 'circle', null)
on conflict (slug) do nothing;

-- galle district — western half (west to east).
insert into areas (slug, name, boundary_type, parent_id)
select 'beruwala', 'Beruwala', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'kosgoda', 'Kosgoda', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'ahungalla', 'Ahungalla', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'balapitiya', 'Balapitiya', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'bentota', 'Bentota', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'ambalangoda', 'Ambalangoda', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'hikkaduwa', 'Hikkaduwa', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'rumassala', 'Rumassala', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'galle', 'Galle', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'unawatuna', 'Unawatuna', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'dalawella', 'Dalawella', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'thalpe-habaraduwa', 'Thalpe & Habaraduwa', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'koggala', 'Koggala', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'ahangama', 'Ahangama', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'midigama', 'Midigama', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

-- matara district.
insert into areas (slug, name, boundary_type, parent_id)
select 'weligama', 'Weligama', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'mirissa', 'Mirissa', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'madiha', 'Madiha', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'polhena', 'Polhena', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'matara', 'Matara', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'devundara', 'Devundara', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'talalla', 'Talalla', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'dickwella', 'Dickwella', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'hiriketiya', 'Hiriketiya', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

-- hambantota district — eastern half (west to east, terminating at mattala).
insert into areas (slug, name, boundary_type, parent_id)
select 'goyambokka', 'Goyambokka', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'tangalle', 'Tangalle', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'rekawa', 'Rekawa', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'kalametiya', 'Kalametiya', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'hambantota', 'Hambantota', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'bundala', 'Bundala', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'weerawila', 'Weerawila', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'tissamaharama', 'Tissamaharama', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'yala', 'Yala', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;

insert into areas (slug, name, boundary_type, parent_id)
select 'mattala', 'Mattala', 'circle', id from areas where slug = 'south-coast'
on conflict (slug) do nothing;
