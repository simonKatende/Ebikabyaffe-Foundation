"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeroSlider } from "@/components/home/HeroSlider";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { cn } from "@/lib/utils";

// Animation timing — each layer delays slightly so elements arrive in sequence
const ANIM = {
  badge:   "hero-badge-in   0.9s ease-out 0.10s both",
  kicker:  "hero-heading-in 1.0s ease-out 0.20s both",
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
    title: "Ebika bya Baganda",
    sub: "The 56 clans, each with its own totem, head, and ancestral seat",
    head: "Omukulembeza w'Olukiiko lwa Bataka",
    holder: "Omutaka Augustine Kizito Mutumba, Chairman of the Council of Clan Heads",
    href: "/clans",
    cta: "Explore the 56 Clans",
  },
  {
    icon: "⚖️",
    title: "Abakungu ba Ssaabasajja",
    sub: "The territorial chiefs — Ssaza, Gombolola, Muluka",
    head: "Katikkiro of Buganda — head of this pillar",
    holder: "Owek. Charles Peter Mayiga — in office since 12 May 2013",
    href: "/abakungu",
    cta: "Explore the Kingdom's Chiefs",
    // Per user request (2026-07): the Katikkiro-is-head line renders at the
    // TOP of this card (right under the title), not below the sub line.
    headFirst: true,
  },
];

// Ebikabyaffe Foundation's own leadership, per the same reference doc.
const LEADERS = [
  ["Omutaka Augustine Kizito Mutumba", "Patron · Chairman, Council of Clan Heads (Olukiiko lwa Bataka), Buganda Kingdom"],
  ["Omutaka Blasius Mutanda Kawule", "Founder"],
  ["Kironde Mike", "Chairperson, Board of Ebikabyaffe Foundation"],
  ["Kayongo Patrick Kawuma", "Vice Chairperson"],
  ["Kityamuweesi Musubire Vicent", "Secretary"],
  ["Eng. Ronald Sserumaga Ssava", "Coordinator"],
  ["Dr. John B. Kakembo", "Advisor · Retired Archbishop, Seventh-day Adventist Church"],
  ["Mukiibi Keneth", "Treasurer"],
  ["Sserunjogi Robert", "Lead Researcher"],
];

// Recent Activity items — each expands on click. Media/details for each are
// still being collected; where a launch video already exists elsewhere in the
// codebase it's wired in here too, the rest show an honest placeholder until
// the user supplies photos/videos (do not invent content for them).
const ACTIVITIES: {
  id: string;
  icon: string;
  title: string;
  videoId?: string;
  videoTitle?: string;
}[] = [
  {
    id: "foundation-launch",
    icon: "🏛️",
    title: "Launch of the Ebikabyaffe Foundation",
    videoId: "A9fa60aNhQA",
    videoTitle: "Ebikabyaffe Foundation launch",
  },
  {
    id: "school-launch",
    icon: "🏫",
    title: "Launch of the Pilot School — Wakivule Village",
    videoId: "3CEUzFGR3Fo",
    videoTitle: "Wakivule Project school launch",
  },
  {
    id: "sacco-launch",
    icon: "🤝",
    title: "Launch of the Ebikabyaffe Foundation Fraternity Sacco",
  },
  {
    id: "kabaka-run",
    icon: "🏃",
    title: "Participation in the Kabaka Birthday Run",
  },
];

