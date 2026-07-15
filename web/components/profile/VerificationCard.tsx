"use client";

import { useState } from "react";
import { useAuth, type Lineage } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { clans, getClan, WAVE_LABELS, type OriginWave, type Clan } from "@/lib/clans";

// ── "Get verified by Omutaka" — frontend mock ────────────────────────────────
//
// The member submits a lineage declaration; in Phase 2 it lands in the clan's
// Bataka-panel queue where the Omutaka (or his authorized officer) reviews it.
// Until then this card mocks the full journey: form → pending → verified.
//
// Buganda clan law gives us two free consistency checks, enforced here:
//  1. Patrilineal rule — the father's clan MUST be the clan the member joined.
//  2. Exogamy rule — the mother's clan MUST differ from the father's clan
//     (a Muganda cannot marry within their own clan).
//
// PRIVACY: lineage data names third parties (parents/grandparents). In the
// real backend it must be visible ONLY to the member and their own clan's
// panel officer — never public. The consent line below is load-bearing copy.

const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

function ClanSelect({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (slug: string) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white disabled:opacity-60"
    >
      <option value="" disabled>Select a clan…</option>
      {WAVE_ORDER.map((wave) => (
        <optgroup key={wave} label={WAVE_LABELS[wave].label}>
          {clans
            .filter((c) => c.originWave === wave)
            .map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
        </optgroup>
      ))}
    </select>
  );
}

export function VerificationCard({ clan }: { clan: Clan }) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);

  // Lineage form drafts — father's clan is pre-filled with the joined clan
  // because the patrilineal rule requires them to match.
  const [fatherName, setFatherName] = useState("");
  const [fatherClanSlug, setFatherClanSlug] = useState(clan.slug);
  const [motherName, setMotherName] = useState("");
  const [motherClanSlug, setMotherClanSlug] = useState("");
  const [grandfatherName, setGrandfatherName] = useState("");
  const [grandmotherName, setGrandmotherName] = useState("");
  const [ssiga, setSsiga] = useState("");
  const [village, setVillage] = useState("");

  // Cultural-rule validations — computed every render, shown inline.
  const fatherClanMismatch =
    fatherClanSlug !== "" && fatherClanSlug !== clan.slug;
  const sameClanParents =
    motherClanSlug !== "" && motherClanSlug === fatherClanSlug;

  const requiredFilled =
    fatherName.trim() !== "" &&
    fatherClanSlug !== "" &&
    motherName.trim() !== "" &&
    motherClanSlug !== "";
  const canSubmit = requiredFilled && !fatherClanMismatch && !sameClanParents;

  function handleSubmit() {
    if (!canSubmit) return;
    const lineage: Lineage = {
      fatherName: fatherName.trim(),
      fatherClanSlug,
      motherName: motherName.trim(),
      motherClanSlug,
      grandfatherName: grandfatherName.trim() || undefined,
      grandmotherName: grandmotherName.trim() || undefined,
      ssiga: ssiga.trim() || undefined,
      village: village.trim() || undefined,
    };
    updateUser({ verification: "pending", lineage });
    toast(`Your declaration has been sent to the ${clan.clanHead}'s office.`);
  }

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";
  const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1";
  const errorStyle = { color: "#b03a2e" };

  return (
    <Card className="mb-3.5">
      <CardHeader>
        <span className="text-[15px] text-gd font-semibold flex-1">
          Okukakasibwa — Verification
        </span>
        {user.verification === "verified" && (
          <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-g0 text-gm tracking-[.5px]">
            ✓ VERIFIED BY OMUTAKA
          </span>
        )}
        {user.verification === "pending" && (
          <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold3 text-gd tracking-[.5px]">
            PENDING REVIEW
          </span>
        )}
      </CardHeader>
      <CardBody>
        {/* ── Verified ── */}
        {user.verification === "verified" && (
          <p className="text-[13px] text-muted leading-relaxed">
            Your membership of the <strong className="text-gd">{clan.name}</strong>{" "}
            clan has been confirmed by the {clan.clanHead}&apos;s office. Your
            profile now carries the <strong className="text-gm">Verified by
            Omutaka</strong> badge.
          </p>
        )}

        {/* ── Pending ── */}
        {user.verification === "pending" && user.lineage && (
          <>
            <p className="text-[13px] text-muted leading-relaxed mb-3">
              Your lineage declaration is with the{" "}
              <strong className="text-gd">{clan.clanHead}&apos;s office</strong> for
              review. You&apos;ll be notified once the Omutaka confirms your
              membership.
            </p>
            <div className="bg-cream2 border border-eborder rounded-[6px] px-4 py-3 mb-3 text-[12.5px] text-gd leading-relaxed">
              <p><strong>Father:</strong> {user.lineage.fatherName} · {getClan(user.lineage.fatherClanSlug)?.name}</p>
              <p><strong>Mother:</strong> {user.lineage.motherName} · {getClan(user.lineage.motherClanSlug)?.name}</p>
              {user.lineage.grandfatherName && (
                <p><strong>Grandfather (paternal):</strong> {user.lineage.grandfatherName}</p>
              )}
              {user.lineage.grandmotherName && (
                <p><strong>Grandmother:</strong> {user.lineage.grandmotherName}</p>
              )}
              {user.lineage.ssiga && <p><strong>Essiga:</strong> {user.lineage.ssiga}</p>}
              {user.lineage.village && <p><strong>Home village:</strong> {user.lineage.village}</p>}
            </div>
            {/* Demo-only shortcut so the verified state can be previewed —
                the real approval happens in the Bataka panel (Phase 2) */}
            <button
              type="button"
              onClick={() => {
                updateUser({ verification: "verified", clanVerified: true });
                toast(`The ${clan.clanHead} has verified your membership. Webale!`);
              }}
              className="text-[11px] text-muted underline cursor-pointer bg-transparent border-0 p-0"
            >
              (Demo only: simulate the Omutaka approving this request)
            </button>
          </>
        )}

        {/* ── Not yet requested ── */}
        {user.verification === "none" && !formOpen && (
          <>
            <p className="text-[13px] text-muted leading-relaxed mb-3">
              You are currently a <strong className="text-gd">self-declared</strong>{" "}
              member. Submit your lineage to the {clan.clanHead}&apos;s office and,
              once confirmed, your profile earns the{" "}
              <strong className="text-gm">Verified by Omutaka</strong> badge.
            </p>
            <Button variant="gold" size="sm" onClick={() => setFormOpen(true)}>
              Get verified by Omutaka →
            </Button>
          </>
        )}

        {/* ── Lineage form ── */}
        {user.verification === "none" && formOpen && (
          <>
            <p className="text-[13px] text-muted leading-relaxed mb-4">
              The Omutaka verifies membership through your family line. Fields
              marked * are required; the more you can provide, the easier the
              confirmation.
            </p>

            <div className="grid gap-3 mb-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <label className="block">
                <span className={labelClass}>Father&apos;s name *</span>
                <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Father&apos;s clan *</span>
                <ClanSelect value={fatherClanSlug} onChange={setFatherClanSlug} />
              </label>
              <label className="block">
                <span className={labelClass}>Mother&apos;s name *</span>
                <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Mother&apos;s clan *</span>
                <ClanSelect value={motherClanSlug} onChange={setMotherClanSlug} />
              </label>
            </div>

            {/* Cultural-rule errors — clan law as built-in fraud detection */}
            {fatherClanMismatch && (
              <p className="text-[12px] leading-relaxed mb-2" style={errorStyle}>
                In Buganda, clan membership passes from father to child. Your
                father&apos;s clan must be <strong>{clan.name}</strong> — the clan
                you joined. If your father belongs to a different clan, change
                your own clan above to match his.
              </p>
            )}
            {sameClanParents && (
              <p className="text-[12px] leading-relaxed mb-2" style={errorStyle}>
                Your mother&apos;s clan cannot be the same as your father&apos;s —
                a Muganda may not marry within their own clan (clan exogamy).
                Please check the clans you selected.
              </p>
            )}

            <div className="grid gap-3 mt-2 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <label className="block">
                <span className={labelClass}>Grandfather&apos;s name (paternal) — strongly encouraged</span>
                <input type="text" value={grandfatherName} onChange={(e) => setGrandfatherName(e.target.value)} className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Grandmother&apos;s name (optional)</span>
                <input type="text" value={grandmotherName} onChange={(e) => setGrandmotherName(e.target.value)} className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Essiga / branch (if known)</span>
                <input type="text" value={ssiga} onChange={(e) => setSsiga(e.target.value)} className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Family home village (kyalo)</span>
                <input type="text" value={village} onChange={(e) => setVillage(e.target.value)} className={inputClass} />
              </label>
            </div>

            <p className="text-[11px] text-muted leading-relaxed mb-3">
              🔒 This information will be shared only with the Omutaka of your
              clan ({clan.clanHead}) for verification. It is never shown
              publicly.
            </p>

            <div className="flex gap-2.5 flex-wrap">
              <Button variant="green" size="sm" onClick={handleSubmit} disabled={!canSubmit}>
                Submit to the {clan.clanHead} →
              </Button>
              <Button
                size="sm"
                className="bg-cream2 text-gd border border-eborder hover:bg-cream3"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
