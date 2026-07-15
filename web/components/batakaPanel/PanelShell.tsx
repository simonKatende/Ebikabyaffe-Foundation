"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/batakaPanel/announcements", label: "Announcements" },
];

export function PanelShell({
  session,
  children,
}: {
  session: PanelSession;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const clan = session.clanSlug ? getClan(session.clanSlug) : undefined;

  const title = session.isAdmin
    ? "Foundation Admin Console"
    : `${clan?.name ?? ""} Clan — Office of the ${clan?.clanHead ?? "Omutaka"}`;

  return (
    <div className="min-h-[70vh]" style={{ background: "var(--cream)" }}>
      {/* Panel header — dark green, distinct from the public pages */}
      <div className="px-5 py-4" style={{ background: "var(--gd)" }}>
        <div className="max-w-[860px] mx-auto flex items-center gap-3 flex-wrap">
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
            onClick={panelSignOut}
            className="border border-white/30 text-white/70 text-[11px] px-2.5 py-1 rounded cursor-pointer hover:border-white/60 hover:text-white transition-all bg-transparent"
          >
            Exit panel
          </button>
        </div>

        {/* Tab bar */}
        <div className="max-w-[860px] mx-auto flex gap-1.5 mt-3 flex-wrap">
          {TABS.map((t) => {
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
