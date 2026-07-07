"use client";

import Image from "next/image";
import Link from "next/link";

// The /kabaka page — content condensed from "The Kabaka of Buganda:
// History, Role, and Legacy of the Throne" (Kingdom of Buganda reference
// document), merged with the former /queens page ("The Queen(s) of Buganda:
// Nnabagereka, Namasole, and Lubuga," Buganda Kingdom Reference Series —
// session 2026-07, /queens redirects here now). Structure: royal hero with
// portrait → what the title means → origins → king-list & turning points →
// restoration → role today → achievements → the three royal women
// (Nnabagereka, Namasole, Lubuga) → why women held such power → symbols &
// succession → quick reference → links to /abalangira and /abakungu.
//
// Naming convention (project rule): the reigning king is always written with
// his titles — "Ssabasajja Kabaka Ronald Muwenda Mutebi II"; deceased kings
// carry "Ssekabaka"; historical reigns keep the "Kabaka" prefix. Queen
// titles always accompany names too — Nnabagereka Sylvia Nagginda Luswata.
//
// Data caution (mirrors the Bataka view's "living record" approach): the
// current Namasole succession after Margaret Siwoza is provisional per the
// source document — do not present a settled name.
export function KabakaContent() {
  return (
    <>
      {/* Hero — royal blue marks Kingdom-administration pages (same as /amasaza) */}
      <div
        className="px-6 py-10 border-b-4 border-gold"
        style={{ background: "var(--royal)" }}
      >
        <div className="max-w-[860px] mx-auto flex flex-wrap items-center justify-center gap-7">
          {/* Ceremonial portrait — Commons photo, CC BY-SA attribution kept below */}
          <figure className="shrink-0 text-center m-0">
            <div className="relative w-[190px] h-[290px] rounded-[8px] overflow-hidden border-[3px] border-gold shadow-lg mx-auto">
              <Image
                src="/images/kabaka/kabaka-mutebi-portrait.jpg"
                alt="Ssabasajja Kabaka Ronald Muwenda Mutebi II in ceremonial regalia"
                fill
                priority
                sizes="190px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="text-[9px] text-white/40 mt-1.5 tracking-[.5px]">
              Photo: Saidi Hussen · Wikimedia Commons · CC BY-SA 4.0
            </figcaption>
          </figure>

          <div className="text-center max-w-[480px]">
            <p className="text-[11px] text-gold2 tracking-[2.5px] uppercase mb-2">
              Kabaka wa Buganda · King of Buganda
            </p>
            <h1 className="font-serif text-[30px] text-white font-normal leading-tight mb-2">
              Ssabasajja Kabaka
              <br />
              Ronald Muwenda Mutebi II
            </h1>
            <p className="text-[14px] text-white/65 mb-3">
              36th Kabaka of Buganda · Reigning since 31 July 1993, the day the
              throne was restored after 27 years of abolition.
            </p>
            <p className="text-[12px] text-gold2 tracking-[.5px]">
              Seat of government: Bulange, Mmengo · Parliament: the Lukiiko
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-7">

        {/* ── What the title means ── */}
        <Section title="What the Title Means">
          <p>
            <strong>Kabaka</strong> is the title borne by the King of Buganda,
            the largest of Uganda&apos;s traditional kingdoms. The office is
            hereditary, passed down through a single royal clan known as the{" "}
            <strong>Olulyo Olulangira</strong> — a clan reserved exclusively
            for the king&apos;s descendants, whose male members are called{" "}
            <strong>abalangira</strong> (princes) and whose female members are
            called <strong>abambejja</strong> (princesses). Unlike
            Buganda&apos;s fifty-plus ordinary clans, the royal clan has no
            totem, since the Kabaka stands above the clan system he presides
            over.
          </p>
          <p className="mt-2.5">
            Buganda tradition also recognises a parallel, purely spiritual
            kingship carried by the Royal Drums (<strong>Mujaguzo</strong>) and
            a ceremonial figure known as the <strong>Juma Katebe</strong>, a
            tradition dating to the early 18th century. This spiritual office
            runs alongside — but is distinct from — the living, reigning
            Kabaka.
          </p>
          <p className="mt-2.5">
            The Kabaka&apos;s own clan — the{" "}
            <strong>Olulyo Olulangira</strong>, whose members are the{" "}
            <strong>Abalangira</strong> (princes) and{" "}
            <strong>Abambejja</strong> (princesses) — has its own full
            reference page, covering its titles, governance, marriage customs
            and succession rules in depth:{" "}
            <Link href="/abalangira" className="text-royal2 font-semibold underline decoration-gold/50 hover:decoration-gold">
              The Royal Clan — Abalangira n&apos;Abambejja →
            </Link>
          </p>
        </Section>

        {/* ── Origins ── */}
        <Section title="Origins & Early History">
          <p>
            Oral tradition traces the Buganda dynasty to{" "}
            <strong>Kabaka Kato Kintu</strong>, who is said to have arrived
            from the northeast around the 13th–14th century and unified a
            patchwork of small clan-based chiefdoms into a single centralised
            kingdom. From this founding, Buganda developed one of the most
            sophisticated pre-colonial state systems in the African Great
            Lakes region — organised around a strong, appointed (rather than
            purely inherited) chieftaincy structure, a standing military built
            on war canoes, and tribute networks that projected Buganda&apos;s
            influence over neighbours such as Busoga and, at various points,
            Bunyoro.
          </p>
          <p className="mt-2.5">
            By the 18th and 19th centuries Buganda had become the dominant
            power on the northern shore of Lake Victoria. Explorer Henry
            Morton Stanley, visiting in 1875, estimated its population at
            roughly two million people commanded by an army of some 125,000
            men.
          </p>
        </Section>

        {/* ── King-list & turning points ── */}
        <Section title="Notable Kings & Turning Points">
          <p className="mb-3">
            Buganda counts <strong>36 Kabakas</strong> in its traditional
            king-list, running continuously from Kabaka Kato Kintu to the
            present reign:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd w-10">No.</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Kabaka</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Approx. Period / Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Kabaka Kato Kintu", "Early 14th century — founder of the dynasty, unified the clans"],
                  ["2", "Kabaka Cwa I Nabakka", "Mid-14th century"],
                  ["3", "Kabaka Kimera", "c. 1374"],
                  ["…", "…", "Traditional king-list continues through roughly 30 intervening reigns"],
                  ["30", "Kabaka Ssuuna II", "19th century — reign associated with the naming of Mulago hill"],
                  ["31", "Kabaka Muteesa I", "1856–1884 — opened Buganda to Arab traders, Christian missionaries and European explorers"],
                  ["32", "Kabaka Mwanga II", "1884–1897 — reign marked by the killing of the Uganda Martyrs and resistance to British colonial encroachment"],
                  ["33", "Kabaka Daudi Chwa II", "1897–1939 — reigned through the colonial protectorate period"],
                  ["34", "Ssekabaka Sir Edward Muteesa II", "1939–1966/69 — became Uganda's ceremonial President in 1963; deposed in 1966, died in exile in London in 1969"],
                  ["35", "—", "1966–1993 — the monarchy was abolished; no reigning Kabaka"],
                  ["36", "Ssabasajja Kabaka Ronald Muwenda Mutebi II", "1993–present — restored the throne on 31 July 1993"],
                ].map(([no, name, notes]) => (
                  <tr key={no + name} className="bg-white">
                    <td className="border border-eborder px-3 py-2 text-muted">{no}</td>
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            <strong>Kabaka Muteesa I</strong> (r. 1856–1884) presided over
            Buganda&apos;s first sustained contact with the outside world,
            hosting Arab traders and later opening the kingdom to Christian
            missionaries and explorers such as Stanley and Speke. His
            successor, <strong>Kabaka Mwanga II</strong>, is remembered for
            the killing of the Uganda Martyrs in 1885–87 and his resistance to
            the expanding British colonial presence, which eventually cost him
            his throne.
          </p>
          <p className="mt-2.5">
            <strong>Ssekabaka Sir Edward Muteesa II</strong> — grandfather of
            the current king — served through the twilight of colonial rule
            and briefly as Uganda&apos;s first ceremonial President after
            independence in 1962. In 1966, Prime Minister Milton Obote&apos;s
            government stormed the Lubiri (royal palace), forcing him into
            exile in London, where he died in 1969. Obote abolished all of
            Uganda&apos;s traditional kingdoms, ending the monarchy for 27
            years.
          </p>
        </Section>

        {/* ── Restoration ── */}
        <Section title="Restoration & the Present Reign">
          {/* Touring photo floats the text on wide screens; stacks on mobile */}
          <figure className="m-0 mb-3 md:float-right md:ml-4 md:mb-2 md:w-[340px]">
            <div className="relative w-full aspect-[3/2] rounded-[6px] overflow-hidden border border-eborder">
              <Image
                src="/images/kabaka/kabaka-mutebi-touring.jpg"
                alt="Ssabasajja Kabaka Ronald Muwenda Mutebi II touring Buganda in ceremonial dress"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-[10px] text-muted mt-1 tracking-[.3px]">
              Ssabasajja Kabaka Ronald Muwenda Mutebi II touring Buganda ·
              Photo: Saidi Hussen · Wikimedia Commons · CC BY-SA 4.0
            </figcaption>
          </figure>
          <p>
            Following the return of relative political stability, the Buganda
            monarchy was formally restored on <strong>31 July 1993</strong>.{" "}
            <strong>Ssabasajja Kabaka Ronald Muwenda Mutebi II</strong> — born
            13 April 1955 at Mulago Hospital, Kampala, while his father was in
            exile — was enthroned as the 36th Kabaka, inheriting a kingdom
            that had to be rebuilt institutionally almost from scratch after
            nearly three decades of abolition.
          </p>
          <p className="mt-2.5">
            Since 1993, the Kabaka has overseen what is widely described as a
            cultural and institutional renaissance: rebuilding the
            kingdom&apos;s administrative structures, reviving ceremonial and
            clan institutions, and re-establishing Buganda as a unifying
            cultural symbol for the Baganda people, who number in the millions
            and make up roughly a quarter of Uganda&apos;s population.
          </p>
          <div className="clear-both" />
        </Section>

        {/* ── Role today ── */}
        <Section title="Role & Powers Today">
          <p className="mb-3">
            Modern Buganda is a constitutional, cultural monarchy operating
            inside the Republic of Uganda. The Kabaka is the kingdom&apos;s
            Head of State but does not govern day to day; that executive
            responsibility is delegated to the{" "}
            <Link href="/abakungu" className="text-royal2 font-semibold underline decoration-gold/50 hover:decoration-gold">
              Katikkiro (Prime Minister)
            </Link>
            , who heads a Cabinet of ministers. Legislative oversight sits
            with the Lukiiko, Buganda&apos;s parliament, while the{" "}
            <Link href="/abakungu" className="text-royal2 font-semibold underline decoration-gold/50 hover:decoration-gold">
              18 traditional counties (Amasaza)
            </Link>{" "}
            are administered by county chiefs who report through the
            Katikkiro&apos;s government.
          </p>
          <ul className="list-none flex flex-col gap-1.5 p-0 m-0">
            {[
              "Ceremonial and symbolic Head of State of the Buganda cultural institution",
              "Custodian of the Mujaguzo royal drums and the kingdom's regalia",
              "Final authority in matters of clan leadership, royal succession and cultural protocol",
              "Appoints the Katikkiro and, by extension, shapes the direction of the kingdom's government",
              "Supreme patron of Buganda's cultural, health and development initiatives",
              "Formally excluded from partisan national politics under the terms of the kingdom's restoration",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] px-3.5 py-2.5 text-[13px] text-gd leading-relaxed"
              >
                <span className="text-gold shrink-0 mt-0.5">👑</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Achievements ── */}
        <Section title="Achievements Under Ssabasajja Kabaka Mutebi II">
          <p className="mb-3">
            The Kabaka&apos;s 30-plus year reign has centred on rebuilding
            what abolition dismantled and positioning Buganda as a stabilising
            cultural force within modern Uganda:
          </p>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {[
              ["🏛️ Institutions rebuilt", "The Lukiiko, the Katikkiro's cabinet, and the county administrative system restored largely from zero after the 1966–1993 abolition."],
              ["🕍 Kasubi Royal Tombs", "Championed the reconstruction of the UNESCO World Heritage Site after the devastating fire of March 2010."],
              ["🎗️ HIV/AIDS advocacy", "Positioned the throne as a continental advocate in the fight against HIV/AIDS, lending his name to large-scale public-health mobilisation."],
              ["🏃 Mass cultural events", "Unifying figurehead behind the Kabaka Birthday Run and the Masaza Cup, drawing hundreds of thousands of participants annually."],
              ["🌍 Land & assets", "Presided over the reclamation of assets and land historically belonging to the kingdom, in partnership with his Katikkiros."],
              ["🗣️ Language & custom", "Sustained Buganda's role as custodian of Luganda, clan heritage and Buganda customary law across a generation that grew up without a reigning king."],
              ["👸 The Nnabagereka", "Marriage alliance and public partnership with Queen Sylvia Nagginda, who has built her own platform on child welfare and literacy."],
            ].map(([head, body]) => (
              <div key={head} className="bg-white border border-eborder rounded-[5px] px-3.5 py-3">
                <h4 className="text-[13px] text-gd font-semibold mb-1">{head}</h4>
                <p className="text-[12px] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════════════
            The Three Royal Women — merged from the former /queens page
            (session 2026-07). Buganda has no single "Queen": the
            Nnabagereka (Queen Consort), Namasole (Queen Mother) and Lubuga
            (Queen Sister) each carry a distinct title, source of authority,
            and relationship to the Kabaka. Placed here, right after the
            Kabaka's own achievements (which already teases the Nnabagereka
            partnership), and before the succession-mechanics section below.
            ══════════════════════════════════════════════════════════════ */}

        {/* ── Three crowns overview ── */}
        <Section title="Three Women, Three Crowns">
          <p>
            Buganda tradition does not have a single &quot;Queen.&quot;
            Precolonial and present-day Buganda instead recognises{" "}
            <strong>three women of national rank</strong>, each with a
            distinct title, a distinct source of authority, and a distinct
            relationship to the Kabaka. The Baganda considered the Kabaka, the
            Namasole (his mother), and the Lubuga (his sister) as forming a
            group so powerful that, in the oldest accounts, all three could be
            referred to as &quot;Kabaka.&quot;
          </p>
          <p className="mt-2.5">
            A fourth title, <strong>Nnabagereka</strong>, was created only in
            the twentieth century for the King&apos;s wife — and it is this
            title that is most often translated into English simply as
            &quot;Queen of Buganda&quot; today.
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd w-[130px]"></th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Nnabagereka</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Namasole</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Lubuga</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["English gloss", "Queen Consort", "Queen Mother", "Queen Sister"],
                  ["Relation to Kabaka", "Wife", "Mother", "Sister (or close paternal-line kinswoman)"],
                  ["Origin of title", "Created early 20th century; first held by Irene Namaganda", "Ancient, pre-colonial", "Ancient, pre-colonial"],
                  ["Traditional seat", "Bulange / Nnabagereka's palace", "Her own hill and palace, separate court", "Own palace, roughly twice the size of an ordinary wife's"],
                  ["Historic powers", "Largely ceremonial and social in origin", "Own chiefs, courts, tax collection, intelligence network", "Owned land and estates nationwide, own chiefs and courts"],
                  ["Current holder (2026)", "Nnabagereka Sylvia Nagginda Luswata", "Margaret Siwoza's successor (by inheritance — see note below)", "Nnalinya Agnes Nabaloga (as reported)"],
                ].map(([label, a, b, c]) => (
                  <tr key={label} className="bg-white align-top">
                    <td className="border border-eborder px-3 py-2 text-[11px] uppercase tracking-[.5px] text-muted">{label}</td>
                    <td className="border border-eborder px-3 py-2 text-gd leading-relaxed">{a}</td>
                    <td className="border border-eborder px-3 py-2 text-gd leading-relaxed">{b}</td>
                    <td className="border border-eborder px-3 py-2 text-gd leading-relaxed">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Nnabagereka: origins ── */}
        <Section title="The Nnabagereka — Origins of the Title">
          <p>
            Before the twentieth century, the King&apos;s principal wife held
            no special national title. She was called{" "}
            <strong>Kaddulubaale</strong> — the same designation used for the
            principal wife in any Muganda household of standing: a domestic
            rank, not a state office. Real institutional power among royal
            women rested with the Namasole and the Lubuga.
          </p>
          <p className="mt-2.5">
            This changed under Kabaka Daudi Chwa II (r. 1897–1939). His wife,{" "}
            <strong>Irene Drusilla Namaganda</strong>, became the first royal
            wife to be treated as foremost among Buganda&apos;s women, and the
            title <strong>Nnabagereka</strong> — originally a girl&apos;s
            given name from the Mmamba clan tradition — was adopted as the
            formal title for this new office. Namaganda later became Namasole
            (Queen Mother) herself when her son, Ssekabaka Sir Edward Muteesa
            II, ascended the throne — the only woman on record to have held
            both titles in succession.
          </p>
        </Section>

        {/* ── Current Nnabagereka ── */}
        <Section title="The Current Nnabagereka: Sylvia Nagginda Luswata">
          <p>
            <strong>Nnabagereka Sylvia Nagginda Luswata</strong> (born 9
            November 1962 in England) is the Queen of Buganda as the wife of
            the reigning king, Ssabasajja Kabaka Ronald Muwenda Mutebi II.
            She was raised in Uganda by her maternal grandparents of the
            Omusu clan, attending Lake Victoria Primary School in Entebbe,
            Gayaza Junior School, and Wanyange Girls&apos; School before
            continuing her studies in the United States.
          </p>
          <ul className="list-none flex flex-col gap-1.5 p-0 m-0 mt-3">
            {[
              "Associate degree with honours from LaGuardia Community College, City University of New York",
              "Bachelor of Arts from New York University",
              "Master of Arts, with distinction, in Mass Communication from the New York Institute of Technology",
              "Worked at the United Nations headquarters in New York as a Public Information Officer and Research Consultant, then as a proposal writer and public-relations consultant, before returning to Uganda after eighteen years in the United States",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] px-3.5 py-2.5 text-[13px] text-gd leading-relaxed"
              >
                <span className="text-gold shrink-0 mt-0.5">🎓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              Her engagement to Ssabasajja Kabaka Ronald Muwenda Mutebi II was
              announced on 14 February 1999, and the couple married on{" "}
              <strong>27 August 1999 at St. Paul&apos;s Cathedral,
              Namirembe</strong> — the first royal wedding of a Nnabagereka in
              fifty years. On 4 July 2001, in London, she gave birth to{" "}
              <strong>Princess Katrina Sarah Ssangalyambogo</strong>; she is
              also stepmother to the Kabaka&apos;s other children.
            </p>
          </div>
          <p className="mt-3 text-[12px] text-muted leading-relaxed italic">
            A note on sources: two references give slightly different birth
            years for the Nnabagereka (1962 and 1964). This page follows the
            more thoroughly sourced entry (1962).
          </p>
        </Section>

        {/* ── Public role & achievements ── */}
        <Section title="The Nnabagereka's Public Role & Achievements">
          {/* Standing photo floats the text on wide screens; stacks on mobile */}
          <figure className="m-0 mb-3 md:float-right md:ml-4 md:mb-2 md:w-[240px]">
            <div className="relative w-full aspect-[3/5] rounded-[6px] overflow-hidden border border-eborder">
              <Image
                src="/images/queens/nnabagereka-portrait.jpg"
                alt="Nnabagereka Sylvia Nagginda Luswata receiving a Commonwealth Games Uganda delegation"
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="text-[10px] text-muted mt-1 tracking-[.3px]">
              Nnabagereka Sylvia Nagginda Luswata · Photo: Samson Ssemakadde ·
              Wikimedia Commons · CC0
            </figcaption>
          </figure>
          <p className="mb-3">
            Widely referred to in Buganda as{" "}
            <strong>&quot;Maama wa Buganda&quot;</strong> (Mother of the
            Buganda Nation), she is the first Nnabagereka in the
            kingdom&apos;s history to establish a fully staffed office of her
            own, based at Bulange, the seat of the kingdom&apos;s government:
          </p>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {[
              ["💛 Nnabagereka Development Foundation", "Founded in 2000 — a charitable organisation registered in both Uganda and the United States, working in education, skilling, and healthcare."],
              ["🏕️ Ekisaakaate kya Nnabagereka", "Annual mentorship and leadership camp (every January since 2007) teaching Buganda cultural values, etiquette and life skills to tens of thousands of young people through the Obuntubulamu framework."],
              ["🌍 UNFPA Goodwill Ambassador", "For the United Nations Population Fund, focused on girls' education."],
              ["👑 African royal networks", "Founding member of the African Queens and Women Cultural Leaders Network; co-founder and patron of African Royals for Culture and Development."],
              ["🤝 Patronages", "Hospice Africa Uganda, ChildFund International Uganda, the Makerere University Female Scholarship Initiative, and the Buganda Kingdom Tourism Board, among others."],
              ["🩰 Kampala Ballet & Modern Dance School", "Founded the first institution of its kind in Uganda."],
              ["📖 Autobiography", "Life, Passion, Duty (March 2023) — reportedly topped Amazon's Historical Biographies new-release list for over a month."],
            ].map(([head, body]) => (
              <div key={head} className="bg-white border border-eborder rounded-[5px] px-3.5 py-3">
                <h4 className="text-[13px] text-gd font-semibold mb-1">{head}</h4>
                <p className="text-[12px] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="clear-both" />
          <p className="mt-3 text-[13px] text-muted leading-relaxed">
            Buganda&apos;s traditional kingdoms were abolished under Milton
            Obote and restored — in a strictly cultural and ceremonial
            capacity — in 1993. It is within this restored kingdom that the
            Nnabagereka has built the modern, publicly visible role of Queen
            Consort: a role now arguably more externally prominent than the
            historically more powerful, but lower-profile, offices of
            Namasole and Lubuga below.
          </p>
        </Section>

        {/* ── Namasole ── */}
        <Section title="The Namasole — Queen Mother">
          <p>
            The Namasole is the Kabaka&apos;s mother — but the title is{" "}
            <strong>an office, not merely a biological relationship</strong>.
            It is inherited: when a Namasole dies, a sister or woman of the
            same clan lineage takes over the title, its estates, and its
            ceremonial duties, whether or not she is the birth mother of the
            reigning king.
          </p>
          <p className="mt-2.5">
            In precolonial Buganda the Namasole was arguably the{" "}
            <strong>second most powerful figure in the kingdom</strong> after
            the Kabaka himself. She held her own court on a separate hill,
            appointed her own chiefs and ministers, granted land, collected
            her own taxes and tribute, and ran an intelligence network
            described by palace tradition as a listening-post system to detect
            plots against the throne. When the Kabaka was away, the Namasole
            was treated as standing in his place — and she could act as a
            kingmaker, mobilising her lineage behind her son&apos;s claim.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              A defining rule of the office was that a Namasole could not
              remarry after her son became king — the saying{" "}
              <strong>&quot;Kabaka taddwaako mukopi&quot;</strong> (&quot;the
              King cannot have a commoner for a sibling&quot;) captures the
              reasoning. Ssekabaka Sir Edward Muteesa II broke with this norm
              in 1941, permitting his mother, Irene Namaganda, to remarry — a
              scandal at the time (the &quot;1941 Nnamasole Crisis&quot;) that
              led the kingdom to transfer her ceremonial duties to her elder
              sister, Perepetwa Nnaabaweesi, while she retained the title.
            </p>
          </div>
          <p className="mt-3 mb-2 font-semibold text-gd">
            Line of succession in living memory:
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              ["Sarah Lule Kisosonkole", "Biological mother of Ssabasajja Kabaka Ronald Muwenda Mutebi II; died in 1974, when the future Kabaka was 19"],
              ["Rebecca Zirimbuga Musoke", "Heir to Kisosonkole; served as Namasole until her death on 21 June 2013"],
              ["Margaret Siwoza", "Succeeded Zirimbuga in 2013; served as the Kabaka's caretaker Namasole until her death"],
              ["Successor within the inheriting lineage", "Per Buganda custom, the title passes to Siwoza's designated successor"],
            ].map(([name, note], i) => (
              <div
                key={name}
                className="flex items-start gap-3 bg-white border border-eborder rounded-[5px] px-4 py-2.5"
              >
                <span className="text-[11px] font-bold text-royal2 tracking-[1px] uppercase w-5 shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="font-serif text-[14px] text-gd block">{name}</span>
                  <span className="text-[12px] text-muted leading-relaxed">{note}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Provisional-data note — same living-record honesty as the Bataka view */}
          <p className="mt-3 text-[12px] text-muted leading-relaxed italic">
            A note on currency: the exact current holder after Margaret Siwoza
            was not confirmed in the sources available when this page was
            compiled, and reporting on the year of Siwoza&apos;s death is
            inconsistent. The most recent entry above is provisional pending a
            formal Buganda Kingdom announcement.
          </p>
        </Section>

        {/* ── Lubuga ── */}
        <Section title="The Lubuga — Queen Sister">
          <p>
            The <strong>Lubuga</strong> (also referred to by the related title{" "}
            <strong>Nnalinya</strong>) is a sister — or close kinswoman of the
            same paternal lineage — of the Kabaka, installed alongside him
            and, in the oldest tradition, taking a coronation oath with him.
            She was never merely ceremonial: the Lubuga held land and estates
            in every district of the kingdom, ran her own courts, and
            appointed her own chiefs carrying the same titles as the
            King&apos;s chiefs. Her palace was said to be roughly twice the
            size of an important wife&apos;s household. For her own subjects
            she — like the Namasole — was the final authority and arbiter,
            effectively co-holding the throne with her brother.
          </p>
          <p className="mt-2.5">
            In some accounts the Lubuga is distinguished from the Nnalinya,
            with the Nnalinya specifically responsible for the royal tombs,
            but usage varies and the two titles are frequently treated as
            equivalent in modern reporting. The current Lubuga/Nnalinya is
            reported as <strong>Nnalinya Agnes Nabaloga</strong>.
          </p>
        </Section>

        {/* ── Why women held such power ── */}
        <Section title="Why Women Held Such Power in Old Buganda">
          <p>
            Scholarship on Buganda notes that this triad of powerful royal
            women is unusual for a kingdom otherwise organised as strongly
            hierarchical and patriarchal. Historians trace the arrangement to
            Buganda&apos;s early history — women are recorded as having served
            as war leaders and even, according to tradition, as reigning
            monarchs in the 13th to 15th centuries. The authority of the
            Namasole and Lubuga persisted for centuries as a structural
            counterbalance to the King&apos;s power —{" "}
            <strong>separate from and not derived from him</strong>.
          </p>
          <p className="mt-2.5">
            That authority eroded from the 1700s–1800s onward, as hereditary
            chiefs (batongole) accumulated land and labour once managed
            communally through the clans, and as expanding royal polygyny
            diluted the standing of any one wife or female relative. British
            colonial rule accelerated the decline: the 1900 Uganda Agreement
            formalised the power of chiefs and the Katikkiro at the expense of
            the traditional offices, including the Namasole and Lubuga, whose
            practical governing power was steadily displaced even as their
            ceremonial rank endured.
          </p>
        </Section>

        {/* ── Symbols & succession ── */}
        <Section title="Symbols, Succession & Cultural Significance">
          <p>
            The Kabaka&apos;s authority is carried in a set of enduring
            symbols: the <strong>Mujaguzo drums</strong> representing the
            eternal, spiritual side of the kingship; the{" "}
            <strong>Kasubi Tombs</strong> as the resting place — in tradition,
            the place where past kings are said to be &quot;lost in the
            forest&quot; rather than to have died — of four former kings; and
            the coronation ritual (<strong>Okugula Obwakabaka</strong>)
            performed at Naggalabi, Busiro, a ceremony essentially unchanged
            since the 18th century.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>Succession does not follow a fixed order of birth.</strong>{" "}
              All princes are considered eligible; a council of elders observes
              their character during the reigning king&apos;s lifetime, and the
              identity of the chosen heir is traditionally kept secret until
              the moment of the old king&apos;s burial. The firstborn prince,
              called <strong>Kiweewa</strong>, is deliberately excluded from
              succession and instead given a distinct ceremonial role — a
              safeguard against succession violence dating back centuries.
            </p>
          </div>
          <p className="mt-3">
            Because the throne has no political mandate under Uganda&apos;s
            national constitution, its enduring relevance rests almost
            entirely on cultural legitimacy: the loyalty Baganda feel is
            expressed through service to the Kabaka and the kingdom rather
            than through any formal legal power — a dynamic that has held
            since long before colonial rule and that the 1993 restoration was
            designed to preserve.
          </p>
        </Section>

        {/* ── Quick reference ── */}
        <Section title="Quick Reference">
          <div className="bg-white border border-eborder rounded-[5px] divide-y divide-eborder">
            {[
              ["Full title", "Kabaka wa Buganda (King of Buganda)"],
              ["Current holder", "Ssabasajja Kabaka Ronald Muwenda Mutebi II, 36th Kabaka"],
              ["Reign", "Since 31 July 1993 (restoration of the monarchy)"],
              ["Royal clan", "Olulyo Olulangira (no totem)"],
              ["Nnabagereka (Queen Consort)", "Sylvia Nagginda Luswata — \"Maama wa Buganda\" — married 27 August 1999"],
              ["Namasole (Queen Mother)", "Successor to Margaret Siwoza — provisional, see note above"],
              ["Lubuga (Queen Sister)", "Nnalinya Agnes Nabaloga (as reported)"],
              ["Seat of government", "Bulange, Mmengo, Kampala"],
              ["Head of Government", "The Katikkiro — Owek. Charles Peter Mayiga"],
              ["Parliament", "The Lukiiko"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap gap-x-4 gap-y-0.5 px-4 py-2.5">
                <span className="text-[11px] uppercase tracking-[1px] text-muted w-[190px] shrink-0 pt-0.5">
                  {label}
                </span>
                <span className="text-[13px] text-gd font-medium flex-1 min-w-[200px]">{value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Cross-links to the companion pages */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <Link
            href="/abalangira"
            className="block text-center bg-white border border-eborder rounded-[6px] px-5 py-4 no-underline hover:border-gold transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[1.5px] text-muted block mb-1">
              Companion page
            </span>
            <span className="font-serif text-[17px] text-gd">
              The Royal Clan — Abalangira n&apos;Abambejja →
            </span>
          </Link>
          <Link
            href="/abakungu"
            className="block text-center bg-white border border-eborder rounded-[6px] px-5 py-4 no-underline hover:border-gold transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[1.5px] text-muted block mb-1">
              Companion page
            </span>
            <span className="font-serif text-[17px] text-gd">
              Abakungu ba Ssaabasajja — Owek. Charles Peter Mayiga →
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

// Section: titled content block with a ruled bottom border — same pattern as /amasaza
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3
        className="font-serif text-[18px] text-gd font-normal mb-3 pb-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {title}
      </h3>
      <div className="text-[14px] text-gd leading-relaxed">{children}</div>
    </div>
  );
}
