"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";
import { OneTimeForm } from "./OneTimeForm";

// ─────────────────────────────────────────────────────────────────────────────
// Campaign data
// To add a new campaign, append an entry to CAMPAIGNS.
// The switcher chips, the hero card, and both donation forms all update automatically.
// ─────────────────────────────────────────────────────────────────────────────
export type Campaign = {
  id: string;
  title: string;
  description?: string;
  emoji: string;         // decorative watermark emoji on the dark-green card
  // Funding stats — only present for campaigns with a real, tracked goal (e.g. Wakivule).
  // Leave undefined for movement-wide/programme cards so we never show invented numbers.
  raisedUGX?: number;
  donorCount?: number;
  goalUGX?: number;
  milestonePct?: number;  // % threshold at which the next build milestone unlocks
  milestoneNote?: string; // short label shown on the progress bar (e.g. "Roof starts at 60%")
  // Programme cards (no funding stats) show a short aim list instead of a progress bar.
  aims?: string[];
  // Sacco-style cards show real fixed figures (fee/share/donation) instead of raised/goal.
  // Each stat is clickable — selecting one carries its amount straight into the payment form.
  saccoStats?: SaccoOption[];
  // Shown under the stats block when there's a real-world action beyond the online form.
  contactNote?: string;
};

// A clickable Sacco option (membership fee, share value, or open donation).
// amountUGX is fixed for membership/share; left undefined for "any amount" donations.
export type SaccoOption = {
  key: string;
  label: string;
  value: string;
  amountUGX?: number;
};

const CAMPAIGNS: Campaign[] = [
  {
    id: "wakivule",
    title: "Wakivule School — Bulemeezi, Luwero",
    emoji: "🏫",
    raisedUGX: 47_000_000,
    donorCount: 1832,
    goalUGX: 120_000_000,
    milestonePct: 60,
    milestoneNote: "Roof construction begins at 60%",
  },
  {
    id: "ekikakyo",
    title: "Ekikakyo — The Clan Development Fund",
    emoji: "🛡️",
  },
  {
    id: "sacco",
    title: "Ebikabyaffe Foundation Fraternity Sacco",
    emoji: "🤝",
    // Not rendered as a visible tile (per direct request, the "Any amount,
    // voluntary / Donations" card was removed from this hero card) — kept
    // purely so /give?campaign=sacco&option=donation still pre-selects this
    // preset, which drives OneTimeForm's "Contributing to: Donations" label.
    // Without this, that deep link (used by HomeLanding's Sacco CTAs and
    // ProfileContent's "Donate to the Sacco" button) silently degraded to a
    // bare free-amount picker with no guided label.
    saccoStats: [
      { key: "donation", label: "Donations", value: "Any amount, voluntary" },
    ],
  },
];

// The campaign switcher is numbered 1/2/3 to match the home page's Flagship
// Initiative Project I/II/III order (Ekikakyo, then the school project, then
// the Sacco) — independent of CAMPAIGNS' own array order (Wakivule stays
// first there so a bare /give with no ?campaign= still lands on it, unchanged).
const SWITCHER_ORDER = ["ekikakyo", "wakivule", "sacco"];
const SWITCHER_LABELS: Record<string, string> = {
  ekikakyo: "1. Contribution to Ekikakyo",
  wakivule: "2. Contribution to the school project",
  sacco: "3. Contribution to the Ebikabyaffe Foundation Fraternity SACCO",
};

type Tab = "onetime" | "transparency";

// Formats large UGX values as "UGX 47M" for the stats row.
// Smaller numbers are left as locale-formatted integers.
function formatUGX(n: number): string {
  if (n >= 1_000_000) return `UGX ${(n / 1_000_000).toFixed(0)}M`;
  return n.toLocaleString();
}

// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  // Lets /give?campaign=<id> deep-link straight to a specific project card
  // (e.g. from the home page's Flagship Project section).
  initialCampaignId?: string;
  // Lets /give?campaign=sacco&option=<key> land directly on the payment step
  // with that Sacco option (membership fee / share / donation) pre-selected.
  initialSaccoOption?: string;
}

