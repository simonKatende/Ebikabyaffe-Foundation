import type { Lineage } from "@/context/AuthContext";

// ── Bataka Panel data model (frontend mock) ─────────────────────────────────
//
// These types are written to mirror the future Supabase tables one-to-one
// (members, verification decisions, announcements, audit log). When the
// backend lands, only lib/batakaPanel/store.ts should need reimplementing —
// every panel component talks to the store, never to raw data.

// Verification lifecycle as the PANEL sees it:
//   "registered"     → member joined the clan but hasn't submitted lineage yet
//   "pending"        → lineage submitted, waiting in the Omutaka's queue
//   "info_requested" → Omutaka asked for more details; ball is with the member
//   "verified"       → confirmed; the member's profile shows the badge
//   "declined"       → rejected with a recorded reason (reversible later)
export type MemberStatus =
  | "registered"
  | "pending"
  | "info_requested"
  | "verified"
  | "declined";

export interface PanelMember {
  id: string;
  fullName: string;
  phone: string;
  clanSlug: string;
  memberSince: string;      // display string, e.g. "12 Jun 2026"
  status: MemberStatus;
  // The lineage declaration — null until the member submits one.
  lineage: Lineage | null;
  submittedAt: string | null;
  // Decision record — set by Verify / Decline / Request-info actions.
  decidedAt: string | null;
  decisionNote: string | null; // decline reason or info-request note
}

export interface AuditEntry {
  id: string;
  at: string;               // display date
  clanSlug: string;
  actor: string;            // "Omutaka (demo)" | "Foundation admin (demo)"
  action: string;           // human-readable, e.g. 'Verified "Ronald Kaggwa"'
}

export interface Announcement {
  id: string;
  at: string;
  clanSlug: string;
  title: string;
  body: string;
}

// Who is using the panel right now (mock session):
//   clanSlug set  → that clan's Omutaka / authorized officer (clan-scoped view)
//   isAdmin true  → Foundation admin console (sees every clan, read-mostly)
export interface PanelSession {
  clanSlug: string | null;
  isAdmin: boolean;
}
