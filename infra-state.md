# Vibe Lanka — Infrastructure State

Operational state of provisioned services. Updated when infra changes.
Last updated: 2026-05-21

---

## Supabase (Track 2 — provisioned 2026-05-21)

- **Account:** `vibelankaa@gmail.com` (shared via password manager).
  Clarifies D-007 — the `kavinu2004@gmail.com` reference in D-007 was the
  Track 1 Vercel/Resend account; Track 2 infra lands on the dedicated
  `vibelankaa@gmail.com` already in use for inbox routing (2026-05-11).
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
