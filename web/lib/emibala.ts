// ── Emibala registry — clan praise verses / drum slogans ─────────────────────
//
// Source: "Ebika bya Buganda n'Emibala Gyabyo — Reference Document v1.0"
// (user-supplied, compiled 17 July 2026). Primary authority in that document
// is buganda.or.ug (Buganda Kingdom, Bulange Mmengo); each entry below keeps
// the reference document's own source tag and status flag.
//
// Editorial rules:
//  • Texts are reproduced verbatim from the reference document — nothing has
//    been invented to fill a gap. Clans whose omubala the document marks
//    "NOT CAPTURED THIS SESSION" have NO entry here; the UI falls back to the
//    legacy clans.ts omubala string (if any) until a sourced text arrives.
//  • status "partial" = the document found only a fragment or a single
//    secondary source — verify with the clan authority before formal use.
//  • status "none-by-tradition" = the royal clan; princes beat no clan
//    omubala by tradition.

export type OmubalaStatus = "captured" | "partial" | "none-by-tradition";

export interface OmubalaEntry {
  text: string;
  status: OmubalaStatus;
  source?: string;  // as tagged in the reference document
  note?: string;
}

// Source-tag → human-readable attribution (legend from the reference document)
export const OMUBALA_SOURCES: Record<string, string> = {
  BOR: "buganda.or.ug — official Buganda Kingdom website (Bulange Mmengo)",
  WIKI: "English Wikipedia (citing buganda.or.ug and Kiingi, Enkuluze ya Oluganda eya e Makerere, 2009)",
  LGWK: "Luganda Wikipedia",
  OBUT: "obutaka.com — Bataka / clan-heads envoy site",
  AFC: "africanculture1.blogspot.com (secondary, unofficial)",
  BAF: "beingafrican.org (secondary)",
  NGC: "ngabiclan.com — official Ngabi (Nsamba) clan website",
  BRF: "bugandaroyalfamily.org",
  BKD: "Bukedde (via public post of clan list)",
  CM: "Public statement by a clan member (fragment only)",
};

