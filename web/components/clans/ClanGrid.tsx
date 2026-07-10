"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { clans, WAVE_LABELS, type OriginWave } from "@/lib/clans";
import { getClanImages } from "@/lib/clanImages";

// Fixed display order for the wave filter chips — matches the chronological arrival sequence
const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

// Chip copy is richer than WAVE_LABELS (emoji + era date range) so it's kept
// separate from the grid-badge labels used elsewhere on this page.
const WAVE_CHIP_LABEL: Record<OriginWave, string> = {
  nansangwa: "🌿 Nansangwa · Indigenous",
  kintu:     "🌊 Kintu era · c.1200–1400",
  kimera:    "🏹 Kimera era · c.1370",
  later:     "📜 Later recognised",
};

export function ClanGrid() {
  const [query, setQuery] = useState("");
  const [wave, setWave]   = useState<OriginWave | "all">("all");

  // Combined filter: a clan must match the text query AND the selected wave.
  // Text search covers English name, Luganda name, the primary totem
  // (omuziro), and the Omutaka's court title (clanHead).
  const filtered = clans.filter((c) => {
    const q = query.toLowerCase();
    const matchText = (
      c.name.toLowerCase().includes(q) ||
      c.lugandaName.toLowerCase().includes(q) ||
      c.omuziro.toLowerCase().includes(q) ||
      c.clanHead.toLowerCase().includes(q)
    );
    const matchWave = wave === "all" || c.originWave === wave;
    return matchText && matchWave;
  });

  return (
    <>
      {/* Search strip — dark green, continues the header block above */}
      <div className="px-6 pt-4 pb-4" style={{ background: "var(--gd)" }}>
        <div className="max-w-[680px] mx-auto relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name, totem, or court title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-[5px] border-none text-[14px] outline-none text-white placeholder-white/40"
            style={{ background: "rgba(255,255,255,.12)" }}
          />
        </div>
      </div>

      {/* Wave filter — underline tab bar matching v3, sits below the dark header */}
      <div
        className="flex overflow-x-auto"
        style={{ background: "var(--gd)", borderTop: "1px solid rgba(255,255,255,.08)" }}
      >
        {[
          { key: "all" as const, label: `All (${clans.length})` },
          ...WAVE_ORDER.map((w) => ({ key: w, label: WAVE_CHIP_LABEL[w] })),
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setWave(key)}
            className="shrink-0 px-4 py-2.5 text-[12px] font-medium transition-all whitespace-nowrap border-b-2"
            style={{
              background:   "transparent",
              color:        wave === key ? "var(--gold2)"          : "rgba(255,255,255,.5)",
              borderColor:  wave === key ? "var(--gold2)"          : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Clan cards grid — auto-fill so columns adjust to screen width */}
      <div
        className="grid gap-3.5 px-6 py-7 max-w-[1000px] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      >
        {filtered.map((clan) => {
          const waveInfo = WAVE_LABELS[clan.originWave];
          const totemImg = getClanImages(clan.slug).totem;
          return (
            // Each card is a Link so the entire card area is clickable
            <Link key={clan.slug} href={`/clans/${clan.slug}`} className="no-underline">
              <div className="bg-white border border-eborder rounded-[6px] px-3.5 py-4 text-center cursor-pointer transition-all duration-[180ms] relative hover:-translate-y-[3px] hover:shadow-[0_2px_12px_rgba(0,0,0,.10)] hover:border-gold h-full flex flex-col">

                {/* DEEP badge — hand-curated detail page exists */}
                {clan.deep && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold bg-gold text-gd px-1.5 py-0.5 rounded-[3px]">
                    DEEP
                  </span>
                )}

                {/* Wave badge — text label in top-left, colour-coded by origin wave */}
                <span
                  className="absolute top-2 left-2 text-[8px] font-bold px-1.5 py-0.5 rounded-[3px] tracking-[.3px] uppercase"
                  style={{
                    background: waveInfo.badgeBg ?? waveInfo.color,
                    color:      waveInfo.badgeText ?? "#fff",
                  }}
                >
                  {waveInfo.shortLabel ?? waveInfo.label}
                </span>

                {/* Real totem photo where one exists; emoji for abstract totems */}
                {totemImg ? (
                  <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden mx-auto mt-4 mb-1.5 border-2 border-eborder">
                    <Image
                      src={totemImg.src}
                      alt={totemImg.alt}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-[36px] mt-4 mb-1.5 block leading-[72px]">{clan.totemEmoji}</span>
                )}
                <h3 className="text-[14px] text-gd font-semibold mb-0.5 leading-tight">{clan.name}</h3>
                {/* Luganda name in italic — v3 pattern */}
                <p className="text-[11px] text-muted italic mb-1">{clan.lugandaName}</p>
                {/* Clan head / court title in gold — v3 pattern */}
                {clan.clanHead && (
                  <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--gold)" }}>
                    {clan.clanHead}
                  </p>
                )}
                {clan.memberCount && (
                  <p className="text-[11px] text-muted mt-auto">{clan.memberCount.toLocaleString()} members</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Result count — updates live as the user types or selects a wave filter */}
      <p className="text-center text-[13px] text-muted pb-1">
        Showing {filtered.length} of {clans.length} clans
      </p>
      {/* Attribution pointer — the full per-photo credits live on each clan page */}
      <p className="text-center text-[11px] text-muted pb-5">
        Totem photos: Wikimedia Commons — photographer credits on each clan page
      </p>
    </>
  );
}
