"use client";

import { useSyncExternalStore } from "react";
import { recordVerification } from "@/lib/stats";
import { formatE164 } from "@/lib/phoneCountries";
import type { AuthChangeEvent, PostgrestError, Session } from "@supabase/supabase-js";
import { mapLineageRow, type LineageRow } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { createPanelClient } from "@/lib/supabase/panelClient";
import type {
  PanelMember,
  MemberStatus,
  AuditEntry,
  Announcement,
  PanelSession,
} from "./types";

// ── The panel's single data-access layer — real Supabase implementation ─────
//
// EVERYTHING the panel reads or writes goes through this file. Components
// never own panel data (unchanged rule from the mock version). Backed by a
// SEPARATE Supabase client (lib/supabase/panelClient.ts, its own cookie
// namespace) than the member-facing one in AuthContext.tsx, so a signed-in
// member and a signed-in officer/admin can coexist in the same browser.
//
// Bootstrap is a module-top-level (not a React hook — this is a plain
// module) subscription to that client's auth changes, guarded by
// `typeof window !== "undefined"` (same precaution the old
// lib/auth/registry.ts used for its own browser-only wiring) — this is what
// lets `usePanelStore()` stay a simple synchronous useSyncExternalStore hook
// even though the data underneath is fetched asynchronously.
//
// Realtime (Postgres Changes, RLS-scoped by the same SELECT policies as any
// other query) replaces what lib/crossTabSync.ts's localStorage broadcast
// used to provide — same-tab live updates, PLUS real cross-device sync
// crossTabSync could never give.

export interface PanelState {
  session: PanelSession | null;
  members: PanelMember[];
  audit: AuditEntry[];
  announcements: Announcement[];
}

let state: PanelState = {
  session: null,
  members: [],
  audit: [],
  announcements: [],
};

const listeners = new Set<() => void>();

function setState(next: PanelState) {
  state = next;
  listeners.forEach((l) => l());
}

export function usePanelStore(): PanelState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state
  );
}

// ── Selectors (unchanged from the mock — the fetched arrays are already
// clan-scoped by RLS for an officer, so these filters are mostly a no-op
// safety net for officers and the real "see everything" case for admin) ────

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
// only their OWN joined clan's announcements. Deliberately independent of
// any panel session (a plain member never signs into the panel) — fetches
// directly via the MEMBER's own Supabase client (lib/supabase/client.ts),
// relying on the "announcements_select_by_clan_member" RLS policy that
// already allows a member to read their own clan's announcements. This is
// the one read in this file that does NOT go through the panel client or
// this module's cached `state`.
export async function fetchClanAnnouncements(clanSlug: string): Promise<Announcement[]> {
  const { data, error } = await createClient()
    .from("announcements")
    .select("*")
    .eq("clan_slug", clanSlug)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as AnnouncementRow[]).map(mapAnnouncementRow);
}

// ── Row shapes fetched here (broader than AuthContext's own — the panel
// reads many members' rows at once, not just the signed-in member's own) ───

interface PanelProfileRow {
  id: string;
  name: string;
  phone: string;
  clan_slug: string | null;
  member_since: string;
}

interface PanelLineageRow extends LineageRow {
  profile_id: string;
  status: string;
  submitted_at: string;
  decided_at: string | null;
  decision_note: string | null;
}

interface AuditRow {
  id: string;
  clan_slug: string;
  actor_label: string;
  action: string;
  created_at: string;
}

interface AnnouncementRow {
  id: string;
  clan_slug: string;
  title: string;
  body: string;
  posted_by_admin: boolean;
  created_at: string;
}

function formatDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString("en-UG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function today(): string {
  return formatDate(new Date());
}

function mapAnnouncementRow(a: AnnouncementRow): Announcement {
  return {
    id: a.id,
    at: formatDate(a.created_at),
    clanSlug: a.clan_slug,
    title: a.title,
    body: a.body,
    postedByAdmin: a.posted_by_admin,
  };
}

