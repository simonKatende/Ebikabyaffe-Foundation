"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { recordRegistration, recordClanChange } from "@/lib/stats";
import { getClan } from "@/lib/clans";
import { cn } from "@/lib/utils";
import { COUNTRIES, formatNational, type Country } from "@/lib/phoneCountries";

// ── Frontend mock of the planned phone-first OTP sign-in ────────────────────
//
// Real flow (Phase 2): phone number → OTP via the auth provider, with the
// registered-SIM name shown via the MTN MoMo / Airtel Money partner APIs once
// that partnership exists. Nothing here talks to a network — the OTP is
// generated locally and shown on screen in a clearly-labelled demo box.
//
// UX decisions already agreed with the user:
//  - names first (surname, first name, optional given name), then phone
//  - INTERNATIONAL numbers are accepted (2026-07, diaspora support): a
//    country picker defaults to Uganda; every number is normalised to E.164
//    (+2567…, +447…) so one phone = one account across formats. Ugandan
//    numbers keep the network + SIM-name confirmation and receive the code
//    by SMS; all other countries skip the SIM lookup (no MoMo equivalent
//    abroad) and receive the code on WHATSAPP — per the user's decision,
//    WhatsApp is the diaspora delivery channel, not international SMS
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
//  - EVERY account is created already joined to a clan — there is no "pick a
//    clan later" gap. Create-mode only ever arrives here via a clan page's
//    "Join the {clan} clan" button (?clan=<slug>), which locks that clan
//    into the form; a bare /login in create mode has no clan and refuses to
//    render the sign-up form at all (see the "Choose your clan first" state
//    below). Generic "Sign in" entry points (Nav, hero, /profile) route
//    straight to /login?mode=signin instead — a returning member already has
//    a clan, so re-sending them through /clans on every sign-in would be
//    unrealistic busywork; only first-time account creation is clan-gated.
//  - 2026-07 visual pass: restyled as a split branding/form card (decorative
//    green-gradient panel + white form panel) per a reference layout the user
//    supplied, reusing the site's existing colour tokens (--gd/--gm/--gl,
//    --gold/--gold2) rather than the reference's blue — no behavior changed,
//    every state/handler above is untouched, only markup + classNames below.

export type LoginMode = "create" | "signin";

// Countries offered in the picker — Uganda first (the default), then the
// East African region and the common diaspora destinations. minDigits/
// maxDigits are the national significant number's length (after the leading
// 0 and any typed country code are stripped) — real mobile-number lengths
// per country, e.g. Uganda's 9 (07XX XXX XXX). This is a UI-level sanity
// bound, not authoritative validation — the real per-country check happens
// at the provider (Twilio Lookup) in Phase 2. Shared with AuthContext.tsx
// via lib/phoneCountries.ts so the two never drift.

// Demo-only prefix → network mapping for UGANDAN numbers (national form,
// leading 0 stripped). The real network (and registered name) will come from
// the telecom APIs — do not grow this map, it's placeholder UX. Returns null
// for prefixes outside the demo map — the confirmation sentence then simply
// omits the network name instead of printing a placeholder.
function detectNetwork(national: string): string | null {
  const p = national.slice(0, 2);
  if (p === "77" || p === "78" || p === "76") return "MTN";
  if (p === "70" || p === "75") return "Airtel";
  if (p === "71") return "Uganda Telecom";
  return null;
}

// Returns the national significant number (leading 0 and any typed country
// code stripped) or null while the number is still incomplete/invalid.
// Uganda is validated strictly (9 digits starting with 7 — mobile numbers);
// every other country is checked against its own minDigits/maxDigits above.
function normalizeNational(raw: string, c: Country): string | null {
  let digits = raw.replace(/\D/g, "");
  // "00" is the typed form of "+" (e.g. 0044…) — drop it before the dial check
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith(c.dial) && digits.length > c.dial.length + 4) {
    digits = digits.slice(c.dial.length);
  }
  digits = digits.replace(/^0+/, "");
  if (c.iso === "UG") {
    return digits.length === 9 && digits.startsWith("7") ? digits : null;
  }
  return digits.length >= c.minDigits && digits.length <= c.maxDigits ? digits : null;
}

