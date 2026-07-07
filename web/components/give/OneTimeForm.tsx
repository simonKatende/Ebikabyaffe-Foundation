"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Campaign } from "./GiveContent";

// ─────────────────────────────────────────────────────────────────────────────
// Preset amounts shown as quick-pick buttons.
// UGX amounts match the prototype; USD values are approximate equivalents.
// ─────────────────────────────────────────────────────────────────────────────
const PRESETS: Record<Currency, number[]> = {
  UGX: [5_000, 10_000, 25_000, 50_000],
  USD: [2, 5, 10, 20],
};

// ─────────────────────────────────────────────────────────────────────────────
// Payment method definitions.
// Phone input is shown for momo and airtel because they require a phone number.
// Card and Apple Pay will go through Stripe (no phone needed).
// ─────────────────────────────────────────────────────────────────────────────
type PayMethod = "momo" | "airtel" | "card" | "apple";
type Currency  = "UGX" | "USD";

const PAY_METHODS: { key: PayMethod; label: string }[] = [
  { key: "momo",   label: "📱 MTN MoMo" },
  { key: "airtel", label: "📱 Airtel Money" },
  { key: "card",   label: "💳 Card" },
  { key: "apple",  label: "🍎 Apple Pay" },
];

interface Props {
  campaign: Campaign;
  // Called from the success screen so the parent can switch to the Busuulu tab
  onSwitchToBusuulu: () => void;
}

export function OneTimeForm({ campaign, onSwitchToBusuulu }: Props) {
  const [currency,       setCurrency]       = useState<Currency>("UGX");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount,   setCustomAmount]   = useState("");
  const [payMethod,      setPayMethod]      = useState<PayMethod | null>(null);
  const [phone,          setPhone]          = useState("");
  const [donated,        setDonated]        = useState(false);

  // Mobile-money methods require the user to enter a phone number
  const needsPhone = payMethod === "momo" || payMethod === "airtel";

  // The actual donation value: preset takes priority; falls back to custom field
  const effectiveAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0);

  function handleAmountClick(amount: number) {
    // Selecting a preset clears the custom field so only one value is active
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  function handleCustomAmountChange(v: string) {
    // Typing in the custom field deselects any active preset button
    setCustomAmount(v);
    setSelectedAmount(null);
  }

  function handleCurrencySwitch(c: Currency) {
    // Switching currency resets the amount because UGX and USD presets differ
    setCurrency(c);
    setSelectedAmount(null);
    setCustomAmount("");
  }

  function handleSubmit() {
    if (!effectiveAmount || !payMethod) return;
    // TODO: call Flutterwave (UGX) or Stripe (USD/GBP) payment APIs here
    setDonated(true);
  }

  // ── Success screen ────────────────────────────────────────────────────────
  // Replaces the form after a successful donation.
  if (donated) {
    return (
      <div className="text-center py-8 px-4 bg-white border border-[var(--border)] rounded-[var(--r)]">
        <p className="text-[48px] mb-3">🙏</p>
        <h3 className="font-serif text-[20px] text-[var(--gd)] font-normal mb-2">
          Weebale nyo — Thank you!
        </h3>
        <p className="text-[13px] text-[var(--muted)] mb-5 leading-relaxed max-w-[340px] mx-auto">
          Your gift to {campaign.title.split("—")[0].trim()} has been received.
          A receipt will be sent to your phone.
        </p>
        {/* Nudge one-time donors toward a recurring monthly commitment */}
        <Button variant="green" onClick={onSwitchToBusuulu}>
          Make this a monthly Busuulu →
        </Button>
      </div>
    );
  }

  // ── Donation form ─────────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-[var(--border)] rounded-[var(--r)] p-5">

      {/* Currency toggle ── UGX for local donors, USD for diaspora */}
      <div className="flex gap-2 mb-4">
        {(["UGX", "USD"] as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => handleCurrencySwitch(c)}
            className={cn(
              "px-4 py-1.5 rounded text-[12px] font-semibold border transition-all",
              currency === c
                ? "bg-[var(--gd)] text-white border-[var(--gd)]"
                : "bg-white text-[var(--muted)] border-[var(--border)] hover:border-[var(--gm)]"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Preset amount buttons */}
      <div className="flex gap-2 flex-wrap mb-3">
        {PRESETS[currency].map((amt) => (
          <button
            key={amt}
            onClick={() => handleAmountClick(amt)}
            className={cn(
              "px-4 py-2 rounded text-[13px] font-semibold border transition-all",
              selectedAmount === amt
                ? "bg-[var(--gm)] text-white border-[var(--gm)]"
                : "bg-white text-[var(--gd)] border-[var(--border)] hover:border-[var(--gm)]"
            )}
          >
            {currency} {amt.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Custom amount — deselects presets when typed into */}
      <input
        type="number"
        min={0}
        placeholder={`Or enter custom amount in ${currency}`}
        value={customAmount}
        onChange={(e) => handleCustomAmountChange(e.target.value)}
        className="w-full border border-[var(--border)] rounded px-3 py-2.5 text-[14px] mb-4 outline-none focus:border-[var(--gm)]"
      />

      {/* Payment method selection */}
      <p className="text-[12px] text-[var(--muted)] mb-2 font-semibold uppercase tracking-wide">
        Payment method
      </p>
      <div className="flex gap-2 flex-wrap mb-4">
        {PAY_METHODS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPayMethod(key)}
            className={cn(
              "px-3 py-2 rounded text-[13px] border transition-all",
              payMethod === key
                ? "bg-[var(--gd)] text-white border-[var(--gd)]"
                : "bg-white text-[var(--text)] border-[var(--border)] hover:border-[var(--gm)]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Phone number input ── only shown for mobile-money methods */}
      {needsPhone && (
        <div className="mb-4">
          <label className="block text-[12px] text-[var(--muted)] font-semibold uppercase tracking-wide mb-1">
            {payMethod === "momo" ? "MTN MoMo" : "Airtel Money"} phone number
          </label>
          <input
            type="tel"
            placeholder="e.g. 0771 234 567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-[var(--border)] rounded px-3 py-2.5 text-[14px] outline-none focus:border-[var(--gm)]"
          />
        </div>
      )}

      {/* Submit button — disabled until amount + method are both set,
          and phone is filled when the method requires it */}
      <button
        onClick={handleSubmit}
        disabled={!effectiveAmount || !payMethod || (needsPhone && !phone)}
        className="w-full py-3.5 bg-[var(--gm)] hover:bg-[var(--gd)] text-white font-bold text-[15px] rounded-[5px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-3"
      >
        Give now →
      </button>

      {/* Payment processor note */}
      <p className="text-[11px] text-[var(--muted)] text-center">
        🔒 All donations processed securely via Flutterwave (UGX) or Stripe (USD/GBP).
      </p>

    </div>
  );
}
