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
  ffumbe: "Ffumbe-XBNS",
  lugave: "Lugave-P2NH",
  ngonge: "Ngonge-4PED",
  njaza: "Njaza-AGXA",
  nnyonyi: "Nnyonyi-ZJU9",
  mmamba: "Mmamba-KAAY",
  ngeye: "Ngeye-D4EU",
  mpindi: "Mpindi-EGY6",
  ngabi: "Ngabi-4THU",
  mbuzi: "Mbuzi-CXVT",
  ekkobe: "Ekkobe-MU69",
  mbwa: "Mbwa-WZWY",
  mpeewo: "Mpeewo-DFQT",
  mpologoma: "Mpologoma-H58F",
  nnamungoona: "Nnamungoona-44SX",
  ngo: "Ngo-ZQN3",
  nte: "Nte-CGZZ",
  nkejje: "Nkejje-6VT8",
  ntalaganya: "Ntalaganya-HZBP",
  nvubu: "Nvubu-T2RY",
  nvuma: "Nvuma-DT7Q",
  kibuba: "Kibuba-FEUG",
  lukato: "Lukato-DTP5",
  nkima: "Nkima-P5YZ",
  butiko: "Butiko-25CA",
  kasanke: "Kasanke-5UE4",
  kasimba: "Kasimba-5EPW",
  kayozi: "Kayozi-HEWC",
  kibe: "Kibe-V5H5",
  mbogo: "Mbogo-PDUZ",
  musu: "Musu-8T9S",
  "ngabi-nsamba": "NgabiNsamba-GBSN",
  nkerebwe: "Nkerebwe-NZE8",
  nsuma: "Nsuma-SBXS",
  nseenene: "Nseenene-8E8G",
  njovu: "Njovu-HUC7",
  njobe: "Njobe-ZYSF",
  ndiga: "Ndiga-4BP3",
  ndiisa: "Ndiisa-PADB",
  nkula: "Nkula-ZR56",
  nkusu: "Nkusu-ZXCH",
  nnakinsige: "Nnakinsige-PZCB",
  nswaswa: "Nswaswa-HCW3",
  ngaali: "Ngaali-TS8Q",
  kinyomo: "Kinyomo-MZP4",
  kiwere: "Kiwere-3YUN",
  "mazzi-ga-kisasi": "MazziGaKisasi-WUWK",
  "mutima-muyanja": "MutimaMuyanja-ZBC3",
  "mutima-musagi": "MutimaMusagi-PWZW",
  "mmamba-kakoboza": "MmambaKakoboza-YA9H",
  nkebuka: "Nkebuka-FZKC",
  nsunu: "Nsunu-B3V4",
  "babiito-kibulala": "BabiitoKibulala-QEH7",
  "babiito-kkooki": "BabiitoKkooki-UVDN",
  "babiito-ssanje": "BabiitoSsanje-F3SC",
  "olulyo-olulangira": "OlulyoOlulangira-ENBT",
};

// Foundation admin (all-clans) password — same embedded/fixed rule.
export const ADMIN_PANEL_PASSWORD = "Foundation-B74Q3Q";

export function checkClanPassword(clanSlug: string, password: string): boolean {
  const expected = CLAN_PANEL_PASSWORDS[clanSlug];
  return expected !== undefined && password === expected;
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PANEL_PASSWORD;
}