// One phone = one account is enforced on this canonical form: +2567XXXXXXXX
function toE164(national: string, c: Country): string {
  return `+${c.dial}${national}`;
}

// Each name field (surname / first name / given name) is meant to hold
// exactly one name — stripping spaces as they're typed stops someone from
// typing a full name like "Simon Katende" into a single field (e.g. pasting
// it all into "Surname"), which would otherwise silently defeat the
// surname/first-name split the rest of the app relies on for display order.
function stripSpaces(value: string): string {
  return value.replace(/\s+/g, "");
}

// ── Small inline line-icons for the pill inputs below ───────────────────────
// Plain SVG, no icon-library dependency for three simple glyphs.
function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function LoginFlow({
  initialMode = "create",
  initialClanSlug = null,
}: {
  initialMode?: LoginMode;
  initialClanSlug?: string | null;
}) {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<LoginMode>(initialMode);
  // Resolved once from the URL a clan page's "Join" button sent us in with.
  // Read once via useState(() => …) rather than recomputed from the prop on
  // every render, so toggling create ⇄ sign-in in-page (which drops the
  // ?clan= param via router.replace) doesn't yank the clan back out from
  // under someone who already arrived here correctly.
  const [clan] = useState(() => (initialClanSlug ? getClan(initialClanSlug) ?? null : null));

  // Step 1 — names (create mode only)
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [givenName, setGivenName] = useState("");

  // Step 2 — phone (country defaults to Uganda; the diaspora picks theirs)
  const [countryIso, setCountryIso] = useState("UG");
  const [phoneRaw, setPhoneRaw] = useState("");

  // Custom country picker (flag + dial code collapsed, full list on click —
  // 2026-08 redesign replacing the native <select>, per a reference SMS
  // capture form). Closes on Escape or a click outside the picker.
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const countryPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countryPickerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCountryPickerOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (countryPickerRef.current && !countryPickerRef.current.contains(e.target as Node)) {
        setCountryPickerOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [countryPickerOpen]);

  // Step 3 — OTP (generated locally; demo only)
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);

  // Whether a given phone already has a real account, checked against the
  // live Supabase `profiles` table via /api/auth/check-phone (a service-role
  // lookup — RLS only allows a signed-in member to read their own row, and
  // this needs to work before anyone is signed in). Debounced from the
  // phone/country change handlers below rather than a useEffect, since this
  // repo's react-hooks/set-state-in-effect rule rejects an effect body that
  // fetches then calls setState — driving it from a real event-handler
  // callback boundary sidesteps that entirely.
  const [phoneCheck, setPhoneCheck] = useState<{
    phone: string;
    registered: boolean;
    name: string | null;
  } | null>(null);
  const phoneCheckTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function schedulePhoneCheck(nextPhone: string | null) {
    if (phoneCheckTimeout.current) clearTimeout(phoneCheckTimeout.current);
    if (!nextPhone) {
      setPhoneCheck(null);
      return;
    }
    phoneCheckTimeout.current = setTimeout(() => {
      fetch(`/api/auth/check-phone?phone=${encodeURIComponent(nextPhone)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { registered?: boolean; name?: string | null } | null) => {
          setPhoneCheck({
            phone: nextPhone,
            registered: Boolean(data?.registered),
            name: data?.name ?? null,
          });
        })
        .catch(() => setPhoneCheck(null));
    }, 400);
  }

  function switchMode(next: LoginMode) {
    setMode(next);
    setPhoneRaw("");
    setOtpCode(null);
    setOtpInput("");
    setOtpError(false);
    setPhoneCheck(null);
    router.replace(next === "signin" ? "/login?mode=signin" : "/login", { scroll: false });
  }

  const namesReady = mode === "signin" || (surname.trim().length > 0 && firstName.trim().length > 0);
  const country = COUNTRIES.find((c) => c.iso === countryIso)!;
  const isUganda = country.iso === "UG";
  const national = normalizeNational(phoneRaw, country);
  // Canonical E.164 identity — the "one phone = one account" key
  const phone = national ? toE164(national, country) : null;
  const phoneDisplay = national ? formatNational(national, country) : "";
  // Network detection is a Uganda-only enrichment (MoMo-style); the code
  // itself travels by SMS in Uganda and on WhatsApp for the diaspora
  const network = national && isUganda ? detectNetwork(national) : null;

  // True once phoneCheck's result is actually for the currently-typed
  // number — false while debouncing/in flight, so the UI can tell "unknown
  // yet" apart from "checked, and not registered" (see canSendCode below).
  const checkMatches = Boolean(phoneCheck && phone && phoneCheck.phone === phone);
  const alreadyRegistered = mode === "create" && checkMatches ? phoneCheck!.registered : false;
  const registeredName = mode === "signin" && checkMatches ? phoneCheck!.name : null;

  // Simulated registered-SIM name — the real one comes from the MoMo lookup.
  const simName =
    mode === "signin"
      ? registeredName ?? ""
      : `${surname} ${firstName}`.trim().toUpperCase();

  const canSendCode =
    mode === "create"
      ? Boolean(phone && checkMatches && !alreadyRegistered)
      : Boolean(phone && checkMatches && registeredName);

  function handleSendOtp() {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setOtpCode(code);
    setOtpInput("");
    setOtpError(false);
  }

  async function handleOtpChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setOtpInput(digits);
    setOtpError(false);
    if (digits.length === 6 && otpCode) {
      if (digits === otpCode) {
        // Correct code — sign in immediately, no extra "Login" click needed.
        try {
          if (mode === "create") {
            const name = [surname.trim(), firstName.trim(), givenName.trim()]
              .filter(Boolean)
              .join(" ");
            await loginWithPhone({ name, phoneE164: phone!, clanSlug: clan!.slug });
            // A genuinely new account — tick the site-wide "Baganda registered"
            // counter everywhere it is displayed. Sign-in (below) does not.
            recordRegistration();
            // The clan is joined at the same moment the account is created —
            // bump that clan's live member count immediately.
            recordClanChange(null, clan!.slug);
            toast(
              `Welcome, ${firstName.trim()}! You've joined the ${clan!.name} clan. ` +
                `Got a business or organisation? You can advertise it from your profile.`
            );
          } else {
            await loginWithPhone({ name: registeredName!, phoneE164: phone! });
            toast(`Welcome back, ${registeredName!.split(" ")[0]}!`);
          }
          // Both a brand-new account and a returning sign-in land on the home
          // dashboard (2026-08 — sign-in used to go to /profile instead, which
          // felt inconsistent: create-mode already landed on the dashboard, and
          // a returning member expects the same "front door" every time).
          router.push("/");
        } catch {
          setOtpError(true);
          toast("Something went wrong signing you in — please try again.");
        }
      } else {
        setOtpError(true);
      }
    }
  }

  // Pill-shaped field/button classes shared by the styling below. Split into
  // a base (no width) + full-width variant for the same reason inputBase was
  // split out before: a field that needs flex/percentage sizing (the country
  // select + phone number row) must not carry a conflicting w-full utility.
  const fieldBase =
    "rounded-full border border-eborder bg-white text-[14px] outline-none focus:border-gold transition-colors py-3";
  const fieldFull = `${fieldBase} w-full px-4`;
  const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1.5";
  const pillPrimary =
    "inline-flex items-center justify-center rounded-full bg-gold text-gd font-semibold text-[14px] px-7 py-3 cursor-pointer hover:bg-gold2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const pillOutline =
    "inline-flex items-center justify-center rounded-full border border-gd text-gd font-semibold text-[13px] px-6 py-2.5 cursor-pointer hover:bg-cream2 transition-colors bg-transparent";

  return (
    <div
      className="flex items-center justify-center px-4 py-10 sm:py-16"
      style={{
        minHeight: "calc(100vh - var(--nav-h))",
        background: "linear-gradient(160deg, var(--gd) 0%, var(--gm) 60%, var(--gl) 140%)",
      }}
    >
      <div className="w-full max-w-[900px] bg-white rounded-[26px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.4)] overflow-hidden grid md:grid-cols-[42%_58%]">

        {/* ── Decorative branding panel — desktop only, echoes the reference's
            organic-blob split layout using the site's own green gradient ── */}
        <div
          className="hidden md:flex relative flex-col justify-center px-10 py-12 overflow-hidden"
          style={{ background: "linear-gradient(165deg, var(--gd) 0%, var(--gm) 55%, var(--gl) 140%)" }}
        >
          <span aria-hidden className="absolute -left-16 -bottom-24 w-[300px] h-[300px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span aria-hidden className="absolute left-20 bottom-4 w-[150px] h-[150px] rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span aria-hidden className="absolute -right-12 top-8 w-[130px] h-[130px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

          <div className="relative z-10">
            <p className="text-gold2 text-[11px] tracking-[3px] uppercase font-semibold mb-4">
              Ebikabyaffe Foundation
            </p>
            <h2 className="font-serif text-white text-[36px] leading-tight font-bold mb-3">
              Agali Awamu
            </h2>
            <p className="text-white/70 text-[13.5px] leading-relaxed max-w-[260px]">
              {mode === "create"
                ? "One account for your clan membership, verification, and contributions — in Uganda and the diaspora."
                : "Sign back in to manage your clan membership, verification, and contributions."}
            </p>
          </div>
        </div>

        {/* ── Form panel ── */}
        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-7">
            <h1 className="font-serif text-[26px] text-gd font-normal mb-1.5">
              {mode === "create" ? "Okwewandiisa (Signup) / Sign in" : "Sign in"}
            </h1>
            <p className="text-[13px] text-muted leading-relaxed">
              {mode === "create"
                ? "One account for your clan membership, verification, and contributions — in Uganda and the diaspora. No password: we send a one-time code by SMS (Uganda) or WhatsApp (abroad)."
                : "Enter the phone number you registered with — we'll send a one-time code, no need to retype your names."}
            </p>
          </div>

          {mode === "create" && !clan ? (
            // No clan came in via the URL — every account is created already
            // joined to a clan, so there is nothing to fill in here yet.
            <div className="text-center py-4">
              <p className="text-[32px] mb-3">🐟</p>
              <p className="text-[14px] text-gd font-semibold mb-2">
                Choose your clan first
              </p>
              <p className="text-[13px] text-muted leading-relaxed mb-6">
                Every Ebikabyaffe account is tied to a clan — accounts
                can&apos;t be created without one. Open your clan from Ebika
                bya Baganda and use its &quot;Join the [clan name] clan&quot;
                button to come back here with your clan already set.
              </p>
              <Link href="/clans" className="no-underline">
                <button type="button" className={pillPrimary}>
                  Find your clan →
                </button>
              </Link>
              {/* The "Already have an account? Sign in →" toggle below the
                  card already covers this — no need to duplicate it in here. */}
            </div>
          ) : (
            <>
              {/* ── 0 · Clan (locked, carried in from the clan page) ── */}
              {mode === "create" && clan && (
                <div className="flex items-center gap-3 bg-cream2 border border-gold/40 rounded-2xl px-4 py-3.5 mb-6">
                  <span className="text-[30px] leading-none shrink-0">{clan.totemEmoji}</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted mb-0.5">
                      Your clan
                    </p>
                    <p className="text-[15px] text-gd font-semibold leading-tight">
                      {clan.name}
                    </p>
                    <p className="text-[11px] text-muted mt-0.5">
                      Locked in — chosen from the {clan.name} clan page.
                    </p>
                  </div>
                </div>
              )}

              {/* ── 1 · Names (create mode only) ── */}
              {mode === "create" && (
                <>
                  <p className="text-[11px] tracking-[1.5px] uppercase text-royal2 font-semibold mb-3">
                    1 · Your names
                  </p>
                  <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <label className="block">
                      <span className={labelClass}>Surname *</span>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                          <PersonIcon />
                        </span>
                        <input
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(stripSpaces(e.target.value))}
                          placeholder="e.g. Kironde"
                          className={`${fieldFull} pl-11`}
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className={labelClass}>First name *</span>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                          <PersonIcon />
                        </span>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(stripSpaces(e.target.value))}
                          placeholder="e.g. Mike"
                          className={`${fieldFull} pl-11`}
                        />
                      </div>
                    </label>
                    <label className="block col-span-2">
                      <span className={labelClass}>Given name (optional)</span>
                      <input
                        type="text"
                        value={givenName}
                        onChange={(e) => setGivenName(stripSpaces(e.target.value))}
                        className={fieldFull}
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
              <div className="mb-3">
                <span className={labelClass}>Phone (for the one-time code)</span>
                <div className="flex gap-2">
                  {/* Country picker — collapsed to just flag + dial code
                      (e.g. "🇺🇬 +256"), matching a standard SMS-capture-form
                      pattern: click to open the full scrollable list of
                      countries (flag + name + dial code), pick one, and it
                      collapses back down. Custom dropdown rather than a
                      native <select> specifically so the collapsed state can
                      show just the flag+code — a native select always shows
                      its selected <option>'s full text, which would defeat
                      the compact collapsed look this was asked for. */}
                  <div className="relative w-[38%] shrink-0 min-w-0" ref={countryPickerRef}>
                    <button
                      type="button"
                      disabled={!namesReady}
                      onClick={() => setCountryPickerOpen((o) => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={countryPickerOpen}
                      aria-label="Country"
                      className={`${fieldBase} disabled:opacity-50 w-full min-w-0 pl-3 pr-2 flex items-center justify-between gap-1 cursor-pointer bg-white text-left`}
                    >
                      <span className="flex items-center gap-1.5 text-[14px] min-w-0">
                        <span className="text-[16px] leading-none shrink-0">{country.flag}</span>
                        <span className="truncate">+{country.dial}</span>
                      </span>
                      <span
                        className={cn(
                          "text-muted shrink-0 transition-transform",
                          countryPickerOpen && "rotate-180"
                        )}
                      >
                        <ChevronDownIcon />
                      </span>
                    </button>

                    {countryPickerOpen && (
                      <div
                        role="listbox"
                        aria-label="Select a country"
                        className="absolute z-20 top-full left-0 mt-1 w-[270px] max-w-[85vw] max-h-[280px] overflow-y-auto bg-white border border-eborder rounded-lg shadow-[0_12px_30px_-8px_rgba(0,0,0,0.25)] py-1"
                      >
                        {COUNTRIES.map((c) => (
                          <button
                            type="button"
                            key={c.iso}
                            role="option"
                            aria-selected={c.iso === countryIso}
                            onClick={() => {
                              setCountryIso(c.iso);
                              // Clear the number too, not just the OTP state
                              // — the phone input is re-validated against
                              // whichever country is currently selected on
                              // every render, so leaving already-typed
                              // digits in place would silently reinterpret
                              // them under the new country's dial code (e.g.
                              // a Ugandan number surviving a switch to
                              // Kenya, minting the wrong E.164 identity with
                              // no warning shown).
                              setPhoneRaw("");
                              setOtpCode(null);
                              setOtpInput("");
                              setOtpError(false);
                              setCountryPickerOpen(false);
                              schedulePhoneCheck(null);
                            }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-3 py-2 text-left text-[13.5px] cursor-pointer hover:bg-cream2 transition-colors bg-transparent border-0",
                              c.iso === countryIso ? "bg-cream2 font-semibold text-gd" : "text-gd"
                            )}
                          >
                            <span className="text-[16px] leading-none shrink-0">{c.flag}</span>
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="text-muted shrink-0">+{c.dial}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative flex-1 min-w-0">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                      <PhoneIcon />
                    </span>
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
                        const nextNational = normalizeNational(e.target.value, country);
                        schedulePhoneCheck(nextNational ? toE164(nextNational, country) : null);
                      }}
                      // A little slack over maxDigits for an optional leading
                      // 0 plus a couple of spacing characters, since the
                      // field doesn't live-format what's typed — the real
                      // digit-count limit is enforced by normalizeNational().
                      maxLength={country.maxDigits + 4}
                      placeholder={isUganda ? "e.g. 0772 345 678" : "e.g. 7911 123456"}
                      aria-label="Phone number"
                      className={`${fieldBase} disabled:opacity-50 w-full pl-11 pr-4`}
                    />
                  </div>
                </div>
                {!isUganda && (
                  <p className="text-[11px] text-muted mt-1.5 leading-relaxed">
                    💬 Diaspora numbers receive the one-time code on{" "}
                    <strong>WhatsApp</strong>.
                  </p>
                )}
              </div>

              {/* Create mode: flag a number that already has an account */}
              {mode === "create" && checkMatches && alreadyRegistered && !otpCode && (
                <div className="bg-cream2 border border-gold/40 rounded-2xl px-4 py-3 mb-3">
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
              {mode === "signin" && phone && checkMatches && !registeredName && !otpCode && (
                <div className="bg-cream2 border border-gold/40 rounded-2xl px-4 py-3 mb-3">
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

              {/* Confirmation before sending. Uganda: network + registered-SIM-name,
                  mirroring the mobile-money experience (name SIMULATED until the
                  MoMo/Airtel lookup API is integrated), code by SMS. Diaspora:
                  no SIM lookup exists abroad, code arrives on WhatsApp. */}
              {phone && canSendCode && !otpCode && (
                <div className="bg-cream2 border border-eborder rounded-2xl px-4 py-3 mb-3">
                  <p className="text-[13px] text-gd leading-relaxed">
                    We will send a one-time code {isUganda ? "by SMS" : "on WhatsApp"} to
                    the{network && <> <strong>{network}</strong></>} number{" "}
                    <strong>{phoneDisplay}</strong>
                    {mode === "create" ? (
                      isUganda ? (
                        <>
                          , registered in the names of <strong>{simName}</strong>.
                        </>
                      ) : (
                        <>.</>
                      )
                    ) : (
                      <>
                        {" "}
                        to sign in as <strong>{simName}</strong>.
                      </>
                    )}
                  </p>
                  <p className="text-[10.5px] text-muted mt-1 italic">
                    {mode === "signin"
                      ? "Demo: this account exists for this browser session only."
                      : isUganda
                        ? "Demo: registered name is simulated — the real one will come from the mobile-money lookup."
                        : "Demo: no message is really sent yet — WhatsApp delivery goes live with the backend."}
                  </p>
                </div>
              )}

              {canSendCode && !otpCode && (
                <button type="button" onClick={handleSendOtp} className={`${pillPrimary} w-full`}>
                  Send code →
                </button>
              )}

              {/* ── 3 · OTP ── */}
              {otpCode && (
                <>
                  <p className="text-[11px] tracking-[1.5px] uppercase text-royal2 font-semibold mb-3 mt-2 flex items-center gap-1.5">
                    <ShieldIcon />
                    {mode === "create" ? "3 · Enter the code" : "2 · Enter the code"}
                  </p>

                  {/* Demo-only hint — in the real app this arrives by SMS (Uganda)
                      or on WhatsApp (diaspora) */}
                  <div className="bg-gold3 border border-gold/40 rounded-2xl px-4 py-2.5 mb-3 text-center">
                    <p className="text-[11px] text-gd">
                      {isUganda ? "📩" : "💬"} <em>Demo:</em> your code is{" "}
                      <strong className="tracking-[3px] text-[14px]" data-testid="demo-otp">
                        {otpCode}
                      </strong>{" "}
                      — in the real app it arrives {isUganda ? "by SMS" : "on WhatsApp"}.
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
                    className={`${fieldFull} text-center tracking-[8px] text-[18px] font-semibold ${
                      otpError ? "border-red-400" : ""
                    }`}
                  />
                  {otpError && (
                    <p className="text-[12px] mt-2" style={{ color: "#b03a2e" }}>
                      That code doesn&apos;t match. Check the{" "}
                      {isUganda ? "SMS" : "WhatsApp message"} and try again.
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
            </>
          )}

          {/* ── Mode toggle — divider + outline pill, echoing the reference's
              primary-pill / "or" / secondary-pill pairing ── */}
          <div className="mt-7 mb-4 flex items-center gap-3">
            <span className="flex-1 h-px bg-eborder" />
            <span className="text-[10px] uppercase tracking-wide text-muted">or</span>
            <span className="flex-1 h-px bg-eborder" />
          </div>
          <div className="text-center">
            {mode === "create" ? (
              <button type="button" onClick={() => switchMode("signin")} className={pillOutline}>
                Already have an account? Sign in
              </button>
            ) : (
              <button type="button" onClick={() => switchMode("create")} className={pillOutline}>
                New here? Create an account
              </button>
            )}
          </div>

          <p className="text-[11px] text-muted text-center mt-5 leading-relaxed">
            This is a preview of the sign-in experience. Accounts, SMS &amp;
            WhatsApp codes, and SIM-name lookup go live with the Foundation&apos;s
            backend launch.
          </p>
        </div>
      </div>
    </div>
  );
}
