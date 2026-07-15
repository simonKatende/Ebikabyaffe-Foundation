"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  usePanelStore,
  membersForSession,
  verifyMember,
  declineMember,
  requestInfo,
} from "@/lib/batakaPanel/store";
import { getClan } from "@/lib/clans";
import { StatusBadge } from "@/components/batakaPanel/StatusBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// One member's full detail + the Omutaka's three actions:
// Verify · Request more information · Decline (with reason).
export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const state = usePanelStore();
  const { toast } = useToast();

  // Scoped lookup — an officer can only ever open members of their own clan.
  const member = membersForSession(state).find((m) => m.id === id);

  const [mode, setMode] = useState<"none" | "info" | "decline">("none");
  const [note, setNote] = useState("");

  if (!member) {
    return (
      <p className="text-[13px] text-muted text-center py-10">
        Member not found in your clan.{" "}
        <Link href="/batakaPanel/members" className="text-royal2">
          Back to members
        </Link>
      </p>
    );
  }

  const clan = getClan(member.clanSlug);
  const lineage = member.lineage;
  const fatherClan = lineage ? getClan(lineage.fatherClanSlug) : undefined;
  const motherClan = lineage ? getClan(lineage.motherClanSlug) : undefined;

  // The two clan-law consistency checks, surfaced for the reviewer. The
  // member-side form enforces these too — a red flag here means the data
  // predates the checks or was tampered with.
  const patrilinealOk = lineage ? lineage.fatherClanSlug === member.clanSlug : null;
  const exogamyOk = lineage ? lineage.motherClanSlug !== lineage.fatherClanSlug : null;

  const reviewable =
    member.status === "pending" || member.status === "info_requested";

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";

  return (
    <>
      <Link
        href="/batakaPanel/members"
        className="inline-block text-[12px] text-royal2 no-underline hover:underline mb-3"
      >
        ← All members
      </Link>

      {/* Identity */}
      <Card className="mb-3.5">
        <CardHeader>
          <div className="w-11 h-11 rounded-full bg-gd text-gold2 flex items-center justify-center text-[15px] font-bold shrink-0">
            {member.fullName.split(" ").map((p) => p[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] text-gd font-semibold">{member.fullName}</h2>
            <p className="text-[12px] text-muted">
              {clan?.name} clan · {member.phone} · Joined {member.memberSince}
            </p>
          </div>
          <StatusBadge status={member.status} />
        </CardHeader>
      </Card>

      {/* Lineage declaration */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold flex-1">
            Lineage Declaration
          </span>
          {member.submittedAt && (
            <span className="text-[11px] text-muted">
              Submitted {member.submittedAt}
            </span>
          )}
        </CardHeader>
        <CardBody>
          {!lineage ? (
            <p className="text-[13px] text-muted">
              This member has not submitted a verification request yet.
            </p>
          ) : (
            <>
              <div
                className="grid gap-3 mb-4"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
              >
                <Field label="Father" value={`${lineage.fatherName} · ${fatherClan?.name}`} />
                <Field label="Mother" value={`${lineage.motherName} · ${motherClan?.name}`} />
                {lineage.grandfatherName && (
                  <Field label="Grandfather (paternal)" value={lineage.grandfatherName} />
                )}
                {lineage.grandmotherName && (
                  <Field label="Grandmother" value={lineage.grandmotherName} />
                )}
                {lineage.ssiga && <Field label="Essiga" value={lineage.ssiga} />}
                {lineage.village && <Field label="Home village" value={lineage.village} />}
              </div>

              {/* Automatic clan-law checks */}
              <div className="bg-cream2 border border-eborder rounded-[6px] px-4 py-3">
                <p className="text-[10.5px] tracking-[1px] uppercase text-muted mb-1.5">
                  Automatic checks
                </p>
                <p className="text-[12.5px] leading-relaxed" style={{ color: patrilinealOk ? "var(--gm)" : "#b03a2e" }}>
                  {patrilinealOk ? "✓" : "✗"} Father&apos;s clan matches the clan
                  joined (patrilineal rule)
                </p>
                <p className="text-[12.5px] leading-relaxed" style={{ color: exogamyOk ? "var(--gm)" : "#b03a2e" }}>
                  {exogamyOk ? "✓" : "✗"} Mother&apos;s clan differs from
                  father&apos;s (exogamy rule)
                </p>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* Decision record / actions */}
      <Card>
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">Decision</span>
        </CardHeader>
        <CardBody>
          {member.status === "verified" && (
            <p className="text-[13px] text-gm leading-relaxed">
              ✓ Verified on {member.decidedAt}. The member&apos;s profile now
              carries the <strong>Verified by Omutaka</strong> badge.
            </p>
          )}

          {member.status === "declined" && (
            <>
              <p className="text-[13px] leading-relaxed mb-1" style={{ color: "#b03a2e" }}>
                Declined on {member.decidedAt}.
              </p>
              <p className="text-[12.5px] text-muted leading-relaxed">
                Reason recorded: {member.decisionNote}
              </p>
            </>
          )}

          {member.status === "registered" && (
            <p className="text-[13px] text-muted leading-relaxed">
              Nothing to decide — this member hasn&apos;t requested verification.
            </p>
          )}

          {member.status === "info_requested" && (
            <p className="text-[13px] text-muted leading-relaxed mb-3">
              More information was requested on {member.decidedAt}:{" "}
              <em>{member.decisionNote}</em> — you can still decide now if the
              member has responded.
            </p>
          )}

          {reviewable && mode === "none" && (
            <div className="flex gap-2.5 flex-wrap">
              <Button
                variant="green"
                size="sm"
                onClick={() => {
                  verifyMember(member.id);
                  toast(`${member.fullName} is now verified. Webale!`);
                }}
              >
                ✓ Verify membership
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => { setMode("info"); setNote(""); }}
              >
                Request more information
              </Button>
              <button
                onClick={() => { setMode("decline"); setNote(""); }}
                className="inline-flex items-center justify-center cursor-pointer px-4 py-2 text-[13px] rounded bg-white border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
              >
                Decline
              </button>
            </div>
          )}

          {reviewable && mode !== "none" && (
            <div className="mt-1">
              <label className="block mb-2">
                <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                  {mode === "info"
                    ? "What should the member provide?"
                    : "Reason for declining (recorded and sent to the member)"}
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </label>
              <div className="flex gap-2.5 flex-wrap">
                {mode === "info" ? (
                  <Button
                    variant="gold"
                    size="sm"
                    disabled={!note.trim()}
                    onClick={() => {
                      requestInfo(member.id, note.trim());
                      toast("Information request sent to the member.");
                      setMode("none");
                    }}
                  >
                    Send request
                  </Button>
                ) : (
                  <button
                    disabled={!note.trim()}
                    onClick={() => {
                      declineMember(member.id, note.trim());
                      toast("Request declined — reason recorded.");
                      setMode("none");
                    }}
                    className="inline-flex items-center justify-center cursor-pointer px-4 py-2 text-[13px] rounded bg-red-700 text-white hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0"
                  >
                    Confirm decline
                  </button>
                )}
                <button
                  onClick={() => setMode("none")}
                  className="inline-flex items-center justify-center cursor-pointer px-4 py-2 text-[13px] rounded bg-cream2 text-gd border border-eborder hover:bg-cream3 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10.5px] uppercase tracking-[.5px] text-muted mb-0.5">{label}</p>
      <p className="text-[13.5px] text-gd">{value}</p>
    </div>
  );
}
