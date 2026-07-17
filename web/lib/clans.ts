// OriginWave tracks which historical migration brought each clan into Buganda.
// nansangwa = indigenous clans; kintu ≈ 1200–1400 AD; kimera ≈ 1370 AD; later = recognised since
export type OriginWave = "nansangwa" | "kintu" | "kimera" | "later";

// Ssiga = one documented Essiga (major branch) within a clan
// elder = the founding ancestor's name that the branch is named after
// seat  = the Ssaza or place where that branch is centred
export interface Ssiga {
  elder: string;
  seat: string;
}

export interface Clan {
  slug: string;
  name: string;
  lugandaName: string;
  totemEmoji: string;
  omuziro: string;        // primary totem (Luganda name + English)
  akabbiro?: string;      // secondary totem
  clanHead: string;       // standing title of the Omutaka w'Akasolya
  currentHead?: string;   // current named holder (if documented)
  obutaka?: string;       // ancestral seat (place, county)
  omubala?: string;       // clan motto
  courtRole?: string;     // hereditary role at the Kabaka's court
  originWave: OriginWave;
  amasiga?: Ssiga[];      // documented major branches (Essiga level)
  deep: boolean;
  memberCount?: string;
}

export interface Ssaza {
  num: string;
  name: string;
  chief: string;         // traditional chief title (alternate stylings noted in history)
  note: string;          // approximate modern district(s) + distinguishing detail
  headquarters: string;  // traditional county headquarters (Mbuga)
  acquired: string;      // how the territory entered Buganda
  history: string;       // county history, condensed from the deep-dive compilation
}

// ─────────────────────────────────────────────────────────────────────────────
// CLANS — 56 active clans from Ebika Byabaganda Ebitongole (2026)
// Sources: Ebika Byabaganda Ebitongole (PDF), Buganda Kingdom registry, M. B. Nsimbi
// ─────────────────────────────────────────────────────────────────────────────

