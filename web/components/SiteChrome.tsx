"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Routes that are their own internal system — the Bataka Panel and Foundation
// Admin console — get NO public member-facing chrome. They have their own
// sign-in screens (PanelSignIn.tsx / AdminSignIn.tsx) and, once signed in,
// their own header/tabs (PanelShell.tsx). Showing the public Nav/Footer here
// was a real bug: it let an officer/admin wander back into member pages
// mid-review and had nothing to do with the internal area they were in.
const INTERNAL_PREFIXES = ["/batakaPanel", "/foundationAdmin"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInternal = INTERNAL_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isInternal) {
    return <main className="flex-1 w-full">{children}</main>;
  }

  return (
    <>
      <Nav />
      {/* paddingTop matches the fixed Nav height so page content is never
          hidden under it — only applies here, since internal panel pages
          above have no fixed Nav to clear. */}
      <main className="flex-1 w-full" style={{ paddingTop: "var(--nav-h)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
