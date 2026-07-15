"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

// All nav links in one array so adding a new route only requires a single edit here
const navLinks = [
  { href: "/",           label: "Home",                    sub: "Dashboard",             id: "home"       },
  { href: "/kabaka",     label: "Ssabasajja Kabaka",       sub: "Throne & Queens",       id: "kabaka"     },
  { href: "/abalangira", label: "Abalangira n'Abambejja",  sub: "Royal Clan",            id: "abalangira" },
  { href: "/clans",      label: "Ebika bya Baganda",       sub: "Ebika, Bataka & Court", id: "clans"      },
  { href: "/abakungu",   label: "Abakungu ba Ssaabasajja", sub: "Chiefs & Counties",     id: "abakungu"   },
  { href: "/give",       label: "Contribution",            sub: "Support",               id: "give"       },
  { href: "/profile",    label: "Profile",                 sub: "My Account",            id: "profile"    },
];

function isLinkActive(pathname: string, href: string) {
  // Home "/" uses exact match; all other routes use startsWith so
  // sub-pages (e.g. /clans/mmamba) keep the parent tab highlighted.
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// Hamburger toggle + dropdown panel, mobile only. Keyed by pathname from the
// parent so navigating anywhere remounts it with menuOpen reset to false —
// this repo's lint config forbids both setState-in-effect and reading refs
// during render, which rules out the usual "sync state to a changing prop"
// patterns, so a remount-on-key is the compliant way to reset on route change.
function MobileMenu({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on Escape or a click/tap outside the hamburger + dropdown
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  return (
    <div ref={wrapRef} className="contents">
      {/* Hamburger toggle — fills the space the tab row occupies on md+ */}
      <div className="flex md:hidden flex-1 justify-end">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="text-white p-2 -mr-1 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Dropdown menu — list of all nav tabs, shown below the bar when the hamburger is open */}
      {menuOpen && (
        <div
          className="md:hidden fixed left-0 right-0 z-[100] border-t border-white/10 shadow-xl overflow-y-auto"
          style={{
            top: "var(--nav-h)",
            maxHeight: "calc(100vh - var(--nav-h))",
            background: "var(--gd)",
          }}
        >
          <div className="flex flex-col py-2">
            {navLinks.map((link) => {
              const isActive = isLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "px-5 py-3 text-[15px] no-underline border-l-4 transition-colors leading-tight",
                    isActive
                      ? "bg-white/[.12] text-white border-gold"
                      : "text-white/75 border-transparent hover:bg-white/[.08] hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                  <span className="block text-[10px] tracking-[.5px] uppercase mt-0.5 opacity-50">
                    {link.sub}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const { isLoggedIn, logout, lang, toggleLang, user } = useAuth();

  // Initials for the avatar circle, e.g. "Mubbi Kironde" -> "MK"
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const firstName = user.name.split(" ")[0];

  return (
    <nav
      // z-[100] sits above page content; the Footer is no longer fixed, and the Toast (z-[300]) sits above both
      className="fixed top-0 left-0 right-0 z-[100] flex items-center gap-2.5 px-4 border-b-[3px] border-gold"
      style={{ height: "var(--nav-h)", background: "var(--gd)" }}
    >
      {/* Brand logo + name — links back to home */}
      <Link href="/" className="flex items-center gap-2 shrink-0 no-underline">
        {/* Real Foundation logo (web/public/logo.png, 1200×1085 export) —
            replaced the LogoSVG placeholder 2026-07 */}
        <Image
          src="/logo.png"
          alt="Ebikabyaffe Foundation logo"
          width={44}
          height={40}
          priority
          className="w-11 h-10 shrink-0 object-contain"
        />
        <div className="text-white font-normal leading-tight">
          <span className="font-serif text-sm">Ebikabyaffe</span>
          <span className="block text-gold2 text-[10px] tracking-[2px] uppercase">
            Foundation
          </span>
          <span className="block text-gold font-serif italic text-[9px] opacity-80">
            Agali awamu
          </span>
        </div>
      </Link>

      {/* Nav links — full tab row on md+ screens, hidden on mobile in favor of the hamburger menu */}
      <div className="hidden md:flex gap-0.5 flex-1 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive = isLinkActive(pathname, link.href);
          return (
            <Link
              key={link.id}
              href={link.href}
              className={[
                "text-[13px] px-[11px] py-1.5 rounded whitespace-nowrap shrink-0 transition-all no-underline leading-tight",
                isActive
                  ? "bg-white/[.12] text-white border-b-2 border-gold"
                  : "text-white/65 hover:bg-white/[.08] hover:text-white",
              ].join(" ")}
            >
              {link.label}
              <span className="block text-[9px] tracking-[.5px] uppercase mt-0.5 opacity-50">
                {link.sub}
              </span>
            </Link>
          );
        })}
      </div>

      <MobileMenu key={pathname} pathname={pathname} />

      {/* Right-side controls: language toggle + sign in / user avatar */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Language toggle switches between English (EN) and Luganda (LG) */}
        <button
          onClick={toggleLang}
          className="bg-white/10 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-full cursor-pointer tracking-[.5px] hover:bg-white/20 transition-colors"
        >
          {lang === "en" ? "🇬🇧 EN" : "🇺🇬 LG"}
        </button>

        {/* Show avatar + sign-out when logged in; show sign-in button when logged out */}
        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-white text-[13px] no-underline"
            >
              {/* Initials avatar — replace with real user photo when auth is live */}
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-bold text-gd text-[13px]">
                {initials}
              </div>
              <span>{firstName}</span>
            </Link>
            <button
              onClick={logout}
              className="border border-white/30 text-white/60 text-[11px] px-2 py-0.5 rounded cursor-pointer hover:border-white/60 hover:text-white transition-all"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-gold text-gd font-semibold text-[13px] px-4 py-1.5 rounded cursor-pointer whitespace-nowrap hover:bg-gold2 transition-colors no-underline"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
