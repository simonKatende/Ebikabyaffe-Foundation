"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePanelStore } from "@/lib/batakaPanel/store";
import { AdminSignIn } from "@/components/batakaPanel/AdminSignIn";

// Gatekeeper for the Foundation admin's dedicated sign-in URL
// (/foundationAdmin). A panel session already signed in — via either entry
// point, this one or the clan officer's /batakaPanel — sends the visitor
// straight to the shared dashboard instead of showing a sign-in form again.
// Mirrors app/batakaPanel/layout.tsx's guard, but redirects rather than
// rendering the shell directly, since /foundationAdmin has no pages of its
// own beneath it — it only ever hands off to /batakaPanel.
export function FoundationAdminGate() {
  const router = useRouter();
  const { session } = usePanelStore();

  useEffect(() => {
    if (session) router.replace("/batakaPanel");
  }, [session, router]);

  if (session) return null;

  return <AdminSignIn />;
}
