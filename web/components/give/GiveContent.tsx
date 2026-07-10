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
  subtitle: string;      // Ssaza · Chief · tradition tag shown under the title
  description: string;
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
    subtitle: "Bulemeezi Ssaza · Saza Chief: Kangawo · Bulungi Bwansi community project",
    description:
      "Help build a permanent school for the children of Luwero District in Bulemeezi Ssaza — " +
      "a Foundation priority project endorsed by the Bataka and aligned with the Bulungi Bwansi " +
      "tradition of community self-help. The first physical proof point of the Ekikakyo vision: " +
      "one clan, one school.",
    emoji: "🏫",
    raisedUGX: 47_000_000,
    donorCount: 1832,
    goalUGX: 120_000_000,
    milestonePct: 60,
    milestoneNote: "Roof construction begins at 60%",
  },
  {
    id: "ekikakyo",
    title: "Ekikakyo — The Clan Fund",
    subtitle: "Ekika · Obutaka · Abataka — reviving the clan's duty of mutual welfare",
    description:
      "Ekikakyo (\"your clan\") is a modern extension of the Akasolya, the Olukiiko lw'Ekika, and " +
      "Obutaka — a fund through which members of a clan, wherever they live, pool resources for " +
      "the education and welfare of their own children. The long-term vision: a school for every " +
      "one of Buganda's clans.",
    emoji: "🛡️",
    aims: [
      "Revive the traditional clan duty of mutual welfare (obulamu bw'ekika) as education",
      "Give every clan a physical legacy — a school bearing its own identity",
      "Scale one clan, one school to all 56 clans of the Kingdom",
      "Reconnect younger generations with their Ekika beyond weddings and funerals",
    ],
  },
  {
    id: "sacco",
    title: "Ebikabyaffe Foundation Fraternity Sacco",
    subtitle: "The financial arm — a members-owned savings and credit cooperative",
    description:
      "Where Ekikakyo gathers the clan around a shared cause, the Sacco gives that effort " +
      "financial structure and discipline — modernising the old Buganda instinct of bulungi " +
      "bwansi and rotating contribution groups. Every membership fee, share, and donation becomes " +
      "part of the same fund carrying the clan school project forward.",
    emoji: "🤝",
    saccoStats: [
      { key: "membership", label: "Membership fee", value: "UGX 10,000 one-time", amountUGX: 10_000 },
      { key: "share",      label: "Share value",     value: "UGX 20,000 per share", amountUGX: 20_000 },
      { key: "donation",   label: "Donations",       value: "Any amount, voluntary" },
    ],
    contactNote:
      "Select an option above to choose what you're contributing, then complete payment below. " +
      "Prefer to pay in person? Contact the Foundation's clan leadership or Sacco officials directly.",
  },
];

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
      <SectionHead title="Support the Foundation" sub="Every shilling goes directly to the work" />

      <div className="max-w-[720px] mx-auto px-5 py-7">

        {/* ── Campaign switcher ────────────────────────────────────────────── */}
        {/* Only rendered when there is more than one active campaign.        */}
        {/* Each chip shows the campaign emoji + short name.                  */}
        {CAMPAIGNS.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
            {CAMPAIGNS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCampaignIdx(i);
                  setSaccoPreset(null);
                }}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border transition-all",
                  i === activeCampaignIdx
                    ? "border-[var(--gd)] bg-[var(--gd)] text-white"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gm)]"
                )}
              >
                {c.emoji} {c.title.split("—")[0].trim()}
              </button>
            ))}
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
          <p className="text-[11px] text-[var(--gold2)] tracking-wide mb-2">{campaign.subtitle}</p>
          <p className="text-[13px] text-white/65 mb-4 leading-relaxed">{campaign.description}</p>

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

          {/* Sacco-style campaigns: real fixed fee/share/donation figures, no invented goal. */}
          {/* Each stat is clickable — picking one carries its amount into the payment form below. */}
          {campaign.saccoStats && (
            <div className="flex gap-3 mb-2 flex-wrap">
              {campaign.saccoStats.map((stat) => {
                const isActive = saccoPreset?.key === stat.key;
                return (
                  <button
                    key={stat.key}
                    onClick={() => {
                      setSaccoPreset(stat);
                      setActiveTab("onetime");
                    }}
                    className={cn(
                      "text-left rounded-[6px] border px-3.5 py-2.5 transition-all cursor-pointer",
                      isActive
                        ? "border-[var(--gold)] bg-white/10"
                        : "border-white/20 hover:border-[var(--gold)] hover:bg-white/5"
                    )}
                  >
                    <span className="block text-[16px] font-bold text-[var(--gold2)]">{stat.value}</span>
                    <span className="text-[11px] text-white/50">{stat.label}</span>
                  </button>
                );
              })}
            </div>
          )}

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
