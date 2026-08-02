"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePanelStore } from "@/lib/batakaPanel/store";
import { AdminSignIn } from "@/components/batakaPanel/AdminSignIn";

// Gatekeeper for the Foundation admin's dedicated sign-in URL
// (/foundationAdmin). Only a session established through THIS door (the
// admin client's own "sb-panel-admin-auth" cookie, see
// lib/supabase/panelClient.ts) skips the form and sends the visitor to the
// shared dashboard — a clan officer signed in via /batakaPanel in another
// tab does NOT satisfy this gate, since the two doors now use fully
// independent cookies. Checking `session.isAdmin` (rather than just
// `session` truthy) is what enforces that: usePanelStore()'s merged session
// can be an officer session too, and an officer session always has
// `isAdmin: false`. Mirrors app/batakaPanel/layout.tsx's guard, but
// redirects rather than rendering the shell directly, since /foundationAdmin
// has no pages of its own beneath it — it only ever hands off to
// /batakaPanel.
export function FoundationAdminGate() {
  const router = useRouter();
  const { session } = usePanelStore();
  const signedInAsAdmin = session?.isAdmin === true;

  useEffect(() => {
    if (signedInAsAdmin) router.replace("/batakaPanel");
  }, [signedInAsAdmin, router]);

  if (signedInAsAdmin) return null;

  return <AdminSignIn />;
}
