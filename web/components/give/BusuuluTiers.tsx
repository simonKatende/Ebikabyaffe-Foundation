"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Busuulu tier definitions
// Busuulu = traditional monthly clan tribute, adapted here as a recurring gift.
// To add or change a tier, edit this array — the UI renders from it automatically.
// ─────────────────────────────────────────────────────────────────────────────
type Tier = {
  key: string;
  name: string;          // Luganda tier name
  translation: string;   // English meaning shown below the name
  amountUGX: number;     // monthly commitment in Ugandan shillings
  benefits: string;      // what the donor receives at this tier
  highlight?: boolean;   // true = permanent gold border (reserved for the top tier)
};

const TIERS: Tier[] = [
  {
    key: "omwana",
    name: "Omwana w'Ekika",
    translation: "Child of the Clan",
    amountUGX: 5_000,
    benefits:
      "Tier badge on your profile. Full membership benefits. Join the foundation of our community.",
  },
  {
    key: "omugabo",
    name: "Omugabo",
    translation: "The Contributor",
    amountUGX: 20_000,
    benefits:
      "Tier badge + your name on the monthly donor list published to all members.",
  },
  {
    key: "mukulu",
    name: "Mukulu w'Ekika",
    translation: "Elder of the Clan",
    amountUGX: 50_000,
    benefits:
      "Your name on the permanent digital and physical donor wall at Foundation premises. " +
      "Status among the elders of your clan.",
  },
  {
    key: "olukiiko",
    name: "Olukiiko lw'Ebikabyaffe",
    translation: "Council of Our Heritage",
    amountUGX: 200_000,
    benefits:
      "Inner circle. Named in Foundation impact reports. " +
      "Annual hand-signed letter from the Council of Clan Heads delivered each January.",
    highlight: true, // gold border at all times to signal the premium tier
  },
];

export function BusuuluTiers() {
  const [selectedTierKey, setSelectedTierKey] = useState<string | null>(null);
  const [phone,           setPhone]           = useState("");
  const [submitted,       setSubmitted]       = useState(false);

  const selectedTier = TIERS.find((t) => t.key === selectedTierKey);

  // ── Success screen ────────────────────────────────────────────────────────
  // Shown after the donor has entered their phone and confirmed the commitment.
  if (submitted && selectedTier) {
    return (
      <div className="text-center py-8 px-4 bg-white border border-[var(--border)] rounded-[var(--r)]">
        <p className="text-[48px] mb-3">🌿</p>
        <h3 className="font-serif text-[20px] text-[var(--gd)] font-normal mb-2">
          Weebale — You are now a {selectedTier.name}
        </h3>
        <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-[340px] mx-auto">
          Your monthly Busuulu of{" "}
          <strong>UGX {selectedTier.amountUGX.toLocaleString()}</strong> has been registered.
          You will receive a confirmation on {phone}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-[var(--r)] p-5">
      <h3 className="text-[15px] font-semibold text-[var(--gd)] mb-4">Choose your monthly tier</h3>

      {/* ── Tier cards ──────────────────────────────────────────────────────── */}
      {/* Each card shows the tier name, translation, and monthly amount.      */}
      {/* Clicking a card selects it and expands the benefits panel below it.  */}
      {/* The top tier (olukiiko) has a permanent gold border.                 */}
      <div className="flex flex-col gap-3 mb-5">
        {TIERS.map((tier) => {
          const isSelected = selectedTierKey === tier.key;
          return (
            <div
              key={tier.key}
              onClick={() => setSelectedTierKey(tier.key)}
              className={cn(
                "rounded-[var(--r)] border overflow-hidden cursor-pointer transition-all",
                isSelected
                  ? "border-[var(--gold)] shadow-[0_0_0_2px_rgba(200,151,58,.2)]"
                  : tier.highlight
                  ? "border-[var(--gold)]"
                  : "border-[var(--border)] hover:border-[var(--gold)]"
              )}
            >
              {/* Card header — always visible */}
              <div
                className={cn(
                  "flex items-center justify-between px-[18px] py-3.5",
                  // gold tint on the header background when selected or is the top tier
                  isSelected || tier.highlight ? "bg-[var(--gold3)]" : ""
                )}
              >
                <div>
                  <p
                    className={cn(
                      "text-[15px] font-semibold",
                      tier.highlight ? "text-[var(--gold)]" : "text-[var(--gd)]"
                    )}
                  >
                    {tier.name}
                  </p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">{tier.translation}</p>
                </div>
                <p className="text-[14px] font-bold text-[var(--gold)] whitespace-nowrap">
                  UGX {tier.amountUGX.toLocaleString()}/mo
                </p>
              </div>

              {/* Benefits panel — only visible when this tier is selected */}
              {isSelected && (
                <div className="px-[18px] py-3 border-t border-[var(--border)] bg-[var(--cream)] text-[13px] text-[var(--muted)] leading-relaxed">
                  {tier.benefits}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── MTN MoMo phone input ──────────────────────────────────────────── */}
      {/* Only revealed once a tier is selected.                              */}
      {/* The monthly debit will be requested against this number.            */}
      {selectedTier && (
        <div className="mb-4">
          <label className="block text-[12px] text-[var(--muted)] font-semibold uppercase tracking-wide mb-1">
            MTN MoMo phone number
          </label>
          <input
            type="tel"
            placeholder="e.g. 0771 234 567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-[var(--border)] rounded px-3 py-2.5 text-[14px] outline-none focus:border-[var(--gm)]"
          />
          <p className="text-[11px] text-[var(--muted)] mt-1">
            Monthly debit of UGX {selectedTier.amountUGX.toLocaleString()} will be requested on this number.
          </p>
        </div>
      )}

      {/* Continue button ── label updates to show the chosen tier name + amount.
          Disabled until both a tier and a phone number are provided.          */}
      <button
        onClick={() => setSubmitted(true)}
        disabled={!selectedTier || !phone}
        className="w-full py-3.5 bg-[var(--gm)] hover:bg-[var(--gd)] text-white font-bold text-[15px] rounded-[5px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {selectedTier
          ? `Start ${selectedTier.name} — UGX ${selectedTier.amountUGX.toLocaleString()}/mo`
          : "Select a tier to continue"}
      </button>
    </div>
  );
}
