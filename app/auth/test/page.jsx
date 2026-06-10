// THROWAWAY dev scaffold — Kavi owns the real auth screens (D-010).
// Purpose: trigger and verify the auth flow during backend development.
// Replace this entire file with the styled sign-in / sign-up UI.
import { createClient } from "@/lib/supabase/server";
import {
  signInWithMagicLink,
  signInWithGoogle,
  signOut,
} from "@/app/auth/actions";

export const dynamic = "force-dynamic";

export default async function AuthTestPage({ searchParams }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main style={{ fontFamily: "monospace", padding: 24, maxWidth: 480 }}>
      <h1>Auth test (throwaway)</h1>

      {params?.error ? (
        <p style={{ color: "crimson" }}>Error: {params.error}</p>
      ) : null}
      {params?.sent ? (
        <p style={{ color: "green" }}>Magic link sent — check your inbox.</p>
      ) : null}

      {user ? (
        <div>
          <p>
            Signed in as <strong>{user.email}</strong>
          </p>
          <p>user.id: {user.id}</p>
          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      ) : (
        <div>
          <form action={signInWithMagicLink} style={{ marginBottom: 16 }}>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <button type="submit">Send magic link</button>
          </form>
          <form action={signInWithGoogle}>
            <button type="submit">Continue with Google</button>
          </form>
        </div>
      )}
    </main>
  );
}
