"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePanelStore } from "@/lib/batakaPanel/store";
import { fetchMessagesForAdmin } from "@/lib/contactMessages/store";
import type { AdminContactMessage } from "@/lib/contactMessages/types";
import { getClan } from "@/lib/clans";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { cn } from "@/lib/utils";

type Filter = "all" | "awaiting" | "replied";

// Foundation-wide "send to the Foundation" messages (ContactFoundationCard
// on the home dashboard, LineageArchiveCard on /profile) — admin-only, see
// PanelShell.tsx's ADMIN_ONLY_TABS comment: a general question/comment/
// observation has no clan concept, unlike member verification or business
// listings, so a clan officer has no legitimate reason to read it.
export default function MessagesPage() {
  const panelState = usePanelStore();
  const isAdmin = panelState.session?.isAdmin ?? false;

  const [all, setAll] = useState<AdminContactMessage[]>([]);
  useEffect(() => {
    if (!isAdmin) return;
    void fetchMessagesForAdmin().then(setAll);
  }, [isAdmin]);

  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  if (!isAdmin) {
    return (
      <p className="text-[13px] text-muted text-center py-10">
        Messages sent to the Foundation are reviewed by the Foundation admin,
        not by clan officers.
      </p>
    );
  }

  const awaitingCount = all.filter((m) => !m.replyBody).length;

  const messages = all.filter((m) => {
    if (filter === "awaiting" && m.replyBody) return false;
    if (filter === "replied" && !m.replyBody) return false;
    if (query) {
      const q = query.toLowerCase();
      const matchesSender = m.senderName.toLowerCase().includes(q);
      const matchesSubject = m.subject.toLowerCase().includes(q);
      const matchesClan = (getClan(m.clanSlug ?? "")?.name ?? "").toLowerCase().includes(q);
      if (!matchesSender && !matchesSubject && !matchesClan) return false;
    }
    return true;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "awaiting", label: `Awaiting reply (${awaitingCount})` },
    { key: "replied", label: "Replied" },
  ];

  return (
    <>
      {/* Search + status filters */}
      <div className="flex gap-2.5 flex-wrap items-center mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by sender, subject, or clan…"
          className="border border-eborder rounded px-3 py-2 text-[13px] outline-none focus:border-gold bg-white min-w-[200px]"
        />
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
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
            </button>
          ))}
        </div>
      </div>

      {/* Message rows */}
      {messages.length === 0 ? (
        <p className="text-[13px] text-muted text-center py-10">
          No messages match this view.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <Link
              key={m.id}
              href={`/batakaPanel/messages/${m.id}`}
              className="flex items-center gap-3 no-underline bg-white border border-eborder rounded-[6px] px-4 py-3 hover:border-gold transition-colors"
            >
              <div className="w-9 h-9 rounded-[6px] bg-cream2 border border-eborder flex items-center justify-center text-[16px] shrink-0">
                ✉️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-gd font-semibold truncate">
                  {m.subject}
                </p>
                <p className="text-[11.5px] text-muted truncate">
                  {m.senderName}
                  {m.senderVerified && <VerifiedBadge size={11} className="mx-0.5" />}
                  {m.clanSlug && <> · {getClan(m.clanSlug)?.name} clan</>} · {m.createdAt}
                </p>
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded tracking-[.5px] shrink-0",
                  m.replyBody ? "bg-g0 text-gm" : "bg-cream2 text-muted border border-eborder"
                )}
              >
                {m.replyBody ? "REPLIED" : "AWAITING REPLY"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