export const clans: Clan[] = [

  // ── Nansangwa — the indigenous clans ─────────────────────────────────────

  {
    slug: "ffumbe",
    name: "Ffumbe",
    lugandaName: "Ekika kya Ffumbe",
    totemEmoji: "🦡",
    omuziro: "Ffumbe — African civet",
    akabbiro: "Kikere (frog)",
    clanHead: "Walusimbi",
    currentHead: "Walusimbi Mbirozankya Yusuf Kigumba",
    obutaka: "Bakka, Busiro",
    omubala: "Kasolo ki? Ffumbe… Galinnya e Bakka, e Bakka basengejja…",
    courtRole: "Provided royal medicine men (basawo) to the Kabaka",
    originWave: "nansangwa",
    deep: false,
  },
  {
    slug: "lugave",
    name: "Lugave",
    lugandaName: "Ekika ky'Abeddira Olugave",
    totemEmoji: "🦔",
    omuziro: "Lugave — pangolin",
    akabbiro: "Maleere (tree mushroom)",
    clanHead: "Ndugwa",
    currentHead: "Ndugwa Grace Ssemakula",
    obutaka: "Katende, Mawokota",
    omubala: "Lwa Ndugwa, lwa Katende. Sseruku lulengejja simanyi lunangwiira. Bw'abirya bw'awoza, bwompa akawala ako ng'ebbanja liwedde.",
    courtRole: "Ndugwa: historically first among the Bataka to speak before the Kabaka. Kasujju Lubinga: father of the royal princes, installs the new Kabaka with Mugema. Kawuula: chief drummer of the royal Mujaguzo drums",
    originWave: "nansangwa",
    // 17 Amasiga per "Ekika ky'Abolugave mu Bwakabaka bwa Buganda" (2021),
    // the clan archive compiled by Mwalimu R.N. Sserunjogi — listed in the
    // archive's official order (1–5 descend directly from the founder)
    amasiga: [
      { elder: "Natiigo",           seat: "Magala, Ssingo" },
      { elder: "Kasoma Nakatanza",  seat: "Migadde, Kyaddondo" },
      { elder: "Ssebwana",          seat: "Gganda, Busiro" },
      { elder: "Kagolo Ssebugulu",  seat: "Kanyike, Mawokota" },
      { elder: "Ssettuba",          seat: "Ddundu–Ssisa, Busiro" },
      { elder: "Myamba Ssebiiso",   seat: "Nakalanda, Ndugu – Kyaggwe" },
      { elder: "Nnamugwanga",       seat: "Bubwa, Ssi-Bukunja – Kyaggwe" },
      { elder: "Ssenkusu",          seat: "Wasozi, Busiro" },
      { elder: "Kakulukuku",        seat: "Kabaale, Busiro" },
      { elder: "Kyabasinga Nyombe", seat: "Nnakirama, Busiro" },
      { elder: "Kaweekwa",          seat: "Ggangu, Kyaddondo" },
      { elder: "Ssekiwala",         seat: "Kkangave, Bulemeezi" },
      { elder: "Kigenyi Maswanswa", seat: "Kololo, Mawokota" },
      { elder: "Ntambi",            seat: "Ggaba–Lukubo, Kyaggwe" },
      { elder: "Ggyoggye",          seat: "Nsonga, Kyaggwe" },
      { elder: "Ggere",             seat: "Malanga, Ssese" },
      { elder: "Kabala",            seat: "Buduggala, Kyaggwe" },
    ],
    deep: true,
    memberCount: "12,390",
  },
  {
    slug: "ngonge",
    name: "Nŋonge",
    lugandaName: "Ekika kya Nŋonge",
    totemEmoji: "🦦",
    omuziro: "Ngonge — otter",
    akabbiro: "Kanene",
    clanHead: "Kisolo",
    obutaka: "Lweza, Busujju",
    omubala: "Bakyanjankete; Lwajjali",
    originWave: "nansangwa",
    deep: false,
    memberCount: "3,947",
  },
  {
    slug: "njaza",
    name: "Njaza",
    lugandaName: "Ekika ky'Abeddira Enjaza",
    totemEmoji: "🦌",
    omuziro: "Njaza — bohor reedbuck",
    akabbiro: "Ngujulu",
    clanHead: "Kitanda",
    obutaka: "Kirungu, Kyaggwe",
    omubala: "Akaana k'enjaza alikatta alikaliwa, Ssendabanyolo tantama. Ow'omuggo aliguta.",
    originWave: "nansangwa",
    // Amasiga now live in lib/clanAmasiga.ts (21 branches per the Amasiga
    // archive, which corrected several seats in the old inline list)
    deep: false,
    memberCount: "8,301",
  },
  {
    slug: "nnyonyi",
    name: "Nnyonyi Nnyange",
    lugandaName: "Ekika ky'Abeddira Ennyonyi Nnyange",
    totemEmoji: "🦢",
    omuziro: "Nnyonyi Nnyange — cattle egret",
    akabbiro: "Kkunguvvu",
    clanHead: "Mbaziira",
    obutaka: "Bulimu, Kyaggwe",
    omubala: "Bampe omuggo neewerekeze; Si Mwana Kijjolooto",
    originWave: "nansangwa",
    deep: false,
    memberCount: "7,203",
  },
  {
    slug: "mmamba",
    name: "Mmamba",
    // "Mmamba Gabunga" per the Emibala reference doc; the Amasiga archive
    // titles this clan's branch register "Emmamba Namakaka" (see clanAmasiga.ts)
    lugandaName: "Ekika ky'e Mmamba Gabunga",
    totemEmoji: "🐟",
    omuziro: "Mmamba — lungfish",
    akabbiro: "Muguya",
    clanHead: "Gabunga",
    currentHead: "Gabunga Mubiru Zziikwa",
    obutaka: "Ssagala, Busiro (Bummamba)",
    omubala: "Sirya mmamba amazzi nnywa. Sirya mmamba amazzi nnywa.",
    courtRole: "Gabunga — Admiral and commander of the royal navy of war canoes on Lake Victoria",
    originWave: "nansangwa",
    deep: true,
    memberCount: "23,481",
  },
  {
    slug: "ngeye",
    name: "Ngeye",
    lugandaName: "Ekika ky'Engeye",
    totemEmoji: "🐒",
    omuziro: "Ngeye — colobus monkey",
    akabbiro: "Kunguvvu",
    clanHead: "Kasujja",
    currentHead: "Kasujja Kyesimba Kakande Kibirige Sheba",
    obutaka: "Busujja, Busiro",
    omubala: "Tatuula, tatuula asuulumba busuulumbi…",
    originWave: "nansangwa",
    deep: false,
  },
  {
    slug: "mpindi",
    name: "Mpindi",
    lugandaName: "Ekika kya Mpindi",
    totemEmoji: "🌱",
    omuziro: "Mpindi — cowpea (food crop)",
    akabbiro: "Kiyindiru",
    clanHead: "Mazige",
    currentHead: "Mazige Kitenda Robert",
    obutaka: "Muyenje, Busiro",
    omubala: "Ssamba e gotto, Ssamba e gotto…",
    originWave: "nansangwa",
    deep: false,
  },
  {
    slug: "ngabi",
    name: "Ngabi Nnyunga",
    lugandaName: "Ekika ky'Engabi Ennyunga",
    totemEmoji: "🦌",
    omuziro: "Ngabi — bushbuck",
    akabbiro: "Jjerengesa",
    clanHead: "Kannyana",
    currentHead: "Kannyana Kiwana Daniel",
    obutaka: "Buwanda, Mawokota",
    omubala: "Kakube akamenye, abayunga tunnakayunga, yunga, yunga.",
    originWave: "nansangwa",
    deep: false,
    memberCount: "18,209",
  },
  {
    slug: "mbuzi",
    name: "Mbuzi",
    lugandaName: "Ekika kya Mbuzi",
    totemEmoji: "🐐",
    omuziro: "Mbuzi — goat",
    clanHead: "Kisunsu",
    obutaka: "Muwunune",
    originWave: "nansangwa",
    deep: false,
  },

  // ── Thirteen clans of Kintu (c. 1200–1400 AD) ────────────────────────────

  {
    slug: "ekkobe",
    name: "Kkobe",
    lugandaName: "Ekika ky'Ekkobe",
    totemEmoji: "🪴",
    omuziro: "Kkobe — air potato (climbing food plant)",
    akabbiro: "Kaama",
    clanHead: "Nnamwama",
    obutaka: "Buwama, Mawokota",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "mbwa",
    name: "Mbwa",
    lugandaName: "Ekika ky'e Mbwa",
    totemEmoji: "🐕",
    omuziro: "Mbwa — dog",
    akabbiro: "Kyuma kya mbwa",
    clanHead: "Mutasingwa",
    currentHead: "Mutasingwa Kakonge Yowasi",
    obutaka: "Kiggwa, Busujju",
    omubala: "Ntegereza, ntegereza abataka kye baatukola.",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "mpeewo",
    name: "Mpeewo",
    lugandaName: "Ekika kya Mpeewo",
    totemEmoji: "🦌",
    omuziro: "Mpeewo — oribi antelope",
    akabbiro: "Kayozi",
    clanHead: "Kiggye",
    currentHead: "Kiggye Henry Kkulubya",
    obutaka: "Kkungu, Kyaddondo",
    omubala: "Ba lwampiima bagenda ne kkungu, ejjinja lino terinyeenya…",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "mpologoma",
    name: "Mpologoma",
    lugandaName: "Ekika ky'Empologoma",
    totemEmoji: "🦁",
    omuziro: "Mpologoma — lion",
    akabbiro: "Ngo (leopard)",
    clanHead: "Ssebuganda Namuguzi",
    // Updated 2026-07: predecessor Wilson Ndawula Namuguzi Ssebuganda died
    // Aug 2024; his son Erukaana Lukanga was installed as 35th head the same
    // month (Monitor, Ganda Media Agency, Kingdom FM reporting)
    currentHead: "Ssebuganda Namuguzi Erukaana Lukanga",
    obutaka: "Kasagga, Bulemeezi",
    omubala: "Ssebuganda Namuguzi omutaka w'e Lwada kyagaba tasaaga…",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "nnamungoona",
    name: "Nnamuŋŋoona",
    lugandaName: "Ekika kya Namuŋŋoona",
    totemEmoji: "🐦",
    omuziro: "Namuŋŋoona — pied crow",
    akabbiro: "Mutima (heart)",
    clanHead: "Kajjabwongwa",
    currentHead: "Kajjabwonga",
    obutaka: "Kyabuwangwa, Ggomba",
    omubala: "Yajja aseka, bwaseka bwabirya…",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "ngo",
    name: "Ngo",
    lugandaName: "Ekika ky'Engo",
    totemEmoji: "🐆",
    omuziro: "Ngo — leopard",
    akabbiro: "Kasimba (genet)",
    clanHead: "Muteesaasira",
    obutaka: "Bukesa, Butambala",
    omubala: "Akaala k'engo nnamuzisa; Nabbuto ggwe mpita",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "nte",
    name: "Nte",
    lugandaName: "Ekika ky'Ente",
    totemEmoji: "🐄",
    omuziro: "Nte — the tailless cow (Enkunku)",
    akabbiro: "Ngaali (crested crane)",
    clanHead: "Katongole Muggatta",
    obutaka: "Mulema, Buddu",
    omubala: "Ekyuma nkiridde n'omukembe ngulidde. Wante taliiko kubi…",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "nkejje",
    name: "Nkejje",
    lugandaName: "Ekika ky'e Nkejje",
    totemEmoji: "🐡",
    omuziro: "Nkejje — sprat / small lake cichlid",
    akabbiro: "Nkejje Kiyemba",
    clanHead: "Kikwata",
    currentHead: "Kikwata Ronald Mugolo",
    obutaka: "Namukuma, Kyaggwe",
    omubala: "Kiiso, kiiso kya mbuzi kirekerera omussi…",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "ntalaganya",
    name: "Ntalaganya",
    lugandaName: "Ekika ky'e Ntalaganya",
    totemEmoji: "🦌",
    omuziro: "Ntalaganya — blue duiker",
    akabbiro: "Maleere",
    clanHead: "Bbambaga",
    obutaka: "Bbambaga, Bulemeezi",
    omubala: "Basajja balamaga, bajja balamaga… nteganira obutaka.",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "nvubu",
    name: "Nvubu",
    lugandaName: "Ekika ky'Abeddira Envubu",
    totemEmoji: "🦛",
    omuziro: "Nvubu — hippopotamus",
    akabbiro: "Njovu (elephant)",
    clanHead: "Kayita",
    obutaka: "Mbazzi, Kyaggwe",
    omubala: "Mu nnyanja weddiramu ki? Nvubu.",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "nvuma",
    name: "Nvuma",
    lugandaName: "Ekika ky'Envuma",
    totemEmoji: "🌊",
    omuziro: "Nvuma — spiky underwater seed",
    akabbiro: "Katinvuma",
    clanHead: "Kyaddondo",
    obutaka: "Kawempe, Kyaddondo",
    omubala: "Mpaawo adduka (okulwana) aliddayo e Kyaddondo.",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "kibuba",
    name: "Kibuba",
    lugandaName: "Ekika kya Kibuba",
    totemEmoji: "🐚",
    omuziro: "Kibuba — freshwater mussel",
    clanHead: "Nnyanja",
    originWave: "kintu",
    deep: false,
  },
  {
    slug: "lukato",
    name: "Lukato",
    lugandaName: "Ekika kya Lukato",
    totemEmoji: "🌿",
    omuziro: "Lukato — rush (sedge grass)",
    akabbiro: "Kabbokasa",
    // Dual co-recognised titleholders per Kingdom records — unique among the clans
    clanHead: "Magunda / Lyongera",
    obutaka: "Kisuza / Kiziba, Buweekula",
    originWave: "kintu",
    deep: false,
  },

  // ── Twelve clans of Kimera (c. 1370 AD) ──────────────────────────────────

  {
    slug: "nkima",
    name: "Nkima",
    lugandaName: "Ekika ky'e Nkima",
    totemEmoji: "🐒",
    omuziro: "Nkima — vervet monkey",
    akabbiro: "Byenda",
    clanHead: "Mugema",
    obutaka: "Bbira, Busiro",
    omubala: "Talya Nkima.",
    courtRole: "Mugema — senior kingmaker, 'father of the kingdom', hereditary chief of Busiro where the royal tombs lie",
    originWave: "kimera",
    deep: false,
    memberCount: "21,044",
  },
  {
    slug: "butiko",
    name: "Butiko",
    lugandaName: "Ekika ky'Obutiko",
    totemEmoji: "🍄",
    omuziro: "Butiko — mushroom",
    akabbiro: "Namulondo",
    clanHead: "Ggunju",
    obutaka: "Bukalango, Busiro",
    omubala: "Weekirikite, Ggunju ajja gabolokota teggwa nte.",
    courtRole: "Ggunju — senior clan head with standing roles in royal ritual and installation of heirs",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "kasanke",
    name: "Kasanke",
    lugandaName: "Ekika kya Kasanke",
    totemEmoji: "🌳",
    omuziro: "Kasanke — kasanke tree",
    clanHead: "Kyangu",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "kasimba",
    name: "Kasimba",
    lugandaName: "Ekika kya Kasimba",
    totemEmoji: "🐱",
    omuziro: "Kasimba — genet cat",
    akabbiro: "Ngo (leopard)",
    clanHead: "Kabazzi",
    obutaka: "Kyango, Mawokota",
    omubala: "Kiiso bwe kikulaba obulungi, naawe okiraba.",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "kayozi",
    name: "Kayozi",
    lugandaName: "Ekika ky'Akayozi",
    totemEmoji: "🐀",
    omuziro: "Kayozi — jerboa / jumping rat",
    akabbiro: "Nsombabyama",
    clanHead: "Kafumu",
    obutaka: "Kyango, Mawokota",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "kibe",
    name: "Kibe",
    lugandaName: "Ekika ky'Ekibe",
    totemEmoji: "🦊",
    omuziro: "Kibe — black-backed jackal",
    akabbiro: "Kasukusuku",
    clanHead: "Muyige",
    obutaka: "Buluutwe, Kyaggwe",
    omubala: "Nambuuze, kibe kyekubye nsiko…",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "mbogo",
    name: "Mbogo",
    lugandaName: "Ekika ky'Abeembogo",
    totemEmoji: "🐃",
    omuziro: "Mbogo — buffalo",
    akabbiro: "Ndeweere",
    clanHead: "Kayiira Gaajuule",
    currentHead: "Kayiira Gaajuule Fredrick David Kasibante",
    obutaka: "Mugulu, Ssingo",
    omubala: "Kadagado kaagwa, aka Namagembe tonkwatako ng'olidde embogo…",
    originWave: "kimera",
    deep: false,
    memberCount: "15,774",
  },
  {
    slug: "musu",
    name: "Musu",
    lugandaName: "Ekika ky'Abeddira Omusu",
    totemEmoji: "🐭",
    omuziro: "Musu — greater cane rat",
    akabbiro: "Kayozi",
    clanHead: "Muyingo",
    currentHead: "Muyingo Samuel Bulega",
    obutaka: "Sama, Mawokota",
    omubala: "Kivu kivu, Kivu kyajja okuluma n'okutwaalana.",
    originWave: "kimera",
    deep: false,
    memberCount: "4,812",
  },
  {
    slug: "ngabi-nsamba",
    name: "Ngabi Nsamba",
    lugandaName: "Ekika ky'Engabi (Nsamba)",
    totemEmoji: "🐐",
    omuziro: "Ngabi — antelope",
    clanHead: "Nsamba",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "nkerebwe",
    name: "Nkerebwe",
    lugandaName: "Ekika ky'e Nkerebwe",
    totemEmoji: "🐿️",
    omuziro: "Nkerebwe — bush squirrel",
    akabbiro: "Kikirikisi",
    clanHead: "Kidimbo",
    obutaka: "Budimbo, Ssingo",
    omubala: "Nkerebwe nkulu, esima ng'eggalira.",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "nsuma",
    name: "Nsuma",
    lugandaName: "Ekika ky'e Nsuma",
    totemEmoji: "🐠",
    omuziro: "Nsuma — elephant-snout fish",
    akabbiro: "Kasulubbana",
    clanHead: "Kibondwe",
    currentHead: "Kibondwe Pascal",
    obutaka: "Bukibondwe",
    omubala: "Kibondwe, Kibondwe atambula. Kibondwe talya Nsuma.",
    originWave: "kimera",
    deep: false,
  },
  {
    slug: "nseenene",
    name: "Nseenene",
    lugandaName: "Ekika ky'Enseenene",
    totemEmoji: "🦗",
    omuziro: "Nseenene — long-horned grasshopper",
    akabbiro: "Nabangogoma",
    clanHead: "Kalibbala",
    obutaka: "Kisozi, Ggomba",
    omubala: "Ggwe mpagi, ggwe luwaga…",
    originWave: "kimera",
    deep: false,
    memberCount: "5,129",
  },

  // ── Later and recognised clans ────────────────────────────────────────────

  {
    slug: "njovu",
    name: "Njovu",
    lugandaName: "Ekika ky'Enjovu",
    totemEmoji: "🐘",
    omuziro: "Njovu — elephant",
    akabbiro: "Nvubu (hippopotamus)",
    clanHead: "Mukalo",
    currentHead: "Mukalo David Ssesanga",
    obutaka: "Kambugu, Busiro",
    omubala: "Nsimbye amasanga, Nakate ajja!…",
    originWave: "later",
    // Amasiga now live in lib/clanAmasiga.ts (7 branches per the Amasiga
    // archive — note the old inline list's "Ssemakadde" is not in the archive)
    deep: false,
  },
  {
    slug: "njobe",
    name: "Njobe",
    lugandaName: "Ekika ky'e Njobe",
    totemEmoji: "🦌",
    omuziro: "Njobe — sitatunga (marsh antelope)",
    akabbiro: "Bugaala",
    clanHead: "Ssenjobe",
    currentHead: "Ssenjobe Willy Zaabu",
    obutaka: "Mpummudde, Ssingo",
    omubala: "Dduka, dduka olukalu, okwate omugga. Nanjobe atambula nga mumbejja.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "ndiga",
    name: "Ndiga",
    lugandaName: "Ekika ky'Abeddira Endiga",
    totemEmoji: "🐑",
    omuziro: "Ndiga — sheep",
    akabbiro: "Mpologoma (lion)",
    clanHead: "Lwomwa",
    currentHead: "Lwomwa Luggya Bbosa Tabula",
    obutaka: "Mbaale, Mawokota",
    omubala: "Nyabo Nabbosa, Mpaawo alimuliisa endiga.",
    originWave: "later",
    deep: false,
    memberCount: "9,811",
  },
  {
    slug: "ndiisa",
    name: "Ndiisa",
    lugandaName: "Ekika ky'e Ndiisa",
    totemEmoji: "🐦",
    omuziro: "Ndiisa — lark",
    akabbiro: "Namunye",
    clanHead: "Kaliika",
    currentHead: "Kaliika Ssenyonga Abdul",
    obutaka: "Mukungwe, Buddu",
    omubala: "Abaliisa bakkuse. Bakkuse twambuke embuga tulye obwami.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "nkula",
    name: "Nkula",
    lugandaName: "Ekika ky'Abeddira Enkula",
    totemEmoji: "🦏",
    omuziro: "Nkula — rhinoceros",
    clanHead: "Muwangi",
    obutaka: "Mayobe, Bugerere",
    omubala: "Wankula simba ejjembe, wankula tatya, takyuka. Gawoolokota teggwa nte.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "nkusu",
    name: "Nkusu",
    lugandaName: "Ekika ky'Abeddira Enkusu",
    totemEmoji: "🦜",
    omuziro: "Nkusu — African grey parrot",
    clanHead: "Ssenkusu Ssonja",
    currentHead: "Ssenkusu Ssonja Kiyindi Peter",
    omubala: "Kyana kya nkusu kirya… Be bakwasa Kabaka engogeza ng'atuuzibwa ku namulondo.",
    courtRole: "Hand the Kabaka the engogeza during his enthronement on the Namulondo throne",
    originWave: "later",
    deep: false,
  },
  {
    slug: "nnakinsige",
    name: "Nakinsige",
    lugandaName: "Ekika kya Nakinsige",
    totemEmoji: "🐦",
    omuziro: "Nnakinsige — red-cheeked cordon-bleu finch",
    akabbiro: "Kkunguvu",
    clanHead: "Kyeyune",
    currentHead: "Kyeyune Fred Mayegga",
    obutaka: "Mirembe, Kyaggwe",
    omubala: "Ono ssimwana kijjolooto, bw'ali wa nnyonyi abuuse…",
    originWave: "later",
    deep: false,
  },
  {
    slug: "nswaswa",
    name: "Nswaswa",
    lugandaName: "Ekika ky'Enswaswa",
    totemEmoji: "🦎",
    omuziro: "Nswaswa — monitor lizard",
    akabbiro: "Goonya (crocodile)",
    clanHead: "Mayengo",
    obutaka: "Bugabo, Buvuma",
    omubala: "Mayengo ttutu.",
    originWave: "later",
    // Amasiga now live in lib/clanAmasiga.ts (7 branches per the Amasiga
    // archive, incl. the migration notes the old inline list dropped)
    deep: false,
  },
  {
    slug: "ngaali",
    name: "Ŋŋaali",
    lugandaName: "Ekika kya Ŋŋaali",
    totemEmoji: "🦩",
    omuziro: "Ŋŋaali — crested crane (Uganda's national bird)",
    akabbiro: "Kasanke akeru",
    clanHead: "Maweesano",
    obutaka: "Buzooba, Buddu",
    omubala: "Bwaali, bwaali wa nnyonyi abuuse… Tudde e Buzooba, mu Kaabaana mulimu engo.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "kinyomo",
    name: "Kinyomo",
    lugandaName: "Ekika ky'e Kinyomo",
    totemEmoji: "🐜",
    omuziro: "Kinyomo — large black ant",
    akabbiro: "Mutima (heart)",
    clanHead: "Nakigoye",
    obutaka: "Kyasa, Buddu",
    originWave: "later",
    deep: false,
  },
  {
    slug: "kiwere",
    name: "Kiwere",
    lugandaName: "Ekika ky'Ekiwere",
    totemEmoji: "🌿",
    omuziro: "Kiwere — purple-dye plant",
    akabbiro: "Sekafu",
    clanHead: "Luwonko",
    // Updated 2026-07: predecessor James Mbaale Zzamuwanga died; his son
    // Alexander Basajjabaka Sserwadda was presented to the Katikkiro as the
    // new head (bugandauk.com reporting)
    currentHead: "Luwonko Alexander Basajjabaka Sserwadda",
    obutaka: "Kitanda, Bugangazzi",
    omubala: "Gulanda gulanda, omuddo gulanda gwannya omuddo…",
    originWave: "later",
    deep: false,
  },
  {
    slug: "mazzi-ga-kisasi",
    name: "Mazzi ga Kisasi",
    lugandaName: "Ekika ky'Amazzi g'Ekisasi",
    totemEmoji: "💧",
    omuziro: "Mazzi ga Kisasi — rainwater dripping from the eaves",
    akabbiro: "Ggongolo (millipede)",
    clanHead: "Wooyo",
    currentHead: "Wooyo David Muyanja",
    obutaka: "Kaska, Buddu",
    omubala: "Kakooto leka ente, musaazi yazaala… yyo mirembe.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "mutima-muyanja",
    name: "Mutima Omuyanja",
    lugandaName: "Ekika ky'Omutima (Abayanja)",
    totemEmoji: "❤️",
    omuziro: "Mutima — heart",
    akabbiro: "Mawuggwe (lung)",
    clanHead: "Nnamugera Kakeeto",
    currentHead: "Namugera Kakeeto",
    obutaka: "Bbaale, Buddu",
    omubala: "Bwanki! Obwa Namugera… Ekifa mu nnyanja omuvubi y'abika.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "mutima-musagi",
    // "Omusaggi" (double g) per the Amasiga archive — supersedes "Musagi"
    name: "Mutima Omusaggi",
    lugandaName: "Ekika ky'Omutima Omusaggi",
    totemEmoji: "🫀",
    omuziro: "Mutima — heart",
    clanHead: "Nakirembeka",
    currentHead: "Nakirembeka Allan Waliggo",
    omubala: "Kaababembe, lw'abaaga ente omutima ssirya, haa haa haa.",
    originWave: "later",
    deep: false,
  },
  {
    slug: "mmamba-kakoboza",
    name: "Mmamba Kakoboza",
    lugandaName: "Ekika ky'e Mmamba Kakoboza",
    totemEmoji: "🐠",
    omuziro: "Mmamba — lungfish",
    clanHead: "Nnankere",
    currentHead: "Nankere Moses Kanoonya",
    omubala: "Ntegereza, ntegereza abataka, abalangira n'abambejja tudde…",
    originWave: "later",
    deep: false,
  },
  {
    slug: "nkebuka",
    name: "Nkebuka",
    lugandaName: "Ekika kya Nkebuka",
    totemEmoji: "🦅",
    omuziro: "Nkebuka — (totem species)",
    clanHead: "Kayizzi",
    originWave: "later",
    deep: false,
  },
  {
    slug: "nsunu",
    name: "Nsunu",
    lugandaName: "Ekika kya Nsunu",
    totemEmoji: "🐛",
    omuziro: "Nsunu — millipede",
    clanHead: "Kibugaya",
    originWave: "later",
    deep: false,
  },
  {
    slug: "babiito-kibulala",
    name: "Babiito be Kibulala",
    lugandaName: "Ekika kya Babiito be Kibulala",
    totemEmoji: "👑",
    omuziro: "Babiito — royal princes of Kibulala",
    clanHead: "Ssaababiito Kibulala",
    obutaka: "Kibulala, Ssingo",
    originWave: "later",
    deep: false,
  },
  {
    slug: "babiito-kkooki",
    name: "Babiito be Kkooki",
    lugandaName: "Ekika kya Babiito be Kkooki",
    totemEmoji: "👑",
    omuziro: "Babiito — royal princes of Kkooki",
    clanHead: "Ssaababiito Kkooki",
    obutaka: "Rakai, Kooki",
    originWave: "later",
    deep: false,
  },
  {
    slug: "babiito-ssanje",
    name: "Babiito be Ssanje",
    lugandaName: "Ekika kya Babiito be Ssanje",
    totemEmoji: "👑",
    omuziro: "Babiito — royal princes of Ssanje",
    clanHead: "Ssaababiito Ssanje",
    obutaka: "Ssanje, Buddu",
    originWave: "later",
    deep: false,
  },
  {
    slug: "olulyo-olulangira",
    name: "Olulyo Olulangira",
    lugandaName: "Ekika ky'Olulyo Olulangira",
    totemEmoji: "👑",
    omuziro: "Olulyo Olulangira — the princes' lineage",
    clanHead: "Ssaabalangira",
    originWave: "later",
    deep: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AMASAZA — The 18 counties of Buganda
// Source: "The Amasaza of Buganda — A Reference Compilation" (Buganda Kingdom
// sources & historical records). Listed in the compilation's official order,
// with the traditional chief title and approximate modern district(s).
// ─────────────────────────────────────────────────────────────────────────────

export const amasaza: Ssaza[] = [
  {
    num: "01", name: "Kyaddondo", chief: "Kaggo",
    note: "Kampala, Wakiso · Most urbanised county",
    headquarters: "Kasangati",
    acquired: "Original territory",
    history:
      "Buganda's most historically and politically central county — seat of Mmengo, the Lubiri (royal palace), and virtually all of modern Kampala. Its chief, the Kaggo, ranked above every other county chief and was also styled Sabaddu, 'head of all the royal servants' — a clue that Buganda's county system grew outward from the royal court's own hierarchy. The county headquarters were originally at Mbuya before moving to Kasangati as the city swallowed the old seat; the sprawling county was only carved into today's constituencies just before the March 1961 election.",
  },
  {
    num: "02", name: "Busiro", chief: "Ssebwana",
    note: "Wakiso · Home of the Kasubi Tombs and the royal burial grounds",
    headquarters: "Ssentema",
    acquired: "Original territory",
    history:
      "One of Buganda's founding counties, its very name bound up with burial ('okusiba'). Busiro has long been the traditional burial ground of the Kabakas: the Kasubi Tombs — the UNESCO World Heritage Site where Muteesa I, Mwanga II, Daudi Chwa II and Muteesa II lie — sit within it, on a hill that was once a royal palace. The Ssebwana was one of the original county chiefs, alongside the heads of Kyaddondo and Mawokota, forming the kernel of the pre-expansion kingdom.",
  },
  {
    num: "03", name: "Busujju", chief: "Kasujju",
    note: "Mityana · Central-western Buganda",
    headquarters: "Mwera",
    acquired: "Original territory",
    history:
      "Another founding county, with the Kasujju among the oldest chieftaincy titles in the kingdom's administrative history. The county's ruling line traces to the reign of Ssekabaka Mutebi I, who succeeded his father Kateregga — one of the more expansionist early kings. Busujju lies in the hilly country northwest of Kampala, today within Mityana District.",
  },
  {
    num: "04", name: "Mawokota", chief: "Kayima",
    note: "Mpigi, Butambala · Western shore of Lake Victoria",
    headquarters: "Butoolo",
    acquired: "Original territory",
    history:
      "Completes the set of Buganda's founding counties. The title Kayima (also Kaima) is said to derive from a Hima word for a cattle-keeper ('kahima'), linking the office to the Bahima pastoralist presence in early Buganda — a reminder that the kingdom's founding population drew on a mix of neighbouring peoples. Mawokota held the only significant grazing grounds in the heartland, giving its chief particular economic importance.",
  },
  {
    num: "05", name: "Butambala", chief: "Katambala",
    note: "Butambala · Central-western Buganda",
    headquarters: "Kaabasanda",
    acquired: "Annexed from Bunyoro by Ssekabaka Kateregga",
    history:
      "Brought into Buganda under Ssekabaka Kateregga (late 16th–early 17th century), one of the kingdom's most significant early expansionist kings, credited with substantially enlarging Buganda at Bunyoro's expense. The Katambala title has remained attached to the county ever since.",
  },
  {
    num: "06", name: "Gomba", chief: "Kitunzi",
    note: "Gomba · Most successful county in the Masaza Cup",
    headquarters: "Kanoni",
    acquired: "Annexed from Bunyoro by Ssekabaka Kateregga",
    history:
      "Like Butambala, Gomba was annexed during Kateregga's campaigns against Bunyoro. In the modern era it is best known as the most successful county in the Buganda Masaza Cup, with five titles to date — a point of local pride that keeps the old county identity alive in a very contemporary form.",
  },
  {
    num: "07", name: "Ssingo", chief: "Mukwenda",
    note: "Mityana, Nakaseke · Northwestern Buganda",
    headquarters: "Mityana",
    acquired: "Partly original territory; remainder annexed from Bunyoro",
    history:
      "Unusual in that only part of it was original Buganda territory, with the rest annexed from Bunyoro in later campaigns. Its chief also carries the title Ssabagabo. Ssingo sits on the old north-western frontier with Bunyoro — a border that saw repeated fighting for generations — and is counted by Bunyoro nationalist writers among the territories they regard as unjustly taken, a claim Buganda's official position does not accept.",
  },
  {
    num: "08", name: "Bulemeezi", chief: "Kkangawo",
    note: "Luweero, Nakaseke · Home of Wakivule School",
    headquarters: "Ggaga",
    acquired: "Partly original territory; remainder annexed from Bunyoro",
    history:
      "Held small pockets of original Buganda territory before being substantially expanded through annexation from Bunyoro, along the kingdom's contested northern frontier. Like Ssingo, it features in Bunyoro's wider 'lost counties' claim. Its football side has three Masaza Cup titles, among the tournament's most consistent performers.",
  },
  {
    num: "09", name: "Buruuli", chief: "Kimbugwe",
    note: "Nakasongola · North Buganda",
    headquarters: "Nakasongola",
    acquired: "Annexed from Bunyoro; formalised in the 1900 Buganda Agreement",
    history:
      "Buganda's furthest-flung northern frontier. Early-19th-century campaigns here — notably under Ssekabaka Kamaanya — involved war canoes carried overland from Lake Victoria, an unusual logistical feat historians cite as establishing the kingdom's effective northernmost limit. Its absorption was completed and formalised through the 1900 Buganda Agreement.",
  },
  {
    num: "10", name: "Bugerere", chief: "Mugerere",
    note: "Kayunga · East of the River Nile",
    headquarters: "Ntenjeru",
    acquired: "Bunyoro territory awarded to the general Semei Kakungulu, 1890s",
    history:
      "One of the most contested chapters in this history. Home to the Banyala (Bageere), Bugerere was part of Bunyoro until the 1890s wars in which the Muganda general Semei Kakungulu — fighting alongside British colonial troops against Omukama Kabalega — earned the territory as his first independent power base. Banyala accounts describe a forced and often violent absorption; Buganda's histories present it as territory earned through military service. Kakungulu went on to lead the colonial conquest of much of eastern Uganda and later founded the Abayudaya community.",
  },
  {
    num: "11", name: "Kyaggwe", chief: "Ssekiboobo",
    note: "Mukono, Buikwe, Buvuma (mainland) · Eastern Buganda",
    headquarters: "Mukono",
    acquired: "Annexed under Ssekabaka Kimera",
    history:
      "Brought in under the semi-legendary Ssekabaka Kimera; tradition holds its headquarters' name Mukono ('arm/hand') recalls Kimera's chief there serving as his right-hand man. As the kingdom's eastern approach from Busoga and the coast, Kyaggwe was the strategic 'back door' — the very reason Bishop James Hannington was killed on Mwanga II's orders near the Busoga border in 1885. The title Ssekiboobo (also Ssabawaali) derives from 'emboobo', the protective underside of a cow's tail — fitting for the guardian of the kingdom's wealthiest frontier. Sezibwa Falls, of major cultural significance, lies within it.",
  },
  {
    num: "12", name: "Buvuma", chief: "Mbuubi",
    note: "Buvuma Islands (own district since 2010) · Lake Victoria",
    headquarters: "Maggyo",
    acquired: "Tributary after Muteesa I's 1875–77 naval campaign; annexed under Mwanga II",
    history:
      "A large island chain in Lake Victoria's Napoleon Gulf, home to the Bavuma, a distinct fishing people who resisted Buganda's naval power for generations. In 1875–77 Ssekabaka Muteesa I launched a massive amphibious campaign — nearly 10,000 soldiers on 300 war canoes — that proved costly (a 'pyrrhic victory') but reduced Buvuma to tributary status; full annexation followed under Mwanga II. Long administered under old Kyaggwe, Buvuma became its own district only in 2010.",
  },
  {
    num: "13", name: "Buddu", chief: "Pokino",
    note: "Masaka, Kalungu, Lwengo, Bukomansimbi, Kyotera · Southern Buganda",
    headquarters: "Masaka",
    acquired: "Conquered from Bunyoro by Ssekabaka Jjunju, late 18th century",
    history:
      "The last major territory acquired before the Europeans arrived, seized by Ssekabaka Jjunju after defeating the Nyoro army at the Battle of Nandere. By 1892 it was reportedly the kingdom's single wealthiest province. Its defining modern chapter is religious: after the 1892 Battle of Mengo, Frederick Lugard settled the peace by declaring Buddu a Catholic county; Henri Streicher's Villa Maria mission made it — and it remains — the heartland of Catholicism in Uganda, training the country's first African Catholic priests (1913) and first African Catholic bishop, Joseph Kiwanuka (1939). Buddu was also where Mwanga II made his last stand against British forces in 1897–99.",
  },
  {
    num: "14", name: "Mawogola", chief: "Muteesa",
    note: "Sembabule · Pastoral heartland",
    headquarters: "Sembabule",
    acquired: "Largely carved out of Buddu under the 1900 Buganda Agreement",
    history:
      "Carved mostly out of the larger Buddu county in the reorganisation that accompanied the 1900 Agreement. Its chief's title, somewhat confusingly, is Muteesa — a chieftaincy title, unrelated to the Kabakas of that name. In 1966, when Obote's forces stormed the Lubiri, it was Mawogola's county chief Sebastian Kitayimbwa who sheltered the fleeing Kabaka Muteesa II for three weeks and organised his escape through Burundi to Britain — at great personal risk; he was later imprisoned for it.",
  },
  {
    num: "15", name: "Kabula", chief: "Lumaama",
    note: "Lyantonde · Southwestern Buganda",
    headquarters: "Kabula",
    acquired: "Ceded to Buganda from Ankole",
    history:
      "The exception among the expansion counties: Kabula came to Buganda from the neighbouring kingdom of Ankole rather than from Bunyoro. Its chief is the Lumaama (also Luwama), and its territory today falls within Lyantonde District on Buganda's southwestern edge.",
  },
  {
    num: "16", name: "Kooki", chief: "Kamuswaga",
    note: "Rakai · Formerly an independent kingdom · Southern Buganda",
    headquarters: "Rakai",
    acquired: "Independent kingdom brought into Buganda by treaty, 1896 (ratified 1903)",
    history:
      "The most unusual county: until 1896 Kooki was a fully independent kingdom, founded around 1720–1750 by the Mubiito prince Bwohe, who took the royal title Kamuswaga. It paid tribute to Buganda from the late 1700s but kept its own king and institutions for over a century. On 18 November 1896 the Kamuswaga Ndahura signed an allegiance agreement accepting county status with special recognition — he retained his royal title and a special seat in the Lukiiko at Bulange, nominally above his fellow county chiefs. Kooki's relationship with Mmengo remains a live political question today, with periodic assertions of autonomy since the early 2010s.",
  },
  {
    num: "17", name: "Buweekula", chief: "Luweekula",
    note: "Mubende, Kassanda · Northwestern Buganda",
    headquarters: "Kiryannongo",
    acquired: "Annexed from Bunyoro under Ssekabaka Kamaanya",
    history:
      "Absorbed from Bunyoro during the reign of Ssekabaka Kamaanya, whose early-19th-century rule was remembered as a period of near-constant 'restless warfare'. Like several neighbouring frontier counties it features in Bunyoro's wider 'lost counties' claim, which Buganda's official histories do not recognise.",
  },
  {
    num: "18", name: "Ssese", chief: "Kweba",
    note: "Kalangala · 'Islands of the Gods' · Sacred to the Mmamba clan",
    headquarters: "Kalangala",
    acquired: "Autonomous from the founding; formally made a county in 1900",
    history:
      "Buganda's most singular county. The archipelago in Lake Victoria (Nnalubaale) was never governed like a normal county for most of the kingdom's history — it was sacred territory, the 'Islands of the Gods', home to important shrines of the Balubaale, and administered with an autonomy reflecting that spiritual status. Only the 1900 Buganda Agreement formally converted Ssese into an ordinary county under the Kweba.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Look up a single clan by its URL slug (e.g. "mmamba").
// Returns undefined if the slug doesn't match — callers should use notFound() in that case.
export function getClan(slug: string): Clan | undefined {
  return clans.find((c) => c.slug === slug);
}

// Returns all clans that arrived in the same historical migration wave
export function getClansByWave(wave: OriginWave): Clan[] {
  return clans.filter((c) => c.originWave === wave);
}

// Display metadata for each wave — used for filter tabs, wave badges on clan cards, and tooltips.
// badgeBg/badgeText mirror the v3 prototype wave badge colours; shortLabel is used on clan tiles.
export const WAVE_LABELS: Record<OriginWave, {
  label: string; shortLabel: string; sub: string;
  color: string; badgeBg: string; badgeText: string;
}> = {
  nansangwa: { label: "Nansangwa", shortLabel: "Indigenous", sub: "The indigenous clans",           color: "#8B4513",      badgeBg: "#1a3d2b", badgeText: "#52b788" },
  kintu:     { label: "Kintu",     shortLabel: "Kintu era",  sub: "Came with Ssekabaka Kintu",      color: "var(--royal)", badgeBg: "#1a3d8f", badgeText: "#a0b8f4" },
  kimera:    { label: "Kimera",    shortLabel: "Kimera era", sub: "Came with Kabaka Kimera c.1370", color: "#1a6b3c",      badgeBg: "#6b2f00", badgeText: "#f4c66a" },
  later:     { label: "Later",     shortLabel: "Later",      sub: "Recognised since",                color: "#555",         badgeBg: "#3d3d3d", badgeText: "#ccc"    },
};
