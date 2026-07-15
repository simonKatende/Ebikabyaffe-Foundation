import { LoginFlow } from "@/components/auth/LoginFlow";

// /login — phone-first OTP sign-in (frontend mock, no backend yet).
// Server page is a thin wrapper delegating to a client Content component,
// same pattern used across all other top-level pages.
export default function LoginPage() {
  return <LoginFlow />;
}
