"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePanelStore } from "@/lib/batakaPanel/store";
import {
  fetchListingsForReviewer,
  verifyListing,
  declineListing,
  requestListingInfo,
} from "@/lib/businesses/store";
import type { BusinessListing } from "@/lib/businesses/types";
import { getClan } from "@/lib/clans";
import { BusinessStatusBadge } from "@/components/businesses/BusinessStatusBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// One business listing's full detail. Business-listing decisions are
// FOUNDATION-ADMIN-ONLY (2026-08 request): Verify · Request more information
// (confirmation / proof of business) · Decline are only rendered when
// isAdmin. A clan officer opening a listing from their own clan sees
// everything — status, submitted details, and the admin's recorded
// reason/note on any past decision — but no action buttons; they have view
// privileges here, not decision-making ones. This is the opposite scoping
// from member-lineage verification, where the officer IS the decider — the
// two workflows are deliberately different, don't unify them.
export default function BusinessListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const panelState = usePanelStore();
  const { toast } = useToast();

  const isAdmin = panelState.session?.isAdmin ?? false;

  // Scoped lookup — RLS already only ever returns listings from the
  // officer's own clan (or every clan for the admin), refetched after every
  // decision so this page reflects its own writes immediately.
  const [all, setAll] = useState<BusinessListing[] | null>(null);
  useEffect(() => {
    if (!panelState.session) return;
    void fetchListingsForReviewer().then(setAll);
  }, [panelState.session]);
  function refetch() {
    void fetchListingsForReviewer().then(setAll);
  }
  const listing = all?.find((l) => l.id === id);

  const [mode, setMode] = useState<"none" | "info" | "decline">("none");
  const [note, setNote] = useState("");

  if (!listing) {
    return (
      <p className="text-[13px] text-muted text-center py-10">
        Listing not found in your clan.{" "}
        <Link href="/batakaPanel/businesses" className="text-royal2">
          Back to business listings
        </Link>
      </p>
    );
  }

  const clan = getClan(listing.clanSlug);
  // Only the Foundation admin can act on a listing — a clan officer sees the
  // same pending/info_requested state but no decision controls (see the
  // header comment above).
  const reviewable =
    isAdmin && (listing.status === "pending" || listing.status === "info_requested");

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";

  return (
    <>
      <Link
        href="/batakaPanel/businesses"
        className="inline-block text-[12px] text-royal2 no-underline hover:underline mb-3"
      >
        ← All business listings
      </Link>

      {/* Identity */}
      <Card className="mb-3.5">
        <CardHeader>
          <div className="w-11 h-11 rounded-[8px] bg-cream2 border border-eborder flex items-center justify-center text-[20px] shrink-0">
            🏪
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] text-gd font-semibold">{listing.businessName}</h2>
            <p className="text-[12px] text-muted">
              {clan?.name} clan · {listing.ownerName} · Submitted {listing.submittedAt}
            </p>
          </div>
          <BusinessStatusBadge status={listing.status} />
        </CardHeader>
      </Card>

      {/* Listing details */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">Listing Details</span>
        </CardHeader>
        <CardBody>
          <div className="flex items-start gap-4 mb-4">
            {listing.photoDataUrl ? (
              <Image
                src={listing.photoDataUrl}
                alt={listing.businessName}
                width={96}
                height={96}
                className="w-24 h-24 rounded-[6px] object-cover border border-eborder shrink-0"
                unoptimized
              />
            ) : (
              <div className="w-24 h-24 rounded-[6px] bg-cream2 border border-eborder flex items-center justify-center text-[36px] shrink-0">
                🏪
              </div>
            )}
            <div className="flex-1">
              <Field label="Category" value={listing.category} />
              <p className="text-[13.5px] text-gd leading-relaxed mt-2">{listing.description}</p>
            </div>
          </div>

          <div
            className="grid gap-3 bg-cream2 border border-eborder rounded-[6px] px-4 py-3"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
          >
            <Field label="Owner" value={`${listing.ownerName} · ${listing.contactPhone}`} />
            <Field label="Contact phone" value={listing.contactPhone} />
            {listing.contactEmail && <Field label="Contact email" value={listing.contactEmail} />}
            {listing.location && <Field label="Location" value={listing.location} />}
          </div>
        </CardBody>
      </Card>

      {/* Decision record / actions */}
      <Card>
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">Decision</span>
        </CardHeader>
        <CardBody>
          {listing.status === "verified" && (
            <p className="text-[13px] text-gm leading-relaxed">
              ✓ Verified on {listing.decidedAt}. This listing is now visible
              in the public Business Owners directory.
            </p>
          )}

          {listing.status === "declined" && (
            <>
              <p className="text-[13px] leading-relaxed mb-1" style={{ color: "#b03a2e" }}>
                Declined on {listing.decidedAt}.
              </p>
              <p className="text-[12.5px] text-muted leading-relaxed">
                Reason recorded: {listing.decisionNote}
              </p>
            </>
          )}

          {listing.status === "info_requested" && (
            <p className="text-[13px] text-muted leading-relaxed mb-3">
              More information was requested on {listing.decidedAt}:{" "}
              <em>{listing.decisionNote}</em> — contact {listing.ownerName} at{" "}
              {listing.contactPhone} if they haven&apos;t already responded.
            </p>
          )}

          {listing.status === "pending" && !isAdmin && (
            <p className="text-[13px] text-muted leading-relaxed">
              Awaiting review by the Foundation admin. You&apos;ll see the
              decision and reasoning here once it&apos;s made — business
              listings are reviewed by the Foundation, not by clan officers.
            </p>
          )}

          {listing.status === "info_requested" && !isAdmin && (
            <p className="text-[12px] text-muted leading-relaxed italic">
              Only the Foundation admin can verify or decline this listing.
            </p>
          )}

          {reviewable && mode === "none" && (
            <div className="flex gap-2.5 flex-wrap">
              <Button
                variant="green"
                size="sm"
                onClick={async () => {
                  await verifyListing(listing.id);
                  refetch();
                  toast(`${listing.businessName} is now live in the Business Owners directory.`);
                }}
              >
                ✓ Verify listing
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => { setMode("info"); setNote(""); }}
              >
                Request confirmation / proof of business
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
                    ? "What should the owner confirm or provide as proof of business?"
                    : "Reason for declining (recorded and sent to the owner)"}
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
                    onClick={async () => {
                      await requestListingInfo(listing.id, note.trim());
                      refetch();
                      toast("Request for more information sent to the owner.");
                      setMode("none");
                    }}
                  >
                    Send request
                  </Button>
                ) : (
                  <button
                    disabled={!note.trim()}
                    onClick={async () => {
                      await declineListing(listing.id, note.trim());
                      refetch();
                      toast("Listing declined — reason recorded.");
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
