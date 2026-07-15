"use client";

import { createContext, useContext, useState, useCallback } from "react";

// Omutaka-verification lifecycle for a member's clan declaration:
//   "none"     → self-declared only (or no clan joined yet)
//   "pending"  → lineage form submitted, waiting for the clan's Omutaka
//   "verified" → confirmed by the Omutaka (mock — real review needs the
//                Bataka panel + backend, Phase 2)
export type VerificationStatus = "none" | "pending" | "verified";

// The lineage declaration a member submits with "Get verified by Omutaka".
// This is sensitive third-party genealogical data — in the real backend it
// must only ever be visible to the member and their own clan's panel officer.
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

// The mock member record for the signed-in user. No backend exists yet — this
// is local-state-only and resets on page reload, same as the rest of the app's
// mocked flows (Give's donation form, HomeDashboard's RSVP button, etc.).
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
}

// Seeded to match the identity that was previously hardcoded across Nav and
// HomeDashboard, so logging in looks the same until the user edits their profile.
const DEFAULT_USER: AppUser = {
  name: "Mubbi Kironde",
  email: "",
  phone: "",
  clanSlug: "mmamba",
  clanVerified: false,
  verification: "none",
  lineage: null,
  saccoMember: false,
  memberSince: "January 2026",
};

interface AuthContextValue {
  isLoggedIn: boolean;
  lang: "en" | "lg";    // "en" = English, "lg" = Luganda
  user: AppUser;
  login: () => void;
  // Phone-OTP sign-in (the /login flow): starts a fresh member record with the
  // details the person typed, rather than the seeded demo identity.
  loginWithPhone: (details: { name: string; phone: string }) => void;
  logout: () => void;
  toggleLang: () => void;
  updateUser: (patch: Partial<AppUser>) => void;
}

// Default context value ensures components can call useAuth() safely even if
// they are rendered outside AuthProvider (e.g. in tests or Storybook).
const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  lang: "en",
  user: DEFAULT_USER,
  login: () => {},
  loginWithPhone: () => {},
  logout: () => {},
  toggleLang: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<"en" | "lg">("en");
  const [user, setUser] = useState<AppUser>(DEFAULT_USER);

  // useCallback gives each function a stable reference so components that
  // receive them as props don't trigger unnecessary re-renders.
  const login  = useCallback(() => setIsLoggedIn(true),  []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  const loginWithPhone = useCallback(
    ({ name, phone }: { name: string; phone: string }) => {
      setUser({
        ...DEFAULT_USER,
        name,
        phone,
        // A genuinely new member: no clan joined yet — they pick one on /profile.
        clanSlug: null,
        memberSince: new Date().toLocaleDateString("en-UG", {
          month: "long",
          year: "numeric",
        }),
      });
      setIsLoggedIn(true);
    },
    []
  );

  // Toggles between English and Luganda each time the language button is pressed
  const toggleLang = useCallback(
    () => setLang((l) => (l === "en" ? "lg" : "en")),
    []
  );

  const updateUser = useCallback(
    (patch: Partial<AppUser>) => setUser((u) => ({ ...u, ...patch })),
    []
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, lang, user, login, loginWithPhone, logout, toggleLang, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook — call useAuth() in any child component instead of
// importing both useContext and AuthContext separately.
export const useAuth = () => useContext(AuthContext);
