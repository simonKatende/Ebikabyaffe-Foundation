"use client";

import { useState } from "react";
import Image from "next/image";
import { clans, getClan, WAVE_LABELS, type OriginWave } from "@/lib/clans";
import { createOfficerPanelClient } from "@/lib/supabase/panelClient";
import { completeSignIn } from "@/lib/batakaPanel/store";
import { LockIcon, VisibilityToggle, fieldFull, labelClass, pillPrimary } from "@/components/batakaPanel/authFormShared";

const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

// This is the CLAN OFFICER's own dedicated entry point — /batakaPanel.
// The Foundation admin has a fully separate URL (/foundationAdmin, see
// AdminSignIn.tsx) with no cross-link between the two screens, by direct
// request (2026-08): each audience gets its own link, not a shared sign-in
// with a role toggle. Once signed in, both roles land in the same PanelShell
// dashboard/members/announcements/businesses pages — only the front door is
// split, the panel itself (and lib/batakaPanel/store.ts underneath it)
// stays one interconnected system.
//
// Access passwords are issued per clan by the Foundation. An Omutaka cannot
// change his own password; only the Foundation can rotate one. Signing out
// always returns here and the password must be entered again. In the real
// system, panel accounts are INVITATION-ONLY — nobody self-registers as a
// Mutaka.
export function PanelSignIn() {
  const [clanSlug, setClanSlug] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const clanName = clanSlug ? getClan(clanSlug)?.name ?? clanSlug : "";
  const clan = clanSlug ? getClan(clanSlug) : undefined;

  const submitOfficer = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/batakaPanel/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clanSlug, password: password.trim() }),
      });
      if (!res.ok) {
        setError(
          `Incorrect password for the ${clanName} clan. Check the access password issued to your clan by the Foundation and try again.`
        );
        return;
      }
      const { access_token, refresh_token } = await res.json();
      const { error: sessionError } = await createOfficerPanelClient().auth.setSession({
        access_token,
        refresh_token,
      });
      if (sessionError) throw sessionError;
      // Explicitly pins this tab to the officer role — see completeSignIn's
      // own header comment for why relying solely on the store's reactive
      // onAuthStateChange listener isn't enough here.
      await completeSignIn("officer");
    } catch {
      setError("Something went wrong signing in — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-10 sm:py-16"
      style={{
        // No public Nav sits above this page (see SiteChrome.tsx — panel
        // routes render no public chrome), so this fills the full viewport
        // rather than subtracting a nav height that isn't there.
        minHeight: "100vh",
        background: "linear-gradient(160deg, var(--gd) 0%, var(--gm) 60%, var(--gl) 140%)",
      }}
    >
      <div className="w-full max-w-[900px] bg-white rounded-[26px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.4)] overflow-hidden grid md:grid-cols-[42%_58%]">

        {/* ── Decorative branding panel — desktop only, matches /login ── */}
        <div
          className="hidden md:flex relative flex-col justify-center px-10 py-12 overflow-hidden"
          style={{ background: "linear-gradient(165deg, var(--gd) 0%, var(--gm) 55%, var(--gl) 140%)" }}
        >
          <span aria-hidden className="absolute -left-16 -bottom-24 w-[300px] h-[300px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span aria-hidden className="absolute left-20 bottom-4 w-[150px] h-[150px] rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span aria-hidden className="absolute -right-12 top-8 w-[130px] h-[130px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <Image
                src="/logo.png"
                alt="Ebikabyaffe Foundation logo"
                width={40}
                height={36}
                className="w-10 h-9 shrink-0 object-contain"
              />
              <div className="leading-tight">
                <p className="font-serif text-white text-[15px]">Ebikabyaffe</p>
                <p className="text-gold2 text-[9px] tracking-[2px] uppercase">Foundation</p>
              </div>
            </div>
            <h2 className="font-serif text-white text-[36px] leading-tight font-bold mb-3">
              🪶 Bataka Panel
            </h2>
            <p className="text-white/70 text-[13.5px] leading-relaxed max-w-[260px]">
              The official review area where each clan&apos;s Omutaka — or his
              authorized officer — sees the people who joined the clan,
              reviews their lineage declarations, and verifies membership.
            </p>
          </div>
        </div>

        {/* ── Form panel ── */}
        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-7">
            <h1 className="font-serif text-[26px] text-gd font-normal mb-1.5">
              Bataka Panel Sign-In
            </h1>
            <p className="text-[13px] text-muted leading-relaxed">
              Select your clan and enter the access password issued to your
              clan by the Foundation.
            </p>
          </div>

          <p className="text-[11px] tracking-[1.5px] uppercase text-royal2 font-semibold mb-3">
            1 · Your clan
          </p>
          <label className="block mb-3">
            <span className={labelClass}>Enter the panel as the officer of…</span>
            <select
              value={clanSlug}
              onChange={(e) => {
                setClanSlug(e.target.value);
                setPassword("");
                setShowPassword(false);
                setError(null);
              }}
              className={`${fieldFull} appearance-none`}
            >
              <option value="" disabled>Select a clan…</option>
              {WAVE_ORDER.map((wave) => (
                <optgroup key={wave} label={WAVE_LABELS[wave].label}>
                  {clans
                    .filter((c) => c.originWave === wave)
                    .map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} — {c.clanHead}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>

          {clanSlug && (
            <>
              <p
                className="text-[11px] tracking-[1.5px] uppercase font-semibold mb-3 mt-5"
                style={{ color: "var(--royal2)" }}
              >
                2 · Access password
              </p>
              <div className="flex items-center gap-3 bg-cream2 border border-gold/40 rounded-2xl px-4 py-3.5 mb-4">
                <span className="text-[30px] leading-none shrink-0">{clan?.totemEmoji ?? "🐟"}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted mb-0.5">Signing in as</p>
                  <p className="text-[15px] text-gd font-semibold leading-tight">{clanName}&apos;s officer</p>
                </div>
              </div>
              <label className="block mb-3">
                <span className={labelClass}>{clanName} clan access password</span>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && password.trim()) submitOfficer();
                    }}
                    placeholder="Enter the password issued to your clan"
                    autoComplete="off"
                    className={`${fieldFull} pl-11 pr-11`}
                  />
                  <VisibilityToggle
                    visible={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                  />
                </div>
              </label>
            </>
          )}

          {error && (
            <p
              role="alert"
              className="text-[12.5px] leading-relaxed rounded-2xl px-4 py-3 mb-3"
              style={{ color: "#8a1f1f", background: "#fdf0f0", border: "1px solid #f0d4d4" }}
            >
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={!clanSlug || !password.trim() || submitting}
            onClick={submitOfficer}
            className={`${pillPrimary} w-full`}
          >
            {submitting ? "Signing in…" : "Login as this clan's officer →"}
          </button>

          <p className="text-[11px] text-muted text-center mt-6 leading-relaxed">
            Access passwords are issued per clan by the Foundation and cannot
            be changed from the panel. If your clan&apos;s password is lost,
            contact the Foundation. Every action inside is recorded in an
            audit trail.
          </p>
        </div>
      </div>
    </div>
  );
}
