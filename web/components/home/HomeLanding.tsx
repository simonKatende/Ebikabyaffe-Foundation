"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { HeroSlider } from "@/components/home/HeroSlider";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

// Animation timing — each layer delays slightly so elements arrive in sequence
const ANIM = {
  badge:   "hero-badge-in   0.9s ease-out 0.10s both",
  heading: "hero-heading-in 1.1s ease-out 0.30s both",
  content: "hero-content-in 1.0s ease-out 0.60s both",
};

// The three pillars of Buganda's traditional governance, per "Ebikabyaffe
// Foundation" reference doc (Jul 2026) — each pillar already has its own
// full page on this site, so this section doubles as a site map.
const PILLARS = [
  {
    icon: "👑",
    title: "Abalangira n'Abambejja",
    sub: "The royal clan — princes and princesses",
    head: "Ssabalangira",
    holder: "Interim: Prince Frederick Sunday Kateregga, following the death of Godfrey Kikulwe Musanje (3 Feb 2026, age 76)",
    href: "/abalangira",
    cta: "Explore the Royal Clan",
  },
  {
    icon: "🐟",
    title: "Ebika bya Buganda",
    sub: "The 56 clans, each with its own totem, head, and ancestral seat",
    head: "Omukulembeza w'Olukiiko lwa Bataka",
    holder: "Omutaka Augustine Kizito Mutumba, Chairman of the Council of Clan Heads",
    href: "/clans?view=bataka",
    cta: "Meet the Council of Clan Heads",
  },
  {
    icon: "⚖️",
    title: "Abakungu ba Ssaabasajja",
    sub: "The territorial chiefs — Ssaza, Gombolola, Muluka",
    head: "Katikkiro of Buganda",
    holder: "Owek. Charles Peter Mayiga — in office since 12 May 2013",
    href: "/abakungu",
    cta: "Explore the Kingdom's Chiefs",
  },
];

// Ebikabyaffe Foundation's own leadership, per the same reference doc.
const LEADERS = [
  ["Omutaka Augustine Kizito Mutumba", "Chairman, Council of Clan Heads (Olukiiko lwa Bataka), Buganda Kingdom"],
  ["Omutaka Kayongo Patrick Kawuma", "Chairperson, Board of Ebikabyaffe Foundation"],
  ["Omutaka Blasio Mutanda Kawule", "Executive Director"],
  ["Joshua Kato Bbosa", "Chief National Coordinator"],
  ["Eng. Ronald Serumaga Ssava", "Coordinator"],
  ["Robert Sserunjogi", "Lead Researcher"],
];

