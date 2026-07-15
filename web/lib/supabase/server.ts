import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client for use in Server Components, Server Actions,
// and Route Handlers — carries the signed-in user's session via cookies.
// Next.js 15+/16 made cookies() async, so this helper must be awaited.
// Not wired into any route yet (Session 19) — see the session handoff.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Route Handlers/Server Actions can set cookies; Server Components
          // cannot — swallow the error there (Supabase's own documented
          // pattern) since middleware is responsible for session refresh.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render — ignore.
          }
        },
      },
    }
  );
}

// Privileged client using the service role key — bypasses row level
// security entirely. Server-only (never import this from a "use client"
// file); reserved for admin-style operations like inviting a panel officer.
export function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
