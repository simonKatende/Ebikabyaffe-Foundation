import { FoundationAdminGate } from "@/components/batakaPanel/FoundationAdminGate";

// /foundationAdmin — the Foundation admin's own dedicated sign-in URL,
// separate from /batakaPanel (the clan officer's entry point). See
// components/batakaPanel/PanelSignIn.tsx's header comment for the full
// rationale (2026-08 request: a distinct link per audience, with no
// cross-link between the two sign-in screens). Once signed in, the admin
// lands in the same shared dashboard the officers use — only the front door
// is separate. Not linked from the public nav, same as /batakaPanel — the
// Foundation hands this URL directly to whoever holds the admin password.
export default function FoundationAdminPage() {
  return <FoundationAdminGate />;
}
