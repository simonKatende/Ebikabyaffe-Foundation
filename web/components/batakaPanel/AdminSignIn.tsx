"use client";

import { useState } from "react";
import Image from "next/image";
import { createPanelClient } from "@/lib/supabase/panelClient";
import { LockIcon, VisibilityToggle, fieldFull, labelClass, pillPrimary } from "@/components/batakaPanel/authFormShared";

// The FOUNDATION ADMIN's own dedicated entry point — /foundationAdmin.
// Deliberately a fully separate component and URL from the clan officer's
// /batakaPanel sign-in (PanelSignIn.tsx), with no cross-link between the two
// (2026-08 request: each audience gets its own link, not a shared sign-in
// with a role toggle). Once signed in, the admin lands in the exact same
// PanelShell dashboard the officers use (all-clans view) — only the front
// door is split; lib/batakaPanel/store.ts and the audit trail underneath
// stay one interconnected system.
export function AdminSignIn() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submitAdmin = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/batakaPanel/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: true, password: password.trim() }),
      });
      if (!res.ok) {
        setError(
          "Incorrect Foundation admin password. Check the password issued by the Foundation and try again."
        );
        return;
      }
      const { access_token, refresh_token } = await res.json();
      const { error: sessionError } = await createPanelClient().auth.setSession({
        access_token,
        refresh_token,
      });
      if (sessionError) throw sessionError;
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
              🏛️ Admin Console
            </h2>
            <p className="text-white/70 text-[13.5px] leading-relaxed max-w-[260px]">
              Foundation-wide oversight of every clan&apos;s membership
              review, business-listing review, and announcements — all in
              one place.
            </p>
          </div>
        </div>

        {/* ── Form panel ── */}
        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-7">
            <h1 className="font-serif text-[26px] text-gd font-normal mb-1.5">
              Foundation Admin Sign-In
            </h1>
            <p className="text-[13px] text-muted leading-relaxed">
              Enter the Foundation admin password to review every clan at
              once.
            </p>
          </div>

          <label className="block mb-3">
            <span className={labelClass}>Foundation admin password</span>
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
                  if (e.key === "Enter" && password.trim()) submitAdmin();
                }}
                placeholder="Enter the Foundation admin password"
                autoComplete="off"
                className={`${fieldFull} pl-11 pr-11`}
              />
              <VisibilityToggle
                visible={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            </div>
          </label>

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
            disabled={!password.trim() || submitting}
            onClick={submitAdmin}
            className={`${pillPrimary} w-full`}
          >
            {submitting ? "Signing in…" : "Login as Foundation admin →"}
          </button>

          <p className="text-[11px] text-muted text-center mt-6 leading-relaxed">
            This password is issued directly by the Foundation and cannot be
            changed from here. Every action taken inside is recorded in an
            audit trail.
          </p>
        </div>
      </div>
    </div>
  );
}
