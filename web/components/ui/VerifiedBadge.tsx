// Small blue "verified" badge — the Instagram/TikTok/Twitter-style circle +
// checkmark, shown next to a member's name wherever it appears once the
// Foundation's Bataka Panel has verified their clan membership
// (user.clanVerified / a PanelMember's status === "verified" / a business
// listing's ownerVerified). Deliberately just an icon with a title tooltip,
// no extra text — the existing SELF-DECLARED/PENDING/VERIFIED text badges
// on /profile already spell it out in full; this is the compact, portable
// version for every OTHER place a name shows up (Nav, dashboard greeting,
// the Bataka Panel's own member views, the public Business Owners
// directory).
export function VerifiedBadge({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      role="img"
      aria-label="Verified by Omutaka"
      className={`inline-block align-middle shrink-0 ${className}`}
    >
      <title>Verified by Omutaka</title>
      <circle cx="11" cy="11" r="10" fill="#1d9bf0" />
      <path
        d="M6.7 11.3l2.6 2.6 6-6.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
