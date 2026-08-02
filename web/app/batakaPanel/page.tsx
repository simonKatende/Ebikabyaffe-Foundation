"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  usePanelStore,
  membersForSession,
  auditForSession,
} from "@/lib/batakaPanel/store";
import { fetchListingsForReviewer } from "@/lib/businesses/store";
import type { BusinessListing } from "@/lib/businesses/types";
import { fetchMessagesForAdmin } from "@/lib/contactMessages/store";
import type { AdminContactMessage } from "@/lib/contactMessages/types";
import { getClan } from "@/lib/clans";
import { StatusBadge } from "@/components/batakaPanel/StatusBadge";
import { BusinessStatusBadge } from "@/components/businesses/BusinessStatusBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";

// Panel dashboard — the queue summary an officer sees first.
export default function PanelDashboard() {
  const state = usePanelStore();
  const members = membersForSession(state);
  const audit = auditForSession(state);

  const isAdmin = state.session?.isAdmin ?? false;
  const [listings, setListings] = useState<BusinessListing[]>([]);
  useEffect(() => {
    if (!state.session) return;
    void fetchListingsForReviewer().then(setListings);
  }, [state.session]);
  const pendingListings = listings.filter(
    (l) => l.status === "pending" || l.status === "info_requested"
  );

  // Foundation-wide "send to the Foundation" messages — admin-only queue
  // (no clan concept here), same reasoning as PanelShell.tsx's
  // ADMIN_ONLY_TABS: a clan officer has no legitimate reason to see these.
  const [messages, setMessages] = useState<AdminContactMessage[]>([]);
  useEffect(() => {
    if (!isAdmin) return;
    void fetchMessagesForAdmin().then(setMessages);
  }, [isAdmin]);
  const awaitingMessages = messages.filter((m) => !m.replyBody);

  const pending = members.filter(
    (m) => m.status === "pending" || m.status === "info_requested"
  );
  const counts = {
    total: members.length,
    pending: members.filter((m) => m.status === "pending").length,
    verified: members.filter((m) => m.status === "verified").length,
    declined: members.filter((m) => m.status === "declined").length,
  };

  const stats = [
    { num: counts.total,    lbl: "Registered members" },
    { num: counts.pending,  lbl: "Awaiting review" },
    { num: counts.verified, lbl: "Verified" },
    { num: counts.declined, lbl: "Declined" },
  ];

  return (
    <>
      {/* Stat tiles */}
      <div
        className="grid gap-2.5 mb-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
      >
        {stats.map(({ num, lbl }) => (
          <div
            key={lbl}
            className="bg-white border border-eborder rounded-[6px] px-4 py-3.5 text-center"
          >
            <span className="font-serif text-[26px] text-gd block leading-none mb-1">
              {num}
            </span>
            <span className="text-[10.5px] tracking-[.5px] uppercase text-muted">
              {lbl}
            </span>
          </div>
        ))}
      </div>

      {/* Member review queue */}
      <Card className="mb-4">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold flex-1">
            Member Review Queue
          </span>
          <Link
            href="/batakaPanel/members"
            className="text-[12px] text-royal2 no-underline hover:underline"
          >
            All members →
          </Link>
        </CardHeader>
        <CardBody>
          {pending.length === 0 ? (
            <p className="text-[13px] text-muted text-center py-4">
              🎉 Nothing waiting for review.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {pending.slice(0, 5).map((m) => (
                <Link
                  key={m.id}
                  href={`/batakaPanel/members/${m.id}`}
                  className="flex items-center gap-3 no-underline bg-cream2 border border-eborder rounded-[6px] px-3.5 py-2.5 hover:border-gold transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] text-gd font-semibold truncate">
                      {m.fullName}
                    </p>
                    <p className="text-[11px] text-muted">
                      {state.session?.isAdmin && (
                        <>{getClan(m.clanSlug)?.name} clan · </>
                      )}
                      Submitted {m.submittedAt}
                    </p>
                  </div>
                  <StatusBadge status={m.status} />
                </Link>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Business listings review queue — same officers, a second domain */}
      <Card className="mb-4">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold flex-1">
            Business Listings Awaiting Review
          </span>
          <Link
            href="/batakaPanel/businesses"
            className="text-[12px] text-royal2 no-underline hover:underline"
          >
            All listings →
          </Link>
        </CardHeader>
        <CardBody>
          {pendingListings.length === 0 ? (
            <p className="text-[13px] text-muted text-center py-4">
              🎉 Nothing waiting for review.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingListings.slice(0, 5).map((l) => (
                <Link
                  key={l.id}
                  href={`/batakaPanel/businesses/${l.id}`}
                  className="flex items-center gap-3 no-underline bg-cream2 border border-eborder rounded-[6px] px-3.5 py-2.5 hover:border-gold transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] text-gd font-semibold truncate">
                      {l.businessName}
                    </p>
                    <p className="text-[11px] text-muted">
                      {isAdmin && <>{getClan(l.clanSlug)?.name} clan · </>}
                      {l.ownerName} · Submitted {l.submittedAt}
                    </p>
                  </div>
                  <BusinessStatusBadge status={l.status} />
                </Link>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* "Send to the Foundation" messages — admin-only, no clan concept
          here, so this card doesn't render at all for a clan officer (unlike
          the two queues above, which they can view even though they can't
          decide business listings). */}
      {isAdmin && (
        <Card className="mb-4">
          <CardHeader>
            <span className="text-[15px] text-gd font-semibold flex-1">
              Messages Awaiting Reply
            </span>
            <Link
              href="/batakaPanel/messages"
              className="text-[12px] text-royal2 no-underline hover:underline"
            >
              All messages →
            </Link>
          </CardHeader>
          <CardBody>
            {awaitingMessages.length === 0 ? (
              <p className="text-[13px] text-muted text-center py-4">
                🎉 Nothing waiting for a reply.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {awaitingMessages.slice(0, 5).map((m) => (
                  <Link
                    key={m.id}
                    href={`/batakaPanel/messages/${m.id}`}
                    className="flex items-center gap-3 no-underline bg-cream2 border border-eborder rounded-[6px] px-3.5 py-2.5 hover:border-gold transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] text-gd font-semibold truncate">
                        {m.subject}
                      </p>
                      <p className="text-[11px] text-muted">
                        {m.senderName} · Sent {m.createdAt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Recent panel activity (audit trail) */}
      <Card>
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">
            Recent Panel Activity
          </span>
        </CardHeader>
        <CardBody>
          {audit.length === 0 ? (
            <p className="text-[13px] text-muted text-center py-3">
              Actions you take (verify, decline, request info, announcements)
              are recorded here.
            </p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {audit.slice(0, 8).map((a) => (
                <li key={a.id} className="text-[12.5px] text-gd leading-relaxed">
                  <span className="text-muted">{a.at} · {a.actor}:</span>{" "}
                  {a.action}
                  {state.session?.isAdmin && (
                    <span className="text-muted"> ({getClan(a.clanSlug)?.name})</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </>
  );
}
