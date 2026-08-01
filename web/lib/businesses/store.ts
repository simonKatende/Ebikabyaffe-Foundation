"use client";

import { useSyncExternalStore } from "react";
import { seedBusinesses } from "./mockBusinesses";
import { logExternalAction } from "@/lib/batakaPanel/store";
import { saveSynced, withCrossTabSync } from "@/lib/crossTabSync";
import type { BusinessListing } from "./types";

// ── Business Owners directory — single data-access layer (mock implementation) ──
//
// Same convention as lib/batakaPanel/store.ts and lib/stats.ts: a module-level
// store + useSyncExternalStore, so it survives client-side navigation and
// resets on a hard reload. In Phase 2 only this file gets reimplemented
// against Supabase (one listing per member, looked up by their real user id
// instead of phone) — components should keep reading through the selectors
// below rather than owning listing data themselves.
//
// Every listing is reviewed by the owner's clan officer (or the Foundation
// admin) in the Bataka Panel before it can appear in the public directory —
// see app/batakaPanel/businesses/. Review decisions are also logged to the
// panel's shared audit trail via logExternalAction, so officers see business
// reviews alongside member-verification activity in one feed.
//
// Cross-tab sync (2026-08, see lib/crossTabSync.ts): every write here also
// broadcasts to other open tabs in the same browser, so a member posting a
// listing in one tab shows up in the Bataka Panel in another tab immediately
// — this is the whole reason cross-tab sync was added in the first place.

export interface BusinessState {
  listings: BusinessListing[];
}

const SYNC_NAME = "businesses";

let state: BusinessState = {
  listings: seedBusinesses(),
};

const listeners = new Set<() => void>();

// Applies a state change and notifies this tab's own listeners, WITHOUT
// re-broadcasting — used both for local writes (setState, which also
// broadcasts) and for values arriving from another tab (which already did).
function applyState(next: BusinessState) {
  state = next;
  listeners.forEach((l) => l());
}

function setState(next: BusinessState) {
  applyState(next);
  saveSynced(SYNC_NAME, next);
}

function baseSubscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const subscribe = withCrossTabSync<BusinessState>(SYNC_NAME, baseSubscribe, applyState);

const getSnapshot = () => state;

export function useBusinessStore(): BusinessState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

function today(): string {
  return new Date().toLocaleDateString("en-UG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Selectors ────────────────────────────────────────────────────────────────

// Every listing this member has ever submitted, regardless of status — used
// on their own profile so they can see "pending"/"declined" states too.
export function listingForPhone(s: BusinessState, phone: string): BusinessListing | null {
  return s.listings.find((l) => l.ownerPhone === phone) ?? null;
}

// The public directory — only listings an officer has verified.
export function visibleListings(s: BusinessState): BusinessListing[] {
  return s.listings.filter((l) => l.status === "verified");
}

// Clan-scoped for an officer, all listings for the admin — mirrors
// membersForSession's scoping rule in lib/batakaPanel/store.ts.
export function listingsForReviewer(
  s: BusinessState,
  clanSlug: string | null,
  isAdmin: boolean
): BusinessListing[] {
  return isAdmin ? s.listings : s.listings.filter((l) => l.clanSlug === clanSlug);
}

// ── Actions ──────────────────────────────────────────────────────────────────

// One listing per member: creates a new one, or replaces the existing one for
// the same ownerPhone if they already have one (edit-in-place). Any
// submission — first time or a re-edit — goes back to "pending": a listing
// must be (re-)verified by an officer before it can be visible again, so
// editing live content doesn't silently bypass review.
export function upsertListing(
  input: Omit<BusinessListing, "id" | "status" | "submittedAt" | "decidedAt" | "decisionNote">
) {
  const existing = state.listings.find((l) => l.ownerPhone === input.ownerPhone);
  const listing: BusinessListing = {
    ...input,
    id: existing?.id ?? `${input.ownerPhone}-${Date.now()}`,
    status: "pending",
    submittedAt: today(),
    decidedAt: undefined,
    decisionNote: undefined,
  };
  const listings = existing
    ? state.listings.map((l) => (l.id === existing.id ? listing : l))
    : [...state.listings, listing];
  setState({ ...state, listings });
}

export function removeListingForPhone(phone: string) {
  setState({ ...state, listings: state.listings.filter((l) => l.ownerPhone !== phone) });
}

function updateListing(id: string, patch: Partial<BusinessListing>) {
  const listing = state.listings.find((l) => l.id === id);
  if (!listing) return listing;
  setState({
    ...state,
    listings: state.listings.map((l) => (l.id === id ? { ...l, ...patch } : l)),
  });
  return listing;
}

export function verifyListing(id: string) {
  const listing = updateListing(id, { status: "verified", decidedAt: today(), decisionNote: undefined });
  if (listing) logExternalAction(listing.clanSlug, `Verified business listing "${listing.businessName}"`);
}

export function declineListing(id: string, reason: string) {
  const listing = updateListing(id, { status: "declined", decidedAt: today(), decisionNote: reason });
  if (listing) logExternalAction(listing.clanSlug, `Declined business listing "${listing.businessName}"`);
}

export function requestListingInfo(id: string, note: string) {
  const listing = updateListing(id, { status: "info_requested", decidedAt: today(), decisionNote: note });
  if (listing) {
    logExternalAction(
      listing.clanSlug,
      `Requested more information for business listing "${listing.businessName}"`
    );
  }
}
