import type { MemberStatus } from "@/lib/batakaPanel/types";

const STYLES: Record<MemberStatus, { label: string; cls: string }> = {
  registered:     { label: "NO REQUEST YET",   cls: "bg-cream2 text-muted" },
  pending:        { label: "PENDING REVIEW",   cls: "bg-gold3 text-gd" },
  info_requested: { label: "INFO REQUESTED",   cls: "bg-royal/10 text-royal2" },
  verified:       { label: "✓ VERIFIED",       cls: "bg-g0 text-gm" },
  declined:       { label: "DECLINED",         cls: "bg-red-50 text-red-700" },
};

export function StatusBadge({ status }: { status: MemberStatus }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded tracking-[.5px] whitespace-nowrap ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
