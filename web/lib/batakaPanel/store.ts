"use client";

import { useSyncExternalStore } from "react";
import { recordVerification } from "@/lib/stats";
import { formatE164 } from "@/lib/phoneCountries";
import type { AuthChangeEvent, PostgrestError, Session } from "@supabase/supabase-js";
import { mapLineageRow, type LineageRow } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { createOfficerPanelClient, createAdminPanelClient } from "@/lib/supabase/panelClient";
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
// never own panel data (unchanged rule from the mock version). Backed by
// TWO SEPARATE Supabase clients (lib/supabase/panelClient.ts — one officer
// cookie, one admin cookie), distinct from the member-facing one in
// AuthContext.tsx too, so a signed-in member, a signed-in clan officer, and
// a signed-in admin can all coexist independently in the same browser —
// signing into one never establishes or reveals a session for either of the
// other two. Exactly one of the two panel auth states is ever "active" at a
// time for THIS module's exposed `session` (see `activeRole()` below); if
// both happen to be signed in in the same browser, admin wins, since it's
// the strictly broader role and there's no UI here for picking between two
// simultaneously-open panel identities.
//
// Bootstrap is a module-top-level (not a React hook — this is a plain
// module) subscription to BOTH clients' auth changes, guarded by
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

// Exactly one of these is non-null at a time in the common case (each is
// only ever set by that role's OWN client's onAuthStateChange, wired to its
// own cookie) — but both CAN be non-null if the same browser has signed into
// both doors (e.g. an officer signed in in one tab, admin in another).
let officerAuthSession: Session | null = null;
let adminAuthSession: Session | null = null;

type ActiveRole = "officer" | "admin";

// The role THIS tab is currently showing. Deliberately "sticky" — see
// `reconcile()` below. A real bug this fixes: the two auth clients' session
// cookies sync live across every tab of the same browser (that's normal,
// desired persistence — e.g. so the officer's own dashboard survives a
// reload), which means BOTH auth listeners fire in EVERY tab, including one
// that's just quietly showing an officer's dashboard when a completely
// different tab signs into /foundationAdmin as admin. Without stickiness, a
// naive "admin wins if both exist" rule would swap that officer tab's
// content over to the admin console the instant the other tab's sign-in
// completed — exactly the "opening the other door hijacks a tab I already
// had open" bug this whole file exists to prevent, just reappearing one
// layer down. Once a tab has picked a role to display, it keeps showing
// that role as long as that role's OWN session stays valid, full stop — the
// other role's cookie appearing or disappearing elsewhere is none of this
// tab's business.
let currentDisplayRole: ActiveRole | null = null;

function activeRole(): ActiveRole | null {
  return currentDisplayRole;
}

// Exported so lib/businesses/store.ts's own officer/admin review queries
// (fetchListingsForReviewer, decideListing) go through whichever client this
// module already knows is actually signed in, instead of duplicating the
// role-resolution logic there.
export function getActivePanelClient() {
  const role = activeRole();
  if (role === "admin") return createAdminPanelClient();
  if (role === "officer") return createOfficerPanelClient();
  return null;
}

function clientForRole(role: ActiveRole) {
  return role === "admin" ? createAdminPanelClient() : createOfficerPanelClient();
}

async function loadPanelSession(userId: string, role: ActiveRole): Promise<PanelSession | null> {
  const { data } = await clientForRole(role)
    .from("panel_officers")
    .select("clan_slug, is_admin")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) return null;
  return { clanSlug: data.is_admin ? null : data.clan_slug, isAdmin: data.is_admin };
}

