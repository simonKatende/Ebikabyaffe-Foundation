"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";
import { LugaveLineageExplorer } from "@/components/clans/LugaveLineageExplorer";
import { useStats, clanMemberCount, formatCount } from "@/lib/stats";

const LUGAVE_TOTEM: LightboxImage = {
  src: "/images/totems/lugave.jpg",
  alt: "Ground pangolin",
  label: "Omuziro · Lugave — pangolin",
  credit: "U.S. Fish & Wildlife Service · CC BY 2.0",
};

// Lugave is the second clan (after Mmamba) with a hand-curated deep page.
//
// Content is condensed from "Ekika ky'Abolugave mu Bwakabaka bwa Buganda" (2021),
// the 164-page clan archive compiled by Mwalimu R.N. Sserunjogi for the Lugave
// Clan Archives & Records, produced with the clan's Katikkiro, Owek. Godfrey
// Katende Mukiibi (Natiigo). Photographs are reproduced from that book.
//
// UX pattern: every archive topic shows its TITLE + a one-line SUBTITLE summary.
// The full information (and photographs) only appears when the reader clicks —
// so the page reads as a scannable index of the archive first.
export function LugaveDetail() {
  const router = useRouter();
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  // Live member count (base from clans.ts) — ticks immediately on a join
  const stats = useStats();
  const liveCount = clanMemberCount(stats, "lugave") ?? 0;

  return (
    <>
      {/* Hero */}
      <div
        className="px-6 py-10 text-center border-b-4 border-gold"
        style={{ background: "var(--gd)" }}
      >
        {/* Real omuziro photo — the ground pangolin (credit is load-bearing).
            Tapping the photo opens it full-screen. */}
        <button
          type="button"
          onClick={() => setLightbox(LUGAVE_TOTEM)}
          aria-label="View photo of ground pangolin full-screen"
          className="relative block w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-2 border-[3px] border-gold cursor-zoom-in transition-transform hover:scale-[1.04]"
        >
          <Image
            src={LUGAVE_TOTEM.src}
            alt={LUGAVE_TOTEM.alt}
            fill
            sizes="120px"
            priority
            className="object-cover"
          />
        </button>
        <p className="text-[10px] text-white/40 mb-3">
          Photo: U.S. Fish &amp; Wildlife Service · CC BY 2.0 · Wikimedia Commons
        </p>
        <h1 className="font-serif text-[32px] text-white font-normal mb-1.5">
          Lugave
        </h1>
        <p className="text-[14px] text-white/55 mb-4">
          The Pangolin Clan · Ekika ky&apos;Abeddira Olugave
        </p>
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-[12px] text-white/80 mb-3">
          <strong className="text-gold2">{formatCount(liveCount)}</strong>{" "}
          registered members · One of the six Bannansangwa clans
        </div>
        <br />
        <span className="inline-block bg-gold text-gd text-[11px] font-bold px-3.5 py-1.5 rounded-[3px] tracking-[1px] uppercase mt-3">
          ⚑ Ndugwa — First among the Bataka to speak before the Kabaka
        </span>

        {/* Join CTA — registration is the site's primary goal, so the invite
            sits at the top of the page too (bottom card remains) */}
        <div className="mt-5">
          <Button
            variant="primary"
            onClick={() => router.push("/login")}
          >
            Join the Lugave clan →
          </Button>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-7">

        {/* Info chips */}
        <div className="flex gap-2.5 flex-wrap mb-6">
          {[
            { label: "Omuziro (Primary totem)",    val: "🦔 Lugave — pangolin" },
            { label: "Akabbiro (Secondary totem)", val: "🍄 Maleere — tree mushroom" },
            { label: "Clan head title",            val: "Ndugwa" },
            { label: "Obutaka (Ancestral seat)",   val: "Katende, Mawokota" },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="bg-white border border-eborder rounded-full px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <span className="block text-[10px] text-muted uppercase tracking-[.5px]">
                {label}
              </span>
              <span className="text-[13px] text-gd">{val}</span>
            </div>
          ))}
        </div>

        {/* Source-document credit card — this deep page is built from the clan's own archive */}
        <div
          className="relative overflow-hidden rounded-[6px] p-5 mb-7 border border-gold"
          style={{ background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)" }}
        >
          <span aria-hidden="true" className="absolute right-4 bottom-3 text-[40px] opacity-[.18] pointer-events-none select-none">
            📜
          </span>
          <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-2">
            From the Clan Archives
          </p>
          <h4 className="font-serif text-[17px] text-white font-normal mb-2">
            Ekika ky&apos;Abolugave mu Bwakabaka bwa Buganda (2021)
          </h4>
          <p className="text-[13px] text-white/70 leading-relaxed">
            This page is condensed from the clan&apos;s own 164-page archive, compiled
            by <strong className="text-gold2">Mwalimu R.N. Sserunjogi</strong> for
            the Lugave Clan Archives &amp; Records with the support of the clan&apos;s
            Katikkiro, <strong className="text-gold2">Owek. Godfrey Katende Mukiibi
            (Natiigo)</strong>, and the clan council (Olukiiko lw&apos;Ekika).
            Photographs below are reproduced from the book. Tap any topic to read
            the full entry.
          </p>
        </div>

        {/* ── The archive, as an index of expandable topics ── */}
        <h3
          className="font-serif text-[18px] text-gd font-normal mb-3 pb-2"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          The Lugave Archive — tap a topic to read
        </h3>

        <div className="flex flex-col gap-2.5 mb-8">

          {/* 1 · Clan identity & totems */}
          <ExpandCard
            icon="🦔"
            title="Clan Identity & the Two Totems"
            subtitle="How a shy pangolin on Ssese gave the clan its Omuziro — and a fall from a mushroom tree at Katende gave it the Akabbiro."
          >
            <p>
              Clan tradition traces the totem to the ancestor{" "}
              <strong>Kansonyi</strong>, who as a boy hunting on Ssese Island
              came upon a pangolin curled defensively with its head tucked in —
              recalling a shy child hiding its face. He named the animal after
              that shyness (<em>nsonyi</em>), and his descendants adopted the
              pangolin as their totem.
            </p>
            <p className="mt-2.5">
              The secondary totem, the <strong>maleere</strong> mushroom that
              grows on rotting trees, came later: the founding ancestor{" "}
              <strong>Mukiibi Ssebuko Ndugwa I</strong>, who loved mushrooms,
              insisted on climbing to harvest maleere from a withered branch at
              Katende despite his son Ssimwogerere Mulangwa&apos;s warnings. The
              branch broke, he fell and was badly hurt — and from that day the
              maleere became a second totem for all his descendants. It links
              the clan to the Ntalaganya clan, which shares the same Akabbiro.
            </p>
            <ArchivePhotos
              onOpen={(p) => setLightbox({ src: p.src, alt: p.caption, credit: "Lugave Clan Archives (2021)" })}
              photos={[
                {
                  src: "/images/lugave/pangolin-carving.jpg",
                  w: 449, h: 337,
                  caption: "The Lugave (pangolin) — the clan's Omuziro",
                },
                {
                  src: "/images/lugave/maleere-mushroom.jpg",
                  w: 730, h: 728,
                  caption: "Maleere — the tree mushroom that is the clan's Akabbiro",
                },
              ]}
            />
          </ExpandCard>

          {/* 2 · Omubala */}
          <ExpandCard
            icon="🥁"
            title="Omubala — The Clan Praise Verses"
            subtitle='"Lwa Ndugwa, lwa Katende…" — plus a special drum verse reserved for the Clan Head alone.'
          >
            <p className="text-[12px] text-muted uppercase tracking-[.5px] mb-1.5">
              General clan verse
            </p>
            <blockquote className="border-l-4 border-gold pl-4 py-1 italic text-[15px] text-gd leading-relaxed font-serif">
              &quot;Lwa Ndugwa, lwa Katende. Sseruku lulengejja simanyi
              lunangwiira. Bw&apos;abirya bw&apos;awoza, bwompa akawala ako
              ng&apos;ebbanja liwedde.&quot;
            </blockquote>
            <p className="text-[12px] text-muted uppercase tracking-[.5px] mt-4 mb-1.5">
              Verse of the Omukulu w&apos;Akasolya (Clan Head only)
            </p>
            <blockquote className="border-l-4 border-gold pl-4 py-1 italic text-[15px] text-gd leading-relaxed font-serif">
              &quot;Mpitiriza, mpitiriza abazira. Saagala bati, njagala bazira.
              Kingiringizzi, kingiringizzi.&quot;
            </blockquote>
            <p className="mt-3">
              The verses commemorate real events: the founder&apos;s fall while
              harvesting maleere mushrooms, the debt of a princess (Nakampi)
              paid to Ssese in fulfilment of a royal pledge, and standing calls
              for the clan to guard its dignity, its secrets and its unity.
            </p>
          </ExpandCard>

          {/* 3 · Role in the Kingdom */}
          <ExpandCard
            icon="👑"
            title="Role in the Buganda Kingdom"
            subtitle="Found already settled at Wassozi, Busiro when Kintu organised the clans — and holders of a dozen hereditary offices at the royal court."
          >
            <p>
              Lugave is counted among the six original{" "}
              <strong>Bannansangwa</strong> clans said to have been found
              already settled at Wassozi, Busiro, when Ssekabaka Kintu organised
              Buganda&apos;s clan system. The clan&apos;s most senior
              distinction: the Owessiga of Natiigo, as{" "}
              <strong>Ndugwa</strong>, was historically the first among the
              Bataka to be consulted and to speak before the Kabaka — a role
              that continued until the reign of Ssekabaka Mwanga II.
            </p>
            <p className="mt-2.5 mb-2 font-semibold text-gd">
              Hereditary offices at the royal court:
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                ["Ndugwa (Owessiga Natiigo)", "Overall Clan Head; traditionally first to speak before the Kabaka; historically led installation rites for a new Kabaka"],
                ["Kasujju Lubinga", "Father of the Princes and Princesses of Buganda; installs the new Kabaka on the throne together with Mugema"],
                ["Kawuula", "Chief drummer (Mugoma) of the royal Mujaguzo drums and all royal drums"],
                ["Mpinga", "Senior royal bodyguard inside the Lubiri; responsible for the Mujaguzo ceremony and palace security"],
                ["Ssenkoole", "Keeper of the royal fire (Ekyoto) and all royal fireplaces"],
                ["Nalungu", "Traditionally played the royal board game (omweeso) with the Kabaka as a display of wisdom"],
                ["Kasoma Nakatanza", "Custodian of the King's baskets (ebibbo); historically managed royal wives' affairs and the King's quarters"],
                ["Ssegulu (e Butakana)", "Royal blacksmith; forged the Naluwangula spear presented to the Kabaka at installation"],
                ["Buliba Luggi", "Kept the royal goats (e.g. Namucuccu) offered to the Kabaka during Mujaguzo rites"],
                ["Kabumba Luseke", "One of the King's traditional doctors"],
                ["Kalibakandiga", "Traditional role received during the reign of Ssekabaka Mulondo"],
              ].map(([role, duty]) => (
                <li
                  key={role}
                  className="flex items-start gap-2 text-[13px] px-3 py-2 rounded bg-cream2"
                >
                  <span className="text-gold text-[12px] mt-0.5">⚑</span>
                  <span>
                    <strong className="text-gd">{role}</strong> — {duty}
                  </span>
                </li>
              ))}
            </ul>
            <ArchivePhotos
              onOpen={(p) => setLightbox({ src: p.src, alt: p.caption, credit: "Lugave Clan Archives (2021)" })}
              photos={[
                {
                  src: "/images/lugave/kasujju-lubinga.jpg",
                  w: 1238, h: 1073,
                  caption: "Omutaka Kasujju Lubinga robes the Kabaka in the leopard skin at installation",
                },
                {
                  src: "/images/lugave/kabaka-leopard-skins.jpg",
                  w: 480, h: 721,
                  caption: "The Kabaka enthroned in the leopard and calf skins draped by Kasujju Lubinga",
                },
                {
                  src: "/images/lugave/ssenkoole-procession.jpg",
                  w: 1353, h: 1800,
                  caption: "The Omumbowa Ssenkoole carried in procession — a Lugave office at the royal court",
                },
              ]}
            />
          </ExpandCard>

          {/* 4 · Queens from the clan */}
          <ExpandCard
            icon="👸"
            title="Queens from the Clan (Bannamasole)"
            subtitle="Two royal wives from the Lugave clan bore future Kabakas of Buganda."
          >
            <ul className="flex flex-col gap-1.5">
              <li className="flex items-start gap-2 text-[14px] px-3 py-2 rounded bg-cream2">
                <span className="text-gold text-[12px] mt-0.5">⚑</span>
                <span>
                  <strong className="text-gd">Nabukalu Nabbuto</strong> —
                  daughter of Natiigo; mother of Ssekabaka Kiyimba (by
                  Ssekabaka Kiggala)
                </span>
              </li>
              <li className="flex items-start gap-2 text-[14px] px-3 py-2 rounded bg-cream2">
                <span className="text-gold text-[12px] mt-0.5">⚑</span>
                <span>
                  <strong className="text-gd">Nabukalu Najjuma</strong> —
                  daughter of Kaakikka Mbegera Ndugwa; mother of Ssekabaka
                  Tebandeke (by Ssekabaka Mutebi I)
                </span>
              </li>
            </ul>
          </ExpandCard>

          {/* 5 · Clan head succession */}
          <ExpandCard
            icon="🪶"
            title="The Ndugwa Title — Selection & Succession"
            subtitle="Contrary to common assumption, headship is not simple father-to-son inheritance: the clan council decides."
          >
            <p>
              Succession to the Ndugwa title is decided by the clan council
              (<strong>Olukiiko lw&apos;Ekika</strong>) — made up of the heads
              of the 17 Amasiga and the 6 Emituba Emirangira — chaired by the
              Katikkiro w&apos;Ekika, who is always the Owessiga of Natiigo. A
              candidate must belong to a recognised lineage, and even a will or
              deathbed nomination by a sitting Clan Head does not guarantee
              succession unless the council ratifies it.
            </p>
            <p className="mt-2.5">
              The clan&apos;s own history proves the rule: when{" "}
              <strong>Yowana Ssemakula Ndugwa</strong> (who had only daughters)
              nominated a grandson to succeed him in 1903, the council declined
              and passed headship within the wider Ndugwa lineage. Succession
              disputes are also recorded during the religious wars of
              1885–1894, and again in 1958 and 1986.
            </p>
            <p className="mt-2.5 mb-2 font-semibold text-gd">
              Selected holders of the Ndugwa title:
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                ["Mukiibi Ssebuko Ndugwa I", "Founder of the leadership line; settled at Katende, Mawokota"],
                ["Ssimwogerere Mulangwa Ndugwa", "Early successor in the Ndugwa line"],
                ["Ssimwogerere Kibiina Ndugwa (17th)", "Head during the religious wars (1885–1894); succession disputed after him"],
                ["Aligizanda Katamba Muddembuga Ndugwa", "Born 1861 · installed 4 March 1903 · died 14 January 1958"],
                ["Alexander Katende Mpagi Ndugwa", "Born 1910 · installed 20 July 1956 · later removed amid the 1986 disputes"],
                ["Grace Ssemakula (Musoke) Ndugwa", "Serving Clan Head at the time of the archive; residence at Kibuye, Jjuuko Zone serves as the customary clan seat"],
              ].map(([name, note]) => (
                <li
                  key={name}
                  className="flex items-start gap-2 text-[13px] px-3 py-2 rounded bg-cream2"
                >
                  <span className="text-gold text-[12px] mt-0.5">⚑</span>
                  <span>
                    <strong className="text-gd">{name}</strong> — {note}
                  </span>
                </li>
              ))}
            </ul>
            <ArchivePhotos
              onOpen={(p) => setLightbox({ src: p.src, alt: p.caption, credit: "Lugave Clan Archives (2021)" })}
              photos={[
                {
                  src: "/images/lugave/ndugwa-and-katikkiro.jpg",
                  w: 792, h: 381,
                  caption: "Omutaka Ndugwa Grace Ssemakula (left) and the clan Katikkiro, Omutaka Owessiga Natiigo Godfrey Katende Mukiibi",
                },
                {
                  src: "/images/lugave/grace-ssemakula.jpg",
                  w: 659, h: 440,
                  caption: "Omutaka Grace Ssemakula II — Ndugwa 26 — addressing the clan",
                },
              ]}
            />
          </ExpandCard>

          {/* 6 · Clan structure */}
          <ExpandCard
            icon="🌳"
            title="Clan Structure — 17 Amasiga & 6 Royal Emituba"
            subtitle="Seventeen major lineages plus six royal sub-lineages (Emituba Emirangira), each with its own ancestral seat (Mbuga)."
          >
            <p>
              Every person who takes Lugave as their totem falls under one of
              the clan&apos;s <strong>17 Amasiga</strong> (major lineages —
              explore them branch by branch, down to the individual ennyiriri,
              in the interactive explorer below) or the{" "}
              <strong>6 Emituba Emirangira</strong> (royal sub-lineages
              descended from a prince absorbed into the clan, which require the
              Kabaka&apos;s own recognition).
            </p>
            <p className="mt-2.5 mb-2 font-semibold text-gd">
              The 6 Emituba Emirangira and their seats:
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                ["Kaakikka Mbegera", "Katende (Mabuye), Mawokota — the Mutuba of the sitting Ndugwa"],
                ["Mukungu", "Kaaliro (Villa Maria), Kalungu — Buddu"],
                ["Nnalungu", "Ssumba, Busiro"],
                ["Kalyabukejje", "Kingo, Buddu"],
                ["Ssebiranda", "Kkunywa, Ssingo"],
                ["Nnalukadde", "Bukeerere, Kyaggwe"],
              ].map(([name, seat]) => (
                <li
                  key={name}
                  className="flex items-start gap-2 text-[13px] px-3 py-2 rounded bg-cream2"
                >
                  <span className="text-gold text-[12px] mt-0.5">⚑</span>
                  <span>
                    <strong className="text-gd">{name}</strong> — {seat}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-muted leading-relaxed">
              Lineages 1–5 descend directly from the founder Mukiibi Ssebuko
              Ndugwa; 6–7 were confirmed by Ndugwa Kaakikka Mbegera; 8–15 by
              Ndugwa Aligizanda Muddembuga (1931); 16 by Ndugwa Alexander
              Katende Mpagi (1960); and 17 by Ndugwa Grace Ssemakula, who
              separated it from the Ssebwana lineage.
            </p>
            <ArchivePhotos
              onOpen={(p) => setLightbox({ src: p.src, alt: p.caption, credit: "Lugave Clan Archives (2021)" })}
              photos={[
                {
                  src: "/images/lugave/emituba-lubiri-2017.jpg",
                  w: 1540, h: 568,
                  caption: "Heads of the Lugave lineages at Twekobe, Lubiri – Mmengo, when the clan appeared before Ssaabasajja Kabaka (25 February 2017)",
                },
              ]}
            />
          </ExpandCard>

          {/* 7 · Land & foundation */}
          <ExpandCard
            icon="🏛️"
            title="Clan Land, Office & the Lugave Clan Foundation"
            subtitle="About five titled butaka parcels, safeguarded under the clan's registered legal entity — the Lugave Clan Foundation (LCF)."
          >
            <ul className="flex flex-col gap-1.5">
              {[
                "The clan holds no dedicated formal office; the residence of the sitting Clan Head (at Kibuye, Jjuuko Zone) traditionally serves as the seat of clan business.",
                "A member, Fred Katende, donated the use of a room at Silvertone Gardens, Bulange–Mmengo, as a temporary working office.",
                "Clan-owned (butaka) land totals roughly five titled parcels — including Katende/Mabuye and Sekiwunga (Mpigi), Kapeeka and Nkonya (Wakiso), and Namirembe (Kampala).",
                "Land titles are held in the names of the Clan Head and the Katikkiro w'Ekika, with an oversight committee under the Lugave Clan Foundation (LCF), the clan's registered legal entity.",
                "The clan reports no permanent loss of land beyond parcels sold historically or lost in the political upheavals of 1966–1985.",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[13px] px-3 py-2 rounded bg-cream2"
                >
                  <span className="text-gold text-[12px] mt-0.5">⚑</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </ExpandCard>

          {/* 8 · Notable members */}
          <ExpandCard
            icon="⭐"
            title="Notable Clan Members"
            subtitle="A Katikkiro of Buganda, bishops, MPs, a lieutenant general, educators and entrepreneurs — highlights from the archive's directory."
          >
            {[
              {
                group: "Religious leaders",
                names:
                  "Rt. Rev. Paul Ssemwogerere (Bishop, Kasana-Luweero) · Msgr. John W. Katende · Bishop Kefa Kamya Ssemakula (Church of Uganda) · Sheikh Abudsalaam Mutyaba (Kibuli) · Sr. Immaculate Leticia Nabukalu",
              },
              {
                group: "Chiefs, ministers & royal officials",
                names:
                  "Owek. Joseph Mulwanyammuli Ssemwogerere (Katikkiro of Buganda 1994–2005; co-founder of CBS Radio; Clan Head of Ggere) · Owek. John Washington Katende (former Ssaabawolereza of Buganda) · Owek. Dr. Jones Kyazze (key figure in the UNESCO listing of the Kasubi Tombs) · Owek. Hajji Mustafa Mutyaba · Owek. Hajji Yusuf Ggaganga",
              },
              {
                group: "Politicians & service",
                names:
                  "Hon. Dr. Paul Kawanga Semogerere · Hon. Theodore Ssekikubo MP · Hon. Luttamaguzi Ssemakula MP · Hon. Migadde Ndugwa Robert MP · Hon. Sarah Najjuma MP · Lt. Gen. Proscovia Nalweyiso",
              },
              {
                group: "Education & academia",
                names:
                  "Dr. Lawrence Mukiibi (founder, St. Lawrence Schools & University) · Prof. Suleyman M. Katende · Prof. Erisa Ssemakula · Muhammed Kakiika (Vienna College Namugongo)",
              },
              {
                group: "Business",
                names:
                  "Hajji Musabody Sserunjogi (Musa Body, Katwe) · Al Hajji Haruna Ssemakula (Hill Water) · Mwami Ronald Migadde (Romi's Wine) · Ssalongo Mukiibi Muzzang'anda (Kikuubo)",
              },
            ].map(({ group, names }) => (
              <div key={group} className="mb-3">
                <p className="text-[12px] text-muted uppercase tracking-[.5px] mb-1">
                  {group}
                </p>
                <p className="text-[13px] leading-relaxed">{names}</p>
              </div>
            ))}
            <ArchivePhotos
              onOpen={(p) => setLightbox({ src: p.src, alt: p.caption, credit: "Lugave Clan Archives (2021)" })}
              photos={[
                {
                  src: "/images/lugave/mulwanyammuli-ddamula.jpg",
                  w: 1320, h: 880,
                  caption: "Owek. Joseph Mulwanyammuli Ssemwogerere receives the Ddamula from Ssaabasajja Kabaka as Katikkiro of Buganda, 1994",
                },
              ]}
            />
          </ExpandCard>
        </div>

        {/* Interactive lineage explorer — Essiga → Emituba → Ennyiriri, from
            lib/lugaveLineage.ts (extracted from the 2021 clan archive). This
            replaced the earlier flat amasiga grid that read from clans.ts. */}
        <LugaveLineageExplorer />

        {/* Taboos */}
        <div className="mb-8">
          <h3
            className="font-serif text-[18px] text-gd font-normal mb-3 pb-2"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            Taboos (Mizizo)
          </h3>
          <ul className="flex flex-col gap-1.5">
            {[
              "A Lugave member may not eat or harm the pangolin (omuziro)",
              "A Lugave member may not eat the maleere mushroom (akabbiro)",
              "A Lugave member may not marry another Lugave — clan exogamy is strictly observed",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-[14px] px-3 py-2 rounded bg-cream2"
              >
                <span className="text-gold text-[12px]">⚑</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Join CTA */}
        <div
          className="rounded-[6px] p-6 text-center mt-7"
          style={{ background: "var(--gd)" }}
        >
          <h3 className="font-serif text-[20px] text-white font-normal mb-2">
            This is your clan.
          </h3>
          <p className="text-[14px] text-white/70 mb-4 leading-relaxed">
            Save your profile to learn more, get notified by your Omutaka, and
            join <strong className="text-gold2">{formatCount(liveCount)} Abagave</strong>{" "}
            already here. Sign up in under 60 seconds.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push("/login")}
          >
            Join your clan →
          </Button>
        </div>
      </div>

      {lightbox && <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

// ── Local helper components ──────────────────────────────────────────────────

interface ArchivePhoto {
  src: string;
  w: number;
  h: number;
  caption: string;
}

// ArchivePhotos: photographs reproduced from the 2021 clan book, with captions.
// Rendered inside the expanded body of a topic card. Tapping a photo opens it
// full-screen via the page-level lightbox.
function ArchivePhotos({
  photos,
  onOpen,
}: {
  photos: ArchivePhoto[];
  onOpen: (photo: ArchivePhoto) => void;
}) {
  return (
    <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {photos.map((photo) => {
        const { src, w, h, caption } = photo;
        return (
          <figure key={src} className="m-0">
            <button
              type="button"
              onClick={() => onOpen(photo)}
              aria-label={`View photo full-screen: ${caption}`}
              className="block w-full cursor-zoom-in"
            >
              <Image
                src={src}
                width={w}
                height={h}
                alt={caption}
                className="w-full h-auto rounded-[5px] border border-eborder"
              />
            </button>
            <figcaption className="text-[11px] text-muted mt-1.5 leading-snug">
              {caption} · <em>Lugave Clan Archives (2021)</em>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

// ExpandCard: the click-to-reveal pattern for this page.
// Collapsed = title + one-line subtitle (the summary). Clicking the header
// toggles the full archive entry (text + photographs) open or closed.
function ExpandCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-eborder rounded-[6px] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 text-left px-4 py-3.5 bg-transparent border-0 cursor-pointer hover:bg-cream2 transition-colors"
      >
        <span className="text-[22px] shrink-0 mt-0.5">{icon}</span>
        <span className="flex-1 min-w-0">
          <span className="block font-serif text-[16px] text-gd leading-snug">
            {title}
          </span>
          {/* The subtitle is the always-visible one-line summary of this topic */}
          <span className="block text-[12.5px] text-muted leading-snug mt-0.5">
            {subtitle}
          </span>
        </span>
        <span
          className="text-gold text-[14px] shrink-0 mt-1 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          className="px-4 pb-4 pt-1 text-[14px] text-gd leading-relaxed"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}
