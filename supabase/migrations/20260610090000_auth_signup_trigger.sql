-- migration: auth signup trigger — mirror auth.users into public.users
-- date: 2026-06-10
-- decisions referenced: d-003 (schema baseline), 2026-05-22 intent-signals
--   (public.users is the app-layer mirror; display_name reserved for v1.1).
--
-- the core schema migration (20260522100324) created public.users but left
-- row creation to "an on-auth-user-signup trigger or admin rpc that runs as
-- service_role and bypasses rls." this migration is that trigger.
--
-- security definer: public.users has no insert policy (rls enabled, no
-- insert grant to authenticated). the trigger function runs as its owner
-- (postgres / supabase_admin) so the insert succeeds regardless of the
-- invoking role. search_path is pinned to defend against search_path
-- hijacking on a security definer function.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

-- after insert on auth.users: the auth row must exist before the mirror row
-- (public.users.id fk references auth.users.id). on conflict do nothing makes
-- the trigger idempotent — a retried or duplicate signup event won't error.
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
