"use client";

import Link from "next/link";

// The /clans?view=kisekwa page — Kooti ya Kisekwa, Buganda's traditional
// apex court for clan (Ekika) affairs. Condensed from "Kooti ya Kisekwa —
// Buganda Kingdom: A Reference Guide to Its Origins, Structure, Jurisdiction
// and Landmark Rulings." This is the institution already referenced by name
// in web/lib/bataka.ts's Ngeye and Nvubu notes ("the Kisekwa clan court") —
// this page is the missing explainer those notes point at.
//
// Structure follows the source doc's own section order: overview → name &
// meaning → historical background → structure/judicial hierarchy →
// jurisdiction → landmark rulings → significance → quick reference → sources.
export function KisekwaContent() {
  return (
    <>
      {/* Hero — royal blue marks Kingdom-institution pages (same as
          /abalangira and /abakungu); no single portrait fits a court */}
      <div
        className="px-6 py-10 text-center border-b-4 border-gold"
        style={{ background: "var(--royal)" }}
      >
        <span className="text-[56px] mb-3 block">⚖️</span>
        <h1 className="font-serif text-[32px] text-white font-normal mb-1.5">
          Kooti ya Kisekwa
        </h1>
        <p className="text-[14px] text-white/60 mb-3 max-w-[600px] mx-auto">
          The Traditional Court of Clans in the Buganda Kingdom — the apex
          forum for contested clan headships, succession, and Obutaka
          disputes.
        </p>
        <p className="text-[12px] text-gold2 tracking-[.5px]">
          Also known as Kkooti ya Kisekwa · Embuga ya Kisekwa · Sits at
          Bulange, Mengo
        </p>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-7">

        {/* ── 1. Overview ── */}
        <Section title="Overview">
          <p>
            Kooti ya Kisekwa is the Buganda Kingdom&apos;s highest traditional
            court for clan (Ekika) affairs. It sits at Bulange, Mengo, the
            seat of the Buganda Kingdom government, and is the body to which
            clans and clan heads (Abataka) bring disputes that cannot be
            resolved within the clan&apos;s own internal structures.
          </p>
          <p className="mt-2.5">
            Its core purpose is to safeguard the integrity of Buganda&apos;s
            clan system — confirming who is the rightful holder of a clan
            headship, settling succession disputes, and adjudicating
            disagreements over clan land (Obutaka) and clan governance — so
            that the wider social fabric of the Kingdom, built as it is on
            more than fifty interlocking clans, remains stable and unified.
          </p>
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mt-3">
            <p className="text-[13px] text-gd leading-relaxed">
              <strong>Name and meaning:</strong> &quot;Kooti&quot; is the
              Luganda rendering of the English word &quot;court.&quot;
              &quot;Kisekwa&quot; is the traditional title carried by the
              presiding figure of this court, so that &quot;Kooti ya
              Kisekwa&quot; literally means &quot;the Court of Kisekwa&quot;
              — the court over which the office-holder titled Kisekwa
              presides. Over time the name has come to refer to the
              institution itself rather than only its presiding officer.
            </p>
          </div>
        </Section>

        {/* ── 2. Historical Background ── */}
        <Section title="Historical Background">
          <p>
            The Kisekwa court is not a colonial or post-independence
            invention; its roots lie in the pre-colonial judicial structures
            of the Kingdom. Clan-level social organisation in Buganda has
            always carried its own mechanisms for resolving disputes, with
            escalation running from the smallest family unit up to the clan
            head and, ultimately, to the Kabaka.
          </p>
          <p className="mt-2.5">
            The formal recognition of Buganda&apos;s indigenous courts by
            outside authority dates to the colonial period. The 1900 Buganda
            Agreement acknowledged the jurisdiction of the Kabaka&apos;s
            traditional courts, and subsequent instruments — the 1905 Uganda
            (Judicial) Agreement, the 1917 Native Courts in Buganda
            Proclamation, and the 1924 Uganda (Clan Cases) Agreement —
            further defined how clan-related cases were to be handled within
            the Kingdom&apos;s own judicial system, distinct from the
            colonial state&apos;s courts.
          </p>
          <p className="mt-2.5">
            Following the abolition of Uganda&apos;s traditional kingdoms in
            1967 and the restoration of the Buganda Kingdom in 1993, the
            Kisekwa court was revived as part of the re-established royal
            institutions, resuming its historic role of hearing clan
            headship and succession disputes under the authority of the
            restored Kabaka.
          </p>
        </Section>

        {/* ── 3. Structure and Position in the Judicial Hierarchy ── */}
        <Section title="Structure and Position in the Judicial Hierarchy">
          <p className="mb-3">
            Buganda&apos;s clan system is organised in a nested hierarchy —
            from the smallest unit (Ennyumba, the household) up through
            Oluggya, Omutuba, Olunyiriri and Essiga, to the Akasolya, the
            clan&apos;s ancestral seat and highest internal level. Disputes
            are, in principle, expected to be resolved first at the lowest
            possible level.
          </p>

          {/* Escalation ladder — mirrors the indented hierarchy card style
              used on the Bataka view's Kingdom-hierarchy card */}
          <div
            className="relative overflow-hidden rounded-[6px] p-6 mb-3 border-2 border-gold"
            style={{ background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)" }}
          >
            <span
              aria-hidden="true"
              className="absolute right-5 bottom-4 text-[48px] opacity-[.15] pointer-events-none select-none"
            >
              ⚖️
            </span>
            <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-3">
              Where disputes escalate
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                ["Ennyumba / Oluggya", "Household or homestead disputes, settled internally by family elders"],
                ["Omutuba / Olunyiriri", "Sub-clan and lineage disputes, handled by the Ow'omutuba / Ow'olunyiriri"],
                ["Essiga", "Major lineage disputes, adjudicated by the Ow'Essiga"],
                ["Akasolya (clan-wide)", "Matters affecting the whole clan, handled by the Omutaka and Olukiiko lw'Ekika"],
                ["Kooti ya Kisekwa", "The apex traditional court — contested clan headships and succession to the Akasolya"],
                ["The Kabaka", "Final and supreme authority on cultural and clan matters, on appeal"],
              ].map(([level, desc], i, arr) => (
                <div
                  key={level}
                  className="flex items-start gap-3"
                  style={{ marginLeft: i * 14 }}
                >
                  <span className="text-gold2 text-[12px] mt-0.5 shrink-0">
                    {i === 0 ? "◆" : "└"}
                  </span>
                  <p className="text-[13px] text-white/85 leading-snug">
                    <strong
                      className={i >= arr.length - 2 ? "text-gold" : "text-gold2"}
                    >
                      {level}
                    </strong>
                    <span className="text-white/60"> — {desc}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-white/55 leading-relaxed mt-4">
              Because Kisekwa&apos;s authority is customary rather than
              constitutional, parties who remain dissatisfied may also
              pursue the matter in Uganda&apos;s formal judiciary
              (Magistrates&apos; Courts, the High Court, and beyond) — though
              in practice most clan leadership disputes are resolved within
              the cultural system out of respect for tradition.
            </p>
          </div>

          <p className="mt-3">
            <strong>Composition.</strong> The court sits as a panel rather
            than a single judge — a presiding officer bearing the Kisekwa
            title, together with a clerk or court secretary and a number of
            other panel members, several of whom are traditional
            titleholders in their own right. In the 2020 Ndiga clan ruling,
            for example, the panel comprised Joseph Kateregga, Wilson
            Ssentoogo, Lubega Ssebende (who read the verdict), Deogratious
            Kasozi, Jamil Ssewanyana, George Makumbi and Samuel Walusimbi. In
            the 2025 Mmamba (Gabunga) ruling, the presiding Kisekwa was Dr.
            Robert Ssonko, supported by a deputy titled &quot;Kisekwa
            Omuwummuze&quot; and a court clerk (Omuwandiisi wa Kkooti).
          </p>
        </Section>

        {/* ── 4. Jurisdiction ── */}
        <Section title="Jurisdiction — What the Court Handles">
          <ul className="pl-4 list-disc flex flex-col gap-2">
            <li>
              <strong>Contested clan headships</strong> — determining the
              rightful Omutaka (clan head) when a succession is disputed,
              including verifying descent and lineage claims.
            </li>
            <li>
              <strong>Sub-clan and title disputes</strong> — for example,
              disputes over hereditary court titles held within specific
              clans, such as the Gabunga title in the Mmamba (Lungfish)
              clan.
            </li>
            <li>
              <strong>Clan land (Obutaka) disputes</strong> — including
              allegations that a clan head has mismanaged or wrongfully sold
              clan land.
            </li>
            <li>
              <strong>Internal clan governance disputes</strong> —
              disagreements between a clan head and the clan council
              (Olukiiko lw&apos;Ekika), or between rival factions within a
              clan.
            </li>
          </ul>
          <p className="mt-3 text-[13px] text-muted leading-relaxed">
            The court&apos;s decisions are explicitly framed as aiming for
            reconciliation rather than punishment — restoring unity within a
            clan rather than simply declaring a winner, in keeping with the
            broader Buganda emphasis on collective harmony over individual
            victory.
          </p>
        </Section>

        {/* ── 5. Landmark and Notable Rulings ── */}
        <Section title="Landmark and Notable Rulings">
          <p className="mb-4">
            The following cases illustrate the range and significance of
            matters brought before Kooti ya Kisekwa in recent years.
          </p>
          <div className="flex flex-col gap-3">
            <RulingCard
              year="Ruled 2020"
              title="The Ndiga Clan Headship Dispute"
              body={
                <>
                  A leadership dispute in the Ndiga (Sheep) clan, said to
                  have persisted for roughly 487 years, was resolved when
                  the court nullified the headship of Daniel Bbosa after
                  finding he was not descended from the clan&apos;s rightful
                  line and had sold off clan land rather than preserving it.
                  It ruled that Luggya Bbosa Tabula, a documented descendant
                  of the founding lineage, should be installed as Lwomwa,
                  the rightful clan head, and advised dissatisfied parties
                  to appeal to the Kabaka if they wished. Bbosa was later
                  killed in 2024 amid the continuing fallout from the
                  dispute, and a suspect connected to the rival
                  claimant&apos;s side was subsequently arrested.
                </>
              }
              href="/clans/ndiga"
              linkLabel="Visit the Ndiga clan page"
            />
            <RulingCard
              year="Ruled 2016"
              title="The Ngeye Clan Headship Dispute"
              body={
                <>
                  A leadership wrangle in the Ngeye (Colobus Monkey) clan,
                  running for around 96 years, was settled after the matter
                  reached the Kabaka on appeal. The Kabaka ruled that a new
                  clan head, holding the title Kasujja, should be selected
                  from the correct sub-clan (Mutuba), with the case
                  suspended indefinitely thereafter.
                </>
              }
              href="/clans/ngeye"
              linkLabel="Visit the Ngeye clan page"
            />
            <RulingCard
              year="Ruled 2025"
              title="The Mmamba Clan / Gabunga Succession Case"
              body={
                <>
                  A succession dispute over the Gabunga title — the
                  hereditary head of the Mmamba (Lungfish) clan and
                  traditional naval commander of Buganda — was resolved
                  after roughly twelve years before the court. The court
                  confirmed James Mubiru as the 38th Gabunga, finding that
                  the late 36th Gabunga, Yosiya Kasozi, had named him
                  successor, and cleared the clan&apos;s leadership
                  committee of wrongdoing. The Mmamba clan&apos;s own
                  Katikkiro welcomed the ruling and called for unity among
                  clan members.
                </>
              }
              href="/clans/mmamba"
              linkLabel="Visit the Mmamba clan page"
            />
            <RulingCard
              year="Ruled 2026"
              title="The Engeye Clan / Kalindaluzzi Appeal"
              body={
                <>
                  An appeal case within the Engeye clan concerning the
                  Kalindaluzzi lineage was decided by the court (referred to
                  in this instance as Embuga ya Kisekwa), which confirmed
                  James Kalumba Buuzabalyawo as the rightful head of the
                  Kalindaluzzi sub-clan, as heir to Ssebayigga Yozefu
                  Kalinda.
                </>
              }
            />
          </div>
          <p className="mt-3 text-[11.5px] text-muted leading-relaxed">
            <strong>A note on the Engeye spelling:</strong> the source
            record for this 2026 appeal spells the clan &quot;Engeye,&quot;
            distinct from the &quot;Ngeye&quot; (Colobus Monkey) clan and
            its 2016 Kasujja ruling above — we have not confirmed whether
            these are the same clan under a variant spelling or two
            different clans, so this case is not linked to a specific clan
            page here.
          </p>
        </Section>

        {/* ── 6. Significance ── */}
        <Section title="Significance to Buganda Heritage">
          <p className="mb-3">
            Kooti ya Kisekwa is more than a dispute-resolution body — it is
            one of the institutions that keeps Buganda&apos;s clan system a
            living, functioning part of the Kingdom&apos;s governance rather
            than a purely ceremonial inheritance. Every clan head installed
            or confirmed through it draws legitimacy not from personal
            ambition but from verified descent, which the court exists to
            test and safeguard.
          </p>
          <ul className="pl-4 list-disc flex flex-col gap-2">
            <li>
              It reinforces the principle, consistently applied by the
              court, that clan leadership is a matter of rightful ancestry
              rather than popularity or capability.
            </li>
            <li>
              It links the everyday life of the clans to the person of the
              Kabaka, since the court&apos;s rulings can ultimately be
              referred to him as the supreme authority on cultural matters.
            </li>
            <li>
              It protects clan assets, particularly Obutaka (clan land),
              from mismanagement by ensuring accountability of clan heads.
            </li>
            <li>
              It gives the Kingdom&apos;s more than fifty clans a shared,
              functioning judicial forum, reinforcing the wider unity of
              Buganda across all its Ebika.
            </li>
          </ul>
        </Section>

        {/* ── 7. Quick Reference ── */}
        <Section title="Quick Reference">
          <div className="bg-white border border-eborder rounded-[5px] divide-y divide-eborder">
            {[
              ["Also known as", "Kkooti ya Kisekwa; Embuga ya Kisekwa"],
              ["Location", "Bulange, Mengo — seat of the Buganda Kingdom government"],
              ["Presiding title", "Kisekwa (the office-holder for whom the court is named)"],
              ["Jurisdiction", "Clan headship and succession disputes, clan land (Obutaka) disputes, internal clan governance disputes"],
              ["Position in hierarchy", "Apex traditional court for clan matters, above Akasolya, Essiga, Olunyiriri and Omutuba-level clan structures"],
              ["Appeal route", "To the Kabaka as supreme authority on cultural matters; ultimately to Uganda's formal judiciary if pursued"],
              ["Historical basis", "Pre-colonial customary authority; referenced in the 1900 Buganda Agreement and subsequent colonial-era judicial instruments; revived with the Kingdom's restoration in 1993"],
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
            <strong className="text-gd">A note on sources:</strong> this
            page condenses a compiled reference document drawing on Uganda
            Radionetwork, The Kampala Report, The Observer (Uganda), The
            Independent (Uganda), Nile Post, buganda.or.ug (the Buganda
            Kingdom&apos;s official website), Voice of Bugerere, Daily
            Monitor, Wikipedia (&quot;Clans of Baganda&quot;), 101 Last
            Tribes, and the ACCORD monograph &quot;Conflict resolution under
            the Ekika system of the Baganda in Uganda.&quot; Clan headship
            is a living record — treat rulings as the most recent confirmed
            snapshot, not a permanently closed matter.
          </p>
        </div>

        {/* Cross-links to the companion views */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <Link
            href="/clans?view=bataka"
            className="block text-center bg-white border border-eborder rounded-[6px] px-5 py-4 no-underline hover:border-gold transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[1.5px] text-muted block mb-1">
              Companion view
            </span>
            <span className="font-serif text-[17px] text-gd">
              Olukiiko lw&apos;Abataka — the Council of Clan Heads →
            </span>
          </Link>
          <Link
            href="/clans"
            className="block text-center bg-white border border-eborder rounded-[6px] px-5 py-4 no-underline hover:border-gold transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[1.5px] text-muted block mb-1">
              Companion view
            </span>
            <span className="font-serif text-[17px] text-gd">
              The 56 Ebika of Buganda →
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

// RulingCard: one landmark case — year chip, title, body, and an optional
// link through to the clan's own page (omitted where the source clan is
// ambiguous, e.g. the Engeye/Kalindaluzzi case).
function RulingCard({
  year,
  title,
  body,
  href,
  linkLabel,
}: {
  year: string;
  title: string;
  body: React.ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="bg-white border border-eborder rounded-[6px] p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[9.5px] font-bold px-2 py-0.5 rounded tracking-[.5px] uppercase bg-gold3 text-gold">
          {year}
        </span>
      </div>
      <h4 className="font-serif text-[16px] text-gd font-normal mb-1.5">{title}</h4>
      <p className="text-[13px] text-gd leading-relaxed">{body}</p>
      {href && linkLabel && (
        <Link
          href={href}
          className="inline-block mt-2.5 text-[11px] text-royal2 font-semibold uppercase tracking-[.5px] no-underline hover:underline"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

// Section: titled content block with a ruled bottom border — same pattern
// used across /abalangira, /abakungu and /kabaka.
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