function RecentActivityList() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {ACTIVITIES.map(({ id, icon, title, videoId, videoTitle }) => {
        const open = openId === id;
        return (
          <div
            key={id}
            className="bg-cream2 border border-eborder rounded-[6px] overflow-hidden"
          >
            <button
              onClick={() => setOpenId(open ? null : id)}
              aria-expanded={open}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer bg-transparent border-0 hover:bg-white/60 transition-colors"
            >
              <span className="text-[20px]">{icon}</span>
              <span className="flex-1 text-[14px] text-gd font-semibold leading-snug">
                {title}
              </span>
              <span
                className="text-[12px] transition-transform duration-200"
                style={{
                  color: "var(--gold2)",
                  transform: open ? "rotate(90deg)" : "none",
                }}
              >
                ▶
              </span>
            </button>
            {open && (
              <div className="px-4 pb-4 pt-1 border-t border-eborder">
                {videoId ? (
                  <>
                    <div className="max-w-[520px] mx-auto mt-3 mb-3">
                      <YouTubeEmbed videoId={videoId} title={videoTitle ?? title} />
                    </div>
                    <p className="text-[12px] text-muted italic text-center">
                      More photos and details coming soon.
                    </p>
                  </>
                ) : (
                  <p className="text-[13px] text-muted italic text-center mt-3">
                    Photos, videos and details coming soon.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function HomeLanding() {
  const router = useRouter();

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

        {/* ── Main content — sits above the slider via z-10.
            pointer-events-none lets clicks on the empty space around the text
            fall through to the slider's prev/next arrows underneath (the
            full-width wrapper was swallowing them); the interactive children
            (CTA buttons, stats-bar links) re-enable their own events. ── */}
        <div className="relative z-10 flex flex-col items-center w-full px-6 pointer-events-none">

          {/* 1 · Endorsement badge — arrives first. Sizing/tracking/margin are
              all responsive: on short mobile viewports the hero's total
              content easily runs taller than the visible area (nav height +
              reserved bottom strip for the slider caption/dots), so the
              badge — a secondary trust signal, not core content — is kept
              deliberately compact on mobile (tighter tracking keeps it on
              one line instead of wrapping to two) to leave room for the new
              kicker line below it. Same class of bug as the documented
              mobile-overflow pattern in CLAUDE.md, just the vertical axis. */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-3 sm:mb-7 text-[8.5px] tracking-[1.2px] sm:text-[10px] sm:tracking-[2.5px] uppercase font-medium"
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

          {/* 2 · Luganda rallying cry — now the primary heading, calling back
              to Project I (Ekikakyo, the Clan Fund) */}
          <h1
            className="font-serif font-bold uppercase leading-[1.12] mb-2 sm:mb-3"
            style={{
              fontSize: "clamp(32px, 6.5vw, 68px)",
              letterSpacing: "1px",
              color: "var(--gold2)",
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
              animation: ANIM.kicker,
            }}
          >
            Weewandiise mu Kikakyo
          </h1>

          {/* 4 · English subheading — smaller than the heading above it */}
          <h2
            className="font-serif text-white font-normal leading-[1.2] mb-3 sm:mb-5"
            style={{
              fontSize: "clamp(17px, 3.2vw, 32px)",
              maxWidth: 640,
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
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
          </h2>

          {/* 5 · Lede + CTAs + stats — arrive together, slightly after heading */}
          <div
            className="flex flex-col items-center w-full"
            style={{ animation: ANIM.content }}
          >
            {/* CTA buttons */}
            <div className="flex gap-3.5 flex-wrap justify-center mb-5 sm:mb-11 pointer-events-auto">
              <Link href="/clans" className="no-underline">
                <button
                  className="font-semibold text-[15px] px-7 py-2.5 sm:py-3.5 rounded-[5px] cursor-pointer transition-all duration-200"
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
                onClick={() => router.push("/login")}
                className="font-medium text-[15px] px-7 py-2.5 sm:py-3.5 rounded-[5px] cursor-pointer transition-all duration-200"
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
                encyclopedias are discoverable straight from the landing page.
                grid-cols-2 on mobile (2x2) prevents the same overflow bug as the
                lede above — a non-wrapping flex row of 4 fixed-padding tiles is
                wider than a phone screen; sm:flex restores the single-row layout
                once there's room for it. */}
            <div
              className="grid grid-cols-2 sm:flex w-full sm:w-auto rounded-lg overflow-hidden pointer-events-auto"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
                backdropFilter: "blur(10px)",
              }}
            >
              {[
                { num: "847K+",  lbl: "Baganda registered"                   },
                { num: "56",     lbl: "Ebika bya Baganda", href: "/clans"    },
                { num: "18",     lbl: "Amasaza",           href: "/abakungu" },
                { num: "12,847", lbl: "Verified by Bataka"                   },
              ].map(({ num, lbl, href }, i, arr) => {
                const inner = (
                  <>
                    <span className="font-serif text-[22px] sm:text-[27px] text-white block leading-none mb-1">
                      {num}
                    </span>
                    <span
                      className="text-[10px] tracking-[.5px] uppercase"
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
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,0.10)" : "none",
                };
                const tileClass = "px-3 py-2 sm:px-6 sm:py-4 text-center";
                return href ? (
                  <Link
                    key={lbl}
                    href={href}
                    className={cn(tileClass, "no-underline transition-colors hover:bg-white/[.08]")}
                    style={borderStyle}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={lbl} className={tileClass} style={borderStyle}>
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
            {PILLARS.map((p) => {
              const headBlock = (
                <>
                  <p className="text-[11px] text-gold2 uppercase tracking-[.5px] mb-1">
                    {p.head}
                  </p>
                  <p className="text-[12px] text-white/75 leading-relaxed mb-3">
                    {p.holder}
                  </p>
                </>
              );
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className="block no-underline bg-white/[.06] border border-white/15 rounded-[8px] p-5 transition-colors hover:bg-white/[.10] hover:border-gold/50"
                >
                  <span className="text-[28px] block mb-2">{p.icon}</span>
                  <h3 className="font-serif text-[17px] text-white mb-0.5">
                    {p.title}
                  </h3>
                  {p.headFirst && <div className="mt-2">{headBlock}</div>}
                  <p className="text-[11.5px] text-white/50 mb-3 leading-snug">
                    {p.sub}
                  </p>
                  {!p.headFirst && headBlock}
                  <span className="text-[11px] text-gold2 font-semibold uppercase tracking-[.5px]">
                    {p.cta} →
                  </span>
                </Link>
              );
            })}
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
          {/* The three-line rallying tagline maps 1:1 onto Projects I/II/III below */}
          <h2 className="font-serif text-[22px] text-gd font-normal mb-4 leading-snug">
            <span className="block">1. Yamba Ekikakyo</span>
            <span className="block">2. Okutumbula Ebyenjigiriza</span>
            <span className="block">3. Okutumbula Enkulaakulana</span>
          </h2>
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
            <p className="text-[14px] text-gd leading-relaxed mb-2">
              The Ebikabyaffe Foundation Fraternity Sacco is the financial
              engine behind the school project and the Foundation&apos;s
              other initiatives.
            </p>
            <p className="text-[13px] text-muted leading-relaxed mb-4">
              This donation is particularly for raising funds to boost the
              Sacco.
            </p>
            {/* Donations only — membership-fee and share-value tiles were
                removed 2026-07 per direct request: this card exists purely
                to channel voluntary donations into the Sacco. */}
            <Link
              href="/give?campaign=sacco&option=donation"
              className="block max-w-[320px] bg-white border border-eborder rounded-[6px] px-3.5 py-3 no-underline hover:border-gold transition-colors mb-5"
            >
              <p className="text-[10px] uppercase tracking-wide text-muted mb-1">
                Donations
              </p>
              <p className="text-[13px] text-gd font-semibold">
                Any amount, voluntary
              </p>
            </Link>
            <Link href="/give?campaign=sacco&option=donation" className="no-underline">
              <button
                className="font-semibold text-[13px] px-5 py-2.5 rounded-[5px] cursor-pointer"
                style={{ background: "var(--gold)", color: "var(--gd)" }}
              >
                Donate to the Sacco →
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* ── About the Foundation ── */}
      <section className="px-6 py-16" style={{ background: "white" }}>
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
            working in unison with the Kingdom&apos;s Council of Clan Heads
            (Olukiiko lwa Bataka). We work to instill good morals and
            discipline, to revitalise our culture, and to restore the
            declining respect for elders and leaders.
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
      <section className="px-6 py-16" style={{ background: "var(--cream)" }}>
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
                className="bg-white border border-eborder rounded-[6px] px-4 py-3.5"
              >
                <h3 className="text-[14px] text-gd font-semibold mb-1 leading-snug">
                  {name}
                </h3>
                <p className="text-[12px] text-muted leading-relaxed">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Activity — each item expands on click; media/details
          arrive from the user over time, see ACTIVITIES above ── */}
      <section className="px-6 py-14" style={{ background: "white" }}>
        <div className="max-w-[680px] mx-auto">
          <p className="text-[11px] tracking-[2px] uppercase text-royal2 font-semibold mb-4 text-center">
            Recent Activity
          </p>
          <RecentActivityList />
        </div>
      </section>
    </>
  );
}
