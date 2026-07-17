"use client";

import { useSyncExternalStore } from "react";
import { getClan } from "@/lib/clans";

// ── Live site-wide counters (mock implementation) ────────────────────────────
//
// The single source of truth for the three counters the site displays:
//   1. Baganda registered   (hero stats bar, footer)
//   2. Verified by Bataka   (hero stats bar, footer)
//   3. Per-clan members     (clan grid, clan detail pages, profile, dashboard)
//
// Every display reads through the selectors below, and every event that should
// move a counter calls one of the record* actions — so a new registration, a
// clan join, or an Omutaka verification updates every reference across the
// site immediately.
//
// Mock mechanics: module store + useSyncExternalStore, the app's standard
// pattern (see lib/batakaPanel/store.ts) — deltas survive client navigation
// and reset on a hard reload. The baselines are the same demo figures the
// UI previously hardcoded. In Phase 2 this file gets reimplemented against
// Supabase (counts derived from real rows); the displays should not change.

// Baselines — must match the pre-existing demo figures so nothing jumps.
const REGISTERED_BASE = 847_213; // was hardcoded in Footer ("847,213") / hero ("847K+")
const VERIFIED_BASE = 12_847;    // was hardcoded in Footer + hero ("12,847")

export interface SiteStats {
  registeredDelta: number;
  verifiedDelta: number;
  clanDeltas: Record<string, number>;
}

let state: SiteStats = {
  registeredDelta: 0,
  verifiedDelta: 0,
  clanDeltas: {},
};

const listeners = new Set<() => void>();

function setState(next: SiteStats) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => state;

export function useStats(): SiteStats {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// ── Selectors ────────────────────────────────────────────────────────────────

export function registeredTotal(s: SiteStats): number {
  return REGISTERED_BASE + s.registeredDelta;
}

export function verifiedTotal(s: SiteStats): number {
  return VERIFIED_BASE + s.verifiedDelta;
}

// clans.ts stores memberCount as a display string ("23,481") and only 11 of
// the 56 clans have one. Returns the live numeric count, or null when the
// clan has no baseline AND nobody joined it this session (the UI keeps its
// honest "Member count coming soon" state in that case).
export function clanMemberCount(s: SiteStats, slug: string): number | null {
  const raw = getClan(slug)?.memberCount;
  const base = raw ? parseInt(raw.replace(/,/g, ""), 10) : null;
  const delta = s.clanDeltas[slug] ?? 0;
  if (base === null && delta <= 0) return null;
  return (base ?? 0) + delta;
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

// "12,391 members" / "1 member" — shared so every surface pluralises alike.
export function formatMembers(n: number): string {
  return `${formatCount(n)} ${n === 1 ? "member" : "members"}`;
}

// ── Actions ──────────────────────────────────────────────────────────────────

// A new account was created (create-account flow only — signing back in is
// not a new registration).
export function recordRegistration() {
  setState({ ...state, registeredDelta: state.registeredDelta + 1 });
}

// A membership was confirmed by an Omutaka (profile demo-approval or a real
// Verify action in the Bataka Panel).
export function recordVerification() {
  setState({ ...state, verifiedDelta: state.verifiedDelta + 1 });
}

// The member joined a clan (or moved to a different one) — the new clan's
// counter goes up immediately; the clan they left, if any, goes back down.
export function recordClanChange(
  prevSlug: string | null,
  nextSlug: string | null
) {
  if (prevSlug === nextSlug) return;
  const clanDeltas = { ...state.clanDeltas };
  if (prevSlug) clanDeltas[prevSlug] = (clanDeltas[prevSlug] ?? 0) - 1;
  if (nextSlug) clanDeltas[nextSlug] = (clanDeltas[nextSlug] ?? 0) + 1;
  setState({ ...state, clanDeltas });
}
