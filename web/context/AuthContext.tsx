"use client";

import { createContext, useContext, useState, useCallback } from "react";

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
  saccoMember: false,
  memberSince: "January 2026",
};

interface AuthContextValue {
  isLoggedIn: boolean;
  lang: "en" | "lg";    // "en" = English, "lg" = Luganda
  user: AppUser;
  login: () => void;
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
    <AuthContext.Provider value={{ isLoggedIn, lang, user, login, logout, toggleLang, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook — call useAuth() in any child component instead of
// importing both useContext and AuthContext separately.
export const useAuth = () => useContext(AuthContext);
