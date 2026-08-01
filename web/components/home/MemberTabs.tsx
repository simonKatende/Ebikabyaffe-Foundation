"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// A member's two "home base" views — Dashboard (the personalised home page)
// and Profile — get their own small tab bar, the same idea as the Bataka
// Panel's own Dashboard/Members/etc. tab bar (PanelShell.tsx), so a signed-in
// member can flip between the two without going back through the full main
// nav. Rendered at the top of both HomeDashboard and ProfileContent.
const TABS = [
  { href: "/", label: "🏠 Dashboard" },
  { href: "/profile", label: "👤 Profile" },
];

export function MemberTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1.5 mb-5 flex-wrap">
      {TABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "no-underline text-[13px] font-medium px-4 py-2 rounded-full border transition-colors",
              active
                ? "bg-gd text-white border-gd"
                : "bg-white text-gd border-eborder hover:border-gold"
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
