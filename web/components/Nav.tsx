"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoSVG } from "@/components/LogoSVG";
import { useAuth } from "@/context/AuthContext";

// All nav links in one array so adding a new route only requires a single edit here
const navLinks = [
  { href: "/",           label: "Home",                    sub: "Dashboard",             id: "home"       },
  { href: "/kabaka",     label: "Ssabasajja Kabaka",       sub: "Throne & Queens",       id: "kabaka"     },
  { href: "/abalangira", label: "Abalangira n'Abambejja",  sub: "Royal Clan",            id: "abalangira" },
  { href: "/clans",      label: "Ebika bya Baganda",       sub: "Ebika, Bataka & Court", id: "clans"      },
  { href: "/abakungu",   label: "Abakungu ba Ssaabasajja", sub: "Chiefs & Counties",     id: "abakungu"   },
  { href: "/give",       label: "Give",                    sub: "Busuulu",               id: "give"       },
  { href: "/profile",    label: "Profile",                 sub: "My Account",            id: "profile"    },
];

export function Nav() {
  const pathname = usePathname();
  const { isLoggedIn, login, logout, lang, toggleLang } = useAuth();

  return (
    <nav
      // z-[100] sits above page content; the Footer is no longer fixed, and the Toast (z-[300]) sits above both
      className="fixed top-0 left-0 right-0 z-[100] flex items-center gap-2.5 px-4 border-b-[3px] border-gold"
      style={{ height: "var(--nav-h)", background: "var(--gd)" }}
    >
      {/* Brand logo + name — links back to home */}
      <Link href="/" className="flex items-center gap-2 shrink-0 no-underline">
        <LogoSVG className="w-10 h-10 shrink-0" />
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

      {/* Nav links — overflow-x-auto lets them scroll horizontally on small screens */}
      <div className="flex gap-0.5 flex-1 overflow-x-auto">
        {navLinks.map((link) => {
          // Home "/" uses exact match; all other routes use startsWith so
          // sub-pages (e.g. /clans/mmamba) keep the parent tab highlighted.
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
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

      {/* Right-side controls: language toggle + sign in / user avatar */}
      <div className="flex items-center gap-2 ml-auto shrink-0">
        {/* Language toggle switches between English (EN) and Luganda (LG) */}
        <button
          onClick={toggleLang}
          className="bg-white/10 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-full cursor-pointer tracking-[.5px] hover:bg-white/20 transition-colors"
        >
          {lang === "en" ? "🇬🇧 EN" : "🇺🇬 LG"}
        </button>

        {/* Show avatar + sign-out when logged in; show sign-in button when logged out */}
        {isLoggedIn ? (
          <div className="flex items-center gap-2 text-white text-[13px]">
            {/* Initials avatar — replace with real user photo when auth is live */}
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-bold text-gd text-[13px]">
              MK
            </div>
            <span>Mubbi</span>
            <button
              onClick={logout}
              className="border border-white/30 text-white/60 text-[11px] px-2 py-0.5 rounded cursor-pointer hover:border-white/60 hover:text-white transition-all"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="bg-gold text-gd font-semibold text-[13px] px-4 py-1.5 rounded cursor-pointer whitespace-nowrap hover:bg-gold2 transition-colors"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
