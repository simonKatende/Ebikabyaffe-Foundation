"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  lang: "en" | "lg";    // "en" = English, "lg" = Luganda
  login: () => void;
  logout: () => void;
  toggleLang: () => void;
}

// Default context value ensures components can call useAuth() safely even if
// they are rendered outside AuthProvider (e.g. in tests or Storybook).
const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  lang: "en",
  login: () => {},
  logout: () => {},
  toggleLang: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<"en" | "lg">("en");

  // useCallback gives each function a stable reference so components that
  // receive them as props don't trigger unnecessary re-renders.
  const login  = useCallback(() => setIsLoggedIn(true),  []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  // Toggles between English and Luganda each time the language button is pressed
  const toggleLang = useCallback(
    () => setLang((l) => (l === "en" ? "lg" : "en")),
    []
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, lang, login, logout, toggleLang }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook — call useAuth() in any child component instead of
// importing both useContext and AuthContext separately.
export const useAuth = () => useContext(AuthContext);