// ── Bootstrap + data loading ─────────────────────────────────────────────────

async function loadPanelSession(userId: string): Promise<PanelSession | null> {
  const { data } = await createPanelClient()
    .from("panel_officers")
    .select("clan_slug, is_admin")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) return null;
  return { clanSlug: data.is_admin ? null : data.clan_slug, isAdmin: data.is_admin };
}

async function refreshAll(session: PanelSession) {
  const supabase = createPanelClient();
  const [{ data: profiles }, { data: lineageRows }, { data: auditRows }, { data: announcementRows }] =
    await Promise.all([
      supabase.from("profiles").select("*").not("clan_slug", "is", null),
      supabase.from("lineages").select("*"),
      supabase.from("verification_audit").select("*").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);

  const lineageByProfile = new Map(
    ((lineageRows as PanelLineageRow[] | null) ?? []).map((l) => [l.profile_id, l])
  );

  const members: PanelMember[] = ((profiles as PanelProfileRow[] | null) ?? []).map((p) => {
    const lineageRow = lineageByProfile.get(p.id);
    return {
      id: p.id,
      fullName: p.name,
      phone: formatE164(p.phone),
      clanSlug: p.clan_slug ?? "",
      memberSince: formatDate(p.member_since),
      status: (lineageRow ? lineageRow.status : "registered") as MemberStatus,
      lineage: lineageRow ? mapLineageRow(lineageRow) : null,
      submittedAt: lineageRow ? formatDate(lineageRow.submitted_at) : null,
      decidedAt: lineageRow?.decided_at ? formatDate(lineageRow.decided_at) : null,
      decisionNote: lineageRow?.decision_note ?? null,
    };
  });

  const audit: AuditEntry[] = ((auditRows as AuditRow[] | null) ?? []).map((a) => ({
    id: a.id,
    at: formatDate(a.created_at),
    clanSlug: a.clan_slug,
    actor: a.actor_label,
    action: a.action,
  }));

  const announcements: Announcement[] = ((announcementRows as AnnouncementRow[] | null) ?? []).map(
    mapAnnouncementRow
  );

  setState({ session, members, audit, announcements });
}

type RealtimeChannel = ReturnType<ReturnType<typeof createPanelClient>["channel"]>;
let realtimeChannel: RealtimeChannel | null = null;

function teardownRealtime() {
  if (realtimeChannel) {
    createPanelClient().removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
}

// Every change is treated purely as a "something changed, refetch" signal —
// the payload's own row content is never read directly, so this doesn't
// depend on exactly what Realtime chooses to include in the event. Realtime
// itself is RLS-scoped the same way any other query is (Postgres Changes
// checks the subscribing connection's SELECT policies), so an officer's
// channel should only ever fire for their own clan's rows — verified live
// as part of the same clan-scoping isolation check the rest of this file's
// data access gets.
function setupRealtime(session: PanelSession) {
  teardownRealtime();
  const supabase = createPanelClient();
  const channel = supabase.channel(`panel-${session.isAdmin ? "admin" : session.clanSlug}`);
  (["profiles", "lineages", "verification_audit", "announcements"] as const).forEach(
    (table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => void refreshAll(session)
      );
    }
  );
  channel.subscribe();
  realtimeChannel = channel;
}

if (typeof window !== "undefined") {
  createPanelClient().auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
    if (!session) {
      teardownRealtime();
      setState({ session: null, members: [], audit: [], announcements: [] });
      return;
    }
    loadPanelSession(session.user.id).then((panelSession) => {
      if (!panelSession) {
        // A session exists but no matching panel_officers row — shouldn't
        // normally happen (the sign-in route provisions one atomically),
        // treat as signed out rather than rendering with no scoping.
        teardownRealtime();
        setState({ session: null, members: [], audit: [], announcements: [] });
        return;
      }
      setState({ ...state, session: panelSession });
      void refreshAll(panelSession);
      setupRealtime(panelSession);
    });
  });
}