export function HomeLanding() {
  const { login } = useAuth();

  return (
    <>
      {/* h-screen = exactly 100vh so the image fills the viewport edge-to-edge.
          pt-[var(--nav-h)] pushes content below the fixed nav without shrinking
          the background. pb-[110px] reserves a clear strip at the bottom for
          the slider's own caption/dots/progress bar, so the centered content
          (which grows tall once the stats bar is included) never crowds down
          into that zone and covers the slide's place-name caption. */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ height: "100vh", paddingTop: "var(--nav-h)", paddingBottom: "110px" }}
      >
        {/* Full-viewport background slider — absolutely positioned behind all content */}
        <HeroSlider />

        {/* ── Main content — sits above the slider via z-10 ── */}
        <div className="relative z-10 flex flex-col items-center w-full px-6">

          {/* 1 · Endorsement badge — arrives first */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-[10px] tracking-[2.5px] uppercase font-medium"
            style={{
              background: "rgba(200,151,58,.13)",
              border: "1px solid rgba(200,151,58,.38)",
              color: "var(--gold2)",
              backdropFilter: "blur(6px)",
              animation: ANIM.badge,
            }}
          >
            <span style={{ fontSize: 13 }}>👑</span>
            Endorsed by Olukiiko lw&apos;Abataka · Buganda Kingdom
          </div>

          {/* 2 · Headline — arrives second, largest element on the page */}
          <h1
            className="font-serif text-white font-normal leading-[1.12] mb-5"
            style={{
              fontSize: "clamp(36px, 6.5vw, 68px)",
              maxWidth: 760,
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
              animation: ANIM.heading,
            }}
          >
            Reclaim{" "}
            <em
              className="not-italic"
              style={{
                color: "var(--gold2)",
                textShadow: "0 0 40px rgba(244,198,106,0.25)",
              }}
            >
              who you are.
            </em>
            <br />
            Discover your clan,
            <br className="hidden sm:block" />
            {" "}your roots, your people.
          </h1>

          {/* 3 · Lede + CTAs + stats — arrive together, slightly after heading */}
          <div
            className="flex flex-col items-center"
            style={{ animation: ANIM.content }}
          >
            <p
              className="mb-9 leading-relaxed"
              style={{
                fontSize: 17,
                maxWidth: 460,
                color: "rgba(255,255,255,0.72)",
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              }}
            >
              56 Buganda clans. 18 Amasaza. One foundation. Your lineage,
              traced in 8 steps — from Akasolya to Enju.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-3.5 flex-wrap justify-center mb-11">
              <Link href="/clans" className="no-underline">
                <button
                  className="font-semibold text-[15px] px-7 py-3.5 rounded-[5px] cursor-pointer transition-all duration-200"
                  style={{
                    background: "var(--gold)",
                    color: "var(--gd)",
                    boxShadow: "0 4px 20px rgba(200,151,58,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    const b = e.currentTarget;
                    b.style.background = "var(--gold2)";
                    b.style.transform  = "translateY(-2px)";
                    b.style.boxShadow  = "0 8px 28px rgba(200,151,58,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget;
                    b.style.background = "var(--gold)";
                    b.style.transform  = "translateY(0)";
                    b.style.boxShadow  = "0 4px 20px rgba(200,151,58,0.35)";
                  }}
                >
                  Find your clan →
                </button>
              </Link>

              <button
                onClick={login}
                className="font-medium text-[15px] px-7 py-3.5 rounded-[5px] cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  const b = e.currentTarget;
                  b.style.background   = "rgba(255,255,255,0.18)";
                  b.style.borderColor  = "rgba(255,255,255,0.55)";
                  b.style.color        = "#fff";
                  b.style.transform    = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const b = e.currentTarget;
                  b.style.background   = "rgba(255,255,255,0.10)";
                  b.style.borderColor  = "rgba(255,255,255,0.28)";
                  b.style.color        = "rgba(255,255,255,0.88)";
                  b.style.transform    = "translateY(0)";
                }}
              >
                Sign in to your account
              </button>
            </div>

            {/* 4-block stats bar — frosted glass panel. Tiles with an href are
                links (56 Ebika → /clans, 18 Amasaza → /abakungu) so the two
                encyclopedias are discoverable straight from the landing page. */}
            <div
              className="flex rounded-lg overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
                backdropFilter: "blur(10px)",
              }}
            >
              {[
                { num: "847K+",  lbl: "Baganda registered"                   },
                { num: "56",     lbl: "Ebika bya Buganda", href: "/clans"    },
                { num: "18",     lbl: "Amasaza",           href: "/abakungu" },
                { num: "12,847", lbl: "Bataka-verified"                      },
              ].map(({ num, lbl, href }, i, arr) => {
                const inner = (
                  <>
                    <span className="font-serif text-[27px] text-white block leading-none mb-1">
                      {num}
                    </span>
                    <span
                      className="text-[10px] tracking-[.5px] whitespace-nowrap uppercase"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {lbl}
                      {href && <span style={{ color: "var(--gold2)" }}> →</span>}
                    </span>
                  </>
                );
                const borderStyle = {
                  borderRight:
                    i < arr.length - 1 ? "1px solid rgba(255,255,255,0.10)" : "none",
                };
                return href ? (
                  <Link
                    key={lbl}
                    href={href}
                    className="px-6 py-4 text-center no-underline transition-colors hover:bg-white/[.08]"
                    style={borderStyle}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={lbl} className="px-6 py-4 text-center" style={borderStyle}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          Sections below the hero — condensed from "Ebikabyaffe Foundation:
          A Buganda Kingdom-Affiliated Organisation" reference doc (Jul 2026).
          ══════════════════════════════════════════════════════════════════ */}

      {/* ── About the Foundation ── */}
      <section className="px-6 py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[11px] tracking-[2px] uppercase text-royal2 font-semibold mb-3">
            About Us
          </p>
          <h2 className="font-serif text-[28px] text-gd font-normal mb-3">
            Okutumbula n&apos;okusitula Ebikabyaffe
          </h2>
          <p className="font-serif italic text-[15px] text-muted mb-5">
            &quot;To promote and uplift our heritage.&quot;
          </p>
          <p className="text-[14px] text-gd leading-relaxed max-w-[600px] mx-auto mb-8">
            Ebikabyaffe Foundation is affiliated with Buganda Kingdom,
            connected to the Kingdom&apos;s Council of Clan Heads (Olukiiko
            lwa Bataka). We work to instill good morals, discipline, and
            cultural pride in young Ugandans, in response to what our
            officials see as declining respect for elders and leaders — by
            reviving pride in Buganda culture and identity, and by building
            institutions that combine standard education with cultural
            formation. The Foundation was formally launched by the Katikkiro
            of Buganda.
          </p>
          <div className="max-w-[520px] mx-auto">
            <YouTubeEmbed
              videoId="A9fa60aNhQA"
              title="Ebikabyaffe Foundation launch"
            />
          </div>
        </div>
      </section>

      {/* ── Our Leadership ── */}
      <section className="px-6 py-16" style={{ background: "white" }}>
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] tracking-[2px] uppercase text-royal2 font-semibold mb-2">
              Leadership
            </p>
            <h2 className="font-serif text-[26px] text-gd font-normal">
              Who Runs Ebikabyaffe Foundation
            </h2>
          </div>
          <div
            className="grid gap-2.5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
          >
            {LEADERS.map(([name, role]) => (
              <div
                key={name}
                className="bg-cream2 border border-eborder rounded-[6px] px-4 py-3.5"
              >
                <h3 className="text-[14px] text-gd font-semibold mb-1 leading-snug">
                  {name}
                </h3>
                <p className="text-[12px] text-muted leading-relaxed">{role}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted text-center mt-5">
            Source: State House Uganda / Watchdog Uganda coverage of the
            January 2025 SHIPU meeting.
          </p>
        </div>
      </section>

      {/* ── The Three Pillars of Buganda — doubles as a site map, each
          pillar links to its own full page already built on this site ── */}
      <section className="px-6 py-16" style={{ background: "var(--gd)" }}>
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-[11px] tracking-[2px] uppercase text-gold2 font-semibold mb-2">
            How the Kingdom Is Organised
          </p>
          <h2 className="font-serif text-[26px] text-white font-normal mb-2">
            The Three Pillars of Buganda
          </h2>
          <p className="text-[13px] text-white/55 mb-9 max-w-[520px] mx-auto">
            Buganda&apos;s traditional governance structure rests on three
            pillars, all ultimately under the authority of the Kabaka.
          </p>
          <div
            className="grid gap-4 text-left"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
          >
            {PILLARS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="block no-underline bg-white/[.06] border border-white/15 rounded-[8px] p-5 transition-colors hover:bg-white/[.10] hover:border-gold/50"
              >
                <span className="text-[28px] block mb-2">{p.icon}</span>
                <h3 className="font-serif text-[17px] text-white mb-0.5">
                  {p.title}
                </h3>
                <p className="text-[11.5px] text-white/50 mb-3 leading-snug">
                  {p.sub}
                </p>
                <p className="text-[11px] text-gold2 uppercase tracking-[.5px] mb-1">
                  {p.head}
                </p>
                <p className="text-[12px] text-white/75 leading-relaxed mb-3">
                  {p.holder}
                </p>
                <span className="text-[11px] text-gold2 font-semibold uppercase tracking-[.5px]">
                  {p.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flagship Initiative — three interconnected projects, per the
          "Ebikabyaffe Foundation" proposal doc (Jul 2026): Ekikakyo (the
          clan fund), the Wakivule pilot school it funds, and the Sacco
          that gives both financial structure. Each links to the matching
          campaign card on /give via ?campaign=<id>. ── */}
      <section className="px-6 py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-[680px] mx-auto text-center mb-12">
          <p className="text-[11px] tracking-[2px] uppercase text-royal2 font-semibold mb-2">
            Flagship Initiative
          </p>
          <h2 className="font-serif text-[26px] text-gd font-normal mb-2">
            Ekika, Essomero n&apos;Enkulaakulana
          </h2>
          <p className="font-serif italic text-[14px] text-muted mb-4">
            &quot;Clan, School and Development&quot;
          </p>
          <p className="text-[13px] text-muted leading-relaxed max-w-[560px] mx-auto">
            Three interconnected projects through which members of the clan
            and friends of the Kingdom&apos;s heritage are invited to
            contribute.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto flex flex-col gap-10 text-left">

          {/* I · Ekikakyo — The Clan Fund */}
          <div>
            <p className="text-[11px] tracking-[2px] uppercase text-gold2 font-semibold mb-1">
              Project I
            </p>
            <h3 className="font-serif text-[20px] text-gd font-normal mb-2">
              🛡️ Ekikakyo — The Clan Fund
            </h3>
            <p className="text-[14px] text-gd leading-relaxed mb-3">
              Ekikakyo (&quot;your clan&quot;) is a modern extension of the
              Akasolya, the Olukiiko lw&apos;Ekika, and Obutaka — a fund
              through which members of a clan, wherever they live in Uganda
              or the diaspora, pool resources for the education and welfare
              of their own children. The aim: <strong>one clan, one
              school</strong>, replicated across all 56 clans of the Kingdom.
            </p>
            <Link href="/give?campaign=ekikakyo" className="no-underline">
              <button
                className="font-semibold text-[13px] px-5 py-2.5 rounded-[5px] cursor-pointer"
                style={{ background: "var(--gold)", color: "var(--gd)" }}
              >
                Support Ekikakyo →
              </button>
            </Link>
          </div>

          {/* II · The Pilot School — Wakivule */}
          <div>
            <p className="text-[11px] tracking-[2px] uppercase text-gold2 font-semibold mb-1">
              Project II
            </p>
            <h3 className="font-serif text-[20px] text-gd font-normal mb-2">
              🏫 The Pilot School — Wakivule Village
            </h3>
            <p className="text-[14px] text-gd leading-relaxed mb-2">
              Our pilot school in Wakivule Village, Kikyusa Sub-County,
              Luwero District is the first physical proof point of the
              Ekikakyo vision — showing that a clan-funded, clan-owned
              school can be built, opened, and sustained before the model
              scales to <strong>57 schools across Uganda</strong>, one
              representing the pilot and the rest built as each clan&apos;s
              own Ekikakyo fund matures.
            </p>
            <p className="text-[13px] text-muted leading-relaxed mb-5">
              We see education as central to transforming society and
              shaping responsible, ethical citizens — not merely
              academically or technically capable ones.
            </p>
            <div className="max-w-[520px] mb-5">
              <YouTubeEmbed
                videoId="3CEUzFGR3Fo"
                title="Wakivule Project school launch"
              />
            </div>
            <Link href="/give?campaign=wakivule" className="no-underline">
              <button
                className="font-semibold text-[13px] px-5 py-2.5 rounded-[5px] cursor-pointer"
                style={{ background: "var(--gold)", color: "var(--gd)" }}
              >
                Support the Wakivule school →
              </button>
            </Link>
          </div>

          {/* III · The Sacco — Financial Arm */}
          <div>
            <p className="text-[11px] tracking-[2px] uppercase text-gold2 font-semibold mb-1">
              Project III
            </p>
            <h3 className="font-serif text-[20px] text-gd font-normal mb-2">
              🤝 The Sacco — Financial Arm
            </h3>
            <p className="text-[14px] text-gd leading-relaxed mb-4">
              The Ebikabyaffe Foundation Fraternity Sacco is the financial
              engine behind the school project and the Foundation&apos;s
              other initiatives — a members-owned savings and credit
              cooperative, modernising the old Buganda instinct of{" "}
              <em className="not-italic font-semibold">bulungi bwansi</em>{" "}
              (communal labour) and rotating contribution groups.
            </p>
            <div
              className="grid gap-2.5 mb-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
            >
              {[
                ["Membership fee", "UGX 10,000 one-time"],
                ["Share value", "UGX 20,000 per share"],
                ["Donations", "Any amount, voluntary"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-white border border-eborder rounded-[6px] px-3.5 py-3"
                >
                  <p className="text-[10px] uppercase tracking-wide text-muted mb-1">
                    {label}
                  </p>
                  <p className="text-[13px] text-gd font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <Link href="/give?campaign=sacco" className="no-underline">
              <button
                className="font-semibold text-[13px] px-5 py-2.5 rounded-[5px] cursor-pointer"
                style={{ background: "var(--gold)", color: "var(--gd)" }}
              >
                Join the Sacco →
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* ── Recent Activity ── */}
      <section className="px-6 py-14" style={{ background: "white" }}>
        <div className="max-w-[680px] mx-auto">
          <p className="text-[11px] tracking-[2px] uppercase text-royal2 font-semibold mb-2 text-center">
            Recent Activity
          </p>
          <div className="bg-cream2 border border-eborder rounded-[6px] p-5">
            <p className="text-[13px] text-gd leading-relaxed">
              In January 2025, Foundation officials met{" "}
              <strong>Col. Edith Nakalema</strong>, head of State House&apos;s
              Investors Protection Unit (SHIPU), seeking support to complete
              the Wakivule pilot school project — framing the effort as tied
              to national goals such as fighting corruption and protecting
              investors, and gifting Col. Nakalema a book cataloguing
              Buganda&apos;s clans and totems. Our messaging frames this work
              as pan-Ugandan unity work rather than narrowly
              Buganda-focused: we work with everyone, regardless of
              background.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