async function refreshAll(session: PanelSession) {
  const supabase = getActivePanelClient();
  if (!supabase) return;
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

type RealtimeChannel = ReturnType<ReturnType<typeof createOfficerPanelClient>["channel"]>;
let realtimeChannel: RealtimeChannel | null = null;
let realtimeChannelRole: ActiveRole | null = null;

function teardownRealtime() {
  if (realtimeChannel && realtimeChannelRole) {
    clientForRole(realtimeChannelRole).removeChannel(realtimeChannel);
    realtimeChannel = null;
    realtimeChannelRole = null;
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
function setupRealtime(session: PanelSession, role: ActiveRole) {
  teardownRealtime();
  const supabase = clientForRole(role);
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
  realtimeChannelRole = role;
}

// Re-evaluates which of the two auth states (if either) should currently
// drive the exposed panel session, then loads/tears down data accordingly.
// Called from BOTH clients' onAuthStateChange.
//
// STICKY by design: if this tab is already displaying a role and that
// role's own session is still valid, it keeps displaying that role no
// matter what the OTHER role's session just did (signing in or out
// elsewhere in the same browser is irrelevant to an already-open tab). Only
// when there's no current display role yet (first load in this tab) or the
// CURRENTLY displayed role's own session just ended does this fall through
// to picking fresh.
//
// A brand-new tab opened in a browser that already has BOTH an officer and
// an admin cookie is a genuinely ambiguous case with no "correct" answer —
// this tab was never told which identity to use. In practice whichever of
// the two clients' initial auth check resolves first wins (usually the
// officer client, since it's registered first below), not necessarily
// admin — there's no attempt made here to force a deterministic winner for
// that specific edge case, since nobody has asked for one and forcing it
// would mean delaying every fresh tab's first render until BOTH clients'
// checks land. What this function DOES guarantee is the thing that was
// actually reported as a bug: an explicit sign-in through completeSignIn()
// (below) always wins for the tab that performed it, and an
// already-displaying tab is never involuntarily swapped to the other role.
function reconcile() {
  let role: ActiveRole | null;
  if (currentDisplayRole === "officer" && officerAuthSession) {
    role = "officer";
  } else if (currentDisplayRole === "admin" && adminAuthSession) {
    role = "admin";
  } else if (adminAuthSession) {
    role = "admin";
  } else if (officerAuthSession) {
    role = "officer";
  } else {
    role = null;
  }
  currentDisplayRole = role;

  if (!role) {
    teardownRealtime();
    setState({ session: null, members: [], audit: [], announcements: [] });
    return;
  }
  // Nothing actually changed for THIS tab — the data currently on screen
  // already belongs to this exact role — most commonly hit when the OTHER
  // role's session merely changed elsewhere in the same browser and this
  // reconcile only ran because both auth listeners share this one function.
  // Skip the refetch/realtime-resubscribe churn rather than redoing it for
  // no visible reason. Deliberately checked against `state.session` itself
  // (what's actually loaded) rather than a separately-tracked "previous
  // role" snapshot — completeSignIn() below sets `currentDisplayRole`
  // itself before calling this function, which would make a snapshot taken
  // at the top of this function always equal the new role and wrongly skip
  // the very first load of that role's real data.
  if (state.session && state.session.isAdmin === (role === "admin")) return;
  const supaSession = role === "admin" ? adminAuthSession : officerAuthSession;
  loadPanelSession(supaSession!.user.id, role).then((panelSession) => {
    // The active role may have changed again while this lookup was in
    // flight (e.g. admin signed out mid-request) — bail rather than apply
    // a now-stale result.
    if (activeRole() !== role) return;
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
    setupRealtime(panelSession, role);
  });
}

// If the role that just lost its auth session is the one CURRENTLY exposed
// via `state.session`, clear it synchronously right away rather than
// leaving the stale (now-invalid) session visible while `reconcile()`'s
// async fallback lookup is still in flight. Without this, a component that
// reads `state.session` immediately after a sign-out (PanelShell's exit
// handler routes based on it, FoundationAdminGate re-checks it on mount
// after that route change) can briefly see the OLD role as still signed
// in and make a decision — e.g. an admin exiting could get bounced back
// into the panel by FoundationAdminGate reading a still-true `isAdmin`
// from a moment before the officer-fallback lookup resolved.
function clearIfCurrentlyShowing(isAdminRole: boolean) {
  if (state.session && state.session.isAdmin === isAdminRole) {
    teardownRealtime();
    setState({ ...state, session: null });
  }
}

if (typeof window !== "undefined") {
  createOfficerPanelClient().auth.onAuthStateChange(
    (_event: AuthChangeEvent, session: Session | null) => {
      officerAuthSession = session;
      if (!session) clearIfCurrentlyShowing(false);
      reconcile();
    }
  );
  createAdminPanelClient().auth.onAuthStateChange(
    (_event: AuthChangeEvent, session: Session | null) => {
      adminAuthSession = session;
      if (!session) clearIfCurrentlyShowing(true);
      reconcile();
    }
  );
}

// Called by PanelSignIn.tsx / AdminSignIn.tsx right after their own
// `setSession()` call succeeds, to explicitly PIN this tab to the role that
// was just actively signed into — rather than leaving it to `reconcile()`'s
// sticky rule to figure out on its own.
//
// This closes a real bug the sticky rule (see `reconcile()` above)
// otherwise reintroduces: a tab sitting on /foundationAdmin, before the
// visitor has typed anything, ALREADY passively discovers an unrelated
// pre-existing officer cookie from another tab (both auth listeners are
// wired in every tab regardless of which door it's on) and quietly becomes
// sticky to "officer" — invisibly, since the officer role has no dashboard
// of its own to show while sitting on the sign-in form. When the visitor
// then actually submits the admin password, the sticky rule would keep
// preferring the already-sticky officer role and simply never notice the
// admin sign-in at all, leaving `signedInAsAdmin` false forever and the
// sign-in silently going nowhere. Re-fetching the session directly from the
// role's own client (rather than trusting whatever the reactive
// onAuthStateChange listener has or hasn't gotten around to yet) also
// sidesteps any ordering race between that listener firing and this
// function running right after `setSession()` resolves.
export async function completeSignIn(role: ActiveRole): Promise<void> {
  const client = clientForRole(role);
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) return;
  if (role === "admin") adminAuthSession = session;
  else officerAuthSession = session;
  currentDisplayRole = role;
  reconcile();
}

// Awaited (not fire-and-forget) on purpose: PanelShell's exit handler
// navigates the signed-out role back to its own sign-in door right after
// calling this, and needs the sign-out's SIGNED_OUT auth event to have
// already reached this module's onAuthStateChange listener (which is what
// actually clears `state.session`) BEFORE that navigation lands — otherwise
// the door being navigated to reads a still-stale, still-truthy session and
// bounces straight back (a real race hit during verification: exiting the
// admin session used to redirect to /foundationAdmin and then immediately
// get redirected right back into /batakaPanel).
export async function panelSignOut(): Promise<void> {
  const role = activeRole();
  if (role) await clientForRole(role).auth.signOut();
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
  getActivePanelClient()
    ?.rpc("panel_verify_member", { target_profile_id: id })
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
  getActivePanelClient()
    ?.rpc("panel_decline_member", { target_profile_id: id, reason })
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
  getActivePanelClient()
    ?.rpc("panel_request_info", { target_profile_id: id, note })
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
  const supabase = getActivePanelClient();
  if (!supabase) return;
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
    const supabase = getActivePanelClient();
    if (!supabase) return;
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
