"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { formatE164 } from "@/lib/phoneCountries";

// Omutaka-verification lifecycle for a member's clan declaration:
//   "none"     → self-declared only (or no clan joined yet)
//   "pending"  → lineage form submitted, waiting for the clan's Omutaka
//   "verified" → confirmed by the Omutaka (the demo "simulate approval"
//                link in VerificationCard.tsx until the Bataka Panel is
//                wired to real review — see the s26 handoff/backend plan)
export type VerificationStatus = "none" | "pending" | "verified";

// The lineage declaration a member submits with "Get verified by Omutaka".
// This is sensitive third-party genealogical data — RLS on `lineages`
// restricts every row to its own owner (auth.uid() = profile_id); nothing
// here is ever readable by another member through this client.
export interface Lineage {
  fatherName: string;
  fatherClanSlug: string;   // must equal the member's own clan (patrilineal rule)
  motherName: string;
  motherClanSlug: string;   // must differ from father's clan (exogamy rule)
  grandfatherName?: string; // paternal grandfather — strongest signal for the Omutaka
  grandmotherName?: string;
  ssiga?: string;           // branch, if the member knows it
  village?: string;         // family home village (kyalo/obutaka)
}

// The signed-in member's profile — backed by real Supabase `profiles` (+
// `lineages`) rows as of 2026-08 (see .claude/handoff-2026-07-17-s20.md for
// the session-minting design this implements). Only avatarDataUrl still
// stores a raw data: URL in Postgres rather than object storage — moving it
// to Supabase Storage is separate follow-up work, not this pass.
export interface AppUser {
  name: string;
  email: string;
  phone: string;
  // Which of the 56 clans (see lib/clans.ts) the member has joined — null until chosen.
  clanSlug: string | null;
  // Mirrors the "SELF-DECLARED" vs Kingdom-verified badge already used on the
  // HomeDashboard clan card — changing clan always resets this to false.
  clanVerified: boolean;
  // Omutaka-verification state + the submitted lineage declaration. Kept in
  // sync with clanVerified: status "verified" ⇒ clanVerified true.
  verification: VerificationStatus;
  lineage: Lineage | null;
  // Whether the member has paid the Sacco's one-time UGX 10,000 membership fee.
  saccoMember: boolean;
  memberSince: string; // display string, e.g. "January 2026"
  // Profile picture, set from /profile after registration — a data: URL
  // read straight from the chosen file (no upload backend yet, same pattern
  // as the business listing photo in BusinessListingCard). Undefined until
  // the member sets one; the initials avatar is the fallback everywhere.
  avatarDataUrl?: string;
}

// Placeholder shown while signed out / before the session bootstrap
// resolves. Components should gate on `isLoggedIn`, not on this shape.
const SIGNED_OUT_USER: AppUser = {
  name: "",
  email: "",
  phone: "",
  clanSlug: null,
  clanVerified: false,
  verification: "none",
  lineage: null,
  saccoMember: false,
  memberSince: "",
};

interface AuthContextValue {
  isLoggedIn: boolean;
  lang: "en" | "lg";    // "en" = English, "lg" = Luganda
  user: AppUser;
  // Phone-OTP sign-in (the /login flow). phoneE164 is the canonical
  // "+2567…" identity used for the real Supabase account; clanSlug present
  // ⇒ create a new account (every account is created already joined to a
  // clan); clanSlug omitted ⇒ sign in to an existing one.
  loginWithPhone: (details: {
    name: string;
    phoneE164: string;
    clanSlug?: string;
  }) => Promise<void>;
  logout: () => void;
  toggleLang: () => void;
  updateUser: (patch: Partial<AppUser>) => void;
}

// Default context value ensures components can call useAuth() safely even if
// they are rendered outside AuthProvider (e.g. in tests or Storybook).
const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  lang: "en",
  user: SIGNED_OUT_USER,
  loginWithPhone: async () => {},
  logout: () => {},
  toggleLang: () => {},
  updateUser: () => {},
});

