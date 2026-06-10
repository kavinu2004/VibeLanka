# Vibe Lanka — Infrastructure State

Operational state of provisioned services. Updated when infra changes.
Last updated: 2026-06-10

---

## Supabase (Track 2 — provisioned 2026-05-21)

- **Account:** `vibelankaa@gmail.com` (shared via password manager).
  Track 2 infrastructure account, per D-013 (2026-05-21). Departs from
  the D-012 (2026-05-20) "shared single account per existing
  Vercel/Resend precedent (2026-05-08)" framing — that precedent
  (`kavinu2004@gmail.com`) remains the Track 1 account. D-012 Google
  Maps Platform alignment is an open question; see D-013 in decisions.md.
- **Project name:** `vibelanka-track2`
- **Project ref:** `vvmrqrtzasitgrkpafzj`
- **Region:** Singapore (`ap-southeast-1`)
- **Plan:** Free tier
- **PostGIS:** Enabled, version `3.3` (USE_GEOS=1 USE_PROJ=1 USE_STATS=1)
- **Other extensions:** `uuid-ossp`, `pgcrypto` (Supabase defaults, verified enabled)
- **Credentials location:** Shared password manager under
  `Vibe Lanka — Supabase`. Contains: project URL, anon key, service_role key,
  pooled connection string (port 6543), direct connection string (port 5432),
  database password.
- **Reachability:** Confirmed 2026-05-21 via local `psql` from Samithu's
  machine — `SELECT postgis_version()` returned successfully. Closes Gate 2.
- **Vercel env wiring:** Deferred. No Track 2 app code consumes these yet.
  Wire when Sprint 1 item #3 (staging deploy pipeline) lands, at which point
  the founders decide whether Track 2 deploys onto the existing `vibe-lanka`
  Vercel project or a new one.
- **Auth providers configured:** None yet (Email/Google OAuth setup happens
  with the auth flow build, not at provisioning).
- **CLI ops auth (link, db push) — account-split gotcha (2026-06-10):** Track 2
  Supabase CLI operations from this machine require auth as `vibelankaa@gmail.com`
  — via PAT (`SUPABASE_ACCESS_TOKEN=...`) or `supabase login`. The default stored
  CLI login on this machine is a different account that only sees `Metro-AC` and
  `pilotos-lk`, NOT `vvmrqrtzasitgrkpafzj` (`vibelanka-track2`). Without the right
  auth, `link`/`db push` fail at the API access check
  (`Your account does not have the necessary privileges to access this endpoint`).
  This is the D-013 cross-track account-split friction surfacing operationally.
  Surfaced 2026-06-10 promoting the auth signup trigger migration (`3ec88bf`) +
  core schema (`6d51682`) to remote; push succeeded once authenticated with a
  `vibelankaa@gmail.com` PAT.
