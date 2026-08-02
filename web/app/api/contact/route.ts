import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FOUNDATION_CONTACT_EMAIL } from "@/lib/contactFoundation";
import { createClient } from "@/lib/supabase/server";

// POST /api/contact — the one server-side route in an otherwise
// frontend-only mocked app, purely to make "send this to the Foundation"
// silent (no email client popping up). Used by ContactFoundationCard (home
// dashboard) and LineageArchiveCard (/profile). Needs RESEND_API_KEY in
// web/.env.local (see .env.local.example) — a free Resend account is enough,
// no domain verification required since we send from their shared
// onboarding@resend.dev sender. Swap that sender once the Foundation
// verifies its own domain with Resend.
//
// 2026-08: every submission ALSO becomes a durable `contact_messages` row
// (see the matching migration), so the Foundation admin can reply to it
// from the Foundation Admin console and the member gets a real in-app
// notification — an email reply typed in a personal Gmail inbox is
// completely invisible to this app, so that's the only way to actually
// close the loop. `getUser()` (not getSession()) is used here specifically
// because this is a server-side request-authenticity check, not a client
// bootstrap — it re-verifies the JWT against the Supabase Auth server
// rather than trusting whatever the cookie merely claims.
export async function POST(request: Request) {
  const { subject, message } = await request.json();

  if (typeof subject !== "string" || typeof message !== "string" || !subject.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing subject or message." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "You must be signed in to send this." }, { status: 401 });
  }

  const { error: insertError } = await supabase.from("contact_messages").insert({
    profile_id: user.id,
    subject,
    message,
  });
  if (insertError) {
    console.error("[api/contact] contact_messages insert failed:", insertError);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }

  // The database row above is now the durable record the Foundation admin
  // replies to — email is just a courtesy heads-up from here on. A missing
  // key or a failed send is logged but doesn't fail the request; the
  // member's message is already safely recorded either way.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — see web/.env.local.example.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Ebikabyaffe Foundation <onboarding@resend.dev>",
      to: FOUNDATION_CONTACT_EMAIL,
      subject,
      text: message,
    });
    if (error) console.error("Resend send failed:", error);
  } catch (err) {
    console.error("Resend send threw:", err);
  }
  return NextResponse.json({ ok: true });
}
