import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

// "Is this phone number already registered?" — used by LoginFlow.tsx to
// power the create-mode "this contact already has an account" notice and
// the sign-in-mode "we don't recognize that number" notice, plus recalling
// a returning member's name so they don't have to retype it. RLS only lets
// a signed-in member read their OWN profiles row, and this has to work
// before anyone is signed in, so it goes through the service-role client —
// deliberately returns only {registered, name}, nothing else from the row.
export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  if (!phone) {
    return NextResponse.json({ error: "missing_phone" }, { status: 400 });
  }

  const admin = createServiceRoleClient();
  const { data } = await admin
    .from("profiles")
    .select("name")
    .eq("phone", phone)
    .maybeSingle();

  return NextResponse.json({ registered: Boolean(data), name: data?.name ?? null });
}
