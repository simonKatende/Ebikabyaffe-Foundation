// ── Business Owners directory — shared types ─────────────────────────────────
//
// A member can list one business or organisation against their own account
// (contacts, a short description, an optional photo) so other members can
// browse a directory of Baganda-owned businesses by clan. Frontend-only mock
// for now — see lib/businesses/store.ts for the data-access layer; in Phase 2
// only that file gets reimplemented against Supabase, this shape stays.
//
// Listings are reviewed before they ever reach the public directory — the
// same clan officers who verify clan membership in the Bataka Panel also
// review business listings there, contacting the owner for confirmation or
// proof of business where needed. Status lifecycle mirrors PanelMember's:
//   "pending"        → submitted, waiting in the officer's queue
//   "info_requested" → officer asked for confirmation/proof; ball is with the owner
//   "verified"       → confirmed — now visible in the public /businesses directory
//   "declined"       → rejected with a recorded reason (owner can edit and resubmit)

export const BUSINESS_CATEGORIES = [
  "Retail & Shops",
  "Food & Catering",
  "Transport & Logistics",
  "Construction & Real Estate",
  "Professional Services",
  "Health & Wellness",
  "Education & Training",
  "Agriculture",
  "Technology",
  "Other",
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

export type ListingStatus = "pending" | "info_requested" | "verified" | "declined";

export interface BusinessListing {
  id: string;
  // Owner identity — the real Supabase profile id (AppUser.id), the stable
  // per-account key. ownerName is denormalized alongside it (not joined at
  // read time) since neither an anonymous public-directory visitor nor
  // another clan's officer has RLS access to read an arbitrary profiles row.
  ownerId: string;
  ownerName: string;
  clanSlug: string;
  businessName: string;
  category: BusinessCategory;
  description: string;
  contactPhone: string;
  contactEmail?: string;
  location?: string;
  // User-supplied photo, stored as a data: URL — there's no upload backend
  // yet, so the browser reads the chosen file directly (see BusinessListingCard).
  photoDataUrl?: string;
  status: ListingStatus;
  submittedAt: string; // display string — updates on every (re)submission
  decidedAt?: string;
  decisionNote?: string; // decline reason, or the officer's info-request note
}
