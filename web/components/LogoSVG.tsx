import { SVGProps } from "react";

// Placeholder inline SVG logo used until the real exported logo is placed at /public/logo.svg.
// Replace with <Image src="/logo.svg" .../> once the final artwork is ready.
export function LogoSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Outer gold ring */}
      <circle cx="20" cy="20" r="19" fill="#c8973a"/>
      {/* Royal blue main circle */}
      <circle cx="20" cy="20" r="16" fill="#1a3d8f"/>
      {/* Inner thin gold ring */}
      <circle cx="20" cy="20" r="16" fill="none" stroke="#f4c66a" strokeWidth=".8"/>
      {/* Simplified pyramid / Enkanzu steps */}
      <polygon points="20,7 28,21 12,21" fill="none" stroke="#fff" strokeWidth="1.2"/>
      <line x1="14" y1="18" x2="26" y2="18" stroke="#fff" strokeWidth="1"/>
      <line x1="16.5" y1="14.5" x2="23.5" y2="14.5" stroke="#fff" strokeWidth="1"/>
      {/* Central shield */}
      <path d="M17,21 L17,27 Q20,29.5 23,27 L23,21 Z" fill="#c8973a" stroke="#f4c66a" strokeWidth=".6"/>
      <line x1="17" y1="23.5" x2="23" y2="23.5" stroke="#1a3d8f" strokeWidth="1"/>
      <line x1="17" y1="25.5" x2="23" y2="25.5" stroke="#1a3d8f" strokeWidth="1"/>
      {/* Crossed spears */}
      <line x1="14" y1="30" x2="26" y2="22" stroke="#f4c66a" strokeWidth=".9"/>
      <line x1="26" y1="30" x2="14" y2="22" stroke="#f4c66a" strokeWidth=".9"/>
      {/* Gold banner ribbon */}
      <rect x="8" y="31" width="24" height="5" rx="1.5" fill="#c8973a"/>
      <text x="20" y="35" fontSize="3.8" fill="#1a3d8f" fontWeight="700" textAnchor="middle" fontFamily="Arial,sans-serif" letterSpacing=".3">
        EBIKABYAFFE
      </text>
    </svg>
  );
}
