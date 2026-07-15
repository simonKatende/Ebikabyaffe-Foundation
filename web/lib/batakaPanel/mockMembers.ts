import { clans } from "@/lib/clans";
import type { PanelMember, MemberStatus } from "./types";

// ── Seeded sample members for the panel demo ────────────────────────────────
//
// Every clan gets 3–6 deterministic sample members so the demo works no
// matter which clan the user signs in as. All names are fictional sample
// data — none of these are real people. Generation is deterministic (seeded
// from the clan slug) so the server and client render identical data (the
// store is read via useSyncExternalStore during SSR).

const FIRST_NAMES = [
  "Ronald", "Sarah", "Peter", "Grace", "Joseph", "Maria", "David", "Ruth",
  "Samuel", "Betty", "Frank", "Agnes", "Moses", "Joyce", "Henry", "Edith",
];

const SURNAMES = [
  "Kaggwa", "Namutebi", "Ssentongo", "Nabatanzi", "Lubega", "Nansubuga",
  "Kizza", "Namuli", "Ssemwogerere", "Nakintu", "Mukasa", "Nabukenya",
];

const VILLAGES = [
  "Kyengera", "Nateete", "Buddo", "Kikyusa", "Mityana", "Masaka",
  "Nakaseke", "Mpigi", "Kayunga", "Bombo",
];

const DATES = [
  "02 Jun 2026", "11 Jun 2026", "19 Jun 2026", "27 Jun 2026",
  "03 Jul 2026", "08 Jul 2026", "12 Jul 2026", "14 Jul 2026",
];

// Status mix per clan — first entries always pending so every clan's queue
// has something actionable in the demo.
const STATUS_CYCLE: MemberStatus[] = [
  "pending", "pending", "verified", "registered", "info_requested", "declined",
];

// Small deterministic hash so each clan gets a stable but varied roster.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function seedMembers(): PanelMember[] {
  const members: PanelMember[] = [];
  const slugs = clans.map((c) => c.slug);

  for (const clan of clans) {
    const h = hash(clan.slug);
    const count = 3 + (h % 4); // 3–6 members per clan

    for (let i = 0; i < count; i++) {
      const status = STATUS_CYCLE[(h + i) % STATUS_CYCLE.length];
      const first = FIRST_NAMES[(h + i * 7) % FIRST_NAMES.length];
      const surname = SURNAMES[(h + i * 5) % SURNAMES.length];
      const fatherFirst = FIRST_NAMES[(h + i * 3 + 4) % FIRST_NAMES.length];
      const motherFirst = FIRST_NAMES[(h + i * 11 + 9) % FIRST_NAMES.length];
      const motherSurname = SURNAMES[(h + i * 13 + 3) % SURNAMES.length];
      // Mother's clan must differ from the member's clan (exogamy) — pick a
      // deterministic other clan.
      const motherClanSlug =
        slugs[(slugs.indexOf(clan.slug) + 1 + ((h + i) % (slugs.length - 1))) %
          slugs.length];
      const date = DATES[(h + i * 2) % DATES.length];
      const hasLineage = status !== "registered";

      members.push({
        id: `${clan.slug}-${i + 1}`,
        fullName: `${surname} ${first}`,
        phone: `07${(72 + ((h + i) % 8)).toString()}${String((h * (i + 3)) % 1000000).padStart(6, "0")}`,
        clanSlug: clan.slug,
        memberSince: date,
        status,
        lineage: hasLineage
          ? {
              fatherName: `${surname} ${fatherFirst}`,
              fatherClanSlug: clan.slug,
              motherName: `${motherSurname} ${motherFirst}`,
              motherClanSlug,
              grandfatherName:
                (h + i) % 3 === 0 ? undefined : `${surname} ${FIRST_NAMES[(h + i * 17) % FIRST_NAMES.length]}`,
              ssiga: (h + i) % 4 === 0 ? "Essiga not yet known" : undefined,
              village: VILLAGES[(h + i * 3) % VILLAGES.length],
            }
          : null,
        submittedAt: hasLineage ? date : null,
        decidedAt:
          status === "verified" || status === "declined" || status === "info_requested"
            ? DATES[(h + i * 2 + 3) % DATES.length]
            : null,
        decisionNote:
          status === "declined"
            ? "Lineage details could not be matched to any known family line — invited to contact the clan office."
            : status === "info_requested"
              ? "Please provide your paternal grandfather's name and your family's essiga if known."
              : null,
      });
    }
  }

  return members;
}
