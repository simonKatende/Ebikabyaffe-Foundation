import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FOUNDATION_CONTACT_EMAIL } from "@/lib/contactFoundation";

// POST /api/contact — the one server-side route in an otherwise
// frontend-only mocked app, purely to make "send this to the Foundation"
// silent (no email client popping up). Used by ContactFoundationCard (home
// dashboard) and LineageArchiveCard (/profile). Needs RESEND_API_KEY in
// web/.env.local (see .env.local.example) — a free Resend account is enough,
// no domain verification required since we send from their shared
// onboarding@resend.dev sender. Swap that sender once the Foundation
// verifies its own domain with Resend.
export async function POST(request: Request) {
  const { subject, message } = await request.json();

  if (typeof subject !== "string" || typeof message !== "string" || !subject.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing subject or message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — see web/.env.local.example.");
    return NextResponse.json(
      { error: "Email sending isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Ebikabyaffe Foundation <onboarding@resend.dev>",
      to: FOUNDATION_CONTACT_EMAIL,
      subject,
      text: message,
    });
    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend send threw:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
