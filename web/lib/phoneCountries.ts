// Shared phone-country data, used by LoginFlow.tsx (parsing what someone
// types) and AuthContext.tsx (redisplaying a phone number that came back
// from a real Supabase `profiles` row as E.164). Kept in one place so the
// two never drift apart.

export interface Country {
  iso: string;
  name: string;
  flag: string;
  dial: string; // dial code without the leading +
  minDigits: number;
  maxDigits: number;
}

export const COUNTRIES: Country[] = [
  { iso: "UG", name: "Uganda", flag: "🇺🇬", dial: "256", minDigits: 9, maxDigits: 9 },
  { iso: "KE", name: "Kenya", flag: "🇰🇪", dial: "254", minDigits: 9, maxDigits: 9 },
  { iso: "TZ", name: "Tanzania", flag: "🇹🇿", dial: "255", minDigits: 9, maxDigits: 9 },
  { iso: "RW", name: "Rwanda", flag: "🇷🇼", dial: "250", minDigits: 9, maxDigits: 9 },
  { iso: "SS", name: "South Sudan", flag: "🇸🇸", dial: "211", minDigits: 9, maxDigits: 9 },
  { iso: "ZA", name: "South Africa", flag: "🇿🇦", dial: "27", minDigits: 9, maxDigits: 9 },
  { iso: "GB", name: "United Kingdom", flag: "🇬🇧", dial: "44", minDigits: 10, maxDigits: 10 },
  { iso: "IE", name: "Ireland", flag: "🇮🇪", dial: "353", minDigits: 9, maxDigits: 9 },
  { iso: "US", name: "USA / Canada", flag: "🇺🇸", dial: "1", minDigits: 10, maxDigits: 10 },
  { iso: "DE", name: "Germany", flag: "🇩🇪", dial: "49", minDigits: 10, maxDigits: 11 },
  { iso: "FR", name: "France", flag: "🇫🇷", dial: "33", minDigits: 9, maxDigits: 9 },
  { iso: "NL", name: "Netherlands", flag: "🇳🇱", dial: "31", minDigits: 9, maxDigits: 9 },
  { iso: "BE", name: "Belgium", flag: "🇧🇪", dial: "32", minDigits: 9, maxDigits: 9 },
  { iso: "SE", name: "Sweden", flag: "🇸🇪", dial: "46", minDigits: 7, maxDigits: 9 },
  { iso: "NO", name: "Norway", flag: "🇳🇴", dial: "47", minDigits: 8, maxDigits: 8 },
  { iso: "DK", name: "Denmark", flag: "🇩🇰", dial: "45", minDigits: 8, maxDigits: 8 },
  { iso: "IT", name: "Italy", flag: "🇮🇹", dial: "39", minDigits: 9, maxDigits: 10 },
  { iso: "ES", name: "Spain", flag: "🇪🇸", dial: "34", minDigits: 9, maxDigits: 9 },
  { iso: "AE", name: "United Arab Emirates", flag: "🇦🇪", dial: "971", minDigits: 9, maxDigits: 9 },
  { iso: "QA", name: "Qatar", flag: "🇶🇦", dial: "974", minDigits: 8, maxDigits: 8 },
  { iso: "SA", name: "Saudi Arabia", flag: "🇸🇦", dial: "966", minDigits: 9, maxDigits: 9 },
  { iso: "KW", name: "Kuwait", flag: "🇰🇼", dial: "965", minDigits: 8, maxDigits: 8 },
  { iso: "AU", name: "Australia", flag: "🇦🇺", dial: "61", minDigits: 9, maxDigits: 9 },
  { iso: "NZ", name: "New Zealand", flag: "🇳🇿", dial: "64", minDigits: 8, maxDigits: 9 },
  { iso: "IN", name: "India", flag: "🇮🇳", dial: "91", minDigits: 10, maxDigits: 10 },
  { iso: "CN", name: "China", flag: "🇨🇳", dial: "86", minDigits: 11, maxDigits: 11 },
  { iso: "JP", name: "Japan", flag: "🇯🇵", dial: "81", minDigits: 10, maxDigits: 10 },
];

// Human-friendly display for a national number once its country is known:
// "772345678" + Uganda → "+256 772 345 678"
export function formatNational(national: string, country: Country): string {
  const groups = national.match(/.{1,3}/g) ?? [national];
  return `+${country.dial} ${groups.join(" ")}`;
}

// Longest-dial-code-first, since some codes would otherwise wrongly match as
// a prefix of a longer one (e.g. a bare "1" swallowing "256" if checked
// first) — sorted once at module load, not on every call.
const BY_DIAL_LENGTH_DESC = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

// Reverse direction: a stored E.164 string (from `profiles.phone`) back to
// the same pretty display format — used when a real Supabase profile row is
// loaded and there's no live Country selection to hand it.
export function formatE164(e164: string): string {
  const digits = e164.replace(/^\+/, "");
  const country = BY_DIAL_LENGTH_DESC.find((c) => digits.startsWith(c.dial));
  if (!country) return e164;
  return formatNational(digits.slice(country.dial.length), country);
}