export function panelSignOut() {
  void createPanelClient().auth.signOut();
}

// ── Actions — optimistic local update, then a background write. The write
// is a SECURITY DEFINER RPC for member decisions (see the phase-2 migration)
// rather than a raw table UPDATE, so an officer's access is scoped to
// exactly the review columns even though RLS alone can't express
// column-level restriction. Realtime brings the audit trail and any other
// signed-in tab up to date shortly after — these actions don't try to
// fabricate an audit entry locally, so there's one source of truth for its
// wording (the SQL functions themselves). ─────────────────────────────────

export function verifyMember(id: string) {
  const wasVerified = state.members.find((m) => m.id === id)?.status === "verified";
  const decidedAt = today();
  setState({
    ...state,
    members: state.members.map((m) =>
      m.id === id ? { ...m, status: "verified" as MemberStatus, decidedAt, decisionNote: null } : m
    ),
  });
  if (!wasVerified) recordVerification();
  createPanelClient()
    .rpc("panel_verify_member", { target_profile_id: id })
    .then(({ error }: { error: PostgrestError | null }) => {
      if (error) console.error("[batakaPanel/store] verifyMember failed", error);
    });
}

export function declineMember(id: string, reason: string) {
  const decidedAt = today();
  setState({
    ...state,
    members: state.members.map((m) =>
      m.id === id
        ? { ...m, status: "declined" as MemberStatus, decidedAt, decisionNote: reason }
        : m
    ),
  });
  createPanelClient()
    .rpc("panel_decline_member", { target_profile_id: id, reason })
    .then(({ error }: { error: PostgrestError | null }) => {
      if (error) console.error("[batakaPanel/store] declineMember failed", error);
    });
}

export function requestInfo(id: string, note: string) {
  const decidedAt = today();
  setState({
    ...state,
    members: state.members.map((m) =>
      m.id === id
        ? { ...m, status: "info_requested" as MemberStatus, decidedAt, decisionNote: note }
        : m
    ),
  });
  createPanelClient()
    .rpc("panel_request_info", { target_profile_id: id, note })
    .then(({ error }: { error: PostgrestError | null }) => {
      if (error) console.error("[batakaPanel/store] requestInfo failed", error);
    });
}

// Lets other domains reviewed by the same officers/admin (business listings)
// append to this one shared audit trail, so "Recent Panel Activity" reads as
// a single feed of everything an officer/admin has done. Relies on the
// caller already being signed into the panel client (true for every
// business-listing decision, which is admin-only).
export async function logExternalAction(clanSlug: string, action: string) {
  const supabase = createPanelClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return;
  const { error } = await supabase.from("verification_audit").insert({
    clan_slug: clanSlug,
    actor_id: session.user.id,
    actor_label: state.session?.isAdmin ? "Foundation admin" : "Omutaka",
    action,
  });
  if (error) console.error("[batakaPanel/store] logExternalAction failed", error);
}

// postedByAdmin defaults to false — a clan's own Omutaka posting to their
// own members. The Foundation admin can also post to ANY clan by passing
// postedByAdmin: true.
export function postAnnouncement(
  clanSlug: string,
  title: string,
  body: string,
  postedByAdmin = false
) {
  const optimistic: Announcement = {
    id: `pending-${Date.now()}`,
    at: today(),
    clanSlug,
    title,
    body,
    postedByAdmin,
  };
  setState({ ...state, announcements: [optimistic, ...state.announcements] });

  (async () => {
    const supabase = createPanelClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("announcements").insert({
      clan_slug: clanSlug,
      author_id: session.user.id,
      title,
      body,
      posted_by_admin: postedByAdmin,
    });
    if (error) {
      console.error("[batakaPanel/store] postAnnouncement failed", error);
      return;
    }
    await logExternalAction(
      clanSlug,
      postedByAdmin
        ? `Posted announcement "${title}" (Foundation admin, on behalf of the clan)`
        : `Posted announcement "${title}"`
    );
  })();
}
