"use client";

import { useState } from "react";
import { clans, WAVE_LABELS, type OriginWave } from "@/lib/clans";
import { panelSignIn } from "@/lib/batakaPanel/store";
import { Button } from "@/components/ui/Button";

const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

// Demo sign-in for the panel. In the real system, panel accounts are
// INVITATION-ONLY: the Foundation creates each clan's officer account and
// hands over the credentials — nobody self-registers as a Mutaka. This
// picker exists purely so the workflow can be demonstrated for any clan.
export function PanelSignIn() {
  const [clanSlug, setClanSlug] = useState("");

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
        <label className="block mb-3">
          <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
            Demo: enter the panel as the officer of…
          </span>
          <select
            value={clanSlug}
            onChange={(e) => setClanSlug(e.target.value)}
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

        <Button
          variant="gold"
          className="w-full mb-3"
          disabled={!clanSlug}
          onClick={() => panelSignIn({ clanSlug, isAdmin: false })}
        >
          Enter as this clan&apos;s officer →
        </Button>

        <button
          onClick={() => panelSignIn({ clanSlug: null, isAdmin: true })}
          className="w-full text-[12.5px] text-royal2 underline cursor-pointer bg-transparent border-0 py-1"
        >
          Enter as Foundation admin (all clans) →
        </button>
      </div>

      <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
        Demo preview with sample data — no real members are shown. In the live
        system, panel access is invitation-only: the Foundation issues each
        clan&apos;s account and every action is recorded in an audit trail.
      </p>
    </div>
  );
}
