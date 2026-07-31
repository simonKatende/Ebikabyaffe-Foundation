// ── Shared "send this to the Foundation" helper ──────────────────────────────
//
// Every form that reaches the Foundation (the home dashboard's
// question/comment/observation card, the profile page's clan-lineage archive
// contribution) posts to app/api/contact/route.ts, which sends the email
// server-side via Resend — silent, no email client popping up. That route
// needs RESEND_API_KEY set in web/.env.local (see .env.local.example).

export const FOUNDATION_CONTACT_EMAIL = "blaisekawule1@gmail.com";

// Common "— Name · phone · clan" signature line every Foundation-bound
// message ends with, so a reply always has enough context to act on.
export function foundationSignature(name: string, phone?: string, clanName?: string): string {
  return `— ${name}` + (phone ? ` · ${phone}` : "") + (clanName ? ` · ${clanName} clan` : "");
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

// Posts to /api/contact. Network/server failures are caught and turned into
// a friendly error message rather than an unhandled rejection — callers just
// check `.ok` and show a toast either way.
export async function sendToFoundation(subject: string, message: string): Promise<SendResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data.error ?? "Failed to send. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}
