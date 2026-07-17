"use client";

import { useSyncExternalStore } from "react";
import { seedMembers } from "./mockMembers";
import { recordVerification } from "@/lib/stats";
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

export interface PanelState {
  session: PanelSession | null;
  members: PanelMember[];
  audit: AuditEntry[];
  announcements: Announcement[];
}

let state: PanelState = {
  session: null,
  members: seedMembers(),
  audit: [],
  announcements: [],
};

const listeners = new Set<() => void>();

function setState(next: PanelState) {
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

export function postAnnouncement(clanSlug: string, title: string, body: string) {
  const a: Announcement = {
    id: `ann-${Date.now()}`,
    at: today(),
    clanSlug,
    title,
    body,
  };
  setState({
    ...state,
    announcements: [a, ...state.announcements],
    audit: log(clanSlug, `Posted announcement "${title}"`),
  });
}
