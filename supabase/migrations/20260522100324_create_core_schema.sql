-- migration: core schema (users, places alters, events, partners, djs,
--   events_djs, intents, intents_audit, landmarks) + rls.
-- date: 2026-05-22
-- decisions referenced:
--   d-001 (v1.0 south coast scope),
--   d-002 (auth = email + google oauth, post-browse verify),
--   d-003 (schema baseline: users, places, events, partners, djs),
--   d-014 (postgis types schema-qualified as extensions.*),
--   d-015 (reference data lives in migrations, not seeds),
--   d-009 (specialist consults deferred — partner tier semantics, pdpa,
--          payment rails are gated on consults that have not happened),
--   2026-05-22 intent-signals decision (intents table per supersession of
--          the 2026-05-02 "vote integrity" framing; resolved via build lead
--          schema chat q9).
--
-- assumes the spatial migration 20260520120000_create_areas_and_places_geo.sql
-- has already run. this migration:
--   - alters the existing `places` table (does not drop) to add editorial,
--     tag, partner, and operational columns;
--   - reuses the existing `trg_set_updated_at()` and `resolve_area_id()`
--     functions defined in the spatial migration;
--   - enables rls on `areas` and `places` (the spatial migration did not);
--   - creates the remaining sprint 1 tables, indexes, triggers, and policies.
--
-- reversibility: largely reversible (drop table, drop column, drop policy,
-- drop trigger, drop function). non-reversible portion: the alter-table
-- column adds on `places` cannot be cleanly rolled back if data has been
-- written into them. acceptable for a structure-only migration pre-seed.

-- ============================================================================
-- 1. rls on the spatial-layer tables (areas, places)
-- ============================================================================

