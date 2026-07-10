import { ProfileContent } from "@/components/profile/ProfileContent";

// /profile — the signed-in member's account: identity, clan membership
// (self-declared until verified), Sacco status, and contribution history.
// Server page is a thin wrapper delegating to a client Content component,
// same pattern used across all other top-level pages.
export default function ProfilePage() {
  return <ProfileContent />;
}