export const EMIBALA: Record<string, OmubalaEntry> = {

  "olulyo-olulangira": {
    text: "Tebalina mubala — by tradition the princes beat no clan omubala; all emibala converge on the Kabaka's drum, and royals sound the royal drum rhythm (e.g. Bantadde).",
    status: "none-by-tradition",
    source: "BRF",
    note: "Documented explicitly: 'Abalangira tebaba na (mubala)'. Some royal drums (e.g. Kikindu kizaalibwa n'amaggwa — Banda) are drum names, not clan emibala.",
  },

  butiko: {
    text: "Weekirikite, Ggunju ajja. Gabolokota teggwa nte.",
    status: "captured",
    source: "WIKI / LGWK",
  },

  ffumbe: {
    text: "Kasolo ki? Ffumbe ×3. Galinnya, galinnya e Bakka; e Bakka basengejja; e Bakka banywa omwenge. Kakozaakoza, tolikoza mu lw'effumbe.",
    status: "captured",
    source: "BOR / WIKI",
  },

  kasimba: {
    text: "Kiiso: bwe kikulaba obulungi, naawe okiraba. Kababembe.",
    status: "captured",
    source: "WIKI",
  },

  kibe: {
    text: "Nambuuze, kibe kyekubye nsiko. Kyasanku, bakuzaala wa? Ku kizinga Wambogwe. Gw'akwana amalirira, Muteesa; bw'anywa anywa nvuba; Muyige wa ddalu.",
    status: "captured",
    source: "OBUT / AFC",
  },

  kiwere: {
    text: "Gulanda gulanda, omuddo gulanda; gulunda gwannya omuddo. Alimulisa omukka ndimutta; bw'alidda ngadissa.",
    status: "captured",
    source: "BOR",
  },

  lugave: {
    text: "Lwa Ndugwa, lwa Katende. Bwabirya bw'empoza; sseruku lulengejja, simanyi lunangwira. Bw'ompa akawala ako ng'ebbanja liwedde.",
    status: "captured",
    source: "BOR / WIKI",
  },

  "mazzi-ga-kisasi": {
    text: "Kakooto leka ente, musaazi yazaala. Akaana ak'obulenzi tokaweera mpindi mu ngalo — yyo mirembe. Kiiso kya mbuzi kirekerera omussi ne kitunuulira omubaazi — yyo mirembe. Bwe kikutuulira obulungi okiraba — yyo mirembe.",
    status: "captured",
    source: "BOR",
  },

  mbogo: {
    text: "Kadagado, kadagado, kadagado kaagwa. Aka Namagembe tonkwatako ng'olidde embogo — zonna mbogo!",
    status: "captured",
    source: "BOR",
  },

  mbwa: {
    text: "Ntegereza, ntegereza abataka kye baatukola.",
    status: "captured",
    source: "BOR",
  },

  mmamba: {
    text: "Sirya mmamba, amazzi nnywa ×2. Eno ssi mmamba, nnamakaka. Gwe ndisanga mu menvu n'ebikuta alibirya. Akalya kokka ke keetenda obulyampola. / Bandaba kulya mpola ne bampita omukodo.",
    status: "captured",
    source: "BOR / WIKI",
  },

  "mmamba-kakoboza": {
    text: "Ntegereza, ntegereza abataka; abalangira n'abambejja tudde. Tudde e Kyanjovu tuteeseze Obuganda.",
    status: "captured",
    source: "BOR",
    note: "Nankere holds a famous role in royal accession rites.",
  },

  mpeewo: {
    text: "Ba Lwampiima bagenda ne Kkungu. Ejjinja lino terinyeenya, terinyeenya — kali mu tteeke, kali mu tteeke.",
    status: "captured",
    source: "BOR",
  },

  mpindi: {
    text: "Ssamba e gotto! Ssamba e gotto! Ssamba e gotto!",
    status: "captured",
    source: "BOR",
  },

  mpologoma: {
    text: "Ssebuganda Namuguzi, omutaka w'e Lwadda, kyagaba tasaaga. Bw'aba anaatabaala asabira ku kyoto. Akaabira Kasagga. Atambula masajja. Ggwe mpagi, ggwe luwaga ×2.",
    status: "captured",
    source: "BOR",
  },

  musu: {
    text: "Kivu kivu! Kivu kyajja okuluma n'okutwalana.",
    status: "captured",
    source: "BOR",
  },

  "mutima-musagi": {
    text: "Kaababembe! Lw'abaaga ente omutima ssirya — haa haa haa.",
    status: "captured",
    source: "BOR",
  },

  "mutima-muyanja": {
    text: "Bwanki! Obwa Namugera. Obwanika emmale n'enfi, ekkejje n'emigonjo… Ekifa mu nnyanja omuvubi y'abika. Gutujja! Omutima gutujja; asirika omutima guba mulambo. Alitya ennyanja aliggya butiko.",
    status: "captured",
    source: "BOR / BAF",
    note: "Long omubala abridged; full text on buganda.or.ug.",
  },

  nnakinsige: {
    text: "Ono ssi mwana kijjolooto; bw'ali wa nnyonyi abuuse. Majwala akonkomadde ku kyoto, yeerabidde be batta. Kyesuluuta, yesuluuta bwesuluusi — anti awalalira waggulu, bw'ali wa nnyonyi abuuse.",
    status: "captured",
    source: "BOR / BAF",
    note: "Listed on buganda.or.ug as 'Nnyonyi Nakinsige'.",
  },

  ndiga: {
    text: "Nnyabo Nabbosa — mpaawo alimuliisa endiga.",
    status: "partial",
    source: "BAF",
    note: "Single secondary source; the clan's own book (Ennono y'Ekika ky'Endiga) lists multiple emibala — verify against it.",
  },

  ndiisa: {
    text: "Abaliisa bakkuse! Bakkuse, bakkuse — twambuke embuga tulye obwami.",
    status: "captured",
    source: "BOR / BAF",
  },

  ngabi: {
    text: "Kakube akamenye; abayunga tunnakayunga — yunga, yunga!",
    status: "captured",
    source: "BOR",
    note: "Recognised as a separate clan after the Kannyana & Mutawe masiga separated from Nsamba.",
  },

  "ngabi-nsamba": {
    text: "Kakku kakkutadde; tadde kakku. (Gwa Nsamba yekka — the Nsamba-only omubala; the clan's principal omubala is published on ngabiclan.com.)",
    status: "partial",
    source: "NGC / BAF",
    note: "Main omubala referenced but not fully reproduced in the source captured; complete from ngabiclan.com/Ebyafaayo.",
  },

  ngeye: {
    text: "Tatuula, tatuula — asuulumba busuulumbi. Ttutu! Ttutu lifumita likyali tto.",
    status: "captured",
    source: "BOR",
  },

  njaza: {
    text: "Akaana k'enjaza alikatta alikaliwa. Ssendabanyolo tantama. Ow'omuggo aliguta.",
    status: "captured",
    source: "BOR",
  },

  njobe: {
    text: "Dduka, dduka olukalu, okwate omugga! Nanjobe amaaso gamulengejja; Nanjobe atambula nga mumbejja.",
    status: "captured",
    source: "BOR",
  },

  njovu: {
    text: "Nsimbye amasanga — Nakate ajja! Batte mugamba: tungulako emu, bbiri ku lwayi, ssatu ku kitooke. Ssiba mbutanta n'empasasa mbutantabu.",
    status: "captured",
    source: "BOR",
  },

  nkejje: {
    text: "Kiiso, kiiso! Kiiso kya mbuzi kirekerera omussi ne kitunuulira omubaazi. Tungulako emu osuule mu kyoto, abazzukulu bawulire evvumbe ×3.",
    status: "captured",
    source: "BOR",
  },

  nkima: {
    text: "… Mugema afe, tuzeeko omulala.",
    status: "partial",
    source: "CM / BKD",
    note: "Only a fragment publicly quoted by a clan member; the full omubala awaits capture from the clan authority.",
  },

  nkula: {
    text: "Wankula simba ejjembe! Wankula tatya, takyuka. Gawoolokota teggwa nte.",
    status: "captured",
    source: "BOR",
  },

  nkusu: {
    text: "Kyana kya nkusu kirya ×2 — kyegiringijja; bwe kigwa wansi tekidda waggulu. Be bakwasa Kabaka engogeza ng'atuuzibwa ku Nnamulondo.",
    status: "captured",
    source: "BOR",
  },

  nnamungoona: {
    text: "Yajja aseka; bwaseka bwabirya. Akaana ak'obulenzi tokaweera mpande mu ngalo — bw'akula ayinza okufuuka kitaawo oba okulya obwami.",
    status: "captured",
    source: "BOR",
  },

  nsuma: {
    text: "Kibondwe, Kibondwe, Kibondwe atambula! Kibondwe talya, talya nsuma.",
    status: "captured",
    source: "BOR",
  },

  nswaswa: {
    text: "Mayengo ttutu!",
    status: "captured",
    source: "BOR",
  },

  ntalaganya: {
    text: "Basajja balamaga, bajja balamaga. Balamaga ne jjo ndiramaga — nteganira obutaka.",
    status: "captured",
    source: "BOR",
  },

  nte: {
    text: "Ekyuma nkiridde n'omukembe ngulidde. Wante taliiko kubi. Mbadde ngaleeta omusumba n'agayiwa. / (Essiga lya Kagolo:) Kigere kya nte mwajja mwe linya.",
    status: "captured",
    source: "BOR / AFC / LGWK",
  },

  nvuma: {
    text: "Mpaawo adduka, mpaawo adduka — aliddayo e Kyaddondo.",
    status: "partial",
    source: "BAF",
    note: "Consistent across two secondary sources; verify with the clan authority.",
  },

  ngonge: {
    text: "Abakyanja nkette ×2! Mwegali, mwegali; lwajali, lwajali. Ekirimala abasajja ziriba nnyago. Be ppo ddogo! Bwe galibeera amafumu tuligendana. Byaddalu, byaddalu — bi Nakiwala byaddalu.",
    status: "captured",
    source: "WIKI / AFC",
  },
};

export function getOmubala(slug: string): OmubalaEntry | undefined {
  return EMIBALA[slug];
}
