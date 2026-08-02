"use client";

import { createClient } from "@/lib/supabase/client";
import { getActivePanelClient } from "@/lib/batakaPanel/store";
import { formatE164 } from "@/lib/phoneCountries";
import type { ContactMessage, AdminContactMessage } from "./types";

// ── Data-access layer for the contact-message thread ─────────────────────────
//
// No persistent module store/Realtime here (unlike lib/batakaPanel/store.ts)
// — mirrors lib/businesses/store.ts's own choice: these change far less
// often than member verifications, so a plain fetch-on-demand (re-run after
// each write) is enough.

interface MessageRow {
  id: string;
  profile_id: string;
  subject: string;
  message: string;
  created_at: string;
  reply_body: string | null;
  reply_by_label: string | null;
  replied_at: string | null;
  reply_seen_by_member: boolean;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-UG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapRow(r: MessageRow): ContactMessage {
  return {
    id: r.id,
    subject: r.subject,
    message: r.message,
    createdAt: formatDateTime(r.created_at),
    replyBody: r.reply_body,
    replyByLabel: r.reply_by_label,
    repliedAt: r.replied_at ? formatDateTime(r.replied_at) : null,
    replySeenByMember: r.reply_seen_by_member,
  };
}

// ── Member-facing ─────────────────────────────────────────────────────────

export async function fetchMyMessages(profileId: string): Promise<ContactMessage[]> {
  if (!profileId) return [];
  const { data, error } = await createClient()
    .from("contact_messages")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as MessageRow[]).map(mapRow);
}

export function unseenReplyCount(messages: ContactMessage[]): number {
  return messages.filter((m) => m.replyBody && !m.replySeenByMember).length;
}

export async function markReplySeen(messageId: string): Promise<void> {
  const { error } = await createClient().rpc("mark_reply_seen", {
    target_message_id: messageId,
  });
  if (error) console.error("[contactMessages/store] markReplySeen failed", error);
}

// ── Admin-facing (Foundation Admin console only — no clan-officer access;
// a general question/comment/observation has no clan concept) ─────────────

interface ProfileLite {
  id: string;
  name: string;
  phone: string;
  clan_slug: string | null;
  clan_verified: boolean;
}

export async function fetchMessagesForAdmin(): Promise<AdminContactMessage[]> {
  const supabase = getActivePanelClient();
  if (!supabase) return [];
  const [{ data: rows }, { data: profiles }] = await Promise.all([
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, name, phone, clan_slug, clan_verified"),
  ]);
  const profileById = new Map(
    ((profiles as ProfileLite[] | null) ?? []).map((p) => [p.id, p])
  );
  return ((rows as MessageRow[] | null) ?? []).map((r) => {
    const sender = profileById.get(r.profile_id);
    return {
      ...mapRow(r),
      senderName: sender?.name ?? "Unknown member",
      senderPhone: sender ? formatE164(sender.phone) : "",
      senderVerified: sender?.clan_verified ?? false,
      clanSlug: sender?.clan_slug ?? null,
    };
  });
}

export async function replyToMessage(messageId: string, reply: string): Promise<void> {
  const supabase = getActivePanelClient();
  if (!supabase) return;
  const { error } = await supabase.rpc("panel_reply_to_message", {
    target_message_id: messageId,
    reply,
  });
  if (error) console.error("[contactMessages/store] replyToMessage failed", error);
}
