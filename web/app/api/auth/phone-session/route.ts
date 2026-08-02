import { NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Mints a real Supabase Auth session for a phone number without ever
// sending a real SMS/WhatsApp message — the on-screen demo OTP in
// LoginFlow.tsx is what actually gates entry; once it matches, the client
// calls this route to get a real session.
//
// Phone numbers aren't a native Supabase Auth identity, so a deterministic
// synthetic email stands in for one. admin.generateLink({type:"magiclink"})
// mints a one-time link (creating the auth user if it doesn't exist yet),
// which is immediately redeemed server-side via verifyOtp — nothing is ever
// emailed. See .claude/handoff-2026-07-17-s20.md for why this shape:
// verifyOtp must be called with ONLY {type, token_hash}, never `email`
// alongside it, or it throws.

interface CreateBody {
  mode: "create";
  phoneE164: string;
  name: string;
  clanSlug: string;
}

interface SigninBody {
  mode: "signin";
  phoneE164: string;
}

function syntheticEmail(phoneE164: string): string {
  return `${phoneE164.replace(/^\+/, "")}@members.ebikabyaffe.internal`;
}

async function mintSession(
  admin: ReturnType<typeof createServiceRoleClient>,
  email: string
) {
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (linkError || !linkData) {
    console.error("[phone-session] generateLink failed", linkError);
    return { error: "auth_error" as const };
  }
  // generateLink({type:"magiclink"}) actually issues a "signup"-typed link
  // the first time it creates a brand-new auth user, and only a genuine
  // "magiclink" link on subsequent calls for an existing user — verifyOtp
  // matches its `type` against the token's *stored* type (via
  // `verification_type` on the response), so hardcoding "magiclink" here
  // fails for every first-time account creation.
  const { data: verifyData, error: verifyError } = await admin.auth.verifyOtp({
    type: linkData.properties.verification_type as EmailOtpType,
    token_hash: linkData.properties.hashed_token,
  });
  if (verifyError || !verifyData.session) {
    console.error("[phone-session] verifyOtp failed", verifyError);
    return { error: "auth_error" as const };
  }
  return { session: verifyData.session };
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as CreateBody | SigninBody | null;
  if (!body || (body.mode !== "create" && body.mode !== "signin") || !body.phoneE164) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const admin = createServiceRoleClient();
  const email = syntheticEmail(body.phoneE164);

  if (body.mode === "create") {
    const { data: existing } = await admin
      .from("profiles")
      .select("id")
      .eq("phone", body.phoneE164)
      .maybeSingle();
    if (existing) {
      return NextResponse.json({ error: "already_registered" }, { status: 409 });
    }

    const minted = await mintSession(admin, email);
    if ("error" in minted) {
      return NextResponse.json({ error: minted.error }, { status: 500 });
    }

    const { error: insertError } = await admin.from("profiles").insert({
      id: minted.session.user.id,
      name: body.name,
      phone: body.phoneE164,
      clan_slug: body.clanSlug,
    });
    if (insertError) {
      return NextResponse.json({ error: "profile_error" }, { status: 500 });
    }

    return NextResponse.json({
      access_token: minted.session.access_token,
      refresh_token: minted.session.refresh_token,
    });
  }

  // mode === "signin"
  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("phone", body.phoneE164)
    .maybeSingle();
  if (!existing) {
    return NextResponse.json({ error: "not_registered" }, { status: 404 });
  }

  const minted = await mintSession(admin, email);
  if ("error" in minted) {
    return NextResponse.json({ error: minted.error }, { status: 500 });
  }

  return NextResponse.json({
    access_token: minted.session.access_token,
    refresh_token: minted.session.refresh_token,
  });
}
