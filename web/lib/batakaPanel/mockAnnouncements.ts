import type { Announcement } from "./types";

// ── Seeded sample announcement ──────────────────────────────────────────────
//
// Was previously a hardcoded "From the Mmamba Clan" card on the home
// dashboard that showed to EVERY member regardless of their own clan — a
// real bug, since clan announcements should only reach that clan's members.
// Converted into real seed data here so the demo isn't empty before any
// officer has posted one via the Bataka Panel (app/batakaPanel/announcements),
// and so it's now properly clan-scoped like every other panel-authored
// announcement.

export function seedAnnouncements(): Announcement[] {
  return [
    {
      id: "seed-ann-1",
      at: "17 Jul 2026",
      clanSlug: "mmamba",
      title: "Annual Mmamba Clan Gathering — Munyonyo",
      body:
        "The annual Mmamba clan gathering at Munyonyo will be held on 20 July 2026 — ahead of the " +
        "Empango celebrations. All Mmamba members are invited. Verified members receive priority registration.",
    },
  ];
}
