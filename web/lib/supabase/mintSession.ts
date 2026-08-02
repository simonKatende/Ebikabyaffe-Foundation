import type { EmailOtpType, Session } from "@supabase/supabase-js";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Mints a real Supabase Auth session for a deterministic synthetic email
// without ever sending a real message — used by both /api/auth/phone-session
// (one account per member, keyed by phone) and /api/batakaPanel/session (one
// account per clan office, keyed by clan slug). admin.generateLink mints a
// one-time link (creating the auth user if it doesn't exist yet), which is
// immediately redeemed server-side via verifyOtp.
//
// Real gotcha #1, found wiring the member flow (phase 1): generateLink
// actually issues a "signup"-typed link the first time it creates a
// brand-new user, and only a genuine "magiclink" link on later calls for an
// existing user — verifyOtp matches its `type` against the token's *stored*
// type (exposed as `verification_type` on the response), so hardcoding
// "magiclink" here fails with a cryptic "otp_expired" error on every
// first-time account creation.
//
// Real gotcha #2, found wiring the panel (phase 2): verifyOtp on a
// service-role client updates THAT CLIENT'S own in-memory session — despite
// persistSession/autoRefreshToken both being false — so every subsequent
// `.from(...)` call on the SAME client instance runs as the newly-minted
// user instead of the service role. That's silently harmless for inserting
// a `profiles` row the new user owns (auth.uid() happens to already equal
// the row being inserted), but it broke provisioning `panel_officers` (no
// self-insert RLS policy — officers aren't meant to grant themselves
// access). This function creates its OWN throwaway client purely for the
// generateLink/verifyOtp dance, so it can never contaminate a caller's own
// service-role client used for privileged table writes afterward.
export async function mintSession(
  email: string
): Promise<{ session: Session } | { error: "auth_error" }> {
  const authClient = createServiceRoleClient();
  const { data: linkData, error: linkError } = await authClient.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (linkError || !linkData) {
    console.error("[mintSession] generateLink failed", linkError);
    return { error: "auth_error" };
  }
  const { data: verifyData, error: verifyError } = await authClient.auth.verifyOtp({
    type: linkData.properties.verification_type as EmailOtpType,
    token_hash: linkData.properties.hashed_token,
  });
  if (verifyError || !verifyData.session) {
    console.error("[mintSession] verifyOtp failed", verifyError);
    return { error: "auth_error" };
  }
  return { session: verifyData.session };
}
