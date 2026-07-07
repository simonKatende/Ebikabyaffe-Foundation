"use client";

import Link from "next/link";

// The /abalangira page — the royal clan of Buganda, condensed from
// "Abalangira n'Abambejja — Olulyo Olulangira olwa Buganda: The Royal
// Lineage of Buganda" reference document. Previously a section inside
// /kabaka; split out to its own tab so the full document could be
// represented (birth/naming/succession mechanics, the complete titles
// table, and the "clan rotation" theory were condensed out of the /kabaka
// version and are restored here).
//
// Structure follows the source PDF's own section order: the royal clan →
// core terms & titles → governance → birth, naming & succession →
// marriage customs → ranking of royal women → the clan today → quick
// reference → sources.
export function AbalangiraContent() {
  return (
    <>
      {/* Hero — royal blue marks Kingdom-administration pages (same as /amasaza);
          no single portrait fits an institution rather than one officeholder */}
      <div
        className="px-6 py-10 text-center border-b-4 border-gold"
        style={{ background: "var(--royal)" }}
      >
        <span className="text-[56px] mb-3 block">👑</span>
        <h1 className="font-serif text-[32px] text-white font-normal mb-1.5">
          Abalangira n&apos;Abambejja
        </h1>
        <p className="text-[14px] text-white/60 mb-3 max-w-[600px] mx-auto">
          Olulyo Olulangira olwa Buganda — the Royal Lineage: princes,
          princesses, and the structure of the Kabaka&apos;s own clan.
        </p>
        <p className="text-[12px] text-gold2 tracking-[.5px]">
          Descended from Kabaka Kato Kintu · The one Buganda clan with no totem
        </p>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-7">

        {/* ── 1. The Royal Clan ── */}
        <Section title="Olulyo Olulangira — The Royal Clan">
          <p>
            In Buganda, the Kabaka belongs to his own distinct clan, separate
            from the fifty-plus clans (ebika) that make up the rest of
            Buganda society. This is the royal clan,{" "}
            <strong>Olulyo Olulangira</strong>. Male members are{" "}
            <strong>Abalangira</strong> (sing. Omulangira, &quot;prince&quot;),
            and female members are <strong>Abambejja</strong> (sing.
            Omumbejja, &quot;princess&quot;).
          </p>
          <p className="mt-2.5">
            A widely repeated misconception holds that the Kabaka&apos;s clan
            is determined by his mother, and that the royal family is
            therefore matrilineal. This is inaccurate. Like every other clan
            in Buganda, membership in the royal clan is{" "}
            <strong>patrilineal</strong> — it passes from father to child.
            Children of the Kabaka, and children of any Omulangira, are
            themselves Abalangira or Abambejja by birth, tracing an unbroken
            genealogy back to Kato Kintu, the founding king of Buganda.
          </p>
          <p className="mt-2.5">
            The confusion partly stems from the fact that the royal clan is
            unusual in one respect: unlike every other Buganda clan, it has no
            totem (<strong>omuziro</strong>). All other clans are identified
            by an animal, plant, or object totem (the Lugave/pangolin,
            Mmamba/lungfish, Njovu/elephant, and so on), and it is sometimes
            wrongly assumed that a group without a totem cannot be a true
            clan. But a totem is only a symbol; clan membership itself is a
            matter of genealogy, and the royal lineage has always kept its
            own, entirely separate, line of descent.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>Why the confusion persists:</strong> Kabakas have
              historically shown deep affection for their mothers&apos;
              families, sometimes taking names that echo their mother&apos;s
              side, and succession politics have always run heavily through
              the maternal clans competing for influence. This closeness to
              the maternal line is a matter of sentiment and politics, not of
              clan law — the genealogy that determines who is a prince, a
              princess, or a legitimate heir to the throne runs strictly
              through the father.
            </p>
          </div>
        </Section>

        {/* ── 2. Core Terms and Titles ── */}
        <Section title="Core Terms and Titles">
          <p className="mb-3">
            The royal household and lineage carry a distinct vocabulary of
            titles, most of which have no exact English equivalent:
          </p>
          <div className="bg-white border border-eborder rounded-[5px] divide-y divide-eborder">
            {[
              ["Omulangira", "A prince: any male member of the royal clan, descended in the male line from Kato Kintu. Plural: Abalangira."],
              ["Omumbejja", "A princess: any female member of the royal clan. Plural: Abambejja."],
              ["Ssabalangira", "“Head of the princes.” The senior official who governs the day-to-day affairs of the royal clan on the Kabaka’s behalf, since the Kabaka himself is occupied with affairs of state. He is the equivalent, for the royal clan, of a clan head (Owakasolya) in an ordinary clan."],
              ["Namasole", "The Kabaka’s mother (biological or ceremonial), and the highest-ranking woman in the kingdom’s protocol after installation of her son. She held her own palace, courts, chiefs, and the power to collect taxes, though she had no formal role in state governance."],
              ["Lubuga / Nnalinya", "The Kabaka’s official “royal sister,” chosen from among his sisters to share prominence with him. She held estates, courts, and chiefs mirroring the king’s own, and traditionally advised and admonished him (okuvuma Kabaka). After a king’s death she took the title Nnaalinnya and became custodian of his jawbone and umbilical-cord relics."],
              ["Nabikande", "The senior royal midwife, a member of the Kabaka’s council, responsible for overseeing the king’s pregnant wives and, in earlier centuries, for the care of newborn princes and princesses."],
              ["Kasujju (Busujju)", "The Ssaza (county) chief of Busujju, traditionally charged with supervision of the Abalangira and Abambejja and their family affairs, reporting directly to the Kabaka."],
              ["Katikkiro", "The kingdom’s prime minister — the head of the commoners’ government, distinct from the royal clan’s own internal leadership under the Ssabalangira."],
              ["Kiweewa", "The customary name/title given to a Kabaka’s first-born son. Tradition long held that the Kiweewa was not eligible to succeed his father as king."],
              ["Mujaguzo", "The kingdom’s sacred Royal Drums, sounded to announce the birth of a royal child and the death of a reigning Kabaka."],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap gap-x-4 gap-y-0.5 px-4 py-2.5">
                <span className="text-[11px] uppercase tracking-[1px] text-muted w-[150px] shrink-0 pt-0.5">
                  {label}
                </span>
                <span className="text-[13px] text-gd leading-relaxed flex-1 min-w-[200px]">{value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 3. Governance ── */}
        <Section title="Governance of the Royal Clan">
          <p>
            Because Olulyo Olulangira is a clan like any other in structure,
            it requires the same kind of internal leadership that ordinary
            clans receive from their Owakasolya or Ssabataka. The Kabaka is,
            formally, the head of his own clan — but since he is consumed by
            the business of ruling the kingdom, he delegates the clan&apos;s
            daily administration to the <strong>Ssabalangira</strong>.
          </p>
          <p className="mt-2.5">
            The Ssabalangira&apos;s responsibilities mirror those of any clan
            head: presiding over funerary rites for deceased Abalangira and
            Abambejja, overseeing the installation of heirs within the royal
            family, and acting as custodian of matters affecting the princes
            generally. A cultural detail that is frequently cited as proof
            that the royal clan is real and self-contained is that when a
            prince or princess dies, funeral rites are conducted under the
            authority of the royal clan, not by the clan of the
            deceased&apos;s mother — exactly as would happen in any other
            Buganda clan, where funerary rites must be presided over by a
            person&apos;s own clan and never by an outsider&apos;s.
          </p>
          <p className="mt-2.5">
            A staff of office known as <strong>Ssegulira Ennume</strong> is
            held by the Ssabalangira as the symbol of this authority over
            matters concerning the princes. Upon the death of a Ssabalangira,
            Buganda custom requires the Kabaka to instruct the Nalinnya Lubuga
            to formally retrieve the staff, clearing the way for burial rites
            and the consultations that will select a successor to the office.
          </p>
          <p className="mt-2.5">
            The Namasole (the Kabaka&apos;s mother) and the Lubuga (his
            official royal sister) occupy the two most senior positions among
            royal women, ranking immediately after the Kabaka himself in
            courtly protocol. Both held estates, palaces, and chiefs of their
            own, and both were final arbiters for their own subjects and
            courts — though, notably, neither held formal authority over the
            machinery of state government, which remained the domain of the
            Katikkiro and the Kabaka&apos;s council.
          </p>
          <p className="mt-2.5">
            Day-to-day family supervision of the wider body of Abalangira and
            Abambejja historically fell to the <strong>Kasujju</strong>, the
            chief of Busujju county, who reported directly to the Kabaka on
            family matters concerning the royal clan.
          </p>
        </Section>

        {/* ── 4. Birth, Naming & Succession ── */}
        <Section title="Birth, Naming, and Succession">
          <p>
            The birth of a royal child was a public event: the Mujaguzo
            (Royal Drums) were sounded by drummers drawn from a specific
            designated clan, formally announcing to the kingdom that a new
            prince or princess had been born. The same drums were sounded, in
            a different rhythm, to announce the death of a reigning Kabaka.
          </p>
          <p className="mt-2.5">
            <strong>Naming.</strong> Buganda has a long-standing custom called{" "}
            <strong>okubbula</strong>, in which a child is given the name of a
            favoured relative — from either the paternal or the maternal
            side. Several Kabakas took names closely resembling those of
            their mothers, which fed the matrilineal misconception above. But
            taking a name in the okubbula tradition never changed a
            person&apos;s clan; clan membership remained a matter of paternal
            genealogy regardless of which relative&apos;s name a child
            received.
          </p>
          <p className="mt-2.5">
            <strong>The Kiweewa exception.</strong> A Kabaka&apos;s first-born
            son traditionally received the name/title Kiweewa, and was, by
            long custom, not eligible to succeed his father on the throne.
            (One notable exception was the Kabaka who reigned briefly under
            this name in 1888, who is said to have taken the throne only
            reluctantly.)
          </p>
          <p className="mt-2.5">
            <strong>No crown prince.</strong> Buganda has no equivalent of a
            formally designated &quot;crown prince.&quot; All eligible princes
            are, in principle, treated equally before the death of the
            reigning Kabaka. During his reign, however, a special council
            quietly observes the character and conduct of the young princes,
            and the identity of the chosen successor is kept secret by this
            council until the king&apos;s death. At the customary viewing of
            the late king&apos;s body, the selected prince steps forward and
            lays a piece of barkcloth over the body, thereby revealing himself
            publicly as the new Kabaka.
          </p>
          <p className="mt-2.5">
            <strong>Political stakes of succession.</strong> Because any son
            of a former Kabaka remains eligible for the throne, brothers and
            paternal cousins of a reigning king have historically represented
            a real political threat, and succession disputes were a recurring
            feature of Buganda&apos;s dynastic history — occasionally to the
            point of a newly installed king moving against male relatives who
            might contest his rule.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>Historians&apos; theory of &quot;clan rotation&quot;:</strong>{" "}
              because each Kabaka draws wives from many different clans (never
              his own), some observers have suggested that kingship informally
              &quot;rotated&quot; among maternal clans, since each clan hoped
              its daughter&apos;s son might one day inherit the throne. This
              theory, while capturing something true about the intensity of
              clan politics around succession, does not change the underlying
              legal fact that royal lineage itself runs through the father,
              not the mother.
            </p>
          </div>
        </Section>

        {/* ── 5. Marriage Customs ── */}
        <Section title="Marriage Customs of Abalangira and Abambejja">
          <p>
            A foundational rule of the Buganda clan system, applied to the
            royal clan as to every other, is that members of the same clan may
            never marry one another — nor may a person marry within their
            mother&apos;s clan, since it shares the same totem. This rule was
            deliberately extended, as a matter of kingdom-level statecraft, to
            the royal family itself.
          </p>
          <p className="mt-2.5">
            <strong>Endogamy was deliberately blocked.</strong> Buganda
            tradition holds that when the kingdom&apos;s clans convened on the
            Hill of Nnono to agree the terms on which they would live together
            under one Kabaka, they specifically agreed that Abalangira and
            Abambejja would not marry one another. This meant every marriage
            involving a prince or princess necessarily bonded the royal family
            to one of the ordinary clans, spreading royal kinship — and the
            political stake in the throne — across the whole of Buganda
            society, rather than concentrating it in a closed royal caste.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>Restrictions on princesses&apos; marriage.</strong> For
              roughly a century and a half — from about the mid-eighteenth
              century until around 1880 — Abambejja were, as a rule, forbidden
              to marry or bear children at all. Exceptions were made only
              rarely: an Omumbejja might be given in marriage to a chief or
              other notable as an exceptional mark of royal favour, a visible
              sign that the Kabaka held that man in especially high regard. As
              a kind of compensation for being barred from ordinary marriage,
              princesses of this era were permitted to take lovers and,
              unusually for Buganda custom, were free to be the ones who
              initiated such a relationship — a privilege they shared with the
              Lubuga in her own ceremonial position. A son born to an
              Omumbejja carries the customary title <strong>Saava</strong>,
              marking his descent from a princess even though, following the
              patrilineal rule, he belongs to his own father&apos;s clan
              rather than to Olulyo Olulangira.
            </p>
          </div>
          <p className="mt-3">
            <strong>Supervision.</strong> Because marriage and family conduct
            among princes and princesses carried such political weight, both
            groups fell under the day-to-day oversight of the Kasujju, the
            Ssaza chief of Busujju, who reported family matters directly to
            the Kabaka.
          </p>
          <p className="mt-2.5">
            <strong>General Buganda marriage rules that also applied to
            royals.</strong> Outside these royal-specific restrictions, the
            ordinary clan-exogamy rules of Buganda governed royal marriages as
            they did everyone else&apos;s: marriage within one&apos;s own
            clan, or within one&apos;s mother&apos;s clan (by shared totem),
            was treated as a serious taboo, so every eligible marriage —
            royal or common — had to cross clan lines.
          </p>
        </Section>

        {/* ── 6. Ranking of Royal Women ── */}
        <Section title="Ranking of Royal Women">
          <p className="mb-3">
            Buganda&apos;s court protocol recognised a fairly precise order of
            precedence among the women closest to the throne. Historical
            accounts of the Buganda tradition typically list the following
            order, immediately after the Kabaka himself:
          </p>
          <ol className="list-none flex flex-col gap-1.5 p-0 m-0">
            {[
              ["1", "Namasole", "The king’s mother; the highest-ranking woman in the kingdom, holding her own courts, estates, and taxing power, though excluded from formal state governance."],
              ["2", "Lubuga (Nnalinya)", "The Kabaka’s chosen royal sister, sharing many of his prerogatives; her palace could be roughly twice the size of an important royal wife’s."],
              ["3", "Titled royal wives", "Senior wives carrying formal court titles ranked above ordinary chiefs, deeply involved in court politics through their own clans and sons."],
              ["", "Nabikande", "Head royal midwife and council member, overseeing the king’s pregnant wives and, historically, the care of newborn Abalangira and Abambejja."],
            ].map(([no, title, desc]) => (
              <li
                key={title}
                className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] px-3.5 py-2.5 text-[13px] text-gd leading-relaxed"
              >
                <span className="text-gold font-bold shrink-0 mt-0.5 w-4 text-right">{no}{no && "."}</span>
                <span><strong>{title}</strong> — {desc}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3">
            This female hierarchy operated in parallel to the male
            chieftaincy structure headed by the Katikkiro, and its members —
            especially the Namasole and the various maternal clans competing
            to place their daughters as royal wives — were central players in
            the intense politics that surrounded every succession.
          </p>
        </Section>

        {/* ── 7. The Royal Clan Today ── */}
        <Section title="The Royal Clan in Contemporary Buganda">
          <p>
            The office of Ssabalangira remains active in present-day Buganda
            as the recognised custodian of royal lineage affairs, continuing
            to advise the reigning Kabaka and to oversee matters concerning
            the wider body of Abalangira. Ssabalangira{" "}
            <strong>Godfrey Kikulwe Musanje</strong> died on 3 February 2026
            at age 76; the customary protocol followed, with the Kabaka
            instructing the Nalinnya Lubuga to retrieve the Ssegulira Ennume
            staff of office before burial arrangements and the search for a
            successor could proceed.{" "}
            <strong>Prince Frederick Sunday Kateregga</strong>, the former
            Deputy Ssabalangira, was named Interim Ssabalangira by the Kabaka
            pending a substantive appointment.
          </p>
          <p className="mt-2.5">
            The naming conventions above remain visible in the current royal
            generation.{" "}
            <strong>Ssabasajja Kabaka Ronald Muwenda Mutebi II</strong> named
            his eldest son <strong>Jjunju</strong> and a younger son{" "}
            <strong>Ssemakookiro</strong>, both names carried by earlier
            Kabakas of Buganda — the twenty-sixth and twenty-seventh kings
            respectively, sons of Kabaka Kyabaggu Kabinuli who reigned in the
            eighteenth century. Kabaka Mutebi&apos;s children also include
            Princesses Joan Nassolo, Victoria Nkinzi, and Katrina
            Ssangalyambogo.
          </p>
          <p className="mt-2.5">
            Contemporary commentary on succession continues to reference the
            old rules described above: clan elders have noted that, in
            keeping with the Kiweewa tradition, the eldest prince would not
            customarily be first in line to succeed his father, and that
            questions of a mother&apos;s clan background remain a live topic
            of discussion around any potential heir, even though clan
            membership itself is legally paternal.
          </p>
          <p className="mt-2.5">
            Male descendants of princesses also carry a distinct customary
            title: a son of an Omumbejja may be styled{" "}
            <strong>Saava</strong>, marking his descent from a princess even
            though, following the patrilineal rule, he belongs to his own
            father&apos;s clan rather than to Olulyo Olulangira.
          </p>
        </Section>

        {/* ── 8. Quick Reference Summary ── */}
        <Section title="Quick Reference Summary">
          <div className="bg-white border border-eborder rounded-[5px] divide-y divide-eborder">
            {[
              ["Royal clan name", "Olulyo Olulangira"],
              ["Male members", "Abalangira (sing. Omulangira)"],
              ["Female members", "Abambejja (sing. Omumbejja)"],
              ["Descent rule", "Patrilineal, traced to Kato Kintu; no totem, unlike all other clans"],
              ["Clan head (delegated)", "Ssabalangira — holds the Ssegulira Ennume staff of office"],
              ["King's mother", "Namasole — highest-ranking royal woman"],
              ["King's royal sister", "Lubuga / Nnalinya — becomes Nnaalinnya after the king's death"],
              ["Family supervision", "Kasujju, Ssaza chief of Busujju"],
              ["Marriage rule", "Abalangira and Abambejja may not marry each other; princesses' marriage was heavily restricted c. 1750s–1880"],
              ["First-born son's title", "Kiweewa — traditionally excluded from succession"],
              ["Succession", "No fixed \"crown prince\"; heir kept secret until the king's death, revealed at the barkcloth ceremony"],
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

        {/* Source note — this page condenses a compiled reference document;
            flag secondary-source variability rather than presenting it as
            settled academic consensus */}
        <div className="bg-cream2 border border-eborder rounded-[5px] p-4 mb-7">
          <p className="text-[12px] text-muted leading-relaxed">
            <strong className="text-gd">A note on sources:</strong> Buganda&apos;s
            oral and courtly traditions carry regional and clan-based
            variation, and some points above (e.g. precise dates for the
            restriction on princesses marrying) are as reported by secondary
            sources — including buganda.or.ug, Obutaka.com, the Buganda Royal
            Family archive, and Uganda press coverage of recent Ssabalangira
            successions — rather than fixed academic consensus.
          </p>
        </div>

        {/* Cross-link to the companion page — /queens merged into /kabaka,
            which now also covers the Nnabagereka, Namasole and Lubuga */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <Link
            href="/kabaka"
            className="block text-center bg-white border border-eborder rounded-[6px] px-5 py-4 no-underline hover:border-gold transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[1.5px] text-muted block mb-1">
              Companion page
            </span>
            <span className="font-serif text-[17px] text-gd">
              The Kabaka, Queens &amp; the Throne →
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
