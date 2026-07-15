"use client";

// Browser-side Supabase client, for use in client components ("use client").
// Not wired into any component yet (Session 19) — nothing imports this file
// until AuthContext/LoginFlow are migrated off their mock state.

import { createBrowserClient } from "@supabase/ssr";

// Memoized — every caller shares one client. Constructing a fresh client per
// call spawns multiple GoTrueClient instances that fight over the same auth
// storage key (Supabase warns about exactly this).
let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  browserClient ??= createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return browserClient;
}
