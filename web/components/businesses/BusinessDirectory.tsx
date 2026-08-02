"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";
import { fetchVisibleListings } from "@/lib/businesses/store";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { getClan } from "@/lib/clans";
import { BUSINESS_CATEGORIES, type BusinessListing } from "@/lib/businesses/types";

// ── Business Owners directory — public browse page ──────────────────────────
//
// Lists every business/organisation members have posted from their profile
// (see BusinessListingCard), each tagged with the owner's clan. Reads through
// lib/businesses/store.ts, same as every other mocked-but-live-updating list
// in the app (Bataka Panel, site-wide stats) — nothing here owns the data.

const CATEGORY_FILTERS = ["All", ...BUSINESS_CATEGORIES] as const;

export function BusinessDirectory() {
  // Only officer-verified listings ever reach the public directory — this
  // page needs no login, so it fetches via the anon-key-capable public RLS
  // policy (business_listings_select_public_verified) rather than any
  // session-gated store.
  const [listings, setListings] = useState<BusinessListing[]>([]);
  useEffect(() => {
    void fetchVisibleListings().then(setListings);
  }, []);

  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = listings.filter((l) => {
    if (category !== "All" && l.category !== category) return false;
    const q = query.trim().toLowerCase();
    if (q && !`${l.businessName} ${l.description} ${l.ownerName}`.toLowerCase().includes(q)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <SectionHead
        title="Business Owners"
        sub="Discover businesses and organisations run by fellow members, by clan"
      />

      <div className="max-w-[880px] mx-auto px-5 py-7">
        <div className="mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses…"
            className="w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white mb-3"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORY_FILTERS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all cursor-pointer",
                  category === c
                    ? "border-gd bg-gd text-white"
                    : "border-eborder text-muted hover:border-gold"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-eborder rounded-[8px]">
            <p className="text-[32px] mb-3">🏪</p>
            <p className="text-[14px] text-muted">
              {listings.length === 0
                ? "No businesses have been listed yet — be the first from your profile."
                : "No businesses match your search."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {filtered.map((listing) => {
              const clan = getClan(listing.clanSlug);
              return (
                <div key={listing.id} className="bg-white border border-eborder rounded-[8px] p-4 flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    {listing.photoDataUrl ? (
                      <Image
                        src={listing.photoDataUrl}
                        alt={listing.businessName}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-[6px] object-cover border border-eborder shrink-0"
                        unoptimized
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-[6px] bg-cream2 border border-eborder flex items-center justify-center text-[24px] shrink-0">
                        🏪
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] text-gd font-semibold leading-tight">
                        {listing.businessName}
                      </p>
                      <p className="text-[11px] text-muted">{listing.category}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-gd leading-relaxed mb-3 flex-1">
                    {listing.description}
                  </p>
                  <p className="text-[12px] text-muted mb-3">
                    📞 {listing.contactPhone}
                    {listing.contactEmail && <> · ✉️ {listing.contactEmail}</>}
                    {listing.location && <> · 📍 {listing.location}</>}
                  </p>
                  <div className="flex items-center justify-between pt-2.5 border-t border-eborder">
                    <span className="text-[12px] text-muted inline-flex items-center gap-1">
                      {listing.ownerName}
                      {listing.ownerVerified && <VerifiedBadge size={12} />}
                    </span>
                    {clan && (
                      <Link
                        href={`/clans/${clan.slug}`}
                        className="text-[11px] text-royal2 no-underline hover:underline shrink-0"
                      >
                        {clan.totemEmoji} {clan.name}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
