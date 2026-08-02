"use client";

// TWO independent Supabase browser clients for the Bataka Panel — one for
// the clan officer's door (/batakaPanel), one for the Foundation admin's
// door (/foundationAdmin), each under its OWN cookie name. Before 2026-08-02
// these shared a single "sb-panel-auth" cookie, which meant signing in via
// either door produced the exact same session everywhere: a new tab on the
// OTHER door would silently skip its own sign-in screen and drop the visitor
// straight into the shared dashboard as whichever role happened to be
// cookied, admin or officer. Splitting the cookie is what actually fixes
// that — each door's own gate now only recognizes a session established
// through ITS OWN password. Both still ultimately render the same shared
// PanelShell dashboard once signed in (that convergence is intentional, see
// PanelSignIn.tsx/AdminSignIn.tsx headers) — only the credential-check layer
// is now genuinely separate, not just the front-door UI.
//
// Real gotcha: @supabase/ssr's createBrowserClient caches ONE client in a
// module-level variable shared across every call in the app when running in
// a browser (`isSingleton` defaults to true there) — a second call with
// different `cookieOptions` would otherwise silently just return the FIRST
// client instead of a new one. `isSingleton: false` on both calls here opts
// them out of that shared cache; this file does its own memoization instead
// (same pattern as lib/supabase/client.ts) so repeated calls to either
// function still reuse one instance rather than spawning multiple
// GoTrueClients on the same cookie name.

import { createBrowserClient } from "@supabase/ssr";

let officerClient: ReturnType<typeof createBrowserClient> | undefined;
let adminClient: ReturnType<typeof createBrowserClient> | undefined;

export function createOfficerPanelClient() {
  officerClient ??= createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      isSingleton: false,
      cookieOptions: { name: "sb-panel-officer-auth" },
    }
  );
  return officerClient;
}

export function createAdminPanelClient() {
  adminClient ??= createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      isSingleton: false,
      cookieOptions: { name: "sb-panel-admin-auth" },
    }
  );
  return adminClient;
}