export function GiveContent({ initialCampaignId, initialSaccoOption }: Props) {
  const initialIdx = Math.max(
    0,
    CAMPAIGNS.findIndex((c) => c.id === initialCampaignId)
  );
  const [activeCampaignIdx, setActiveCampaignIdx] = useState(initialIdx);
  const [activeTab, setActiveTab] = useState<Tab>("onetime");
  const [saccoPreset, setSaccoPreset] = useState<SaccoOption | null>(
    CAMPAIGNS[initialIdx].saccoStats?.find((s) => s.key === initialSaccoOption) ?? null
  );

  const campaign = CAMPAIGNS[activeCampaignIdx];
  const hasFundingStats = campaign.goalUGX != null && campaign.raisedUGX != null;
  const progressPct = hasFundingStats
    ? Math.round((campaign.raisedUGX! / campaign.goalUGX!) * 100)
    : 0;

  return (
    <>
      <SectionHead title="Support the Initiatives" sub="Every shilling goes directly to the work" />

      <div className="max-w-[720px] mx-auto px-5 py-7">

        {/* ── Campaign switcher ────────────────────────────────────────────── */}
        {/* Only rendered when there is more than one active campaign.        */}
        {/* Arranged vertically, numbered 1/2/3 to match Project I/II/III.    */}
        {CAMPAIGNS.length > 1 && (
          <div className="flex flex-col gap-2 mb-5">
            {SWITCHER_ORDER.map((id) => {
              const c = CAMPAIGNS.find((x) => x.id === id)!;
              const i = CAMPAIGNS.findIndex((x) => x.id === id);
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCampaignIdx(i);
                    setSaccoPreset(null);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-[8px] text-[13px] font-semibold border transition-all",
                    i === activeCampaignIdx
                      ? "border-[var(--gd)] bg-[var(--gd)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gm)]"
                  )}
                >
                  {c.emoji} {SWITCHER_LABELS[c.id]}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Campaign hero card ───────────────────────────────────────────── */}
        {/* Dark-green card with stats + progress bar for the selected campaign */}
        <div
          className="relative rounded-[var(--r)] p-6 mb-6 overflow-hidden"
          style={{ background: "var(--gd)" }}
        >
          {/* Decorative emoji watermark — purely visual, not read by screen readers */}
          <span
            aria-hidden="true"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[64px] opacity-15 pointer-events-none select-none"
          >
            {campaign.emoji}
          </span>

          <h3 className="font-serif text-[20px] text-white font-normal mb-1">{campaign.title}</h3>
          {campaign.description && (
            <p className="text-[13px] text-white/65 mb-4 leading-relaxed">{campaign.description}</p>
          )}

          {/* Funding campaigns (real tracked goal, e.g. Wakivule): raised · donors · progress bar */}
          {hasFundingStats && (
            <>
              <div className="flex gap-6 mb-4">
                <div>
                  <span className="block text-[20px] font-bold text-[var(--gold2)]">{formatUGX(campaign.raisedUGX!)}</span>
                  <span className="text-[11px] text-white/50">Raised</span>
                </div>
                <div>
                  <span className="block text-[20px] font-bold text-[var(--gold2)]">{campaign.donorCount!.toLocaleString()}</span>
                  <span className="text-[11px] text-white/50">Donors</span>
                </div>
                <div>
                  <span className="block text-[20px] font-bold text-[var(--gold2)]">{progressPct}%</span>
                  <span className="text-[11px] text-white/50">of {formatUGX(campaign.goalUGX!)} goal</span>
                </div>
              </div>

              {/* Thermometer — v3 green→gold2 gradient, matches campaign-card style */}
              <div className="h-2.5 rounded-full bg-white/20 mb-1 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progressPct}%`, background: "linear-gradient(90deg,var(--gl),var(--gold2))" }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/50 mt-1">
                <span>{progressPct}% raised</span>
                {/* Milestone marker — tells donors what the next unlock looks like */}
                <span>⚑ {campaign.milestoneNote}</span>
              </div>
            </>
          )}

          {/* Sacco-style campaigns previously showed a clickable "Any amount,
              voluntary / Donations" tile here — removed from view per direct
              request. campaign.saccoStats still exists (see CAMPAIGNS above)
              purely to power the ?option=donation deep-link preset; there is
              currently nothing to render inline in this hero card. */}

          {/* Programme cards (Ekikakyo): aim list instead of a fabricated progress bar */}
          {campaign.aims && (
            <ul className="mb-2 pl-4 list-disc">
              {campaign.aims.map((aim) => (
                <li key={aim} className="text-[12.5px] text-white/70 leading-relaxed mb-1">
                  {aim}
                </li>
              ))}
            </ul>
          )}

          {campaign.contactNote && (
            <p className="text-[11.5px] text-white/55 leading-relaxed mt-2 pt-3 border-t border-white/15">
              {campaign.contactNote}
            </p>
          )}
        </div>

        {/* ── Tab bar ─────────────────────────────────────────────────────── */}
        <div className="flex border border-[var(--border)] rounded-[var(--r)] overflow-hidden mb-5">
          {(["onetime", "transparency"] as Tab[]).map((tab, i, arr) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 text-[13px] font-semibold transition-all",
                // right border separator between tabs (not after the last one)
                i < arr.length - 1 ? "border-r border-[var(--border)]" : "",
                activeTab === tab
                  ? "bg-[var(--gd)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--cream2)]"
              )}
            >
              {tab === "onetime" ? "One-time gift" : "Transparency"}
            </button>
          ))}
        </div>

        {/* ── Tab content ─────────────────────────────────────────────────── */}
        {activeTab === "onetime" && (
          // Keying on campaign + preset forces a remount (fresh form state)
          // whenever the user switches campaigns or picks a different Sacco option.
          <OneTimeForm
            key={`${campaign.id}:${saccoPreset?.key ?? "none"}`}
            campaign={campaign}
            preset={campaign.id === "sacco" ? saccoPreset : null}
          />
        )}
        {activeTab === "transparency" && (
          <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-[var(--r)]">
            <p className="text-[32px] mb-3">📊</p>
            <p className="text-[15px] font-semibold text-[var(--gd)] mb-1">Public Transparency Dashboard</p>
            <p className="text-[13px] text-[var(--muted)]">
              Every shilling raised and spent — available at launch.
            </p>
          </div>
        )}

      </div>
    </>
  );
}
