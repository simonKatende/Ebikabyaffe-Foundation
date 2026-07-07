import Link from "next/link";

export type ClanView = "clans" | "bataka" | "kisekwa";

// View switcher directly under the /clans section head — the v3
// ".clans-view-tabs" slot (which held the Clans/Amasaza toggle before Amasaza
// got its own top-level tab). Plain links so each view stays URL-addressable:
// /clans (Ebika grid), /clans?view=bataka (title-led Mutaka cards), and
// /clans?view=kisekwa (the traditional Court of Clans).
export function ClanViewTabs({ active }: { active: ClanView }) {
  const tabs = [
    { key: "clans" as const,   href: "/clans",              label: "🐟 The 56 Ebika · Clans" },
    { key: "bataka" as const,  href: "/clans?view=bataka",  label: "👑 Abataka · Clan Heads" },
    { key: "kisekwa" as const, href: "/clans?view=kisekwa", label: "⚖️ Kooti ya Kisekwa · Court" },
  ];

  return (
    <div
      className="flex overflow-x-auto"
      style={{ background: "var(--gd)", borderTop: "1px solid rgba(255,255,255,.08)" }}
    >
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className="shrink-0 px-[18px] py-2.5 text-[13px] font-medium whitespace-nowrap no-underline transition-all border-b-2"
          style={{
            color:       active === t.key ? "#fff"        : "rgba(255,255,255,.5)",
            borderColor: active === t.key ? "var(--gold)" : "transparent",
          }}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
