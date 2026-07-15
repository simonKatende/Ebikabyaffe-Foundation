// ─────────────────────────────────────────────────────────────────────────────
// BATAKA — per-title status and notes for the /bataka page.
// Source: "The Bataka of Buganda — Clan Heads of the 56 Ebika" (compiled from
// the Buganda Kingdom clan directory, the 1996 46-clan roster, and press
// coverage). Titles/holders/seats themselves live in clans.ts; this file adds
// the Bataka-specific layer: how solidly each headship is documented, plus
// the notable history attached to individual offices.
//
// This is a living record — headships change through death, succession
// disputes, and installation by the clan council. "disputed" entries are
// snapshots of open questions, not settled facts.
// ─────────────────────────────────────────────────────────────────────────────

// confirmed   = Kingdom records / credible press name a living titleholder
// disputed    = vacant, contested, or conflicting names across sources
// unconfirmed = title + seat documented, current holder not yet verified
export type BatakaStatus = "confirmed" | "disputed" | "unconfirmed";

// The 30 clans whose current Omutaka is named in Kingdom records or press
const CONFIRMED = new Set<string>([
  "ffumbe", "kiwere", "lugave", "lukato", "mazzi-ga-kisasi", "mbogo", "mbwa",
  "mmamba", "mmamba-kakoboza", "mpeewo", "mpindi", "mpologoma", "musu",
  "mutima-musagi", "mutima-muyanja", "ndiga", "nnakinsige", "nnamungoona",
  "ndiisa", "ngabi", "ngeye", "njaza", "njobe", "njovu", "nkejje", "nkula",
  "nkusu", "nsuma", "nswaswa", "ntalaganya", "nte",
]);

// The 3 headships that are genuinely unsettled right now
const DISPUTED = new Set<string>(["nkima", "nseenene", "nvubu"]);

export function getBatakaStatus(slug: string): BatakaStatus {
  if (CONFIRMED.has(slug)) return "confirmed";
  if (DISPUTED.has(slug)) return "disputed";
  return "unconfirmed";
}

// Display metadata per status — label + badge colours used on the Mutaka cards
export const BATAKA_STATUS_META: Record<
  BatakaStatus,
  { label: string; bg: string; text: string }
> = {
  confirmed:   { label: "Confirmed holder",   bg: "#1a3d2b", text: "#52b788" },
  disputed:    { label: "Disputed / vacant",  bg: "#6b2f00", text: "#f4c66a" },
  unconfirmed: { label: "Being documented",   bg: "#3d3d3d", text: "#cccccc" },
};

