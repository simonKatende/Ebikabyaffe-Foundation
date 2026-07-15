"use client";

import Link from "next/link";
import {
  usePanelStore,
  membersForSession,
  auditForSession,
} from "@/lib/batakaPanel/store";
import { getClan } from "@/lib/clans";
import { StatusBadge } from "@/components/batakaPanel/StatusBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";

// Panel dashboard — the queue summary an officer sees first.
export default function PanelDashboard() {
  const state = usePanelStore();
  const members = membersForSession(state);
  const audit = auditForSession(state);

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

      {/* Review queue */}
      <Card className="mb-4">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold flex-1">
            Review Queue
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