type Supabase = ReturnType<typeof createClient>;

interface ProfileRow {
  name: string;
  phone: string;
  email: string | null;
  clan_slug: string | null;
  clan_verified: boolean;
  verification_status: string;
  sacco_member: boolean;
  member_since: string;
  avatar_data_url: string | null;
}

interface LineageRow {
  father_name: string;
  father_clan_slug: string;
  mother_name: string;
  mother_clan_slug: string;
  grandfather_name: string | null;
  grandmother_name: string | null;
  ssiga: string | null;
  village: string | null;
}

function mapToAppUser(profile: ProfileRow, lineageRow: LineageRow | null): AppUser {
  return {
    name: profile.name,
    email: profile.email ?? "",
    phone: formatE164(profile.phone),
    clanSlug: profile.clan_slug,
    clanVerified: profile.clan_verified,
    verification: (profile.verification_status as VerificationStatus) ?? "none",
    lineage: lineageRow
      ? {
          fatherName: lineageRow.father_name,
          fatherClanSlug: lineageRow.father_clan_slug,
          motherName: lineageRow.mother_name,
          motherClanSlug: lineageRow.mother_clan_slug,
          grandfatherName: lineageRow.grandfather_name ?? undefined,
          grandmotherName: lineageRow.grandmother_name ?? undefined,
          ssiga: lineageRow.ssiga ?? undefined,
          village: lineageRow.village ?? undefined,
        }
      : null,
    saccoMember: profile.sacco_member,
    memberSince: new Date(profile.member_since).toLocaleDateString("en-UG", {
      month: "long",
      year: "numeric",
    }),
    avatarDataUrl: profile.avatar_data_url ?? undefined,
  };
}

