"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getClan } from "@/lib/clans";
import { panelSignOut } from "@/lib/batakaPanel/store";
import type { PanelSession } from "@/lib/batakaPanel/types";
import { cn } from "@/lib/utils";

// The panel's own header + tab bar, visually distinct from the public site so
// an officer always knows they're in the official review area. Rendered by
// app/batakaPanel/layout.tsx around every panel page once signed in.

const TABS = [
  { href: "/batakaPanel", label: "Dashboard" },
  { href: "/batakaPanel/members", label: "Members" },
  { href: "/batakaPanel/businesses", label: "Business Listings" },
  { href: "/batakaPanel/announcements", label: "Announcements" },
];

// Foundation-wide "send to the Foundation" messages — admin-only (no clan
// concept here, unlike every other tab above), so it's appended separately
// rather than living in the shared TABS array a clan officer also renders.
const ADMIN_ONLY_TABS = [{ href: "/batakaPanel/messages", label: "Messages" }];

export function PanelShell({
  session,
  children,
}: {
  session: PanelSession;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const clan = session.clanSlug ? getClan(session.clanSlug) : undefined;

  const title = session.isAdmin
    ? "Foundation Admin Console"
    : `${clan?.name ?? ""} Clan — Office of the ${clan?.clanHead ?? "Omutaka"}`;

  // The officer's and admin's sign-in screens are separate URLs with no
  // cross-link between them (see PanelSignIn.tsx / AdminSignIn.tsx) — so on
  // exit, send each back to their OWN entry point rather than letting the
  // admin land on the clan-officer form they never used to sign in.
  //
  // `panelSignOut()` is awaited before navigating — pushing first and
  // signing out after (or not waiting) races the sign-out's own auth event
  // against the door we're navigating to re-checking the (still briefly
  // stale) session, which can bounce the visitor straight back in here.
  async function handleExit() {
    const wasAdmin = session.isAdmin;
    await panelSignOut();
    if (wasAdmin) router.push("/foundationAdmin");
  }

  return (
    <div className="min-h-[70vh]" style={{ background: "var(--cream)" }}>
      {/* Panel header — dark green, distinct from the public pages */}
      <div className="px-5 py-4" style={{ background: "var(--gd)" }}>
        <div className="max-w-[860px] mx-auto flex items-center gap-3 flex-wrap">
          {/* Foundation brand lockup — appears in this same header on every
              panel page (PanelShell wraps all of them), so an officer/admin
              always sees who the system belongs to, not just the panel's own
              internal name. Links back to the panel's own dashboard. */}
          <Link href="/batakaPanel" className="flex items-center gap-2 shrink-0 no-underline">
            <Image
              src="/logo.png"
              alt="Ebikabyaffe Foundation logo"
              width={32}
              height={29}
              className="w-8 h-[29px] shrink-0 object-contain"
            />
            <div className="text-white leading-tight hidden sm:block">
              <span className="font-serif text-[13px] block">Ebikabyaffe</span>
              <span className="text-gold2 text-[8px] tracking-[1.5px] uppercase block">
                Foundation
              </span>
            </div>
          </Link>
          <span className="w-px h-8 bg-white/20 hidden sm:block" aria-hidden />
          <span className="text-[22px]">{session.isAdmin ? "🏛️" : "🪶"}</span>
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] tracking-[2px] uppercase text-gold2 font-semibold">
              Bataka Panel
            </p>
            <h1 className="font-serif text-[17px] text-white leading-snug">
              {title}
            </h1>
          </div>
          <span className="inline-block text-[9px] font-bold px-2 py-1 rounded bg-gold text-gd tracking-[1px]">
            DEMO — SAMPLE DATA
          </span>
          <button
            onClick={handleExit}
            className="border border-white/30 text-white/70 text-[11px] px-2.5 py-1 rounded cursor-pointer hover:border-white/60 hover:text-white transition-all bg-transparent"
          >
            Exit panel
          </button>
        </div>

        {/* Tab bar */}
        <div className="max-w-[860px] mx-auto flex gap-1.5 mt-3 flex-wrap">
          {[...TABS, ...(session.isAdmin ? ADMIN_ONLY_TABS : [])].map((t) => {
            const active =
              t.href === "/batakaPanel"
                ? pathname === "/batakaPanel"
                : pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  "no-underline text-[12.5px] px-3.5 py-1.5 rounded-full transition-colors",
                  active
                    ? "bg-gold text-gd font-semibold"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-5 py-6">{children}</div>
    </div>
  );
}
