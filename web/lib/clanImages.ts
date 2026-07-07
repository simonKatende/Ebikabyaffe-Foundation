// ─────────────────────────────────────────────────────────────────────────────
// CLAN TOTEM IMAGES — real photos of each clan's omuziro (and akabbiro where
// the akabbiro is an unambiguous species). Files live in
// web/public/images/totems/, sourced from Wikipedia lead images via the
// Wikimedia Commons API (session 10).
//
// Rules:
// - Clans with abstract totems (rainwater, heart, the princes' lineage,
//   unidentified species) have NO entry — the UI must fall back to totemEmoji.
// - Every credit string is load-bearing: CC BY / CC BY-SA / GFDL images
//   require visible attribution. Public-domain photos are credited anyway.
// - Akabbiro entries that name another clan's totem (e.g. Mpologoma's
//   akabbiro is the leopard) reuse that totem's file — one download per
//   species.
// ─────────────────────────────────────────────────────────────────────────────

export interface TotemImage {
  src: string;    // path under /public
  alt: string;    // species description for screen readers
  credit: string; // photographer · license · source — must stay visible
}

export interface ClanImageSet {
  totem?: TotemImage;
  akabbiro?: TotemImage;
}

const img = (file: string, alt: string, credit: string): TotemImage => ({
  src: `/images/totems/${file}`,
  alt,
  credit: `${credit} · Wikimedia Commons`,
});

