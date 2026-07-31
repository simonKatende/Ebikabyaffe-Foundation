import { LoginFlow } from "@/components/auth/LoginFlow";

// /login — phone-first OTP sign-in (frontend mock, no backend yet).
// /login?mode=signin deep-links straight to the "sign in" side of the same
// flow (skips name entry) — same searchParams pattern as /clans?view=bataka.
// /login?clan=<slug> deep-links from a clan page's "Join the {clan} clan"
// button — every account is created already tied to a clan, so create-mode
// refuses to proceed without a valid clan param (see LoginFlow).
// Server page is a thin wrapper delegating to a client Content component,
// same pattern used across all other top-level pages.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string | string[]; clan?: string | string[] }>;
}) {
  const params = await searchParams;
  const modeParam = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const initialMode = modeParam === "signin" ? "signin" : "create";
  const clanParam = Array.isArray(params.clan) ? params.clan[0] : params.clan;
  return <LoginFlow initialMode={initialMode} initialClanSlug={clanParam ?? null} />;
}