-- the spatial migration created `areas` and `places` without rls. enabling
-- here so all v1.0 tables converge on the same default — rls enforced, with
-- explicit policies. write policies restrict to service_role for v1.0: there
-- is no admin role yet (committed in this migration's policy block below).

alter table areas enable row level security;
alter table places enable row level security;

create policy "areas_read_public"
  on areas for select
  using (true);

create policy "areas_service_role_write"
  on areas for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 2. places — alter (do not drop). d-003 editorial + operational columns.
-- ============================================================================

-- `partner_id` fk is added later in this migration, after `partners` exists.
-- declaring the column without the constraint here avoids the circular
-- forward reference. denormalized convenience: `places.partner_id` is set
-- when a place gets a partner; `partners.place_id` is the canonical reverse
-- link enforced by the `unique` constraint on partners.place_id. duplication
-- is intentional — the `places.partner_id` exists so a venue read does not
-- have to join partners to know whether a venue has one.
alter table places
  add column description text,
  add column vibe_tags text[] not null default '{}'::text[],
  add column partner_id uuid,
  add column price_tier smallint check (price_tier between 1 and 4),
  add column is_active boolean not null default true,
  add column seed_source text;

-- places write policies. for v1.0 there is no admin role; service_role is
-- the only writer. revisit when an admin role lands (out of scope here).
create policy "places_read_public"
  on places for select
  using (true);

create policy "places_service_role_write"
  on places for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 3. users — application-layer mirror of auth.users
-- ============================================================================

-- rows in public.users join cleanly without crossing into auth.* schema and
-- give app-controlled fields (display_name) without touching supabase-managed
-- auth tables. id fk cascades from auth.users so deleting the auth identity
-- removes the public row.
--
-- display_name is nullable: anonymous is the v1.0 default per the
-- 2026-05-22 intent-signals decision (intents are anonymous in display;
-- "anonymous" means publicly anonymous, not unlinked from account).
-- display_name is reserved for v1.1 if/when we surface attribution.
--
-- inserts: this migration declares no insert policy on public.users.
-- creation flows through an `on auth user signup` trigger or admin rpc that
-- runs as service_role and bypasses rls. the trigger is intentionally
-- out of scope for this migration — follow-up migration.

create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger users_set_updated_at
  before update on users
  for each row
  execute function trg_set_updated_at();

alter table users enable row level security;

create policy "users_select_own"
  on users for select
  using (id = auth.uid());

create policy "users_update_own"
  on users for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ============================================================================
-- 4. events — d-003. fk to places. starts_at indexed for read path.
-- ============================================================================

create table events (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references places(id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null,
  -- nullable: open-ended events (residencies, ongoing nights without a
  -- declared end).
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- both indexes service the hot read path "events tonight at this venue":
-- place_id filters the venue, starts_at orders the timeline.
create index idx_events_place_id on events(place_id);
create index idx_events_starts_at on events(starts_at);

create trigger events_set_updated_at
  before update on events
  for each row
  execute function trg_set_updated_at();

alter table events enable row level security;

create policy "events_read_public"
  on events for select
  using (true);

create policy "events_service_role_write"
  on events for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 5. partners — one partner per place. d-003 distinct entity.
-- ============================================================================

-- unique on place_id enforces one-partner-per-place (q10 = a). a place can
-- have at most one partnership row at a time. partner tier semantics
-- (`tier` text, nullable) are intentionally undefined for v1.0 per d-009:
-- payment-rails specialist consult has not happened, so we accept any
-- string here and defer schema constraints until the consult lands.

create table partners (
  id uuid primary key default gen_random_uuid(),
  place_id uuid unique not null references places(id) on delete cascade,
  legal_name text not null,
  contact_email text,
  -- tier semantics deferred until payment-rails specialist consult (d-009).
  tier text,
  effective_from date not null default current_date,
  -- null means currently active.
  effective_to date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- the unique constraint on place_id already provides a btree index. the
-- partial index below targets the "currently active partners" read path.
create index idx_partners_active on partners(effective_to)
  where effective_to is null;

create trigger partners_set_updated_at
  before update on partners
  for each row
  execute function trg_set_updated_at();

-- now that partners exists, close the forward reference from places.
-- on delete set null: if a partnership is removed, the venue keeps existing,
-- and `places.partner_id` clears.
alter table places
  add constraint places_partner_id_fkey
  foreign key (partner_id) references partners(id) on delete set null;

alter table partners enable row level security;

-- partners is read-and-write service-role-only — billing contacts, tier,
-- legal names are operationally sensitive and never user-visible directly.
create policy "partners_service_role_only"
  on partners for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 6. djs — d-003.
-- ============================================================================

create table djs (
  id uuid primary key default gen_random_uuid(),
  stage_name text not null,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger djs_set_updated_at
  before update on djs
  for each row
  execute function trg_set_updated_at();

alter table djs enable row level security;

create policy "djs_read_public"
  on djs for select
  using (true);

create policy "djs_service_role_write"
  on djs for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 7. events_djs — m:n join (q11). immutable rows: no updated_at.
-- ============================================================================

create table events_djs (
  event_id uuid not null references events(id) on delete cascade,
  dj_id uuid not null references djs(id) on delete cascade,
  -- nullable: unspecified order for sets that aren't back-to-back ordered.
  set_order smallint,
  created_at timestamptz not null default now(),
  primary key (event_id, dj_id)
);

-- the pk already indexes (event_id, dj_id) leftmost. this extra index
-- services the inverse read path "which events is this dj playing."
create index idx_events_djs_dj_id on events_djs(dj_id);

alter table events_djs enable row level security;

create policy "events_djs_read_public"
  on events_djs for select
  using (true);

create policy "events_djs_service_role_write"
  on events_djs for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 8. intents — the intent-signals table (2026-05-22 decision)
-- ============================================================================

-- one intent per user per venue per night. `night_start` is the calendar
-- date of the 6pm asia/colombo boundary defining "this night" (q8 = b).
--
-- night_start computation rule (application sets at insert):
--   - if local asia/colombo time is between 00:00 and 05:59 → previous
--     calendar date in asia/colombo;
--   - otherwise → current calendar date in asia/colombo.
-- a server-side trigger below provides defense-in-depth: it rejects any
-- night_start more than 1 day off from the current asia/colombo date.
-- the trigger does not recompute; it bounds.
--
-- intents rows are immutable from the row's perspective (no updated_at).
-- updates and deletes are logged via intents_audit (next section).

create table intents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  place_id uuid not null references places(id) on delete cascade,
  night_start date not null,
  created_at timestamptz not null default now(),
  unique (user_id, place_id, night_start)
);

-- hot read path: "how many intents at this venue tonight" — composite
-- index serves the (place_id, night_start) filter directly.
create index idx_intents_place_night on intents(place_id, night_start);

create or replace function trg_intents_validate_night_start()
returns trigger
language plpgsql
as $$
declare
  expected_date date;
begin
  expected_date := (now() at time zone 'Asia/Colombo')::date;
  if new.night_start < expected_date - 1 or new.night_start > expected_date + 1 then
    raise exception
      'intents.night_start (%) is more than 1 day off the current Asia/Colombo date (%)',
      new.night_start, expected_date;
  end if;
  return new;
end;
$$;

create trigger intents_validate_night_start
  before insert or update on intents
  for each row
  execute function trg_intents_validate_night_start();

alter table intents enable row level security;

-- authenticated users insert intents tied to their own user_id only.
create policy "intents_insert_own"
  on intents for insert
  with check (user_id = auth.uid());

-- users read their own intents. aggregate reads (counts per place per night)
-- go through a future rpc, not direct row access — flagged here for the
-- next migration. rpc will run as security definer to read across users.
create policy "intents_select_own"
  on intents for select
  using (user_id = auth.uid());

create policy "intents_delete_own"
  on intents for delete
  using (user_id = auth.uid());

-- service_role can read all (admin, reporting, future insights work
-- pending pdpa consult per d-009).
create policy "intents_service_role_read_all"
  on intents for select
  using (auth.role() = 'service_role');

-- ============================================================================
-- 9. intents_audit — append-only audit log (2026-05-22 decision)
-- ============================================================================

-- permanent record of every intent insert / update / delete. survives
-- intent row deletion: intent_id is intentionally not a fk so an audit row
-- outlives the source intent. denormalized user_id / place_id / night_start
-- keep audit queries cheap without joining a (possibly deleted) intents row.
--
-- the future insights-sales possibility (gated on pdpa specialist consult
-- per d-009) reads from this table.

create table intents_audit (
  id uuid primary key default gen_random_uuid(),
  intent_id uuid not null,
  user_id uuid not null,
  place_id uuid not null,
  night_start date not null,
  operation text not null check (operation in ('insert', 'update', 'delete')),
  recorded_at timestamptz not null default now()
);

create index idx_intents_audit_intent_id on intents_audit(intent_id);
create index idx_intents_audit_recorded_at on intents_audit(recorded_at);

-- security definer: required so the trigger can write to intents_audit
-- regardless of the invoking user's rls. this is intentional and standard
-- for audit triggers; the function body is fixed by this migration and any
-- change must come via migration, not via direct database edit.
-- post-image (NEW) is written on insert/update, pre-image (OLD) on delete —
-- matches the row state that triggered the audit event.
create or replace function trg_intents_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into intents_audit (intent_id, user_id, place_id, night_start, operation)
      values (new.id, new.user_id, new.place_id, new.night_start, 'insert');
    return new;
  elsif tg_op = 'UPDATE' then
    insert into intents_audit (intent_id, user_id, place_id, night_start, operation)
      values (new.id, new.user_id, new.place_id, new.night_start, 'update');
    return new;
  elsif tg_op = 'DELETE' then
    insert into intents_audit (intent_id, user_id, place_id, night_start, operation)
      values (old.id, old.user_id, old.place_id, old.night_start, 'delete');
    return old;
  end if;
  return null;
end;
$$;

create trigger intents_audit_log
  after insert or update or delete on intents
  for each row
  execute function trg_intents_audit();

alter table intents_audit enable row level security;

-- audit table is service-role-only. no public read (audit log integrity),
-- no public write (rows only land via the trigger above, which runs as
-- security definer and bypasses rls).
create policy "intents_audit_service_role_only"
  on intents_audit for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================================
-- 10. landmarks — reserved, unpopulated (q7 = b)
-- ============================================================================

-- schema reserved now so the first non-venue, non-event place (dondra head,
-- mulkirigala, bundala features, etc.) lands without a schema migration.
-- coordinate population + editorial content gated on the same future
-- trigger that would otherwise have moved landmarks into `places`.
-- reuses resolve_area_id() and trg_set_updated_at() from the spatial
-- migration — same pattern as places_set_area_id.

create table landmarks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  location extensions.geography(Point, 4326) not null,
  area_id uuid references areas(id) on delete set null,
  landmark_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_landmarks_location on landmarks using gist (location);
create index idx_landmarks_area_id on landmarks(area_id);
create index idx_landmarks_slug on landmarks(slug);

create trigger landmarks_set_updated_at
  before update on landmarks
  for each row
  execute function trg_set_updated_at();

create or replace function trg_landmarks_set_area_id()
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

create trigger landmarks_set_area_id
  before insert or update of location on landmarks
  for each row
  execute function trg_landmarks_set_area_id();

alter table landmarks enable row level security;

create policy "landmarks_read_public"
  on landmarks for select
  using (true);

create policy "landmarks_service_role_write"
  on landmarks for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
