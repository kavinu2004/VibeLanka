# Auth Flow — Design Spec

**Date:** 2026-06-10
**Owner:** Samithu (Track 2 backend cluster, D-010)
**Status:** Approved design, pre-implementation
**Decisions referenced:** D-002 (email + Google, post-browse-with-verify), D-010 (ownership split), D-013 (Supabase account `vibelankaa@gmail.com`)
**Depends on:** `3ec88bf` (auth signup trigger — applied remotely), `6d51682` (core schema — applied remotely)

---

## 1. Purpose & scope

Build the **backend plumbing** for v1 authentication: passwordless email (magic link) + Google OAuth, with SSR-safe cookie sessions available to server components and RLS-authenticated server queries. This is the foundation the Intents backend depends on (`intents_insert_own` checks `user_id = auth.uid()`).

This is the first of four sequential Track 2 backend subsystems (Auth → Seed → Intents → Trending blender). Each gets its own spec/plan/build cycle.

**In scope:**
- Supabase browser + server clients (`@supabase/ssr`)
- Session-refresh middleware
- `/auth/callback` route handler (code exchange for magic-link + Google)
- Sign-in / sign-out server actions
- One throwaway unstyled test page to trigger and verify the flow
- `.env.example` documentation for the new env vars

**Out of scope (explicit):**
- Polished sign-in / sign-up UI — Kavi owns auth screens (D-010). The test page is disposable scaffolding, marked as such.
- The verify-on-account-action prompt — that fires from the Intents subsystem (next cycle), not here.
- Password / password-reset flows — passwordless by decision (magic link).
- Production redirect URLs — the "reachable from a deployed environment" half of D-007 is still deferred to the Sprint 1 staging pipeline. Local dev uses `localhost:3000`.

## 2. Decisions locked during brainstorming (2026-06-10)

1. **Sequencing:** four backend subsystems built one at a time in dependency order; Auth first.
2. **Email method:** magic link (passwordless). Rejected: email+password (worse tourist UX, more surface area), email OTP (kept as a possible future addition, not v1).
3. **Email delivery:** Supabase custom SMTP wired to **Resend** (already in the Track 1 stack). **Cross-account note:** the Supabase project lives on `vibelankaa@gmail.com` (D-013) but Resend is on `kavinu2004@gmail.com` (Track 1 account). Acceptable — the Resend SMTP credentials are entered once in the Supabase dashboard. Logged as conscious cross-account coupling, consistent with the D-013 account-split friction already documented in `infra-state.md`.
4. **Google OAuth:** code path ships now; provider not yet configured in the Supabase dashboard, so Google sign-in activates once the founder adds the OAuth client. Email-first, Google-wired-pending.
5. **UI boundary:** plumbing + one throwaway test page. Kavi builds the real screens.
6. **Session strategy:** `@supabase/ssr` cookie-based sessions (official App Router pattern). Rejected: client-only `localStorage` sessions (no server-side auth, breaks server-side RLS queries the Intents subsystem needs).

## 3. New dependencies

Flagged per CLAUDE.md before install:
- `@supabase/supabase-js`
- `@supabase/ssr`

## 4. Architecture

Small, single-purpose modules:

| File | Purpose | Depends on |
|------|---------|-----------|
| `lib/supabase/client.js` | `createBrowserClient()` — browser client for client components | `@supabase/ssr`, public env vars |
| `lib/supabase/server.js` | `createServerClient()` bound to Next `cookies()` — for server components/actions | `@supabase/ssr`, `next/headers` |
| `lib/supabase/middleware.js` | `updateSession(request)` helper — refresh tokens, rewrite cookies | `@supabase/ssr` |
| `middleware.js` (root) | Next middleware entry; calls `updateSession`; matcher excludes static assets | `lib/supabase/middleware.js` |
| `app/auth/callback/route.js` | GET handler: `exchangeCodeForSession(code)`; redirect to `next` param or test page; error → redirect with `?error=` | `lib/supabase/server.js` |
| `app/auth/actions.js` | Server actions: `signInWithMagicLink(formData)`, `signInWithGoogle()`, `signOut()` | `lib/supabase/server.js` |
| `app/auth/test/page.jsx` | **Throwaway** unstyled page: email field + send-magic-link, Google button, session display, sign-out. Header comment marks it for Kavi to replace. | server client + actions |
| `.env.example` | Document `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | — |

## 5. Data flow

**Magic link:**
test page → `signInWithMagicLink` server action → `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: <origin>/auth/callback } })` → Resend SMTP delivers link → user clicks → `/auth/callback?code=…` → `exchangeCodeForSession` sets the session cookie → redirect back → middleware refreshes on subsequent requests.

**Google:**
test page → `signInWithGoogle` server action → `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: <origin>/auth/callback } })` → returns provider URL → redirect → Google consent → `/auth/callback` (same handler) → session set. Inactive until the provider is configured in the dashboard.

**Closed verification loop:** a first-time sign-in writes `auth.users` → fires `on_auth_user_created` (`3ec88bf`) → `public.users` mirror row created. Verifying auth end-to-end also re-verifies the trigger.

## 6. Error handling

- **Callback:** missing/invalid/expired `code` → redirect to the test page with `?error=<reason>`; never 500.
- **Server actions:** return `{ error: string }` shapes the caller renders; no thrown errors across the action boundary.
- **Middleware:** fails open — absence of a session is a valid state, not an error; never blocks the request.
- **Env vars missing:** clients throw a clear, early "missing NEXT_PUBLIC_SUPABASE_* " message rather than an opaque downstream failure.

## 7. Testing & verification

No local Docker (see `infra-state.md`), so verification runs against the **remote** project (`vvmrqrtzasitgrkpafzj`).

**Buildable/assertable without dashboard config:**
- `npm run build` + lint pass with the new modules.
- Structural assertions: clients construct, middleware matcher correct, callback route exports GET, actions exported.

**Live round-trip (needs founder setup — batched, §8):**
- Send a magic link to a real inbox, click it, confirm a session cookie is set and `/auth/test` shows the authenticated state.
- Confirm the `public.users` mirror row appears for the new user (closes the loop with the trigger).
- Sign out clears the session.

The live round-trip is a verification pass *after* the founder setup steps land; code lands first.

## 8. Founder setup steps (batched — required before live verification)

1. **Resend SMTP** → Supabase dashboard → Auth → SMTP settings: enter Resend SMTP host/port/credentials and a verified sender (reuse a `vibelanka.com` routed address).
2. **Redirect URLs** → Supabase dashboard → Auth → URL config: add `http://localhost:3000/**` and the eventual production origin; set Site URL.
3. **Google OAuth** (for Google activation) → create OAuth client (Google Cloud, D-012 account question applies), add client ID/secret to Supabase dashboard → Auth → Providers → Google.
4. **Local env** → put `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from the password manager, `Vibe Lanka — Supabase`) into `.env.local`.

Steps 1–2 + 4 unblock email magic-link verification. Step 3 unblocks Google.

## 9. Risks / open notes

- **Cross-account SMTP coupling** (Resend on `kavinu2004`, Supabase on `vibelankaa`) — logged, acceptable.
- **D-012 Google account question** (GMP on `kavinu2004` vs `vibelankaa`) resurfaces when creating the Google OAuth client; resolve per D-013's open question at that point. Not blocking email auth.
- **Supabase free-tier email limits** are irrelevant once custom Resend SMTP is wired; without it, the built-in sender is rate-limited and unsuitable.
