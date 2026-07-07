"use client";

import Image from "next/image";
import Link from "next/link";
import { AmasazaGrid } from "@/components/clans/AmasazaGrid";

// The /abakungu page — "Abakungu ba Ssaabasajja," the Kabaka's network of
// personal representative chiefs. Replaces two former standalone tabs:
//
// - /katikkiro: per "Abakungu_ba_Ssaabasajja" (research note, July 2026),
//   the network is administratively headed by the Katikkiro, so his full
//   profile now leads this page, followed by the rest of the network the
//   PDF documents — the Ssaabasajja honorific, the
//   Kabaka→Katikkiro→Ssaza→Gombolola→Muluka(→Kyalo) hierarchy, named
//   chiefs in contested territories (Buluuli, Kooki) and elsewhere, and
//   the fully documented UK diaspora structure under BugandaUK.
// - /amasaza: the Ssaza (county) chiefs this network installs and confirms
//   ARE the same 18 Amasaza, so that page's territorial content (what the
//   Amasaza are, the "Lost Counties," the 18-county grid, Ssese, the
//   Masaza Cup) now lives inline where it's directly relevant, rather than
//   as a separate cross-linked page.
//
// Naming convention (project rule): the Katikkiro is always written with the
// honorific "Owek." (Owekitiibwa — The Honourable): Owek. Charles Peter Mayiga.
export function AbakunguContent() {
  return (
    <>
      {/* Hero — royal blue marks Kingdom-administration pages (same as /amasaza) */}
      <div
        className="px-6 py-10 border-b-4 border-gold"
        style={{ background: "var(--royal)" }}
      >
        <div className="max-w-[860px] mx-auto flex flex-wrap items-center justify-center gap-7">
          {/* Official portrait with the Ddamula (royal mace) — the symbol of office */}
          <figure className="shrink-0 text-center m-0">
            <div className="relative w-[190px] h-[190px] rounded-[8px] overflow-hidden border-[3px] border-gold shadow-lg mx-auto">
              <Image
                src="/images/katikkiro/mayiga-ddamula.jpg"
                alt="Owek. Charles Peter Mayiga, Katikkiro of Buganda, holding the Ddamula (royal mace)"
                fill
                priority
                sizes="190px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-[9px] text-white/40 mt-1.5 tracking-[.5px]">
              With the Ddamula · Photo: Geossegawa · Wikimedia Commons · CC BY-SA 4.0
            </figcaption>
          </figure>

          <div className="text-center max-w-[520px]">
            <p className="text-[11px] text-gold2 tracking-[2.5px] uppercase mb-2">
              The Kabaka&apos;s Personal Representative Chiefs
            </p>
            <h1 className="font-serif text-[30px] text-white font-normal leading-tight mb-2">
              Abakungu ba Ssaabasajja
            </h1>
            <p className="text-[14px] text-white/65 mb-3">
              From the 18 Ssaza counties to the UK diaspora — the network of
              chiefs and officials who serve in the Kabaka&apos;s name,
              administratively headed by the Katikkiro of Buganda.
            </p>
            <p className="text-[12px] text-gold2 tracking-[.5px]">
              Headed by Owek. Charles Peter Mayiga · Katikkiro wa Buganda ·
              In office since 12 May 2013
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-7">

        {/* ── What "Ssaabasajja" means ── */}
        <Section title="What &quot;Ssaabasajja&quot; Means">
          <p>
            <strong>Ssaabasajja</strong> (also spelled Ssabasajja) is a royal
            honorific for the Kabaka of Buganda himself — used in the same
            register as &quot;Kabaka,&quot; &quot;Maasomoogi,&quot; or
            &quot;Ekitiibwa&quot; — appearing throughout kingdom media as{" "}
            <em>&quot;Ssaabasajja Kabaka.&quot;</em> It carries the sense of
            &quot;Chief/Father of Men&quot; or &quot;His Majesty,&quot; and is
            the form typically used when a chief, minister, or subject is
            quoted addressing or referring directly to the King in a formal or
            reverential context.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>Terminology overlap, deliberately separated here:</strong>{" "}
              &quot;Omwami wa Ssaabasajja Kabaka&quot; (or interchangeably
              &quot;Omwami wa Kabaka&quot;) is, in current kingdom media,
              simply the standard formal way of referring to a{" "}
              <strong>sitting Ssaza (county) chief</strong> — i.e.,
              &quot;the Kabaka&apos;s man/chief.&quot; It is used for chiefs
              holding the traditional named county titles (Ssekiboobo of
              Kyaggwe, Ppookino of Buddu, Kaggo of Kyaddondo, Ssebwana of
              Busiro, the chiefs of Mawokota and Buweekula, and so on) just as
              often as it is used for chiefs in contested areas. It is{" "}
              <strong>not</strong> a separate or exotic office confined to
              frontier territories — it is the everyday honorific for
              &quot;county chief acting for the Kabaka,&quot; used across the
              whole kingdom.
            </p>
          </div>
          <p className="mt-3 mb-2">
            That said, the phrase carries extra political weight in three
            settings, which is why it surfaces so often in news coverage of
            them:
          </p>
          <ul className="list-none flex flex-col gap-1.5 p-0 m-0">
            {[
              ["Contested or frontier territories", "inside Uganda, where Buganda's authority overlaps with a rival or historic claim (Bunyoro's residual claim over Buluuli; the Kamuswaga's hereditary chieftaincy over Kooki) — here, calling a chief “Ssaabasajja’s man” is a pointed assertion of loyalty to the Kabaka over a rival authority."],
              ["Ordinary Ssaza-level installations and reshuffles", "anywhere in Buganda, where the phrase is simply the formal title used in the announcement."],
              ["The diaspora", "the United Kingdom (via BugandaUK) and, it turns out, at least North America (“essaza lya New England”) — where the kingdom maintains formal representative chiefs answering to the Kabaka directly, using the same “Ssaabasajja/Kabaka” language as the home counties."],
            ].map(([head, body]) => (
              <li
                key={head}
                className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] px-3.5 py-2.5 text-[13px] text-gd leading-relaxed"
              >
                <span className="text-gold shrink-0 mt-0.5">⚑</span>
                <span><strong>{head}</strong> — {body}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Where the Katikkiro fits — hierarchy card, same visual pattern
            as the Bataka page's "How the Bataka fit in the Kingdom" ── */}
        <div
          className="relative overflow-hidden rounded-[6px] p-6 mb-7 border-2 border-gold"
          style={{ background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)" }}
        >
          <span
            aria-hidden="true"
            className="absolute right-5 bottom-4 text-[48px] opacity-[.15] pointer-events-none select-none"
          >
            ⚖️
          </span>
          <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-3">
            Where the Katikkiro Fits — the Working Hierarchy
          </p>
          <div className="flex flex-col gap-1.5 mb-4">
            {[
              ["Kabaka (Ssaabasajja)", "the ultimate authority these chiefs act under and in whose name they are installed"],
              ["Katikkiro", "holds the Ddamula; presides over the Lukiiko/Cabinet; heads the civil service — the office that actually manages, confirms, and directs the chiefs month to month"],
              ["Ssaza (county) chiefs — Owessaza", "the 18 Amasaza — Ssekiboobo, Ppookino, Kaggo, Ssebwana, and the rest — each an “Omwami wa Ssaabasajja Kabaka”"],
              ["Gombolola (sub-county) chiefs", "installed and confirmed through the Katikkiro's office and its ministers"],
              ["Muluka (parish) chiefs", "kingdom ministers — Information, Culture, Gender, Youth — coordinate day to day in between"],
              ["Kyalo (village) headmen", "the base of the structure, reaching every household in the kingdom"],
            ].map(([title, desc], i) => (
              <div
                key={title}
                className="flex items-start gap-3"
                style={{ marginLeft: i * 16 }}
              >
                <span className="text-gold2 text-[12px] mt-0.5 shrink-0">
                  {i === 0 ? "◆" : "└"}
                </span>
                <p className="text-[13px] text-white/85 leading-snug">
                  <strong className="text-gold2">{title}</strong>
                  <span className="text-white/60"> — {desc}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-white/55 leading-relaxed">
            One clarification worth stating plainly: while these chiefs are
            described in the honorific sense as serving &quot;Ssaabasajja&quot;
            / the Kabaka directly, the network of Abakungu is{" "}
            <strong className="text-gold2">administratively headed by the
            Katikkiro</strong>, not run by the Kabaka&apos;s office day to
            day. The Kabaka gives the Katikkiro the Ddamula as the symbol of
            delegated authority to <em>kulamula</em> — rule and administer —
            on his behalf. This matches what turns up repeatedly in the
            source material: county-chief installations are reported up to
            ministers under the Katikkiro; Katikkiro Mayiga is the one quoted
            confirming, praising, or instructing chiefs on Ssaabasajja&apos;s
            behalf; and the Katikkiro&apos;s directives (&quot;ebiragiro bya
            Ssaabasajja&quot;) are what chiefs are expected to implement.
          </p>
        </div>

        {/* ── What the title means (Katikkiro-specific) ── */}
        <Section title="What the Katikkiro's Title Means">
          <p>
            <strong>Katikkiro</strong> is the title of Buganda&apos;s Prime
            Minister — the head of government who runs the kingdom&apos;s
            day-to-day affairs, and the administrative head of the Abakungu ba
            Ssaabasajja network above, on behalf of the{" "}
            <Link href="/kabaka" className="text-royal2 font-semibold underline decoration-gold/50 hover:decoration-gold">
              Kabaka
            </Link>
            . The office is as old as the kingdom itself and has been
            described as the <strong>oldest continuous premiership in East
            Africa</strong>. Authority is symbolically transferred through the{" "}
            <strong>Ddamula</strong>, a royal mace which the Kabaka hands to
            the incoming Katikkiro as a mandate to <em>kulamula</em> — to rule
            and adjudicate — on his behalf.
          </p>
          <p className="mt-2.5">
            Traditionally the Katikkiro was drawn from among the Abataka (clan
            heads) or senior chiefs, chosen for wisdom, loyalty and strategic
            judgement rather than birthright. Over time the office evolved
            from a personal royal adviser into the de facto head of the
            kingdom&apos;s civil service.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>The installation ceremony:</strong> the Kabaka&apos;s
              representatives hand the Ddamula to the Katikkiro-designate near
              the gate of Bulange, after which the new premier — protected by
              his clansmen — must carry the mace without losing it to the{" "}
              <strong>Butikkiro</strong>, his official residence next to the
              royal complex, to formally seal the appointment.
            </p>
          </div>
        </Section>

        {/* ── Origins ── */}
        <Section title="Origins & Early History">
          <p>
            The office traces back to the reign of Kabaka Cwa I Nabakka,
            Buganda&apos;s second Kabaka, in the mid-14th century, when a
            chief named <strong>Walusimbi of the Ffumbe clan</strong> served
            as the first known Katikkiro. Walusimbi continued in office even
            after Cwa I&apos;s death and was succeeded by Ssebwaana, whose
            tenure lasted until the accession of Kabaka Kimera around 1374.
            From this early foundation, the Katikkiroship developed alongside
            the monarchy itself, becoming one of the kingdom&apos;s central
            institutions of governance for the following six centuries.
          </p>
          <p className="mt-2.5">
            During the colonial era the Katikkiro took on a diplomatic
            dimension as well, representing Buganda&apos;s interests in
            dealings with the British protectorate administration — at times
            becoming as politically consequential as the Kabaka himself.
          </p>
        </Section>

        {/* ── Role today ── */}
        <Section title="Role & Responsibilities Today">
          <p className="mb-3">
            In the restored constitutional-monarchy structure in place since
            1993, the Katikkiro functions as the kingdom&apos;s chief
            executive and its most visible public face, while the Kabaka
            remains above day-to-day politics as ceremonial Head of State:
          </p>
          <ul className="list-none flex flex-col gap-1.5 p-0 m-0">
            {[
              "Administratively heads the Abakungu ba Ssaabasajja network — the Ssaza, Gombolola and Muluka chiefs installed and confirmed in the Kabaka's name",
              "Presides over Cabinet and chairs the government's executive decision-making",
              "Presides over sessions of the Lukiiko, Buganda's parliament, steering government business through it",
              "Executes the Kabaka's decrees and translates them into policy and national programmes",
              "Supervises the county chiefs (Abamasaza) who administer Buganda's 18 traditional counties",
              "Safeguards the kingdom's royal seals, land, and institutional assets",
              "Mobilises the clans and the wider Baganda public behind cultural and development causes",
              "Represents the Kabaka at state functions, ceremonies, and in dealings with Uganda's national government and outside partners",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] px-3.5 py-2.5 text-[13px] text-gd leading-relaxed"
              >
                <span className="text-gold shrink-0 mt-0.5">⚖️</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-muted italic">
            The Katikkiro is appointed solely at the discretion of the Kabaka.
          </p>
        </Section>

        {/* ── Officeholders since 1993 ── */}
        <Section title="Officeholders Since the 1993 Restoration">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Katikkiro</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Period</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Owek. Joash Mayanja Nkangi", "Pre-1966 and post-1993 (transitional)", "Served both before the 1966 abolition and again during the kingdom's restoration process"],
                  ["Owek. Joseph Mulwanyamuli Ssemwogerere", "1990s", "Served during the early restoration period under Ssabasajja Kabaka Mutebi II"],
                  ["Owek. Dan Muliika", "Late 1990s–2000s", "Served under Ssabasajja Kabaka Mutebi II"],
                  ["Owek. Eng. John Baptist Walusimbi", "2008–2013", "Immediate predecessor to the current Katikkiro"],
                  ["Owek. Charles Peter Mayiga", "12 May 2013 – present", "Longest-serving Katikkiro of the current reign; architect of the Ettofaali campaign and subsequent development programmes"],
                ].map(([name, period, notes]) => (
                  <tr key={name} className="bg-white">
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd whitespace-nowrap">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted whitespace-nowrap">{period}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── The current Katikkiro ── */}
        <Section title="The Current Head: Owek. Charles Peter Mayiga">
          {/* Podium photo (Kabaka Birthday Run) floats the text on wide screens */}
          <figure className="m-0 mb-3 md:float-right md:ml-4 md:mb-2 md:w-[340px]">
            <div className="relative w-full aspect-[3/2] rounded-[6px] overflow-hidden border border-eborder">
              <Image
                src="/images/katikkiro/mayiga-portrait.jpg"
                alt="Owek. Charles Peter Mayiga addressing the public at the Kabaka Birthday Run"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-[10px] text-muted mt-1 tracking-[.3px]">
              Owek. Charles Peter Mayiga at the Kabaka Birthday Run · Photo:
              Samson Ssemakadde · Wikimedia Commons · CC0
            </figcaption>
          </figure>
          <p>
            <strong>Owek. Charles Peter Mayiga</strong>, born in 1962 in
            Kasanje village, Kabonera Parish, Masaka District, belongs to the{" "}
            <strong>Mutima (Omutima Omuyanja) clan</strong>. He holds a
            Bachelor of Laws from Makerere University and co-founded the law
            firm Buwule &amp; Mayiga Advocates in Kampala, building a practice
            in commercial and land law before turning to full-time public
            service.
          </p>
          <p className="mt-2.5">
            His involvement with the kingdom predates its 1993 restoration:
            while still a Makerere student in the 1980s he helped found{" "}
            <strong>Nkoba za Mbogo</strong>, a youth cultural association
            promoting Buganda heritage, and from 1987 he worked closely with
            the kingdom&apos;s elders. In 1991 he was appointed Secretary of
            the Council of Elders preparing the restoration — a role that
            became Secretary to the Lukiiko once the monarchy was formally
            re-established. From 1993 he served as Buganda&apos;s Minister of
            Information and official spokesman for two decades, before
            Ssabasajja Kabaka Ronald Muwenda Mutebi II appointed him Katikkiro
            on 12 May 2013, succeeding Owek. Eng. John Baptist Walusimbi.
          </p>
          <p className="mt-2.5">
            Owek. Mayiga is also a published author: <em>King on the Throne</em>,
            chronicling the first sixteen years (1993–2009) of the
            Kabaka&apos;s reign, and <em>Buganda ku Ntikko</em>, a
            Luganda-language statement of the kingdom&apos;s five key
            development aspirations, released the same day he received the
            Ddamula.
          </p>
          <div className="clear-both" />
        </Section>

        {/* ── Achievements ── */}
        <Section title="Achievements & Contributions">
          <p className="mb-3">
            Owek. Mayiga organised his premiership around five pillars:
            defending the throne, advocating a federal arrangement for Buganda
            within Uganda, protecting the kingdom&apos;s land and boundaries,
            promoting economic self-reliance, and fostering unity among
            Baganda. Achievements credited to his tenure include:
          </p>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {[
              ["🧱 Ettofaali campaign", "Kingdom-wide, diaspora-inclusive fundraising drive that raised roughly UGX 10 billion — used to reconstruct the Kasubi Royal Tombs after the March 2010 fire and fund institutional rebuilding."],
              ["🏢 Masengere completed", "Finished the commercial building at Mmengo that had stalled for more than 40 years, using Ettofaali proceeds."],
              ["📺 BBS Terefayina", "Established the kingdom's own television station, extending Buganda's cultural and news programming to a mass audience."],
              ["🏃 Kabaka Birthday Run", "Grew it into one of Africa's largest charity runs, raising funds and awareness for HIV/AIDS, fistula, and sickle cell disease."],
              ["⚽ Masaza Cup revival", "The inter-county football tournament has become a major unifying cultural event followed across East Africa."],
              ["📜 Kyapa Mu Ngalo", "Positioned the Buganda Land Board and the 'Title in Your Hands' initiative to formalise land ownership and combat land grabbing."],
              ["🏰 Royal sites restored", "Restoration of palaces including Bamunanika and Kireka, with continued renovation work across the kingdom's counties."],
              ["📱 K2 Telecom rescued", "Revival through a partnership with Airtel Uganda, preserving Buganda's footprint in telecoms as a virtual network operator."],
              ["📈 Buganda Investment Co.", "Grew BIC into an active player in real estate, agribusiness and hospitality investment."],
              ["☕ Emmwanyi Terimba", "Coffee-growing promotion and cooperative savings schemes including PEWOSA SACCOs, driving economic empowerment."],
              ["🎓 Kabaka Education Fund", "Support for learners at multiple levels, plus the 2025 launch of kindergarten schools in several counties."],
              ["🏥 Health programmes", "A new hospital in Ssingo County and, in August 2025, a dedicated health board for maternal and child health, vaccination, and disease prevention."],
            ].map(([head, body]) => (
              <div key={head} className="bg-white border border-eborder rounded-[5px] px-3.5 py-3">
                <h4 className="text-[13px] text-gd font-semibold mb-1">{head}</h4>
                <p className="text-[12px] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-3">
            His tenure has also sustained support for Buganda&apos;s creative
            sector — musicians, instrumentalists, songwriters and dancers —
            and the continued promotion of the Luganda language on the global
            stage.
          </p>
        </Section>

        {/* ── Challenges ── */}
        <Section title="Challenges Navigated">
          <p>
            Owek. Mayiga&apos;s tenure has not been without difficulty.
            Concerns over the Kabaka&apos;s health — including medical reviews
            and treatment abroad since 2020 — have required him to manage both
            administrative continuity and public reassurance during the
            king&apos;s absences. His land-reform agenda through the Buganda
            Land Board has drawn criticism from those who feel cultural
            institutions should not be commercially active, even as supporters
            credit it with curbing land grabbing. He has also had to manage
            occasional tensions within the royal clan (Abalangira) and has
            worked to keep the kingdom&apos;s leadership above Uganda&apos;s
            often turbulent partisan politics.
          </p>
        </Section>

        {/* ── What are the Amasaza — merged in from the former /amasaza tab ── */}
        <Section title="What Are the Amasaza?">
          <p>
            Amasaza (singular: <strong>Ssaza</strong>) are the counties of
            the Buganda Kingdom — the territorial units these Abakungu
            actually administer. Historically each Ssaza was a substantial
            territorial and political unit governed by a chief known as the{" "}
            <strong>Owessaza</strong> (&quot;one who holds the county&quot;)
            or Saza Chief — among the most powerful men in the kingdom. Each
            was responsible for collecting tribute for the Kabaka,
            administering justice, mobilising soldiers, maintaining roads,
            and representing his county at the Lukiiko.
          </p>
          <p className="mt-2.5">
            Because the office was originally appointed directly by the
            Kabaka, loyalty to the throne — rather than birth — determined
            who governed a county. This gave the Kabaka unusually strong
            centralised control for a pre-colonial East African kingdom.
            Today the Amasaza continue chiefly as a cultural and ceremonial
            structure: the historic boundaries and titles remain recognised
            by the Kingdom, referenced in land and clan matters, and
            celebrated annually through the Buganda Masaza Cup.
          </p>
        </Section>

        {/* ── Origins & the Lost Counties ── */}
        <Section title="Origins & the &quot;Lost Counties&quot;">
          <p>
            At its founding, Buganda consisted only of{" "}
            <strong>Busiro, Busujju, Kyaddondo and Mawokota</strong>, with
            small portions of Ssingo and Bulemeezi — most surrounding
            territory belonged to the larger kingdom of Bunyoro-Kitara. From
            roughly the 17th to the 19th centuries Buganda expanded steadily
            at Bunyoro&apos;s expense, and by absorbing smaller neighbours
            such as Buddu and Kooki, reaching <strong>20 counties</strong> at
            its territorial peak.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              Two of those counties — <strong>Buyaga</strong> (chief title
              Kyambalango, seat at Kibaale) and <strong>Bugangaizi</strong>{" "}
              (chief title Kiyimba, seat at Kakumiro) — had originally
              belonged to Bunyoro and were transferred to Buganda by the
              British in 1900 as a reward for Buganda&apos;s assistance
              against Omukama Kabalega&apos;s resistance. The grievance
              simmered for over 60 years: Bunyoro&apos;s Mubende-Bunyoro
              Committee campaigned for decades, and the 1964 &quot;Lost
              Counties&quot; referendum — promised in Uganda&apos;s
              independence constitution — returned both to Bunyoro.{" "}
              <strong>Buganda has consisted of 18 recognised counties ever
              since.</strong>
            </p>
          </div>
          <p className="mt-3 text-[12px] text-muted leading-relaxed italic">
            A note on contested history: Bunyoro nationalist historiography
            describes a wider set of &quot;seven lost counties&quot; —
            adding Bugerere, Buruuli, Ssingo, Bulemeezi and Buweekula — as
            unjustly taken. Buganda&apos;s official position, reflected in
            Uganda&apos;s post-independence constitutional settlement,
            recognises only Buyaga and Bugangaizi as counties formally
            returned. Both perspectives are noted here without adjudicating
            the dispute. This is the same historical fault line behind
            Buluuli&apos;s present-day rival Ssabaluuli claim, below.
          </p>
        </Section>

        {/* ── Contested home territories ── */}
        <Section title="Abakungu ba Ssaabasajja in Contested Home Territories">
          <h4 className="font-serif text-[15px] text-gd font-normal mb-2">
            Buluuli
          </h4>
          <p className="mb-3">
            Buluuli is one of the 18 traditional Amasaza, but the area also
            has a long-running rival claim from Bunyoro-Kitara (the
            &quot;Ssabaluuli&quot; allegiance). Buganda maintains its own
            &quot;Ssaabasajja&quot; chiefs in the area, working alongside —
            and at times in tension with — the Ssabaluuli faction.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Name</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Position</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kimbugwe Gerald Kyanjo", "Omwami wa Ssaabasajja, Ssaza lya Buluuli (county-level)", "Called on residents to support the newly installed sub-county chief; urged fighting poverty/hunger and buying kingdom development certificates (2021)."],
                  ["Nsubuga Kizito", "Omwami wa Ssaabasajja, Gombolola ya Mumyuka Kakooge", "Installed 2021; pledged to unite Ssaabasajja and Ssabaluuli supporters across political, cultural and religious lines."],
                ].map(([name, pos, note]) => (
                  <tr key={name} className="bg-white">
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd whitespace-nowrap">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted">{pos}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted mb-6">
            Source: New Vision, &quot;Omwami wa Ssaabasajja mu ggombolola ya
            Mumyuka Kakooge e Buluuli atuuziddwa&quot; (27 Oct 2021).
          </p>

          <h4 className="font-serif text-[15px] text-gd font-normal mb-2">
            Kooki
          </h4>
          <p className="mb-3">
            Kooki (present-day Rakai) is culturally distinct: it has its own
            hereditary ruler, the <strong>Kamuswaga</strong> (currently Apollo
            Ssansa Kabumbuli II), and relations between the Kamuswaga&apos;s
            chieftaincy and Mengo (Buganda Kingdom&apos;s seat) have been
            historically uneven — including a widely reported 2024 incident in
            which the Kamuswaga&apos;s police detained officials described as
            &quot;abaami ba Ssaabasajja&quot; during a land dispute, and a 2024
            NTV report in which Kooki residents said poor service delivery
            stemmed from friction between the two authorities.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Name</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Position</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["(unnamed in sources)", "Omwami w'essaza lya Ssaabasajja ely'e Kabula, Lumama", "Detained along with Gertrude Ssebugwawo (Kabaka's official in Kooki) by Kamuswaga's police over a land dispute (Kyotera TV, 2022)."],
                  ["Gertrude Ssebugwawo", "Omukungu wa Kabaka, Kooki", "Detained in the same incident."],
                ].map(([name, pos, note]) => (
                  <tr key={name} className="bg-white">
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd whitespace-nowrap">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted">{pos}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted">
            Source: Kyotera Television (2022 report); NTV Uganda,
            &quot;Abakooki beemulugunya ku mpereza&quot; (Aug 2024).
          </p>
        </Section>

        {/* ── Other named chiefs elsewhere ── */}
        <Section title="Other Named Chiefs Elsewhere in Buganda">
          <div className="overflow-x-auto mb-2">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Name</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Position</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Edward Muwanga", "Omwami wa Ssaabasajja, Mutubagumu, Mpigi", "Called on “abantu ba Ssaabasajja” in Mpigi to join Kabaka's-birthday-run events; urged youth to avoid HIV (Bukedde, Oct 2021)."],
                  ["Nakato Nansubuga Gambuuze", "Omwami wa Ssaabasajja, Nakawuka A", "Led a tree-planting campaign in schools with fellow Ssaabasajja chiefs at Twin Light Children's Centre, Nakawuka (Bukedde, Mar 2023)."],
                  ["David Sentongo", "Minister/Representative “wa Ssaabasajja” for Culture, Ankole and Kigezi", "Referenced in Kalibwani family history as coordinating Baganda cultural affairs among diaspora Baganda settled in Ankole and Kigezi."],
                ].map(([name, pos, note]) => (
                  <tr key={name} className="bg-white">
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd whitespace-nowrap">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted">{pos}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-muted italic leading-relaxed">
            These three appear in unrelated local news items and are not
            confirmed to be part of one single, formally chartered
            &quot;Ssaabasajja&quot; office — they illustrate that the title is
            used for Kabaka-appointed local representatives well beyond
            Buluuli and Kooki.
          </p>
        </Section>

        {/* ── The 18 counties, then their named chiefs ── */}
        <Section title="The 18 Amasaza Today">
          <p className="mb-1">
            Each Ssaza carries its own traditional chief title — some, like
            Ssekiboobo of Kyaggwe or Pokino of Buddu, among the best-known
            titles in Buganda&apos;s political history. The Kingdom continues
            to appoint titleholders, and Saza Chiefs still play visible
            ceremonial and community roles. Tap a county for more.
          </p>
          <p className="text-[11px] text-muted italic">
            Modern district names are approximate — Uganda&apos;s district
            boundaries have been redrawn many times and rarely align exactly
            with the old Ssaza borders.
          </p>
        </Section>
      </div>

      {/* The 18-county card grid (data-driven from clans.ts) — full-width band,
          reused directly from the former /amasaza tab */}
      <AmasazaGrid />

      <div className="max-w-[860px] mx-auto px-6">

        {/* ── A special case: the Ssese Islands ── */}
        <Section title="A Special Case: The Ssese Islands">
          <div className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] p-3.5">
            <span className="text-[20px] shrink-0 mt-0.5">🏝️</span>
            <p className="text-[13px] text-muted leading-relaxed">
              The Ssese archipelago in Lake Victoria (Nnalubaale) held a
              unique status from the kingdom&apos;s founding: rather than
              being governed directly like the mainland counties, it was
              considered autonomous — reserved as the{" "}
              <strong className="text-gd">&quot;Islands of the Gods&quot;</strong>,
              home to shrines of several Balubaale — and was only brought
              under more direct royal administration after the 1900 Buganda
              Agreement. Its traditional chief carries the title{" "}
              <strong className="text-gd">Kweba</strong>.
            </p>
          </div>
        </Section>

        {/* ── A living institution: the Masaza Cup ── */}
        <Section title="A Living Institution: The Buganda Masaza Cup">
          <p>
            The clearest sign that the Amasaza remain alive is the{" "}
            <strong>Buganda Masaza Cup</strong> — an annual football
            tournament established in 2004 in which all 18 counties field a
            team, several of whose chiefs are named further below. It has
            grown into one of Uganda&apos;s largest grassroots competitions,
            doubling as a cultural festival that draws the Kabaka and senior
            Kingdom officials, and a recognised scouting ground for
            professional players.
          </p>
          <p className="mt-2.5 mb-2 font-semibold text-gd">
            The 18 counties compete in three groups:
          </p>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {[
              ["⚽ Bulange",        "Ssingo · Bulemeezi · Buvuma · Bugerere · Busujju"],
              ["⚽ Masengere",      "Buddu · Buweekula · Kyaggwe · Kyaddondo · Buruuli · Kooki"],
              ["⚽ Muganzirwazza",  "Busiro · Gomba · Mawokota · Ssese · Mawogola · Kabula"],
            ].map(([group, teams]) => (
              <div
                key={group}
                className="bg-white border border-eborder rounded-[5px] px-3.5 py-3"
              >
                <h4 className="text-[13px] text-gd font-semibold mb-1">{group}</h4>
                <p className="text-[11.5px] text-muted leading-relaxed">{teams}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-muted leading-relaxed">
            Gomba is the tournament&apos;s most successful county to date,
            while Buddu and Bulemeezi have been consistent finalists in
            recent years.
          </p>
        </Section>

        {/* ── Named Ssaza chiefs kingdom-wide ── */}
        <Section title="Named Ssaza Chiefs Kingdom-Wide">
          <p className="mb-3">
            These come from ordinary kingdom and sports/news coverage
            (installations, county football competitions, deaths, reshuffles)
            between 2021 and 2026 and confirm the title is used
            kingdom-wide, not only in Buluuli/Kooki. Traditional county-chief
            titles are given alongside the modern name where known.
          </p>
          <div className="overflow-x-auto mb-2">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Name</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">County / Post</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Elijah Bogere Lubanga Mulembya", "Ssekiboobo (chief), Ssaza Kyaggwe", "Confirmed and installed Hajji Sulaiman Teefe Kimera to head Gombolola Mituba 6, Kasawo, replacing Moses Tamale."],
                  ["Vincent Matovu Bintubizibu", "Ssekiboobo (chief), Ssaza Kyaggwe (later holder)", "Thanked Ssaabasajja Kabaka for youth sports initiatives (2025); later gave reasons for Kyaggwe's Masaza Cup defeat to Buweekula (Nov 2025)."],
                  ["Luweekula Andrew Ssempijja", "Omwami wa Ssaabasajja, Ssaza Buweekula", "Encouraged Buweekula's Masaza Cup supporters (2026 season opener)."],
                  ["Charles Kiberu Kisiriiza", "Ssebwana (chief), Ssaza Busiro", "Urged parents to fulfil their duty to educate their children (“Back to School” drive)."],
                  ["Aloysius Ssemanda", "Ssebwana (chief), Ssaza Busiro (installation report, Jun 2025)", "Sworn in with deputy Kato Edward for Lukwanga muluka, Busiro."],
                  ["Stephen Muyunga", "Omwami wa Ssaabasajja Kabaka, Muluka Mutuba VI, Kampala Mukadde", "Chairs the muluka chiefs' committee for Gombolola Mutuba IV, Kampala Masekkati (2022)."],
                  ["Kawuma Henry Male", "Omwami wa Kabaka, Gombolola Mituba IV, Kampala Masekkati", "Announced Nnaabagereka/Kaggo's community visit itinerary in Kampala (2022)."],
                  ["Hajj Hassan Kasujja Kagga", "Chief, Ssaza Mawokota (Kayima)", "Installed Oct 2025, succeeding Sarah Nannono Kaweesi, who moved to another kingdom post."],
                  ["Jude Muleke", "Ppookino (chief), Ssaza Buddu", "Thanked the kingdom for tablets issued to chiefs for digitising administration (2026); also organised the Buddu county football committee (2025)."],
                  ["Tofiri Malokweza Kivumbi", "Former Kaggo (chief), Ssaza Kyaddondo", "Died recently at age 96; the Kabaka honoured him with a commemorative stone for his service."],
                  ["(name not fully captured)", "Omwami wa Kabaka, “Essaza lya New England” (USA)", "Installed/recognised by the Katikkiro at the Buganda Bumu North American Convention, 2025 — confirms a diaspora “Ssaza”-style chief structure exists in the USA as well as the UK."],
                ].map(([name, pos, note]) => (
                  <tr key={name} className="bg-white">
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd whitespace-nowrap">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted whitespace-nowrap">{pos}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted">
            Sources: gambuuze.ug (Jan 2025); Kyaggwe TV &quot;Busiro&quot; and
            &quot;Buganda&quot; archives (2025); New Vision (2022 report on
            Kasawo/Mutuba VI); buganda.or.ug (Oct 2025 Mawokota installation);
            CBS FM (Buddu tablets, Apr 2026; New England, May 2025).
          </p>
        </Section>

        {/* ── UK diaspora structure ── */}
        <Section title="Abakungu ba Ssaabasajja — United Kingdom Structure">
          <p className="mb-3">
            The clearest and most fully documented &quot;Ssaabasajja&quot;
            network is the one Buganda Kingdom maintains in the United
            Kingdom, coordinated by <strong>BugandaUK</strong> under an{" "}
            <strong>Omubaka wa Kabaka</strong> (the Kabaka&apos;s Deputy/Envoy
            for the UK and Ireland), currently{" "}
            <strong>Owek. Ssaalongo Geoffrey Kibuuka</strong>. Beneath him is a
            full leadership team of abakungu (chiefs/officials), each holding
            a portfolio — regional deputies, welfare, protocol, youth,
            culture, and administration — modelled on Mengo&apos;s own
            ministerial structure but scaled for the diaspora. This list is
            current as published by BugandaUK as of 2025.
          </p>
          <div className="overflow-x-auto mb-2">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd w-10">#</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Omukungu (Official)</th>
                  <th className="border border-eborder bg-gold3 px-3 py-2 text-[11px] uppercase tracking-[1px] text-gd">Portfolio / Position</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Robert Mukiibi", "Mumyuka (Deputy) — North London"],
                  ["2", "Revd. Enock Kiyaga", "Mumyuka (Deputy) — Manchester and Midlands"],
                  ["3", "Janet Nabatta Mukiibi", "Mumyuka (Deputy) — South London and Southwest"],
                  ["4", "Revd. Dr. Thomas Kisitu", "Mumyuka (Deputy) — Scotland"],
                  ["5", "Godfrey Sekisonge", "Mumyuka (Deputy) — East London"],
                  ["6", "George William Kalanzi", "Muwandiisi (Secretary)"],
                  ["7", "Marion Nalumansi Kaweesa Mutumba", "Deputy Secretary"],
                  ["8", "Fred Ssemugera", "Culture and Heritage (Buwangwa ne Nnono)"],
                  ["9", "Robert Ssebaggala", "Muwanika (Treasurer)"],
                  ["10", "Primrose Kalungi", "Women and Children's Affairs"],
                  ["11", "Alice Mwanje", "Deputy — Women and Children's Affairs"],
                  ["12", "Deus Zziwa", "Protocol"],
                  ["13", "Zaid Kasujja", "Deputy Protocol"],
                  ["14", "Joanne Nakibirango Kitandwe", "Development, Mobilisation and Education"],
                  ["15", "Hajat May Kavulu", "Special Duties and Welfare"],
                  ["16", "Elizabeth Namutebi Ricketts", "Deputy — Special Duties and Welfare"],
                  ["17", "Baker Kiyingi", "Youth Affairs"],
                  ["18", "Ali Buwembo", "Chiefs' Affairs (Ow'Ensonga z'Abaami)"],
                  ["19", "Hope Nakaweesa", "Deputy — Development, Mobilisation and Education"],
                  ["20", "Frederick Albert Mukungu", "Not specified in source"],
                ].map(([no, name, pos]) => (
                  <tr key={no} className="bg-white">
                    <td className="border border-eborder px-3 py-2 text-muted">{no}</td>
                    <td className="border border-eborder px-3 py-2 font-semibold text-gd whitespace-nowrap">{name}</td>
                    <td className="border border-eborder px-3 py-2 text-muted leading-relaxed">{pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted mb-3">
            Source: bugandauk.com, &quot;Abakungu&quot; leadership page
            (accessed July 2026). An earlier roster covering 2016–2023 is
            archived separately on the same site.
          </p>
          <p className="text-[13px] text-gd leading-relaxed">
            Additional named regional chiefs referenced elsewhere on the same
            site and in kingdom press releases (not all with confirmed
            current portfolios): <strong>Kasimu Muguluma</strong> (South
            London, cited 2010s coverage) and{" "}
            <strong>Rebecca Lubega-Bukulu</strong> (Scotland, cited 2010s
            coverage) — both may correspond to earlier holders of the
            North/South London and Scotland deputy roles listed above.
          </p>
        </Section>

        {/* ── Coverage, gaps & how to read this list ── */}
        <Section title="Coverage, Gaps, and How to Read This List">
          <ul className="list-none flex flex-col gap-2 p-0 m-0">
            {[
              ["No single master roster exists publicly", "because this is not really a separate office — it's the honorific used for whoever currently holds each of the standard Ssaza chieftaincies (plus Gombolola and Muluka chiefs beneath them), so the “full list” is really the current occupancy of all ~18 Ssaza chief seats and their sub-structures, which turns over regularly and is not published centrally in one place. What appears above is what surfaced in scattered news coverage across 2021–2026 — confirmed examples, not an exhaustive or definitive current roster."],
              ["The UK list is the most complete", "because BugandaUK publishes it directly as a leadership page; equivalent diaspora structures likely exist in other countries (other European chapters, North America) but were not found with named office-holders in this search."],
              ["Terminology overlaps.", "“Ssaabasajja” as an honorific for the Kabaka and “Ssaabasajja” as the name of this representative-chief network are used side by side in the same sources, which can make search results ambiguous — this page has separated the two senses deliberately."],
              ["Recommended next step, if you want to go further:", "contact BugandaUK or Mengo's Buganda Land Board / Katikkiro's office directly, or search Bukedde/CBS FM archives by district name (e.g. “Ssaabasajja + Butambala”, “Ssaabasajja + Mawokota”) to surface more county-level chiefs not captured here."],
            ].map(([head, body]) => (
              <li
                key={head}
                className="bg-cream2 border border-eborder rounded-[5px] px-3.5 py-2.5 text-[13px] text-gd leading-relaxed"
              >
                <strong>{head}</strong> {body}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Quick reference ── */}
        <Section title="Quick Reference">
          <div className="bg-white border border-eborder rounded-[5px] divide-y divide-eborder">
            {[
              ["Network name", "Abakungu ba Ssaabasajja — the Kabaka's personal representative chiefs"],
              ["Administrative head", "Owek. Charles Peter Mayiga (Owekitiibwa — The Honourable), Katikkiro wa Buganda"],
              ["In office", "Since 12 May 2013 — appointed by Ssabasajja Kabaka Ronald Muwenda Mutebi II (13 years in post as of May 2026)"],
              ["Symbol of office", "The Ddamula (royal mace)"],
              ["Hierarchy", "Kabaka → Katikkiro → Ssaza chiefs (Owessaza) → Gombolola chiefs → Muluka chiefs → Kyalo headmen"],
              ["Counties", "18 Amasaza — reduced from a peak of 20 after the 1964 Lost Counties referendum returned Buyaga and Bugangaizi to Bunyoro"],
              ["Home-territory scope", "All ~18 Ssaza counties, with extra political weight in contested Buluuli and Kooki"],
              ["Diaspora scope", "Fully documented in the UK (BugandaUK, 20 officials under Omubaka wa Kabaka Geoffrey Kibuuka); confirmed but less documented in North America"],
              ["Special case", "The Ssese Islands — historically autonomous, chief title Kweba"],
              ["Living institution", "The Buganda Masaza Cup — annual inter-county football tournament since 2004"],
              ["Official residence", "Butikkiro, near Bulange, Mmengo"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap gap-x-4 gap-y-0.5 px-4 py-2.5">
                <span className="text-[11px] uppercase tracking-[1px] text-muted w-[170px] shrink-0 pt-0.5">
                  {label}
                </span>
                <span className="text-[13px] text-gd font-medium flex-1 min-w-[200px]">{value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Source note */}
        <div className="bg-cream2 border border-eborder rounded-[5px] p-4 mb-7">
          <p className="text-[12px] text-muted leading-relaxed">
            <strong className="text-gd">A note on sources:</strong> the
            Katikkiro and Amasaza material above is condensed from Kingdom
            reference documents; the Abakungu ba Ssaabasajja material (the
            Ssaabasajja honorific, contested-territory chiefs, and the UK
            diaspora structure) is compiled from Buganda Kingdom media,
            diaspora kingdom-affiliated organisations, and news reporting
            current as of July 2026 — a working reference, not an official
            kingdom publication. It should be read alongside this
            site&apos;s other Buganda administrative pages (Bataka,
            Abalangira) as a fuller picture of the kingdom&apos;s governance.
          </p>
        </div>

        {/* Cross-link to the companion throne page */}
        <Link
          href="/kabaka"
          className="block text-center bg-white border border-eborder rounded-[6px] px-5 py-4 no-underline hover:border-gold transition-colors"
        >
          <span className="text-[11px] uppercase tracking-[1.5px] text-muted block mb-1">
            Companion page
          </span>
          <span className="font-serif text-[17px] text-gd">
            The Kabaka of Buganda — Ssabasajja Kabaka Ronald Muwenda Mutebi II →
          </span>
        </Link>
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
