// ── Bataka Panel access passwords ────────────────────────────────────────────
//
// One fixed password per clan, issued by the Foundation. They are embedded in
// the system — an Omutaka cannot change his clan's password; only the
// Foundation (by editing this file) can rotate one.
//
// SECURITY NOTE (Phase 2): these live in the client bundle, so they gate the
// demo panel against casual visitors — they are NOT real security. When the
// panel moves to Supabase, replace this file with invitation-only accounts
// (panel_officers table + real auth) and delete these passwords.
//
// If a clan is ever added to lib/clans.ts, add a matching entry here —
// checkClanPassword() fails closed (no entry = no way in).

export const CLAN_PANEL_PASSWORDS: Record<string, string> = {
  ffumbe: "Ffumbe-XZH5",
  lugave: "Lugave-S72Q",
  ngonge: "Ngonge-854M",
  njaza: "Njaza-XYAA",
  nnyonyi: "Nnyonyi-62MH",
  mmamba: "Mmamba-XX9Q",
  ngeye: "Ngeye-FDT4",
  mpindi: "Mpindi-KU7Q",
  ngabi: "Ngabi-VBZW",
  mbuzi: "Mbuzi-EJ4S",
  ekkobe: "Ekkobe-7RKW",
  mbwa: "Mbwa-Y3QT",
  mpeewo: "Mpeewo-8FPQ",
  mpologoma: "Mpologoma-JLVK",
  nnamungoona: "Nnamungoona-N3V6",
  ngo: "Ngo-3NE5",
  nte: "Nte-7HD8",
  nkejje: "Nkejje-ETJ4",
  ntalaganya: "Ntalaganya-H5HS",
  nvubu: "Nvubu-NWC8",
  nvuma: "Nvuma-GS2V",
  kibuba: "Kibuba-SFKV",
  lukato: "Lukato-78S2",
  nkima: "Nkima-HEZL",
  butiko: "Butiko-GPX5",
  kasanke: "Kasanke-7G5Q",
  kasimba: "Kasimba-QYLN",
  kayozi: "Kayozi-U8WQ",
  kibe: "Kibe-SD52",
  mbogo: "Mbogo-TQCR",
  musu: "Musu-UDSU",
  "ngabi-nsamba": "NgabiNsamba-3QWK",
  nkerebwe: "Nkerebwe-LD56",
  nsuma: "Nsuma-R8XS",
  nseenene: "Nseenene-F5TB",
  njovu: "Njovu-KAZ5",
  njobe: "Njobe-H7SQ",
  ndiga: "Ndiga-3DFJ",
  ndiisa: "Ndiisa-RF2X",
  nkula: "Nkula-KNLK",
  nkusu: "Nkusu-SMD9",
  nnakinsige: "Nnakinsige-XZVL",
  nswaswa: "Nswaswa-9F9G",
  ngaali: "Ngaali-42TK",
  kinyomo: "Kinyomo-YUHW",
  kiwere: "Kiwere-DBYS",
  "mazzi-ga-kisasi": "MazziGaKisasi-A5PW",
  "mutima-muyanja": "MutimaMuyanja-REJT",
  "mutima-musagi": "MutimaMusagi-B6T4",
  "mmamba-kakoboza": "MmambaKakoboza-E3DB",
  nkebuka: "Nkebuka-39CR",
  nsunu: "Nsunu-9W9Z",
  "babiito-kibulala": "BabiitoKibulala-86D9",
  "babiito-kkooki": "BabiitoKkooki-D33Y",
  "babiito-ssanje": "BabiitoSsanje-DCUU",
  "olulyo-olulangira": "OlulyoOlulangira-U38E",
};

// Foundation admin (all-clans) password — same embedded/fixed rule.
export const ADMIN_PANEL_PASSWORD = "Foundation-THAFQW";

export function checkClanPassword(clanSlug: string, password: string): boolean {
  const expected = CLAN_PANEL_PASSWORDS[clanSlug];
  return expected !== undefined && password === expected;
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PANEL_PASSWORD;
}
