import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";

// Static metadata injected into <head> by Next.js for SEO and browser tab title
export const metadata: Metadata = {
  title: "Ebikabyaffe Foundation",
  description:
    "56 Buganda clans. 18 Amasaza. One foundation. Discover your clan, your roots, your people.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col antialiased">
        {/* Provider order matters: AuthProvider wraps ToastProvider so toast
            callbacks can read auth state if needed in the future. */}
        <AuthProvider>
          <ToastProvider>
            {/* SiteChrome decides whether the public Nav/Footer render at
                all — the Bataka Panel and Foundation Admin routes get none,
                since they're their own internal system with their own
                sign-in screens and header (see SiteChrome.tsx). flex-1 on
                its <main> absorbs leftover height, pushing the (non-fixed)
                Footer to the bottom on short pages without overlapping
                content on tall ones. */}
            <SiteChrome>{children}</SiteChrome>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
