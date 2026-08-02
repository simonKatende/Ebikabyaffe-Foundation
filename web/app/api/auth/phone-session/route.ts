import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { mintSession } from "@/lib/supabase/mintSession";

// Mints a real Supabase Auth session for a phone number without ever
// sending a real SMS/WhatsApp message — the on-screen demo OTP in
// LoginFlow.tsx is what actually gates entry; once it matches, the client
// calls this route to get a real session. See lib/supabase/mintSession.ts
// for how the session itself gets minted with nothing ever emailed/texted.

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

    const minted = await mintSession(email);
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

  const minted = await mintSession(email);
  if ("error" in minted) {
    return NextResponse.json({ error: minted.error }, { status: 500 });
  }

  return NextResponse.json({
    access_token: minted.session.access_token,
    refresh_token: minted.session.refresh_token,
  });
}
