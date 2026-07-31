import type { ListingStatus } from "@/lib/businesses/types";

// Mirrors components/batakaPanel/StatusBadge.tsx's styling for the analogous
// PanelMember lifecycle — kept as its own small component since the two
// status sets differ (a listing has no "registered"/no-request-yet state).
const STYLES: Record<ListingStatus, { label: string; cls: string }> = {
  pending:        { label: "PENDING REVIEW",   cls: "bg-gold3 text-gd" },
  info_requested: { label: "INFO REQUESTED",   cls: "bg-royal/10 text-royal2" },
  verified:       { label: "✓ VERIFIED",       cls: "bg-g0 text-gm" },
  declined:       { label: "DECLINED",         cls: "bg-red-50 text-red-700" },
};

export function BusinessStatusBadge({ status }: { status: ListingStatus }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded tracking-[.5px] whitespace-nowrap ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
