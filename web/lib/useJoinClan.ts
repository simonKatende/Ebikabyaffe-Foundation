"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { getClan } from "@/lib/clans";

// ── Shared "Join the {clan} clan" click handler ──────────────────────────────
//
// Used by every clan detail page's "Join the {clan} clan" / "Join your clan"
// buttons (GenericClanDetail, MmambaDetail, LugaveDetail). Every account is
// permanently attached to one clan at creation (see LoginFlow + the profile
// page's locked clan card) — a signed-in member can never actually join a
// clan through this button, so it must never send them back through the
// create-account flow. Previously it did exactly that regardless of login
// state, which is the bug this hook fixes.
export function useJoinClan() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();

  return function joinClan(clanSlug: string, clanName: string) {
    if (!isLoggedIn) {
      // Not signed in — this is a genuine new-account entry point.
      router.push(`/login?clan=${clanSlug}`);
      return;
    }
    if (user.clanSlug === clanSlug) {
      toast(`You're already a member of the ${clanName} clan.`);
      return;
    }
    const currentClanName = user.clanSlug ? getClan(user.clanSlug)?.name : null;
    if (currentClanName) {
      toast(`You can't join this clan since you're already attached to the ${currentClanName} clan.`);
    } else {
      // Signed in but no clan attached (shouldn't normally happen — every
      // account is created already joined to one — but the mock sign-in
      // flow doesn't restore a returning member's clan, so this is the
      // escape hatch). Send them to attach one properly on /profile rather
      // than back through account creation.
      router.push("/profile");
    }
  };
}
