"use client";

import { usePanelStore } from "@/lib/batakaPanel/store";
import { PanelShell } from "@/components/batakaPanel/PanelShell";
import { PanelSignIn } from "@/components/batakaPanel/PanelSignIn";

// The gatekeeper: every page under /batakaPanel renders inside this layout.
// No panel session → the sign-in screen is shown instead of the page, so a
// member (or anyone) typing the URL never sees clan data. When real auth
// lands, this guard checks the database role instead of the mock session.
export default function BatakaPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = usePanelStore();

  if (!session) return <PanelSignIn />;

  return <PanelShell session={session}>{children}</PanelShell>;
}
