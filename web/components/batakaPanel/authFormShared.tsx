// Shared visual pieces for the panel's two independent sign-in screens
// (PanelSignIn.tsx at /batakaPanel, AdminSignIn.tsx at /foundationAdmin).
// The two screens are deliberately separate components with no shared parent
// UI and no cross-link between them (2026-08 request: distinct URLs per
// audience, not a combined sign-in with a role toggle) — but they still
// share the same /login-style visual language, so the handful of small
// pieces that would otherwise be copy-pasted twice live here instead.

export const fieldBase =
  "rounded-full border border-eborder bg-white text-[14px] outline-none focus:border-gold transition-colors py-3";
export const fieldFull = `${fieldBase} w-full px-4`;
export const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1.5";
export const pillPrimary =
  "inline-flex items-center justify-center rounded-full bg-gold text-gd font-semibold text-[14px] px-7 py-3 cursor-pointer hover:bg-gold2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.4 20.4 0 0 1 5.06-5.94M9.9 4.24A10.6 10.6 0 0 1 12 4c7 0 11 7 11 7a20.5 20.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

// Toggle-visibility button used by both password fields — hidden
// (type="password") by default, shown on click.
export function VisibilityToggle({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-gd transition-colors bg-transparent border-0 p-0 cursor-pointer"
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}
