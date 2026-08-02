// ── "Send this to the Foundation" — real message-thread types ───────────────
//
// Every submission through ContactFoundationCard (home dashboard) or
// LineageArchiveCard (/profile) still emails the Foundation as before, but
// now ALSO becomes a durable row here (see app/api/contact/route.ts). The
// Foundation admin replies to it from the Foundation Admin console
// (app/batakaPanel/messages), and the member reads that reply as a real
// in-app notification instead of an email reply the app can never see.

export interface ContactMessage {
  id: string;
  subject: string;
  message: string;
  createdAt: string; // display date/time
  replyBody: string | null;
  replyByLabel: string | null;
  repliedAt: string | null; // display date/time
  // True once the member has actually opened/viewed the reply — drives the
  // "new reply" notification badge. Flips back to false if the admin
  // replies again later (see panel_reply_to_message in the migration).
  replySeenByMember: boolean;
}

// The admin's queue view additionally needs to know who sent it — a plain
// member's own fetch (fetchMyMessages) has no reason to carry its own
// identity fields, so this is a separate, extended shape rather than
// growing the base type.
export interface AdminContactMessage extends ContactMessage {
  senderName: string;
  senderPhone: string;
  senderVerified: boolean;
  clanSlug: string | null;
}
