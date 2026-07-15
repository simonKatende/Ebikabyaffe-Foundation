"use client";

import { useState } from "react";
import Link from "next/link";
import { usePanelStore, membersForSession } from "@/lib/batakaPanel/store";
import { getClan } from "@/lib/clans";
import { StatusBadge } from "@/components/batakaPanel/StatusBadge";
import type { MemberStatus } from "@/lib/batakaPanel/types";
import { cn } from "@/lib/utils";

const FILTERS: { key: MemberStatus | "all"; label: string }[] = [
  { key: "all",            label: "All" },
  { key: "pending",        label: "Pending" },
  { key: "info_requested", label: "Info requested" },
  { key: "verified",       label: "Verified" },
  { key: "declined",       label: "Declined" },
  { key: "registered",     label: "No request yet" },
];

export default function MembersPage() {
  const state = usePanelStore();
  const all = membersForSession(state);

  const [filter, setFilter] = useState<MemberStatus | "all">("all");
  const [query, setQuery] = useState("");

  const members = all.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (query && !m.fullName.toLowerCase().includes(query.toLowerCase()))
      return false;
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
          placeholder="Search by name…"
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
                <> ({all.filter((m) => m.status === f.key).length})</>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Member rows */}
      {members.length === 0 ? (
        <p className="text-[13px] text-muted text-center py-10">
          No members match this view.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {members.map((m) => (
            <Link
              key={m.id}
              href={`/batakaPanel/members/${m.id}`}
              className="flex items-center gap-3 no-underline bg-white border border-eborder rounded-[6px] px-4 py-3 hover:border-gold transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gd text-gold2 flex items-center justify-center text-[13px] font-bold shrink-0">
                {m.fullName.split(" ").map((p) => p[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-gd font-semibold truncate">
                  {m.fullName}
                </p>
                <p className="text-[11.5px] text-muted truncate">
                  {state.session?.isAdmin && (
                    <>{getClan(m.clanSlug)?.name} clan · </>
                  )}
                  {m.phone} · Joined {m.memberSince}
                  {m.submittedAt && <> · Request {m.submittedAt}</>}
                </p>
              </div>
              <StatusBadge status={m.status} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