// Office-specific history and succession notes, keyed by clan slug.
// Only offices with something notable recorded in the compilation.
export const batakaNotes: Record<string, string> = {
  ffumbe:
    "One of the original Bannansangwa clan offices. The Walusimbi's clan were historically the Kabaka's medicine men, and formally receive and 'accept' each new Kabaka at the Buddo coronation site. The clan also sheltered the Njovu clan under a blood-brotherhood pact after the overthrow of the Njovu-descended king Kagulu — the two clans still share some names today.",
  kiwere:
    "The previous Luwonko, James Mbaale Zzamuwanga, has died; his son Alexander Basajjabaka Sserwadda was presented to the Katikkiro as the new head of the clan (per bugandauk.com reporting).",
  lugave:
    "The Ndugwa was historically the first among the Bataka to be consulted and to speak before the Kabaka. Succession is decided by the clan council — see the full Lugave archive page for the 17 Amasiga, 6 royal Emituba, and succession history. Note: per the clan's own 2021 archive, Grace Ssemakula announced his retirement as Ndugwa in December 2017 and named Fred Katende Kyekango to succeed him, but the amasiga heads contested the manner of the nomination and the installation stalled after the convener of the Bataka Council intervened — treat the headship as Kingdom-recognised but the succession as unresolved within the clan.",
  lukato:
    "Unusual in having two co-recognised titleholders — Magunda and Lyongera — rather than a single Omutaka, per Kingdom records.",
  mbogo:
    "The Kayiira Gaajuule's clan physically carries the new Kabaka on their shoulders during the coronation rite known as okukongojja — a role tracing back to the reign of Ssekabaka Kimera.",
  mmamba:
    "The Gabunga is the traditional admiral of the Kabaka's royal canoe fleet on Lake Victoria — one of the most storied offices in the kingdom, dating to the era of the naval campaigns against Buvuma. A succession dispute over the title ran for roughly twelve years before Kooti ya Kisekwa, which ruled in 2025 that the late 36th Gabunga, Yosiya Kasozi, had named James Mubiru (Gabunga Mubiru Zziikwa) as his successor, confirming him as the 38th Gabunga and clearing the clan's leadership committee of wrongdoing.",
  "mmamba-kakoboza":
    "The Nnankere lineage is historically tied to royal marriage rites, having supplied wives to several Kabakas.",
  mpologoma:
    "Wilson Ndawula Namuguzi Ssebuganda, the previous Ssebuganda Namuguzi, died in August 2024 at age 50; his son Erukaana Lukanga was installed as the clan's 35th head the same month. Clan leaders have since asked Mengo to help resolve a separate, ongoing land dispute over the clan's ancestral site at Lwadda.",
  ndiga:
    "A headship dispute said to have persisted for roughly 487 years was resolved by Kooti ya Kisekwa in 2020: the court nullified the headship of Daniel Bbosa after finding he was not descended from the clan's rightful line and had sold off clan land, and installed Luggya Bbosa Tabula — a documented descendant of the founding lineage — as Lwomwa. Bbosa was later killed in 2024 amid continuing fallout from the dispute, and a suspect connected to the rival claimant's side was subsequently arrested.",
  ndiisa:
    "Older (1996) Kingdom records list this title as 'Mulindwa' rather than 'Kaliika' for the same seat — the title in current use may reflect a later succession.",
  ngeye:
    "The Kasujja headship has seen a long-running succession dispute — described in some accounts as stretching back roughly 96 years — that flared again after the previous Kasujja, F.X. Kasule Kyesimba, died in 2004: the installation of his heir was contested for years by a rival lineage through the Kisekwa clan court. The dispute reached the Kabaka on appeal and was ruled on in 2016 — a new Kasujja was to be selected from the correct sub-clan (Mutuba), after which the case was suspended indefinitely, consistent with current Kingdom records naming Kasujja Kyesimba Kakande Kibirige Sheba as the confirmed titleholder.",
  nkejje:
    "An older (2007) press report described some Nkejje clan members disowning the clan's leader over a dispute about his origin and clan membership. We have not found more recent reporting confirming whether this was resolved — treat the current headship as Kingdom-recognised but historically contested, not a fully settled matter.",
  njobe:
    "Older (1996) Kingdom records list the title for this seat as 'Kiyise' rather than 'Ssenjobe'.",
  njovu:
    "The Mukalo's clan was traditionally responsible for tending the Kabaka's cattle, and shares a historic blood-pact with the Ffumbe clan.",
  nkima:
    "One of the kingdom's most significant offices: Mugema — 'the great immunizer' — is credited with saving the infant Ssekabaka Kimera, making the Nkima clan the traditional godfathers of Buganda's kings. The office is currently vacant/unclear: the last confirmed Mugema, Tamale Joseph Bwoya, died in November 2023 and a successor has not been independently confirmed.",
  nkusu:
    "Does not appear on the Kingdom's 1996-era 46-clan roster despite being currently recognised — the office's records are comparatively recent.",
  nseenene:
    "Genuinely unresolved: sources give at least three different names for this headship — 'Kalibbala' (reference list), 'Mugalula' (1996 Kingdom roster), and 'Kajubi Batema' (2025 press coverage of a clan coronation). Whether these are the same office at different times could not be confirmed.",
  nvubu:
    "A live succession dispute: the clan reportedly went about six years without a substantively recognised Kayita after the Kisekwa clan court ordered a claimant to step down over a lineage dispute. Treat as an open question, not settled fact.",
  "olulyo-olulangira":
    "The Ssaabalangira heads the princes' lineage — the royal line itself organised as a clan-like structure under the Kabaka.",
};
