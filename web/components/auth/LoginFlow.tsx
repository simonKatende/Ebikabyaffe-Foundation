"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

// ── Frontend mock of the planned phone-first OTP sign-in ────────────────────
//
// Real flow (Phase 2): phone number → SMS OTP via the auth provider, with the
// registered-SIM name shown via the MTN MoMo / Airtel Money partner APIs once
// that partnership exists. Nothing here talks to a network — the OTP is
// generated locally and shown on screen in a clearly-labelled demo box.
//
// UX decisions already agreed with the user:
//  - names first (surname, first name, optional given name), then phone
//  - network + registered-SIM-name confirmation before sending the OTP
//  - correct OTP signs the member in immediately (no extra "Login" click)

// Demo-only prefix → network mapping. The real network (and registered name)
// will come from the telecom APIs — do not grow this map, it's placeholder UX.
function detectNetwork(local: string): string | null {
  const p = local.slice(0, 3);
  if (p === "077" || p === "078" || p === "076") return "MTN";
  if (p === "070" || p === "075") return "Airtel";
  if (p === "071") return "Uganda Telecom";
  return local.length >= 3 ? "your network" : null;
}

// Accepts 07XXXXXXXX or +2567XXXXXXXX / 2567XXXXXXXX; returns local 10-digit
// form ("0772345678") or null while the number is still incomplete/invalid.
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("256")) return "0" + digits.slice(3);
  if (digits.length === 10 && digits.startsWith("0")) return digits;
  return null;
}

function formatPhone(local: string): string {
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}

export function LoginFlow() {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const { toast } = useToast();

  // Step 1 — names
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [givenName, setGivenName] = useState("");

  // Step 2 — phone
  const [phoneRaw, setPhoneRaw] = useState("");

  // Step 3 — OTP (generated locally; demo only)
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);

  const namesReady = surname.trim().length > 0 && firstName.trim().length > 0;
  const phone = normalizePhone(phoneRaw);
  const network = phone ? detectNetwork(phone) : null;

  // Simulated registered-SIM name — the real one comes from the MoMo lookup.
  const simName = `${surname} ${firstName}`.trim().toUpperCase();

  function handleSendOtp() {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setOtpCode(code);
    setOtpInput("");
    setOtpError(false);
  }

  function handleOtpChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setOtpInput(digits);
    setOtpError(false);
    if (digits.length === 6 && otpCode) {
      if (digits === otpCode) {
        // Correct code — sign in immediately, no extra "Login" click needed.
        const name = [surname.trim(), firstName.trim(), givenName.trim()]
          .filter(Boolean)
          .join(" ");
        loginWithPhone({ name, phone: phone! });
        toast(`Welcome, ${firstName.trim()}! Now choose your clan.`);
        router.push("/profile");
      } else {
        setOtpError(true);
      }
    }
  }

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white";
  const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1";

  return (
    <div className="max-w-[440px] mx-auto px-5 py-10">
      <div className="text-center mb-7">
        <p className="text-[36px] mb-2">🔐</p>
        <h1 className="font-serif text-[26px] text-gd font-normal mb-1.5">
          Sign in / Create account
        </h1>
        <p className="text-[13px] text-muted leading-relaxed">
          One account for your clan membership, verification, and
          contributions. No password — we send a one-time code to your phone.
        </p>
      </div>

      <div className="bg-white border border-eborder rounded-[8px] p-5">
        {/* ── 1 · Names ── */}
        <p className="text-[11px] tracking-[1.5px] uppercase text-royal2 font-semibold mb-3">
          1 · Your names
        </p>
        <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <label className="block">
            <span className={labelClass}>Surname *</span>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="e.g. Kironde"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>First name *</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Mike"
              className={inputClass}
            />
          </label>
          <label className="block col-span-2">
            <span className={labelClass}>Given name (optional)</span>
            <input
              type="text"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {/* ── 2 · Phone ── */}
        <p
          className="text-[11px] tracking-[1.5px] uppercase font-semibold mb-3"
          style={{ color: namesReady ? "var(--royal2)" : "var(--muted)" }}
        >
          2 · Your phone number
        </p>
        <label className="block mb-3">
          <span className={labelClass}>Phone (for the one-time code)</span>
          <input
            type="tel"
            inputMode="tel"
            value={phoneRaw}
            disabled={!namesReady}
            onChange={(e) => {
              setPhoneRaw(e.target.value);
              // Editing the number invalidates any code already "sent"
              setOtpCode(null);
              setOtpInput("");
              setOtpError(false);
            }}
            placeholder="e.g. 0772 345 678"
            className={`${inputClass} disabled:opacity-50`}
          />
        </label>

        {/* Network + registered-SIM-name confirmation — mirrors the mobile
            money experience. The name shown is SIMULATED until the telecom
            (MoMo/Airtel Money) lookup API is integrated. */}
        {phone && network && !otpCode && (
          <div className="bg-cream2 border border-eborder rounded-[6px] px-4 py-3 mb-3">
            <p className="text-[13px] text-gd leading-relaxed">
              We will send a one-time code to the{" "}
              <strong>{network}</strong> number{" "}
              <strong>{formatPhone(phone)}</strong>, registered in the names
              of <strong>{simName}</strong>.
            </p>
            <p className="text-[10.5px] text-muted mt-1 italic">
              Demo: registered name is simulated — the real one will come from
              the mobile-money lookup.
            </p>
          </div>
        )}

        {phone && !otpCode && (
          <Button variant="gold" onClick={handleSendOtp} className="w-full">
            Send code →
          </Button>
        )}

        {/* ── 3 · OTP ── */}
        {otpCode && (
          <>
            <p className="text-[11px] tracking-[1.5px] uppercase text-royal2 font-semibold mb-3 mt-2">
              3 · Enter the code
            </p>

            {/* Demo-only hint — in the real app this arrives as an SMS */}
            <div className="bg-gold3 border border-gold/40 rounded-[6px] px-4 py-2.5 mb-3 text-center">
              <p className="text-[11px] text-gd">
                📩 <em>Demo:</em> your code is{" "}
                <strong className="tracking-[3px] text-[14px]" data-testid="demo-otp">
                  {otpCode}
                </strong>{" "}
                — in the real app it arrives by SMS.
              </p>
            </div>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otpInput}
              onChange={(e) => handleOtpChange(e.target.value)}
              placeholder="6-digit code"
              aria-label="One-time code"
              className={`${inputClass} text-center tracking-[8px] text-[18px] font-semibold ${
                otpError ? "border-red-400" : ""
              }`}
            />
            {otpError && (
              <p className="text-[12px] mt-2" style={{ color: "#b03a2e" }}>
                That code doesn&apos;t match. Check the SMS and try again.
              </p>
            )}
            <p className="text-[11.5px] text-muted mt-2">
              The moment the correct code is entered you are signed in — no
              extra button.{" "}
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-royal2 underline cursor-pointer bg-transparent border-0 p-0 text-[11.5px]"
              >
                Resend code
              </button>
            </p>
          </>
        )}
      </div>

      <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
        This is a preview of the sign-in experience. Accounts, SMS codes, and
        SIM-name lookup go live with the Foundation&apos;s backend launch.
      </p>
    </div>
  );
}
