"use client";

import { useState } from "react";
import { clans, getClan, WAVE_LABELS, type OriginWave } from "@/lib/clans";
import { panelSignIn } from "@/lib/batakaPanel/store";
import {
  checkClanPassword,
  checkAdminPassword,
} from "@/lib/batakaPanel/passwords";
import { Button } from "@/components/ui/Button";

const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

// Panel sign-in: the officer picks his clan, then must enter the clan's
// access password issued by the Foundation. Passwords are embedded in the
// system (lib/batakaPanel/passwords.ts) — an Omutaka cannot change his own;
// only the Foundation can rotate one. Signing out always returns here and
// the password must be entered again. In the real system, panel accounts
// are INVITATION-ONLY — nobody self-registers as a Mutaka.
export function PanelSignIn() {
  const [asAdmin, setAsAdmin] = useState(false);
  const [clanSlug, setClanSlug] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const clanName = clanSlug ? getClan(clanSlug)?.name ?? clanSlug : "";

  const submitOfficer = () => {
    if (!checkClanPassword(clanSlug, password.trim())) {
      setError(
        `Incorrect password for the ${clanName} clan. Check the access password issued to your clan by the Foundation and try again.`
      );
      return;
    }
    panelSignIn({ clanSlug, isAdmin: false });
  };

  const submitAdmin = () => {
    if (!checkAdminPassword(password.trim())) {
      setError(
        "Incorrect Foundation admin password. Check the password issued by the Foundation and try again."
      );
      return;
    }
    panelSignIn({ clanSlug: null, isAdmin: true });
  };

  return (
    <div className="max-w-[460px] mx-auto px-5 py-12">
      <div className="text-center mb-7">
        <p className="text-[36px] mb-2">🪶</p>
        <h1 className="font-serif text-[26px] text-gd font-normal mb-1.5">
          Bataka Panel
        </h1>
        <p className="text-[13px] text-muted leading-relaxed">
          The official review area where each clan&apos;s Omutaka — or his
          authorized officer — sees the people who joined the clan, reviews
          their lineage declarations, and verifies membership.
        </p>
      </div>

      <div className="bg-white border border-eborder rounded-[8px] p-5">
        {!asAdmin ? (
          <>
            <label className="block mb-3">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                Enter the panel as the officer of…
              </span>
              <select
                value={clanSlug}
                onChange={(e) => {
                  setClanSlug(e.target.value);
                  setError(null);
                }}
                className="w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white"
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
              <label className="block mb-3">
                <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                  {clanName} clan access password
                </span>
                <input
                  type="password"
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
                  className="w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white"
                />
              </label>
            )}

            {error && (
              <p
                role="alert"
                className="text-[12.5px] leading-relaxed rounded px-3 py-2 mb-3"
                style={{
                  color: "#8a1f1f",
                  background: "#fdf0f0",
                  border: "1px solid #f0d4d4",
                }}
              >
                {error}
              </p>
            )}

            <Button
              variant="gold"
              className="w-full mb-3"
              disabled={!clanSlug || !password.trim()}
              onClick={submitOfficer}
            >
              Login as this clan&apos;s officer →
            </Button>

            <button
              onClick={() => {
                setAsAdmin(true);
                setPassword("");
                setError(null);
              }}
              className="w-full text-[12.5px] text-royal2 underline cursor-pointer bg-transparent border-0 py-1"
            >
              Enter as Foundation admin (all clans) →
            </button>
          </>
        ) : (
          <>
            <label className="block mb-3">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                Foundation admin password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password.trim()) submitAdmin();
                }}
                placeholder="Enter the Foundation admin password"
                autoComplete="off"
                className="w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="text-[12.5px] leading-relaxed rounded px-3 py-2 mb-3"
                style={{
                  color: "#8a1f1f",
                  background: "#fdf0f0",
                  border: "1px solid #f0d4d4",
                }}
              >
                {error}
              </p>
            )}

            <Button
              variant="gold"
              className="w-full mb-3"
              disabled={!password.trim()}
              onClick={submitAdmin}
            >
              Login as Foundation admin →
            </Button>

            <button
              onClick={() => {
                setAsAdmin(false);
                setPassword("");
                setError(null);
              }}
              className="w-full text-[12.5px] text-royal2 underline cursor-pointer bg-transparent border-0 py-1"
            >
              ← Back to clan officer sign-in
            </button>
          </>
        )}
      </div>

      <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
        Access passwords are issued per clan by the Foundation and cannot be
        changed from the panel. If your clan&apos;s password is lost, contact
        the Foundation. Every action inside is recorded in an audit trail.
      </p>
    </div>
  );
}
