import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { mintSession } from "@/lib/supabase/mintSession";
import { checkClanPassword, checkAdminPassword } from "@/lib/batakaPanel/passwords";

// Mints a real Supabase Auth session for a CLAN OFFICE, not a named person —
// one shared account per clan (56) plus one for the Foundation admin, per
// the access model agreed with the user: keep per-clan-office credentials
// (lib/batakaPanel/passwords.ts already has 56 distinct clan passwords + 1
// admin password), but stop checking them in the client bundle where any
// visitor can read all 57 in devtools. This route is now the ONLY importer
// of passwords.ts — Next.js excludes server-only route-handler code from
// the client bundle, which is what actually fixes that.
//
// Accounts are created lazily on first successful login (no big upfront
// seed script) — see the matching panel_officers row ensured below. The
// session-minting itself reuses lib/supabase/mintSession.ts, the exact
// tested logic already proven for member phone sign-in.

interface OfficerBody {
  clanSlug: string;
  password: string;
}

interface AdminBody {
  isAdmin: true;
  password: string;
}

function officerEmail(clanSlug: string): string {
  return `officer-${clanSlug}@panel.ebikabyaffe.internal`;
}

const ADMIN_EMAIL = "admin@panel.ebikabyaffe.internal";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as OfficerBody | AdminBody | null;
  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const isAdminRequest = "isAdmin" in body && body.isAdmin === true;

  if (isAdminRequest) {
    if (!checkAdminPassword(body.password)) {
      return NextResponse.json({ error: "wrong_password" }, { status: 401 });
    }
  } else {
    const officerBody = body as OfficerBody;
    if (!officerBody.clanSlug || !checkClanPassword(officerBody.clanSlug, body.password)) {
      return NextResponse.json({ error: "wrong_password" }, { status: 401 });
    }
  }

  const admin = createServiceRoleClient();
  const email = isAdminRequest ? ADMIN_EMAIL : officerEmail((body as OfficerBody).clanSlug);

  const minted = await mintSession(email);
  if ("error" in minted) {
    return NextResponse.json({ error: minted.error }, { status: 500 });
  }

  const userId = minted.session.user.id;
  const { data: existingOfficer } = await admin
    .from("panel_officers")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existingOfficer) {
    const { error: insertError } = await admin.from("panel_officers").insert(
      isAdminRequest
        ? { user_id: userId, is_admin: true, clan_slug: null }
        : { user_id: userId, is_admin: false, clan_slug: (body as OfficerBody).clanSlug }
    );
    if (insertError) {
      console.error("[batakaPanel/session] panel_officers insert failed", insertError);
      return NextResponse.json({ error: "officer_provision_error" }, { status: 500 });
    }
  }

  return NextResponse.json({
    access_token: minted.session.access_token,
    refresh_token: minted.session.refresh_token,
  });
}
