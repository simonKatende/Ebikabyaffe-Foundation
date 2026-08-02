"use client";

import { createClient } from "@/lib/supabase/client";
import { getActivePanelClient, logExternalAction } from "@/lib/batakaPanel/store";
import type { BusinessListing, BusinessCategory, ListingStatus } from "./types";

// ── Business Owners directory — real Supabase implementation ────────────────
//
// Unlike lib/batakaPanel/store.ts, this file doesn't keep a persistent
// live-updating cache — business listings are reviewed far less often than
// member verifications, so a plain fetch-on-demand (re-run after each write)
// is enough; no Realtime channel here. Every write logs to the Bataka
// Panel's shared audit trail via logExternalAction, so "Recent Panel
// Activity" reads as one feed across both domains, same as the mock.
//
// Public directory reads (fetchVisibleListings) and an owner's own listing
// (fetchListingForOwner/submitListing/removeOwnListing) go through the
// MEMBER's own client (lib/supabase/client.ts) — RLS already allows both
// (verified rows are public; an owner can always read/write their own row).
// Officer/admin review (listingsForReviewer + the three decision actions) go
// through the PANEL client, matching lib/batakaPanel/store.ts's own pattern.

interface ListingRow {
  id: string;
  owner_id: string;
  owner_name: string;
  clan_slug: string;
  business_name: string;
  category: string;
  description: string;
  contact_phone: string;
  contact_email: string | null;
  location: string | null;
  photo_data_url: string | null;
  status: string;
  submitted_at: string;
  decided_at: string | null;
  decision_note: string | null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-UG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Public-safe verified-status lookup (public_verified_owner_ids RPC, see the
// matching migration) — works whether the caller is signed out (the public
// directory), a signed-in member, or a panel officer/admin, since it's
// granted to anon+authenticated and returns only an id set, never profile
// data. Shared here rather than duplicated per fetch function below.
async function fetchVerifiedOwnerIds(ownerIds: string[]): Promise<Set<string>> {
  if (ownerIds.length === 0) return new Set();
  const { data, error } = await createClient().rpc("public_verified_owner_ids", {
    target_ids: [...new Set(ownerIds)],
  });
  if (error || !data) return new Set();
  return new Set((data as { id: string }[]).map((r) => r.id));
}

function mapRow(r: ListingRow, verifiedIds: Set<string>): BusinessListing {
  return {
    id: r.id,
    ownerId: r.owner_id,
    ownerName: r.owner_name,
    ownerVerified: verifiedIds.has(r.owner_id),
    clanSlug: r.clan_slug,
    businessName: r.business_name,
    category: r.category as BusinessCategory,
    description: r.description,
    contactPhone: r.contact_phone,
    contactEmail: r.contact_email ?? undefined,
    location: r.location ?? undefined,
    photoDataUrl: r.photo_data_url ?? undefined,
    status: r.status as ListingStatus,
    submittedAt: formatDate(r.submitted_at),
    decidedAt: r.decided_at ? formatDate(r.decided_at) : undefined,
    decisionNote: r.decision_note ?? undefined,
  };
}

// ── Public directory ─────────────────────────────────────────────────────

export async function fetchVisibleListings(): Promise<BusinessListing[]> {
  const { data, error } = await createClient()
    .from("business_listings")
    .select("*")
    .eq("status", "verified")
    .order("submitted_at", { ascending: false });
  if (error || !data) return [];
  const rows = data as ListingRow[];
  const verifiedIds = await fetchVerifiedOwnerIds(rows.map((r) => r.owner_id));
  return rows.map((r) => mapRow(r, verifiedIds));
}

// ── The signed-in member's own listing ───────────────────────────────────

export async function fetchListingForOwner(ownerId: string): Promise<BusinessListing | null> {
  if (!ownerId) return null;
  const { data, error } = await createClient()
    .from("business_listings")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();
  if (error || !data) return null;
  const verifiedIds = await fetchVerifiedOwnerIds([ownerId]);
  return mapRow(data as ListingRow, verifiedIds);
}

// One listing per member: upsert-and-resubmit, same as the mock. Any
// submission — first time or a re-edit — goes back to "pending" (the
// database default), so editing live content can't bypass review.
// `ownerVerified` is excluded — it's a read-time-only derived field (see
// mapRow), never something a submission itself sets.
export async function submitListing(
  input: Omit<BusinessListing, "id" | "status" | "submittedAt" | "decidedAt" | "decisionNote" | "ownerVerified">
): Promise<{ error?: string }> {
  const { error } = await createClient()
    .from("business_listings")
    .upsert(
      {
        owner_id: input.ownerId,
        owner_name: input.ownerName,
        clan_slug: input.clanSlug,
        business_name: input.businessName,
        category: input.category,
        description: input.description,
        contact_phone: input.contactPhone,
        contact_email: input.contactEmail ?? null,
        location: input.location ?? null,
        photo_data_url: input.photoDataUrl ?? null,
        status: "pending",
        submitted_at: new Date().toISOString(),
        decided_at: null,
        decision_note: null,
      },
      { onConflict: "owner_id" }
    );
  return error ? { error: error.message } : {};
}

export async function removeOwnListing(ownerId: string): Promise<void> {
  await createClient().from("business_listings").delete().eq("owner_id", ownerId);
}

// ── Officer/admin review ─────────────────────────────────────────────────

// Clan-scoped for an officer, all listings for the admin — RLS
// (business_listings_select_by_clan_officer, via is_clan_officer()) already
// enforces this; isAdmin/clanSlug here are only used to pick the query
// shape, not as the actual security boundary.
export async function fetchListingsForReviewer(): Promise<BusinessListing[]> {
  const panelSupabase = getActivePanelClient();
  if (!panelSupabase) return [];
  const { data, error } = await panelSupabase
    .from("business_listings")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error || !data) return [];
  const rows = data as ListingRow[];
  const verifiedIds = await fetchVerifiedOwnerIds(rows.map((r) => r.owner_id));
  return rows.map((r) => mapRow(r, verifiedIds));
}

async function decideListing(
  id: string,
  patch: { status: ListingStatus; decision_note: string | null },
  auditAction: (listing: BusinessListing) => string
): Promise<void> {
  const panelSupabase = getActivePanelClient();
  if (!panelSupabase) return;
  const { data: existing } = await panelSupabase
    .from("business_listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return;
  // ownerVerified isn't read by any auditAction below — an empty set avoids
  // an unnecessary extra round trip just to compute a field nothing here uses.
  const listing = mapRow(existing as ListingRow, new Set());

  const { error } = await panelSupabase
    .from("business_listings")
    .update({ ...patch, decided_at: new Date().toISOString() })
    .eq("id", id);
  if (error) {
    console.error("[businesses/store] decision update failed", error);
    return;
  }
  await logExternalAction(listing.clanSlug, auditAction(listing));
}

export function verifyListing(id: string): Promise<void> {
  return decideListing(
    id,
    { status: "verified", decision_note: null },
    (l) => `Verified business listing "${l.businessName}"`
  );
}

export function declineListing(id: string, reason: string): Promise<void> {
  return decideListing(
    id,
    { status: "declined", decision_note: reason },
    (l) => `Declined business listing "${l.businessName}"`
  );
}

export function requestListingInfo(id: string, note: string): Promise<void> {
  return decideListing(
    id,
    { status: "info_requested", decision_note: note },
    (l) => `Requested more information for business listing "${l.businessName}"`
  );
}
