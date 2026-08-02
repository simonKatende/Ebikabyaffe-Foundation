"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, DarkCard } from "@/components/ui/Card";
import { EmpangoCountdown } from "@/components/home/EmpangoCountdown";
import { getClan } from "@/lib/clans";
import { useStats, clanMemberCount, formatMembers } from "@/lib/stats";
import { fetchListingForOwner } from "@/lib/businesses/store";
import type { BusinessListing } from "@/lib/businesses/types";
import { ContactFoundationCard } from "@/components/home/ContactFoundationCard";
import { fetchClanAnnouncements } from "@/lib/batakaPanel/store";
import type { Announcement } from "@/lib/batakaPanel/types";
import { MemberTabs } from "@/components/home/MemberTabs";

// Time-of-day greeting — computed from the visitor's local clock. Coarse
// buckets only (morning/afternoon/evening), same tolerance the existing
// EmpangoCountdown time logic already relies on, so a same-second SSR/client
// hydration mismatch isn't a practical concern here either.
function timeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomeDashboard() {
  const { lang, user } = useAuth();
  const { toast } = useToast();

  const firstName = user.name.split(" ")[0];
  const clan = user.clanSlug ? getClan(user.clanSlug) : undefined;
  // Live member count for the joined clan — ticks immediately on a join
  const stats = useStats();
  const liveCount = clan ? clanMemberCount(stats, clan.slug) : null;
  // Whether this member already has a business listing posted
  const [myListing, setMyListing] = useState<BusinessListing | null>(null);
  useEffect(() => {
    if (!user.id) return;
    void fetchListingForOwner(user.id).then(setMyListing);
  }, [user.id]);
  // Announcements from THIS member's own clan office only — posted via the
  // Bataka Panel (app/batakaPanel/announcements). A clan's news must never
  // leak to members of other clans, so this is fetched strictly by clanSlug,
  // via the member's own client (RLS: announcements_select_by_clan_member) —
  // deliberately independent of any Bataka Panel session, which a plain
  // member never has.
  const [clanAnnouncements, setClanAnnouncements] = useState<Announcement[]>([]);
  useEffect(() => {
    // A signed-in member's clan is permanently locked once set (see
    // AuthContext), so `clan` only goes from null to set, never back — no
    // need to clear stale announcements here, the [] default already covers
    // "no clan yet".
    if (!clan) return;
    void fetchClanAnnouncements(clan.slug).then(setClanAnnouncements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clan?.slug]);

  // Greeting text switches between English and Luganda based on the user's
  // language preference. The English greeting is time-of-day aware (Good
  // morning/afternoon/evening); the subline thanks the member for the
  // specific clan they joined rather than a generic "your clan is waiting"
  // line, falling back to a plain line for the rare case a signed-in member
  // has no clan yet (the mock sign-in's known gap — see AuthContext.tsx).
  const greeting =
    lang === "lg" ? `Mwasuze otya, ${firstName}.` : `${timeOfDayGreeting()}, ${firstName}.`;
  const greetingSub =
    lang === "lg"
      ? "Ekika lyo likukyalira. Laba ebikula."
      : clan
        ? `Thank you for joining the ${clan.name} clan. Here's what's happening today.`
        : "Here's what's happening today.";

  return (
    <div className="max-w-[720px] mx-auto px-5 py-7">

      {/* Dashboard ⇄ Profile toggle — same idea as the Bataka Panel's own
          tab bar, so a signed-in member can flip between their two "home
          base" views without going back through the full main nav. */}
      <MemberTabs />

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
          { icon: "🗺️", title: "18 Amasaza",   sub: "Counties & chiefs",     href: "/abakungu#amasaza" },
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

      {/* Clan membership card — shows the user's current clan (self-declared until verified).
          Reads from AuthContext + lib/clans.ts so it stays in sync with whatever the
          member picks on /profile, instead of a hardcoded clan. */}
      <Card className="mb-3.5">
        {clan ? (
          <CardHeader>
            <span className="text-[28px]">{clan.totemEmoji}</span>
            <div className="flex-1">
              <h3 className="text-[16px] text-gd mb-0.5">{clan.name}</h3>
              <p className="text-[12px] text-muted">
                Omuziro: {clan.omuziro}
                {clan.akabbiro && <> · Akabbiro: {clan.akabbiro}</>}
                {clan.courtRole && (
                  <>
                    {" · "}
                    <strong className="text-royal2">{clan.courtRole}</strong>
                  </>
                )}
              </p>
              {/* Badge flips to VERIFIED once the Kingdom/Bataka confirm membership — mocked for now */}
              <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 bg-g0 text-gm tracking-[.5px]">
                {user.clanVerified ? "VERIFIED" : "SELF-DECLARED"}
              </span>
            </div>
            <div className="ml-auto shrink-0 text-right">
              <span className="block text-[13px] text-muted">
                {formatMembers(liveCount ?? 0)}
              </span>
              <Link href="/profile" className="text-[11px] text-royal2 no-underline hover:underline">
                Manage in profile →
              </Link>
            </div>
          </CardHeader>
        ) : (
          <CardBody className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] text-gd mb-0.5">You haven&apos;t joined a clan yet</h3>
              <p className="text-[12px] text-muted">
                Pick your Ekika to be counted among its registered members.
              </p>
            </div>
            <Link href="/profile">
              <Button variant="gold" size="sm" className="shrink-0">
                Choose your clan →
              </Button>
            </Link>
          </CardBody>
        )}
      </Card>

      {/* Business Owners directory — every member can advertise a business or
          organisation from their profile; this is the entry point to browse
          what's been posted, plus a nudge to list your own if you haven't. */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[20px]">🏪</span>
          <div>
            <h3 className="text-[15px] text-gd">Business Owners</h3>
            <p className="text-[12px] text-muted">
              Businesses and organisations run by fellow members
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-[13px] text-muted leading-relaxed mb-3">
            {!myListing &&
              "Advertise your own business or organisation — post your contacts, a photo, and a short description for other members to find."}
            {myListing?.status === "pending" &&
              `Your listing, ${myListing.businessName}, is awaiting review by your clan's office.`}
            {myListing?.status === "info_requested" &&
              `Your clan's office has asked for more information on ${myListing.businessName} — check your profile.`}
            {myListing?.status === "declined" &&
              `Your listing, ${myListing.businessName}, was declined — check your profile for the reason.`}
            {myListing?.status === "verified" &&
              `Your listing, ${myListing.businessName}, is live in the directory.`}
          </p>
          <div className="flex gap-2.5 flex-wrap">
            <Link href="/businesses">
              <Button variant="green" size="sm">Browse Business Owners →</Button>
            </Link>
            <Link href="/profile#advertise-business">
              <Button size="sm" className="bg-cream2 text-gd border border-eborder hover:bg-cream3">
                {myListing ? "Manage your listing →" : "List your business →"}
              </Button>
            </Link>
          </div>
        </CardBody>
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
            The Council of Clan Heads (Olukiiko lw&apos;Abataka), led by Katikkiro
            Owek. Charles Peter Mayiga, will present to the Land Affairs
            Committee. Add your voice as a registered clan member.
          </p>
          <div className="flex gap-2.5">
            {/* toast() gives instant feedback before real RSVP backend is
                wired up — nudges toward a real, usable email instead of a
                hollow "recorded" toast when there'd be nowhere to send
                anything */}
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                if (!user.email.trim()) {
                  toast("Add your email on your profile so we can send you event details.");
                } else {
                  toast(`RSVP recorded! We'll send details to ${user.email}.`);
                }
              }}
            >
              RSVP — I&apos;ll attend
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
            &ldquo;Agali awamu gegaluma enyama.&rdquo;
          </blockquote>
          <p className="text-[13px] text-muted" style={{ paddingLeft: 17 }}>
            Hands united pull a load. — The motto of Ebikabyaffe Foundation:
            unity in heritage and development.
          </p>
        </CardBody>
      </Card>

      {/* Clan notices — posted by this member's OWN clan office via the
          Bataka Panel (app/batakaPanel/announcements). Strictly clan-scoped:
          a Mmamba announcement must never appear to a Lugave member, so this
          only renders when the signed-in member's own clan has posted one. */}
      {clan &&
        clanAnnouncements.map((a) => (
          <Card key={a.id} className="mb-3.5">
            <CardHeader>
              <span className="text-[20px]">{a.postedByAdmin ? "🏛️" : clan.totemEmoji}</span>
              <div>
                <h3 className="text-[15px] text-gd">From the {clan.name} Clan</h3>
                <p className="text-[12px] text-muted">
                  {/* Admin-posted announcements (2026-08: the Foundation can
                      post on behalf of any clan) are clearly attributed to
                      the Foundation's office, not the clan's own — never let
                      this read as if the Omutaka said it when he didn't. */}
                  {a.postedByAdmin
                    ? "Posted by the Ebikabyaffe Foundation Administration Office"
                    : `Posted by the ${clan.clanHead}'s office`}{" "}
                  · {a.at}
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-[14px] leading-relaxed">{a.body}</p>
            </CardBody>
          </Card>
        ))}

      {/* Heritage education card */}
      <Card className="mb-3.5">
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
          <Link href="/abakungu#amasaza">
            <Button
              size="sm"
              className="bg-cream2 text-gd border border-eborder hover:bg-cream3"
            >
              Explore Busiro &amp; the 18 Amasaza →
            </Button>
          </Link>
        </CardBody>
      </Card>

      {/* Have a question, comment, or observation? — sent silently to the
          Foundation via app/api/contact/route.ts (Resend); see
          ContactFoundationCard. */}
      <ContactFoundationCard />
    </div>
  );
}
