import { AbakunguContent } from "@/components/abakungu/AbakunguContent";

// /abakungu — Abakungu ba Ssaabasajja, the Kabaka's network of personal
// representative chiefs, administratively headed by the Katikkiro. Replaces
// the old standalone /katikkiro tab (see AbakunguContent.tsx for the full
// rationale). All content lives in the client AbakunguContent component;
// this server page is a thin wrapper (server component delegating to a
// client Content component — the pattern used across all kingdom pages).
export default function AbakunguPage() {
  return <AbakunguContent />;
}
