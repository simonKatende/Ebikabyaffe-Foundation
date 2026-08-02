"use client";

import { useSyncExternalStore } from "react";
import { createClient } from "@/lib/supabase/client";

// ── Live site-wide counters — real Supabase implementation ──────────────────
//
// The single source of truth for the three counters the site displays:
//   1. Baganda registered   (hero stats bar, footer)
//   2. Verified by Bataka   (hero stats bar, footer)
//   3. Per-clan members     (clan grid, clan detail pages, profile, dashboard)
//
// These used to be a hardcoded marketing baseline (847,213 / 12,847 / a
// handful of large per-clan estimates) with a session-only delta on top —
// now the baseline itself is a real aggregate fetched once via two
// SECURITY DEFINER RPCs (public_site_stats/public_clan_member_counts, see
// the migration) that return counts only, never row data, so no visitor
// (signed in or not) gains any new visibility into individual members. The
// existing record* actions still apply an immediate optimistic delta on top
// of that real baseline for the current user's own action — same instant
// feedback as before, just against real numbers underneath. No Realtime
// here: a public counter doesn't need per-second freshness, and Realtime on
// `profiles` wouldn't reach a signed-out visitor anyway (RLS-scoped, same
// as any other read).

export interface SiteStats {
  registeredBase: number;
  verifiedBase: number;
  clanBase: Record<string, number>;
  registeredDelta: number;
  verifiedDelta: number;
  clanDeltas: Record<string, number>;
}

let state: SiteStats = {
  registeredBase: 0,
  verifiedBase: 0,
  clanBase: {},
  registeredDelta: 0,
  verifiedDelta: 0,
  clanDeltas: {},
};

const listeners = new Set<() => void>();

function setState(next: SiteStats) {
  state = next;
  listeners.forEach((l) => l());
}

let baselineRequested = false;

async function fetchBaseline() {
  const supabase = createClient();
  const [{ data: siteRow }, { data: clanRows }] = await Promise.all([
    supabase.rpc("public_site_stats").single(),
    supabase.rpc("public_clan_member_counts"),
  ]);
  const clanBase: Record<string, number> = {};
  for (const row of (clanRows as { clan_slug: string; member_count: number }[] | null) ?? []) {
    clanBase[row.clan_slug] = row.member_count;
  }
  const site = siteRow as { registered: number; verified: number } | null;
  setState({
    ...state,
    registeredBase: site?.registered ?? 0,
    verifiedBase: site?.verified ?? 0,
    clanBase,
  });
}

export function useStats(): SiteStats {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      // Only the first subscriber anywhere on the page triggers the fetch —
      // every later subscriber (another component mounting) just reads the
      // same cached state, same as the rest of this app's module stores.
      if (!baselineRequested) {
        baselineRequested = true;
        void fetchBaseline();
      }
      return () => listeners.delete(listener);
    },
    () => state,
    () => state
  );
}

// ── Selectors ────────────────────────────────────────────────────────────────

export function registeredTotal(s: SiteStats): number {
  return s.registeredBase + s.registeredDelta;
}

export function verifiedTotal(s: SiteStats): number {
  return s.verifiedBase + s.verifiedDelta;
}

// Every clan now has a real number (0 if nobody's joined it yet) — no more
// "no baseline ⇒ null ⇒ show a 'coming soon' placeholder" case.
export function clanMemberCount(s: SiteStats, slug: string): number {
  return (s.clanBase[slug] ?? 0) + (s.clanDeltas[slug] ?? 0);
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
