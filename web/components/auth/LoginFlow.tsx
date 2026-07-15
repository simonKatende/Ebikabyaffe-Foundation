"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { isPhoneRegistered, getRegisteredName, registerPhone } from "@/lib/auth/registry";

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
//  - "Create account" and "Sign in" are the same card, switched via a toggle
//    link (?mode=signin on /login) — sign-in skips names entirely and just
//    needs the phone number used to register
//  - a phone already registered this session is flagged on the create-account
//    side with a link straight to sign-in; a phone with no account is flagged
//    on the sign-in side with a link straight to create-account. The registry
//    behind this is session-only (lib/auth/registry.ts) — there's no backend
//    yet, so it resets on a hard reload like the rest of the app's mocks.

export type LoginMode = "create" | "signin";

// Demo-only prefix → network mapping. The real network (and registered name)
// will come from the telecom APIs — do not grow this map, it's placeholder UX.
// Returns null for prefixes outside the demo map — the confirmation sentence
// then simply omits the network name instead of printing a placeholder.
function detectNetwork(local: string): string | null {
  const p = local.slice(0, 3);
  if (p === "077" || p === "078" || p === "076") return "MTN";
  if (p === "070" || p === "075") return "Airtel";
  if (p === "071") return "Uganda Telecom";
  return null;
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

export function LoginFlow({ initialMode = "create" }: { initialMode?: LoginMode }) {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<LoginMode>(initialMode);

  // Step 1 — names (create mode only)
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [givenName, setGivenName] = useState("");

  // Step 2 — phone
  const [phoneRaw, setPhoneRaw] = useState("");

  // Step 3 — OTP (generated locally; demo only)
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);

  function switchMode(next: LoginMode) {
    setMode(next);
    setPhoneRaw("");
    setOtpCode(null);
    setOtpInput("");
    setOtpError(false);
    router.replace(next === "signin" ? "/login?mode=signin" : "/login", { scroll: false });
  }

  const namesReady = mode === "signin" || (surname.trim().length > 0 && firstName.trim().length > 0);
  const phone = normalizePhone(phoneRaw);
  const network = phone ? detectNetwork(phone) : null;

  const alreadyRegistered = mode === "create" && phone ? isPhoneRegistered(phone) : false;
  const registeredName = mode === "signin" && phone ? getRegisteredName(phone) : null;

  // Simulated registered-SIM name — the real one comes from the MoMo lookup.
  const simName =
    mode === "signin"
      ? registeredName ?? ""
      : `${surname} ${firstName}`.trim().toUpperCase();

  const canSendCode =
    mode === "create" ? Boolean(phone && !alreadyRegistered) : Boolean(phone && registeredName);

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
        if (mode === "create") {
          const name = [surname.trim(), firstName.trim(), givenName.trim()]
            .filter(Boolean)
            .join(" ");
          registerPhone(phone!, name);
          loginWithPhone({ name, phone: phone! });
          toast(`Welcome, ${firstName.trim()}! Now choose your clan.`);
        } else {
          loginWithPhone({ name: registeredName!, phone: phone! });
          toast(`Welcome back, ${registeredName!.split(" ")[0]}!`);
        }
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
          {mode === "create" ? "Sign in / Create account" : "Sign in"}
        </h1>
        <p className="text-[13px] text-muted leading-relaxed">
          {mode === "create"
            ? "One account for your clan membership, verification, and contributions. No password — we send a one-time code to your phone."
            : "Enter the phone number you registered with — we'll send a one-time code, no need to retype your names."}
        </p>
      </div>

      <div className="bg-white border border-eborder rounded-[8px] p-5">
        {/* ── 1 · Names (create mode only) ── */}
        {mode === "create" && (
          <>
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
          </>
        )}

        {/* ── 2 · Phone ── */}
        <p
          className="text-[11px] tracking-[1.5px] uppercase font-semibold mb-3"
          style={{ color: namesReady ? "var(--royal2)" : "var(--muted)" }}
        >
          {mode === "create" ? "2 · Your phone number" : "1 · Your phone number"}
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

        {/* Create mode: flag a number that already has an account */}
        {mode === "create" && alreadyRegistered && !otpCode && (
          <div className="bg-cream2 border border-gold/40 rounded-[6px] px-4 py-3 mb-3">
            <p className="text-[13px] text-gd leading-relaxed">
              This contact already has an account with us.
            </p>
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className="text-royal2 underline cursor-pointer bg-transparent border-0 p-0 text-[13px] mt-1"
            >
              Sign in instead →
            </button>
          </div>
        )}

        {/* Sign-in mode: flag a number with no account yet */}
        {mode === "signin" && phone && !registeredName && !otpCode && (
          <div className="bg-cream2 border border-gold/40 rounded-[6px] px-4 py-3 mb-3">
            <p className="text-[13px] text-gd leading-relaxed">
              We don&apos;t recognize that number yet.
            </p>
            <button
              type="button"
              onClick={() => switchMode("create")}
              className="text-royal2 underline cursor-pointer bg-transparent border-0 p-0 text-[13px] mt-1"
            >
              Create an account →
            </button>
          </div>
        )}

        {/* Network + registered-SIM-name confirmation — mirrors the mobile
            money experience. The name shown is SIMULATED until the telecom
            (MoMo/Airtel Money) lookup API is integrated. */}
        {phone && canSendCode && !otpCode && (
          <div className="bg-cream2 border border-eborder rounded-[6px] px-4 py-3 mb-3">
            <p className="text-[13px] text-gd leading-relaxed">
              We will send a one-time code to the{network && <> <strong>{network}</strong></>} number{" "}
              <strong>{formatPhone(phone)}</strong>
              {mode === "create" ? (
                <>
                  , registered in the names of <strong>{simName}</strong>.
                </>
              ) : (
                <>
                  {" "}
                  to sign in as <strong>{simName}</strong>.
                </>
              )}
            </p>
            <p className="text-[10.5px] text-muted mt-1 italic">
              {mode === "create"
                ? "Demo: registered name is simulated — the real one will come from the mobile-money lookup."
                : "Demo: this account exists for this browser session only."}
            </p>
          </div>
        )}

        {canSendCode && !otpCode && (
          <Button variant="gold" onClick={handleSendOtp} className="w-full">
            Send code →
          </Button>
        )}

        {/* ── 3 · OTP ── */}
        {otpCode && (
          <>
            <p className="text-[11px] tracking-[1.5px] uppercase text-royal2 font-semibold mb-3 mt-2">
              {mode === "create" ? "3 · Enter the code" : "2 · Enter the code"}
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

      <p className="text-center mt-4">
        {mode === "create" ? (
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className="text-[13px] text-royal2 underline cursor-pointer bg-transparent border-0 p-0"
          >
            Already have an account? Sign in →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => switchMode("create")}
            className="text-[13px] text-royal2 underline cursor-pointer bg-transparent border-0 p-0"
          >
            New here? Create an account →
          </button>
        )}
      </p>

      <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
        This is a preview of the sign-in experience. Accounts, SMS codes, and
        SIM-name lookup go live with the Foundation&apos;s backend launch.
      </p>
    </div>
  );
}
