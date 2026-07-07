import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{
          // paddingTop matches the fixed Nav height so page content is never hidden under it
          paddingTop: "var(--nav-h)",
        }}
      >
        {/* Provider order matters: AuthProvider wraps ToastProvider so toast
            callbacks can read auth state if needed in the future. */}
        <AuthProvider>
          <ToastProvider>
            <Nav />
            {/* flex-1 makes <main> absorb all leftover height, which is what
                pushes the (non-fixed) Footer to the bottom on short pages
                without ever letting it overlap content on tall ones. */}
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
