import { LoginFlow } from "@/components/auth/LoginFlow";

// /login — phone-first OTP sign-in (frontend mock, no backend yet).
// /login?mode=signin deep-links straight to the "sign in" side of the same
// flow (skips name entry) — same searchParams pattern as /clans?view=bataka.
// Server page is a thin wrapper delegating to a client Content component,
// same pattern used across all other top-level pages.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string | string[] }>;
}) {
  const params = await searchParams;
  const modeParam = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const initialMode = modeParam === "signin" ? "signin" : "create";
  return <LoginFlow initialMode={initialMode} />;
}
