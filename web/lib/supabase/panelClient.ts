"use client";

// A SECOND, independent Supabase browser client for the Bataka Panel /
// Foundation Admin — deliberately separate from lib/supabase/client.ts's
// member-facing client so a signed-in member and a signed-in officer/admin
// can coexist in the same browser without one session overwriting the
// other (both ultimately talk to the same Supabase project/auth server,
// they just don't share a cookie jar).
//
// Real gotcha: @supabase/ssr's createBrowserClient caches ONE client in a
// module-level variable shared across every call in the app when running in
// a browser (`isSingleton` defaults to true there) — a second call with
// different `cookieOptions` would otherwise silently just return the FIRST
// (member) client instead of a new one. `isSingleton: false` here opts this
// call out of that shared cache; this file does its own memoization instead
// (same pattern as lib/supabase/client.ts) so repeated calls still reuse one
// instance rather than spawning multiple GoTrueClients on this cookie name.

import { createBrowserClient } from "@supabase/ssr";

let panelClient: ReturnType<typeof createBrowserClient> | undefined;

export function createPanelClient() {
  panelClient ??= createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      isSingleton: false,
      cookieOptions: { name: "sb-panel-auth" },
    }
  );
  return panelClient;
}
