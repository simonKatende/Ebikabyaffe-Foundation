"use client";

import { useSyncExternalStore } from "react";
import { seedMembers } from "./mockMembers";
import { seedAnnouncements } from "./mockAnnouncements";
import { recordVerification } from "@/lib/stats";
import { saveSynced, withCrossTabSync } from "@/lib/crossTabSync";
import type {
  PanelMember,
  AuditEntry,
  Announcement,
  PanelSession,
} from "./types";

// ── The panel's single data-access layer (mock implementation) ──────────────
//
// EVERYTHING the panel reads or writes goes through this file. Components
// never own panel data. In Phase 2 this file — and only this file — gets
// reimplemented against Supabase (clan-scoped row-level security replaces
// the clanSlug filters below); the panel UI should not need to change.
//
// Mock mechanics: a module-level store + useSyncExternalStore, so state
// survives client-side navigation anywhere in the app and resets on a hard
// reload — the same convention as the rest of the app's mocks.
//
// Cross-tab sync (2026-08, see lib/crossTabSync.ts): members/audit/
// announcements broadcast to other open tabs so an officer's or admin's
// panel session sees changes live. `session` is deliberately EXCLUDED from
// the sync — each tab keeps its own signed-in identity, so one tab can stay
// signed in as a member (via AuthContext, a separate store) while another is
// signed in here as a clan officer or the Foundation admin.

export interface PanelState {
  session: PanelSession | null;
  members: PanelMember[];
  audit: AuditEntry[];
  announcements: Announcement[];
}

type SyncedPanelData = Pick<PanelState, "members" | "audit" | "announcements">;

const SYNC_NAME = "panel-data";

let state: PanelState = {
  session: null,
  members: seedMembers(),
  audit: [],
  announcements: seedAnnouncements(),
};

const listeners = new Set<() => void>();

// Merges synced data into the CURRENT tab's state, preserving this tab's own
// session (never overwritten by another tab's sync) — see the note above.
function applySyncedData(data: SyncedPanelData) {
  state = { ...state, ...data };
  listeners.forEach((l) => l());
}

function setState(next: PanelState) {
  state = next;
  listeners.forEach((l) => l());
  saveSynced<SyncedPanelData>(SYNC_NAME, {
    members: next.members,
    audit: next.audit,
    announcements: next.announcements,
  });
}

function baseSubscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const subscribe = withCrossTabSync<SyncedPanelData>(SYNC_NAME, baseSubscribe, applySyncedData);

const getSnapshot = () => state;

// Panel components read the whole store through this hook and derive their
// own clan-scoped slices with the selectors below.
export function usePanelStore(): PanelState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// ── Selectors (always clan-scoped unless the session is the admin) ──────────

export function membersForSession(s: PanelState): PanelMember[] {
  if (!s.session) return [];
  if (s.session.isAdmin) return s.members;
  return s.members.filter((m) => m.clanSlug === s.session!.clanSlug);
}

export function auditForSession(s: PanelState): AuditEntry[] {
  if (!s.session) return [];
  if (s.session.isAdmin) return s.audit;
  return s.audit.filter((a) => a.clanSlug === s.session!.clanSlug);
}

export function announcementsForSession(s: PanelState): Announcement[] {
  if (!s.session) return [];
  if (s.session.isAdmin) return s.announcements;
  return s.announcements.filter((a) => a.clanSlug === s.session!.clanSlug);
}

// Member-facing: what a signed-in member sees on their own Home dashboard —
// only their OWN joined clan's announcements, no panel session involved.
// This is the fix for a real bug where a hardcoded "From the Mmamba Clan"
// card used to show to every member regardless of their clan. Newest first
// is already the array's natural order (postAnnouncement prepends).
export function announcementsForClan(s: PanelState, clanSlug: string): Announcement[] {
  return s.announcements.filter((a) => a.clanSlug === clanSlug);
}

// ── Actions ──────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toLocaleDateString("en-UG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function actor(): string {
  return state.session?.isAdmin ? "Foundation admin (demo)" : "Omutaka (demo)";
}

function log(clanSlug: string, action: string) {
  const entry: AuditEntry = {
    id: `audit-${Date.now()}-${state.audit.length}`,
    at: today(),
    clanSlug,
    actor: actor(),
    action,
  };
  return [entry, ...state.audit];
}

// Lets other domains that reuse the same officer/admin reviewers (e.g.
// lib/businesses/store.ts's listing review actions) append to this one
// shared audit trail, so "Recent Panel Activity" reads as a single feed of
// everything an officer has done — not a separate log per feature.
export function logExternalAction(clanSlug: string, action: string) {
  setState({ ...state, audit: log(clanSlug, action) });
}

export function panelSignIn(session: PanelSession) {
  setState({ ...state, session });
}

export function panelSignOut() {
  setState({ ...state, session: null });
}

function updateMember(
  id: string,
  patch: Partial<PanelMember>,
  action: (m: PanelMember) => string
) {
  const member = state.members.find((m) => m.id === id);
  if (!member) return;
  setState({
    ...state,
    members: state.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    audit: log(member.clanSlug, action(member)),
  });
}

export function verifyMember(id: string) {
  const wasVerified =
    state.members.find((m) => m.id === id)?.status === "verified";
  updateMember(
    id,
    { status: "verified", decidedAt: today(), decisionNote: null },
    (m) => `Verified "${m.fullName}"`
  );
  // Tick the site-wide "Verified by Bataka" counter — but never twice for
  // the same member.
  if (!wasVerified) recordVerification();
}

export function declineMember(id: string, reason: string) {
  updateMember(
    id,
    { status: "declined", decidedAt: today(), decisionNote: reason },
    (m) => `Declined "${m.fullName}"`
  );
}

export function requestInfo(id: string, note: string) {
  updateMember(
    id,
    { status: "info_requested", decidedAt: today(), decisionNote: note },
    (m) => `Requested more information from "${m.fullName}"`
  );
}

// postedByAdmin defaults to false — the original path, a clan's own Omutaka
// posting to their own members. The Foundation admin can also post to ANY
// clan (2026-08 request) by passing postedByAdmin: true, which both the
// panel's own announcement list and the member-facing dashboard card use to
// show a clear "posted by the Foundation" note instead of attributing it to
// the clan's own office.
export function postAnnouncement(
  clanSlug: string,
  title: string,
  body: string,
  postedByAdmin = false
) {
  const a: Announcement = {
    id: `ann-${Date.now()}`,
    at: today(),
    clanSlug,
    title,
    body,
    postedByAdmin,
  };
  setState({
    ...state,
    announcements: [a, ...state.announcements],
    audit: log(
      clanSlug,
      postedByAdmin
        ? `Posted announcement "${title}" (Foundation admin, on behalf of the clan)`
        : `Posted announcement "${title}"`
    ),
  });
}
