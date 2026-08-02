"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { VerificationCard } from "@/components/profile/VerificationCard";
import { BusinessListingCard } from "@/components/profile/BusinessListingCard";
import { LineageArchiveCard } from "@/components/profile/LineageArchiveCard";
import { cn } from "@/lib/utils";
import { clans, getClan, WAVE_LABELS, type OriginWave } from "@/lib/clans";
import { useStats, clanMemberCount, formatMembers, recordClanChange } from "@/lib/stats";
import { readPhotoAsDataUrl, PHOTO_ACCEPT_ATTR } from "@/lib/photoUpload";
import { MemberTabs } from "@/components/home/MemberTabs";

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
          {/* A returning member signs back in directly — new members instead
              find their clan first and use that clan page's own "Join the
              {clan} clan" button, which is what actually creates an account. */}
          <Link href="/login?mode=signin">
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
  // Phone is NOT editable here: it's the fixed real-account identity (the
  // synthetic-email/session-minting in /api/auth/phone-session is keyed off
  // it), so it renders read-only below rather than as a draft field.
  const [name,  setName]  = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatarDataUrl, setAvatarDataUrl] = useState(user.avatarDataUrl);

  // See lib/photoUpload.ts — rejects unsupported formats (e.g. iPhone HEIC
  // photos, which read fine but then fail to decode in an <img>) and
  // oversized files upfront with a clear message instead of a silent no-op.
  //
  // Saves immediately via updateUser rather than waiting for the "Save
  // changes" button below — the preview appears the instant a photo is
  // chosen, so leaving it un-persisted until a separate click was a real bug:
  // a member picks a photo, sees it applied, signs out (or just navigates
  // away) without noticing the unrelated identity-form button still needs
  // pressing, and the picture silently reverts. Name/email/phone keep the
  // explicit-save behavior since those have no equivalent "looks already
  // done" visual cue.
  async function handlePhotoChange(file: File | undefined) {
    if (!file) return;
    try {
      const url = await readPhotoAsDataUrl(file);
      setAvatarDataUrl(url);
      updateUser({ avatarDataUrl: url });
      toast("Profile picture updated.");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't read that photo — please try again.");
    }
  }

  // Clan picker — local draft, separate from user.clanSlug until confirmed.
  const [draftClanSlug, setDraftClanSlug] = useState(user.clanSlug ?? "");

  const clan = user.clanSlug ? getClan(user.clanSlug) : undefined;
  const clanChanged = draftClanSlug !== (user.clanSlug ?? "");
  // Live member count for the joined clan — ticks immediately on a join
  const stats = useStats();
  const liveCount = clan ? clanMemberCount(stats, clan.slug) : null;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSaveIdentity() {
    if (!name.trim()) return;
    updateUser({ name: name.trim(), email: email.trim(), avatarDataUrl });
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
    // Move the live member counters: the joined clan ticks up everywhere
    // it's displayed; the clan being left (if any) ticks back down.
    recordClanChange(user.clanSlug, draftClanSlug);
    toast(`You're now a self-declared member of the ${picked?.name} clan.`);
  }

  return (
    <div className="max-w-[720px] mx-auto px-5 py-7">

      {/* Dashboard ⇄ Profile toggle — same idea as the Bataka Panel's own
          tab bar, so a signed-in member can flip between their two "home
          base" views without going back through the full main nav. */}
      <MemberTabs />

      {/* ── Identity card ─────────────────────────────────────────────────── */}
      <Card className="mb-3.5">
        <CardHeader>
          {avatarDataUrl ? (
            <Image
              src={avatarDataUrl}
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover shrink-0 border border-eborder"
              unoptimized
              // Belt-and-braces: handlePhotoChange already rejects unsupported
              // formats by MIME type, but if a browser ever accepts one at
              // the picker and then fails to actually decode it, fall back
              // to initials instead of leaving a blank, unexplained circle.
              onError={() => {
                setAvatarDataUrl(undefined);
                updateUser({ avatarDataUrl: undefined });
                toast("That photo couldn't be displayed — please try a different one.");
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-bold text-gd text-[17px] shrink-0">
              {initials || "?"}
            </div>
          )}
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
              <div className="w-full border border-eborder bg-cream2 rounded px-3 py-2 text-[14px] text-muted">
                {user.phone}
              </div>
              <span className="block text-[10.5px] text-muted mt-1">
                Your phone number is your account — it can&apos;t be changed here.
              </span>
            </label>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">Profile picture</span>
              <input
                type="file"
                accept={PHOTO_ACCEPT_ATTR}
                onChange={(e) => handlePhotoChange(e.target.files?.[0])}
                className="w-full text-[12px] text-muted file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-cream2 file:text-gd file:text-[12px] file:cursor-pointer"
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
                  {liveCount !== null ? formatMembers(liveCount) : "Member count coming soon"}
                </span>
                <Link href={`/clans/${clan.slug}`} className="text-[11px] text-royal2 no-underline hover:underline">
                  View clan page →
                </Link>
              </div>
            </div>
          )}

          {clan ? (
            // Once attached to a clan (every account is created already
            // joined to one, via a clan page's "Join" button — see
            // LoginFlow), the choice is final. No picker, no way to switch —
            // clan membership isn't something to browse between.
            <p className="text-[12px] text-muted leading-relaxed">
              Your clan is set for good, chosen when you created your
              account. If this needs to change, contact the Foundation.
            </p>
          ) : (
            <>
              <label className="block mb-3">
                <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                  Choose your clan
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
                Join this clan
              </Button>
              <p className="text-[11px] text-muted mt-2 leading-relaxed">
                Self-declared membership counts you among your clan&apos;s registered members
                right away. Verification by your Omutaka is a separate step below. Once
                joined, this can&apos;t be changed from here.
              </p>
            </>
          )}
        </CardBody>
      </Card>

      {/* ── Omutaka verification — only once a clan is joined. Keyed on the
          clan so switching clans remounts it with a fresh form (the repo's
          key-remount pattern; effect-based resets are lint-blocked). ── */}
      {clan && <VerificationCard key={`verification-${clan.slug}`} clan={clan} />}

      {/* ── Advertise your business — every member can list one business or
          organisation against their account; it appears in the public
          Business Owners directory tagged with their clan. ── */}
      {clan && <BusinessListingCard key={`business-${clan.slug}`} clan={clan} />}

      {/* ── Clan lineage archive contribution — optional, emails the
          Foundation's archive team; see LineageArchiveCard. ── */}
      {clan && <LineageArchiveCard key={`lineage-archive-${clan.slug}`} clan={clan} />}

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
                Sacco membership is arranged with the Foundation&apos;s Sacco
                officials directly. Online, you can support the Sacco — the
                financial engine behind the school project — with a voluntary
                donation of any amount.
              </p>
              <Link href="/give?campaign=sacco&option=donation">
                <Button variant="gold" size="sm">Donate to the Sacco →</Button>
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
