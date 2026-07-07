import { AbalangiraContent } from "@/components/abalangira/AbalangiraContent";

// /abalangira — the royal clan of Buganda (Olulyo Olulangira): princes and
// princesses, its titles, governance, and succession rules. Split out from
// /kabaka into its own top-level tab. All content lives in the client
// AbalangiraContent component; this server page is a thin wrapper (server
// component delegating to a client Content component — the pattern used
// across all kingdom pages).
export default function AbalangiraPage() {
  return <AbalangiraContent />;
}
