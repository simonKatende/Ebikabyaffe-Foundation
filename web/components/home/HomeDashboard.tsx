"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, DarkCard, RoyalCard } from "@/components/ui/Card";
import { EmpangoCountdown } from "@/components/home/EmpangoCountdown";

export function HomeDashboard() {
  const { lang } = useAuth();
  const { toast } = useToast();

  // Greeting text switches between English and Luganda based on the user's language preference
  const greeting =
    lang === "lg" ? "Mwasuze otya, Mubbi." : "Good morning, Mubbi.";
  const greetingSub =
    lang === "lg"
      ? "Ekika lyo likukyalira. Laba ebikula."
      : "Your clan is waiting. Here's what's happening today.";

  return (
    <div className="max-w-[720px] mx-auto px-5 py-7">

      {/* Personalised greeting */}
      <div className="mb-6">
        <h2 className="font-serif text-[24px] font-normal text-gd mb-1">
          {greeting}
        </h2>
        <p className="text-[14px] text-muted">{greetingSub}</p>
      </div>

      {/* Empango countdown — pinned near the top because it is time-sensitive */}
      <EmpangoCountdown />

      {/* Explore the Kingdom — quick links to the two encyclopedias and the
          newest deep page, so the Abakungu tab and clan archives are one tap away */}
      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        {[
          { icon: "🐟",  title: "56 Clans",     sub: "Ebika encyclopedia",    href: "/clans"        },
          { icon: "🗺️", title: "18 Amasaza",   sub: "Counties & chiefs",     href: "/abakungu"     },
          { icon: "🦔",  title: "Lugave",       sub: "New clan archive",      href: "/clans/lugave" },
        ].map(({ icon, title, sub, href }) => (
          <Link
            key={href}
            href={href}
            className="bg-white border border-eborder rounded-[6px] px-3 py-3 text-center no-underline transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(0,0,0,.10)] hover:border-gold"
          >
            <span className="text-[22px] block mb-1">{icon}</span>
            <span className="text-[13px] text-gd font-semibold block leading-tight">
              {title}
            </span>
            <span className="text-[10.5px] text-muted block mt-0.5">{sub}</span>
          </Link>
        ))}
      </div>

      {/* Clan membership card — shows the user's current clan (self-declared until verified) */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[28px]">🐟</span>
          <div className="flex-1">
            <h3 className="text-[16px] text-gd mb-0.5">
              Mmamba — The Lungfish Clan
            </h3>
            <p className="text-[12px] text-muted">
              Omuziro: Lungfish · Akabbiro: Muguya (Kob antelope) ·{" "}
              <strong className="text-royal2">Gabunga — Admiral of the Royal Navy</strong>
            </p>
            {/* SELF-DECLARED badge disappears once the user is Bataka-verified */}
            <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 bg-g0 text-gm tracking-[.5px]">
              SELF-DECLARED
            </span>
          </div>
          <span className="text-[13px] text-muted ml-auto shrink-0">
            23,481 members
          </span>
        </CardHeader>
      </Card>

      {/* Dark card for the Bataka call to action — needs visual weight to prompt action */}
      <DarkCard className="mb-3.5">
        <CardHeader className="border-white/10">
          <span className="text-[11px] text-gold2 tracking-[1px] uppercase">
            Active Call to Action · Parliament
          </span>
        </CardHeader>
        <CardBody>
          <h3 className="text-[15px] text-white mb-1.5">
            Bataka are meeting Parliament on land law — May 15
          </h3>
          <p className="text-[13px] text-white/70 mb-3.5 leading-relaxed">
            The Council of Clan Heads (Olukiiko lw'Abataka), led by Katikkiro
            Owek. Charles Peter Mayiga, will present to the Land Affairs
            Committee. Add your voice as a registered clan member.
          </p>
          <div className="flex gap-2.5">
            {/* toast() gives instant feedback before real RSVP backend is wired up */}
            <Button
              variant="gold"
              size="sm"
              onClick={() =>
                toast("RSVP recorded! You'll receive details by SMS.")
              }
            >
              RSVP — I'll attend
            </Button>
            <Link href="/give">
              <Button variant="outline-white" size="sm">
                Support this work
              </Button>
            </Link>
          </div>
        </CardBody>
      </DarkCard>

      {/* Fundraiser card — mirrors the /give page campaign card at a glance */}
      <Card className="mb-3.5">
        <CardHeader className="border-b-0">
          <div className="flex-1">
            <h3 className="text-[15px] text-gd mb-0.5">
              🏫 Wakivule School — Bulemeezi, Luwero
            </h3>
            <p className="text-[12px] text-muted">
              <Link href="/abakungu" className="text-royal2 no-underline hover:underline">
                Bulemeezi Ssaza
              </Link>{" "}
              · Saza Chief: <strong>Kkangawo</strong> · 1,832 donors this month
            </p>
          </div>
          <Link href="/give">
            <Button variant="gold" size="sm" className="ml-auto">
              Give now
            </Button>
          </Link>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="mb-3">
            <div className="flex justify-between text-[12px] text-muted mb-1.5">
              <span>UGX 47M raised</span>
              <span>Goal: UGX 120M</span>
            </div>
            {/* Progress bar width is hardcoded at 39% — will be data-driven once API exists */}
            <div className="h-2 bg-cream2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: "39%",
                  background: "linear-gradient(90deg,var(--gm),var(--gl))",
                }}
              />
            </div>
          </div>
          <p className="text-[12px] text-muted">
            39% of goal · Roof construction begins at 60% · A{" "}
            <em>Bulungi Bwansi</em> community effort
          </p>
        </CardBody>
      </Card>

      {/* Weekly cultural learning card */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[20px]">📖</span>
          <div>
            <h3 className="text-[15px] text-gd">Cultural learning of the week</h3>
            <p className="text-[12px] text-muted">Luganda proverb · Updated every Monday</p>
          </div>
        </CardHeader>
        <CardBody>
          {/* Gold left-border blockquote is a visual cue for proverbs throughout the app */}
          <blockquote
            className="font-serif italic text-[16px] text-gd leading-relaxed mb-1.5"
            style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 14 }}
          >
            "Agali awamu gaggya ennyuma."
          </blockquote>
          <p className="text-[13px] text-muted" style={{ paddingLeft: 17 }}>
            Hands united pull a load. — The motto of Ebikabyaffe Foundation:
            unity in heritage and development.
          </p>
        </CardBody>
      </Card>

      {/* Clan notice from the Omutaka */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[20px]">🐟</span>
          <div>
            <h3 className="text-[15px] text-gd">From the Mmamba Clan</h3>
            <p className="text-[12px] text-muted">
              Posted by Ssabataka Ndiwalana · 3 days ago
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-[14px] leading-relaxed mb-2.5">
            The annual Mmamba clan gathering at Munyonyo will be held on 20
            July 2026 — ahead of the Empango celebrations. All Mmamba members
            are invited. Verified members receive priority registration.
          </p>
          <Button
            variant="green"
            size="sm"
            onClick={() =>
              toast("You're registered for the Mmamba gathering.")
            }
          >
            Register →
          </Button>
        </CardBody>
      </Card>

      {/* Heritage education card */}
      <Card>
        <CardHeader>
          <span className="text-[20px]">🏛️</span>
          <div>
            <h3 className="text-[15px] text-gd">
              Kasubi Tombs — UNESCO World Heritage Site
            </h3>
            <p className="text-[12px] text-muted">
              Sacred site of the Buganda Kingdom · Kampala
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-[14px] leading-relaxed mb-2.5">
            The Kasubi Tombs (Amasiro ga Abakabaka) are the burial grounds of
            Buganda Kings and remain a living place of worship. Recognised by
            UNESCO as a World Heritage Site, they sit in Busiro Ssaza — the
            county whose very name is bound up with royal burial.
          </p>
          <Link href="/abakungu">
            <Button
              size="sm"
              className="bg-cream2 text-gd border border-eborder hover:bg-cream3"
            >
              Explore Busiro &amp; the 18 Amasaza →
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
