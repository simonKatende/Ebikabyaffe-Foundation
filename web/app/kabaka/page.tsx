import { KabakaContent } from "@/components/kabaka/KabakaContent";

// /kabaka — the throne of Buganda: Ssabasajja Kabaka Ronald Muwenda
// Mutebi II. All content lives in the client KabakaContent component;
// this server page is a thin wrapper (server component delegating to a
// client Content component — the pattern used across all kingdom pages).
export default function KabakaPage() {
  return <KabakaContent />;
}