export const clanImages: Record<string, ClanImageSet> = {
  ffumbe: {
    totem: img("ffumbe.jpg", "African civet", "Nikolai Usik · CC BY-SA 3.0"),
    akabbiro: img("ffumbe-akabbiro.jpg", "African bullfrog (kikere)", "David J. Stang · CC BY-SA 4.0"),
  },
  lugave: {
    totem: img("lugave.jpg", "Ground pangolin", "U.S. Fish & Wildlife Service · CC BY 2.0"),
  },
  ngonge: {
    totem: img("ngonge.jpg", "African clawless otter", "Mark Paxton, Shamvura Camp · CC BY-SA 3.0"),
  },
  njaza: {
    totem: img("njaza.jpg", "Bohor reedbuck", "Yathin S Krishnappa · CC BY-SA 3.0"),
  },
  nnyonyi: {
    totem: img("nnyonyi.jpg", "Cattle egret in breeding plumage", "Pedro Lastra · CC BY-SA 2.0"),
  },
  mmamba: {
    totem: img("mmamba.jpg", "Marbled lungfish", "George Berninger Jr. · CC BY-SA 4.0"),
  },
  ngeye: {
    totem: img("ngeye.jpg", "Mantled guereza (colobus monkey)", "Cburnett · CC BY-SA 3.0"),
  },
  mpindi: {
    totem: img("mpindi.jpg", "Cowpeas", "HeraldDesa · CC BY-SA 3.0"),
  },
  ngabi: {
    totem: img("ngabi.jpg", "Bushbuck", "Steve Garvie · CC BY-SA 2.0"),
  },
  mbuzi: {
    totem: img("mbuzi.jpg", "Goat", "Armin Kübelbeck · CC BY-SA 3.0"),
  },
  ekkobe: {
    totem: img("ekkobe.jpg", "Air potato vine (Dioscorea bulbifera)", "Jeevan Jose · CC BY-SA 4.0"),
  },
  mbwa: {
    totem: img("mbwa.jpg", "Africanis — the African village dog", "Bothar · CC BY-SA 3.0"),
  },
  mpeewo: {
    totem: img("mpeewo.jpg", "Oribi antelope", "Bernard Dupont · CC BY-SA 2.0"),
    akabbiro: img("kayozi.jpg", "Jerboa (kayozi)", "Syt55 · Public domain"),
  },
  mpologoma: {
    totem: img("mpologoma.jpg", "Lion", "Giles Laurent · CC BY-SA 4.0"),
    akabbiro: img("ngo.jpg", "Leopard (ngo)", "Sumeet Moghe · CC BY-SA 4.0"),
  },
  nnamungoona: {
    totem: img("nnamungoona.jpg", "Pied crow", "Frank Vassen · CC BY 2.0"),
  },
  ngo: {
    totem: img("ngo.jpg", "African leopard", "Sumeet Moghe · CC BY-SA 4.0"),
    akabbiro: img("kasimba.jpg", "Common genet (kasimba)", "Frédéric Salein · CC BY-SA 2.0"),
  },
  nte: {
    totem: img("nte.jpg", "Ankole long-horned cattle", "Dennis G. Jarvis · CC BY-SA 2.0"),
    akabbiro: img("ngaali.jpg", "Grey crowned crane (ngaali)", "Charles J. Sharp · CC BY-SA 4.0"),
  },
  nkejje: {
    totem: img("nkejje.jpg", "Haplochromis — small Lake Victoria cichlid", "Haplochromis (Wikimedia) · CC BY-SA 3.0"),
  },
  ntalaganya: {
    totem: img("ntalaganya.jpg", "Blue duiker", "Derek Keats · CC BY-SA 2.0"),
  },
  nvubu: {
    totem: img("nvubu.jpg", "Hippopotamus", "Muhammad Mahdi Karim · CC BY-SA 4.0"),
    akabbiro: img("njovu.jpg", "African bush elephant (njovu)", "Giles Laurent · CC BY-SA 4.0"),
  },
  kibuba: {
    totem: img("kibuba.jpg", "Freshwater mussels", "U.S. Fish & Wildlife Service · Public domain"),
  },
  lukato: {
    totem: img("lukato.jpg", "Soft rush (sedge grass)", "Meggar · CC BY-SA 3.0"),
  },
  nkima: {
    totem: img("nkima.jpg", "Vervet monkey", "Diego Delso · CC BY-SA 4.0"),
  },
  butiko: {
    totem: img("butiko.jpg", "Termitomyces mushrooms on a termite mound", "Candice, Mushroom Observer · CC BY-SA 3.0"),
  },
  kasimba: {
    totem: img("kasimba.jpg", "Common genet", "Frédéric Salein · CC BY-SA 2.0"),
    akabbiro: img("ngo.jpg", "Leopard (ngo)", "Sumeet Moghe · CC BY-SA 4.0"),
  },
  kayozi: {
    totem: img("kayozi.jpg", "Jerboa (jumping rodent)", "Syt55 · Public domain"),
  },
  kibe: {
    totem: img("kibe.jpg", "Black-backed jackal", "Giles Laurent · CC BY-SA 4.0"),
  },
  mbogo: {
    totem: img("mbogo.jpg", "African buffalo", "Charles J. Sharp · CC BY-SA 4.0"),
  },
  musu: {
    totem: img("musu.jpg", "Greater cane rat", "rbairdpccam / Jacek555 · CC BY-SA 2.0"),
    akabbiro: img("kayozi.jpg", "Jerboa (kayozi)", "Syt55 · Public domain"),
  },
  "ngabi-nsamba": {
    totem: img("ngabi.jpg", "Bushbuck", "Steve Garvie · CC BY-SA 2.0"),
  },
  nkerebwe: {
    totem: img("nkerebwe.jpg", "Smith's bush squirrel", "Sumeet Moghe · CC BY-SA 4.0"),
  },
  nsuma: {
    totem: img("nsuma.jpg", "Elephant-snout fish (Mormyrus)", "Zaire (Wikimedia) · CC BY-SA 3.0"),
  },
  nseenene: {
    totem: img("nseenene.jpg", "Nseenene — long-horned grasshopper (Ruspolia)", "Gilles San Martin · CC BY-SA 2.0"),
  },
  njovu: {
    totem: img("njovu.jpg", "African bush elephant", "Giles Laurent · CC BY-SA 4.0"),
    akabbiro: img("nvubu.jpg", "Hippopotamus (nvubu)", "Muhammad Mahdi Karim · CC BY-SA 4.0"),
  },
  njobe: {
    totem: img("njobe.jpg", "Sitatunga (marsh antelope)", "Løken · CC BY-SA 3.0"),
  },
  ndiga: {
    totem: img("ndiga.jpg", "Sheep", "Keith Weller · Public domain"),
    akabbiro: img("mpologoma.jpg", "Lion (mpologoma)", "Giles Laurent · CC BY-SA 4.0"),
  },
  ndiisa: {
    totem: img("ndiisa.jpg", "Rufous-naped lark", "Derek Keats · CC BY 2.0"),
  },
  nkula: {
    totem: img("nkula.jpg", "White rhinoceros", "Giles Laurent · CC BY-SA 4.0"),
  },
  nkusu: {
    totem: img("nkusu.jpg", "African grey parrot", "Florettesokeng · CC BY-SA 4.0"),
  },
  nnakinsige: {
    totem: img("nnakinsige.jpg", "Red-cheeked cordon-bleu finch", "Charles J. Sharp · CC BY-SA 4.0"),
  },
  nswaswa: {
    totem: img("nswaswa.jpg", "Nile monitor lizard", "Charles J. Sharp · CC BY-SA 4.0"),
    akabbiro: img("nswaswa-akabbiro.jpg", "Nile crocodile (goonya)", "Dewet · CC BY-SA 2.0"),
  },
  ngaali: {
    totem: img("ngaali.jpg", "Grey crowned crane — Uganda's national bird", "Charles J. Sharp · CC BY-SA 4.0"),
  },
  kinyomo: {
    totem: img("kinyomo.jpg", "Carpenter ant", "Muhammad Mahdi Karim · GFDL 1.2"),
  },
  nsunu: {
    totem: img("nsunu.jpg", "Millipedes (composite)", "Animalparty et al. · CC BY 4.0"),
  },
  // Totem is abstract (rainwater from the eaves) — emoji stays; but the
  // akabbiro IS a species: Ggongolo, the millipede.
  "mazzi-ga-kisasi": {
    akabbiro: img("nsunu.jpg", "Millipede (ggongolo)", "Animalparty et al. · CC BY 4.0"),
  },
  "mmamba-kakoboza": {
    totem: img("mmamba.jpg", "Marbled lungfish", "George Berninger Jr. · CC BY-SA 4.0"),
  },
};

export function getClanImages(slug: string): ClanImageSet {
  return clanImages[slug] ?? {};
}
