"use client";

import { useAuth } from "@/context/AuthContext";
import { HomeLanding } from "@/components/home/HomeLanding";
import { HomeDashboard } from "@/components/home/HomeDashboard";

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  // Show the full marketing landing page to visitors; switch to the personalised
  // dashboard once the user is signed in
  return isLoggedIn ? <HomeDashboard /> : <HomeLanding />;
}
