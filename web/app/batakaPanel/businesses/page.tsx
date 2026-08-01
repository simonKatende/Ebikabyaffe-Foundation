"use client";

import { useState } from "react";
import Link from "next/link";
import { usePanelStore } from "@/lib/batakaPanel/store";
import { useBusinessStore, listingsForReviewer } from "@/lib/businesses/store";
import { getClan } from "@/lib/clans";
import { BusinessStatusBadge } from "@/components/businesses/BusinessStatusBadge";
import type { ListingStatus } from "@/lib/businesses/types";
import { cn } from "@/lib/utils";

const FILTERS: { key: ListingStatus | "all"; label: string }[] = [
  { key: "all",            label: "All" },
  { key: "pending",        label: "Pending" },
  { key: "info_requested", label: "Info requested" },
  { key: "verified",       label: "Verified" },
  { key: "declined",       label: "Declined" },
];

// Business listings this officer (or the admin) can review — same
// clan-scoping rule as app/batakaPanel/members/page.tsx.
export default function BusinessListingsPage() {
  const panelState = usePanelStore();
  const businessState = useBusinessStore();
  const isAdmin = panelState.session?.isAdmin ?? false;
  const all = listingsForReviewer(businessState, panelState.session?.clanSlug ?? null, isAdmin);

  const [filter, setFilter] = useState<ListingStatus | "all">("all");
  const [query, setQuery] = useState("");

  const listings = all.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    // Matches by business name OR clan name — mainly useful for the admin's
    // all-clans view (e.g. searching "Mmamba" to find every Mmamba listing),
    // since an officer's own list is already scoped to one clan.
    if (query) {
      const q = query.toLowerCase();
      const matchesName = l.businessName.toLowerCase().includes(q);
      const matchesClan = (getClan(l.clanSlug)?.name ?? "").toLowerCase().includes(q);
      if (!matchesName && !matchesClan) return false;
    }
    return true;
  });

  return (
    <>
      {/* Search + status filters */}
      <div className="flex gap-2.5 flex-wrap items-center mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by business name or clan…"
          className="border border-eborder rounded px-3 py-2 text-[13px] outline-none focus:border-gold bg-white min-w-[180px]"
        />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "text-[12px] px-3 py-1.5 rounded-full cursor-pointer border transition-colors",
                filter === f.key
                  ? "bg-gd text-white border-gd font-semibold"
                  : "bg-white text-muted border-eborder hover:border-gold"
              )}
            >
              {f.label}
              {f.key !== "all" && (
                <> ({all.filter((l) => l.status === f.key).length})</>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Listing rows */}
      {listings.length === 0 ? (
        <p className="text-[13px] text-muted text-center py-10">
          No business listings match this view.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {listings.map((l) => (
            <Link
              key={l.id}
              href={`/batakaPanel/businesses/${l.id}`}
              className="flex items-center gap-3 no-underline bg-white border border-eborder rounded-[6px] px-4 py-3 hover:border-gold transition-colors"
            >
              <div className="w-9 h-9 rounded-[6px] bg-cream2 border border-eborder flex items-center justify-center text-[16px] shrink-0">
                🏪
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-gd font-semibold truncate">
                  {l.businessName}
                </p>
                <p className="text-[11.5px] text-muted truncate">
                  {isAdmin && <>{getClan(l.clanSlug)?.name} clan · </>}
                  {l.ownerName} · {l.category} · Submitted {l.submittedAt}
                </p>
              </div>
              <BusinessStatusBadge status={l.status} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
