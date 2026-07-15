"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { VerificationCard } from "@/components/profile/VerificationCard";
import { cn } from "@/lib/utils";
import { clans, getClan, WAVE_LABELS, type OriginWave } from "@/lib/clans";

// Clan picker groups the 56 clans by origin wave (same grouping used for the
// /clans filter tabs) so the <select> isn't just one flat alphabetical wall.
const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

export function ProfileContent() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <SectionHead title="My Profile" sub="Your account, your clan, your contributions" />
      {isLoggedIn ? (
        <ProfileDashboard />
      ) : (
        <div className="max-w-[440px] mx-auto px-5 py-16 text-center">
          <p className="text-[40px] mb-3">👤</p>
          <p className="text-[14px] text-muted mb-5 leading-relaxed">
            Sign in to register your clan membership, track your Sacco status,
            and support the Foundation&apos;s school projects.
          </p>
          <Link href="/login">
            <Button variant="gold">Sign in →</Button>
          </Link>
        </div>
      )}
    </>
  );
}

function ProfileDashboard() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  // Identity form — local draft state, only written back to AuthContext on Save.
  const [name,  setName]  = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  // Clan picker — local draft, separate from user.clanSlug until confirmed.
  const [draftClanSlug, setDraftClanSlug] = useState(user.clanSlug ?? "");

  const clan = user.clanSlug ? getClan(user.clanSlug) : undefined;
  const clanChanged = draftClanSlug !== (user.clanSlug ?? "");

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSaveIdentity() {
    if (!name.trim()) return;
    updateUser({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    toast("Profile updated.");
  }

  function handleConfirmClan() {
    if (!draftClanSlug) return;
    const picked = getClan(draftClanSlug);
    // Changing clan always resets verification — a new self-declaration until
    // the Omutaka confirms it, same rule the HomeDashboard badge already follows.
    updateUser({
      clanSlug: draftClanSlug,
      clanVerified: false,
      verification: "none",
      lineage: null,
    });
    toast(`You're now a self-declared member of the ${picked?.name} clan.`);
  }

  return (
    <div className="max-w-[720px] mx-auto px-5 py-7">

      {/* ── Identity card ─────────────────────────────────────────────────── */}
      <Card className="mb-3.5">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-bold text-gd text-[17px] shrink-0">
            {initials || "?"}
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] text-gd mb-0.5">{user.name}</h3>
            <p className="text-[12px] text-muted">Member since {user.memberSince}</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-eborder rounded px-3 py-2 text-[14px] outline-none focus:border-gold"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-eborder rounded px-3 py-2 text-[14px] outline-none focus:border-gold"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">Phone</span>
              <input
                type="tel"
                placeholder="e.g. 0771 234 567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-eborder rounded px-3 py-2 text-[14px] outline-none focus:border-gold"
              />
            </label>
          </div>
          <Button variant="green" size="sm" onClick={handleSaveIdentity} disabled={!name.trim()}>
            Save changes
          </Button>
        </CardBody>
      </Card>

      {/* ── Clan membership card ─────────────────────────────────────────── */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold flex-1">Ekika — Your Clan</span>
          {clan && (
            <span
              className={cn(
                "inline-block text-[10px] font-bold px-1.5 py-0.5 rounded tracking-[.5px]",
                user.verification === "pending" ? "bg-gold3 text-gd" : "bg-g0 text-gm"
              )}
            >
              {user.verification === "verified"
                ? "✓ VERIFIED BY OMUTAKA"
                : user.verification === "pending"
                  ? "PENDING OMUTAKA REVIEW"
                  : "SELF-DECLARED"}
            </span>
          )}
        </CardHeader>
        <CardBody>
          {clan && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-eborder">
              <span className="text-[32px]">{clan.totemEmoji}</span>
              <div className="flex-1">
                <p className="text-[15px] text-gd font-semibold">{clan.name}</p>
                <p className="text-[12px] text-muted">
                  Omuziro: {clan.omuziro}
                  {clan.akabbiro && <> · Akabbiro: {clan.akabbiro}</>}
                </p>
                {clan.courtRole && (
                  <p className="text-[12px] text-royal2 font-semibold mt-0.5">{clan.courtRole}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="block text-[13px] text-muted">
                  {clan.memberCount ? `${clan.memberCount} members` : "Member count coming soon"}
                </span>
                <Link href={`/clans/${clan.slug}`} className="text-[11px] text-royal2 no-underline hover:underline">
                  View clan page →
                </Link>
              </div>
            </div>
          )}

          <label className="block mb-3">
            <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
              {clan ? "Change your clan" : "Choose your clan"}
            </span>
            <select
              value={draftClanSlug}
              onChange={(e) => setDraftClanSlug(e.target.value)}
              className="w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white"
            >
              <option value="" disabled>Select a clan…</option>
              {WAVE_ORDER.map((wave) => (
                <optgroup key={wave} label={WAVE_LABELS[wave].label}>
                  {clans
                    .filter((c) => c.originWave === wave)
                    .map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>

          <Button
            variant="green"
            size="sm"
            onClick={handleConfirmClan}
            disabled={!draftClanSlug || !clanChanged}
          >
            {clan ? "Confirm clan change" : "Join this clan"}
          </Button>
          <p className="text-[11px] text-muted mt-2 leading-relaxed">
            Self-declared membership counts you among your clan&apos;s registered members
            right away. Verification by your Omutaka is a separate step below.
          </p>
        </CardBody>
      </Card>

      {/* ── Omutaka verification — only once a clan is joined. Keyed on the
          clan so switching clans remounts it with a fresh form (the repo's
          key-remount pattern; effect-based resets are lint-blocked). ── */}
      {clan && <VerificationCard key={clan.slug} clan={clan} />}

      {/* ── Sacco & contribution status ──────────────────────────────────── */}
      <Card className="mb-3.5">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold flex-1">Fraternity Sacco</span>
          <span
            className={cn(
              "inline-block text-[10px] font-bold px-1.5 py-0.5 rounded tracking-[.5px]",
              user.saccoMember ? "bg-g0 text-gm" : "bg-cream2 text-muted"
            )}
          >
            {user.saccoMember ? "MEMBER" : "NOT A MEMBER"}
          </span>
        </CardHeader>
        <CardBody>
          {user.saccoMember ? (
            <p className="text-[13px] text-muted leading-relaxed">
              You&apos;re a registered Sacco member. Your shares and contributions
              go toward the Wakivule school and the Foundation&apos;s other projects.
            </p>
          ) : (
            <>
              <p className="text-[13px] text-muted leading-relaxed mb-3">
                Pay the one-time UGX 10,000 membership fee to join the Ebikabyaffe
                Foundation Fraternity Sacco.
              </p>
              <Link href="/give?campaign=sacco&option=membership">
                <Button variant="gold" size="sm">Pay Membership Fee →</Button>
              </Link>
            </>
          )}
        </CardBody>
      </Card>

      {/* ── Contribution history ─────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">Contribution History</span>
        </CardHeader>
        <CardBody className="text-center py-8">
          <p className="text-[28px] mb-2">🧾</p>
          <p className="text-[13px] text-muted mb-3">
            No contributions yet. Once you give, your history will appear here.
          </p>
          <Link href="/give">
            <Button size="sm" className="bg-cream2 text-gd border border-eborder hover:bg-cream3">
              Support a project →
            </Button>
          </Link>
        </CardBody>
      </Card>

    </div>
  );
}