// Background, best-effort write-through for updateUser()'s optimistic local
// update — matches the mapping web/supabase/migrations' comments were
// explicitly written to support. A failure here is console.error'd, not
// surfaced with new UI machinery: there's no payment/data-loss risk in a
// profile-field write that a member can just retry by editing again.
async function persistPatch(supabase: Supabase, patch: Partial<AppUser>) {
  const {
    data: { session },
  } = await supabase.auth.getSession(); // local read, no network round-trip
  if (!session) return;
  const userId = session.user.id;

  const profilePatch: Record<string, unknown> = {};
  if ("name" in patch) profilePatch.name = patch.name;
  if ("email" in patch) profilePatch.email = patch.email;
  if ("clanSlug" in patch) profilePatch.clan_slug = patch.clanSlug;
  if ("clanVerified" in patch) profilePatch.clan_verified = patch.clanVerified;
  if ("saccoMember" in patch) profilePatch.sacco_member = patch.saccoMember;
  if ("avatarDataUrl" in patch) profilePatch.avatar_data_url = patch.avatarDataUrl ?? null;
  if ("verification" in patch) profilePatch.verification_status = patch.verification;

  if (Object.keys(profilePatch).length > 0) {
    const { error } = await supabase.from("profiles").update(profilePatch).eq("id", userId);
    if (error) console.error("[AuthContext] profile update failed", error);
  }

  if ("lineage" in patch) {
    if (patch.lineage === null) {
      // Clan-change reset (ProfileContent.tsx) — the lineages_delete_own
      // policy exists specifically for this.
      const { error } = await supabase.from("lineages").delete().eq("profile_id", userId);
      if (error) console.error("[AuthContext] lineage delete failed", error);
    } else if (patch.lineage) {
      const l = patch.lineage;
      const { error } = await supabase.from("lineages").upsert(
        {
          profile_id: userId,
          father_name: l.fatherName,
          father_clan_slug: l.fatherClanSlug,
          mother_name: l.motherName,
          mother_clan_slug: l.motherClanSlug,
          grandfather_name: l.grandfatherName ?? null,
          grandmother_name: l.grandmotherName ?? null,
          ssiga: l.ssiga ?? null,
          village: l.village ?? null,
          status: "pending",
          decided_at: null,
          decision_note: null,
        },
        { onConflict: "profile_id" }
      );
      if (error) console.error("[AuthContext] lineage upsert failed", error);
    }
  } else if (patch.verification) {
    // verification changed without a new lineage payload — e.g. the demo
    // "simulate approval" link. Mirror it into lineages.status too, per
    // migration 3's own comment: "Verify flips both this column and
    // profiles.verification_status together."
    const { error } = await supabase
      .from("lineages")
      .update({
        status: patch.verification,
        decided_at: patch.verification === "verified" ? new Date().toISOString() : null,
      })
      .eq("profile_id", userId);
    if (error) console.error("[AuthContext] lineage status sync failed", error);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<"en" | "lg">("en");
  const [user, setUser] = useState<AppUser>(SIGNED_OUT_USER);
  // createClient() memoizes its own instance at the module level (see
  // lib/supabase/client.ts) — calling it again just returns that same
  // instance, so there's no need for a ref here (this repo's lint config
  // blocks reading a ref's value during render anyway).
  const supabase = createClient();

  // The ONLY place this provider reacts to session state. Deliberately just
  // a subscription — no separate getSession()-then-setState call — because
  // this repo's react-hooks/set-state-in-effect rule rejects an effect body
  // that synchronously chains into setState, and onAuthStateChange already
  // fires once immediately with whatever session exists on mount, so one
  // subscription covers initial load, sign-in (via setSession, below), and
  // sign-out alike. See .claude/handoff-2026-07-17-s20.md.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (!session) {
        setUser(SIGNED_OUT_USER);
        setIsLoggedIn(false);
        return;
      }
      Promise.all([
        supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle(),
        supabase.from("lineages").select("*").eq("profile_id", session.user.id).maybeSingle(),
      ]).then(([{ data: profile }, { data: lineageRow }]) => {
        if (!profile) {
          // Session exists but no profile row — shouldn't normally happen
          // (account creation inserts it atomically) — treat as signed out
          // rather than rendering with missing fields.
          setUser(SIGNED_OUT_USER);
          setIsLoggedIn(false);
          return;
        }
        setUser(mapToAppUser(profile as ProfileRow, lineageRow as LineageRow | null));
        setIsLoggedIn(true);
      });
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const loginWithPhone = useCallback(
    async ({ name, phoneE164, clanSlug }: { name: string; phoneE164: string; clanSlug?: string }) => {
      const res = await fetch("/api/auth/phone-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          clanSlug !== undefined
            ? { mode: "create", phoneE164, name, clanSlug }
            : { mode: "signin", phoneE164 }
        ),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body?.error === "string" ? body.error : "sign_in_failed");
      }
      const { access_token, refresh_token } = await res.json();
      // Sets the session (persisted via cookies by @supabase/ssr) AND fires
      // onAuthStateChange above with a SIGNED_IN event — that's what
      // actually populates `user`/`isLoggedIn`.
      const { error } = await supabase.auth.setSession({ access_token, refresh_token });
      if (error) throw error;
    },
    [supabase]
  );

  const logout = useCallback(() => {
    void supabase.auth.signOut();
  }, [supabase]);

  // Toggles between English and Luganda each time the language button is pressed
  const toggleLang = useCallback(
    () => setLang((l) => (l === "en" ? "lg" : "en")),
    []
  );

  const updateUser = useCallback(
    (patch: Partial<AppUser>) => {
      setUser((u) => ({ ...u, ...patch }));
      void persistPatch(supabase, patch);
    },
    [supabase]
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, lang, user, loginWithPhone, logout, toggleLang, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook — call useAuth() in any child component instead of
// importing both useContext and AuthContext separately.
export const useAuth = () => useContext(AuthContext);
