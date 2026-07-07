"use client";

import { useState } from "react";
import { amasaza, Ssaza } from "@/lib/clans";

// The 18-county grid. Each card shows the county name, chief title and modern
// district(s); clicking a card expands it in place to reveal the traditional
// headquarters, how the territory entered Buganda, and its county history —
// all condensed from "The Amasaza of Buganda: A County-by-County History".
export function AmasazaGrid() {
  return (
    <div
      className="grid gap-3 px-6 py-6 max-w-[1000px] mx-auto items-start"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
    >
      {amasaza.map((s) => (
        <SsazaCard key={s.num} ssaza={s} />
      ))}
    </div>
  );
}

// SsazaCard: collapsed = number, name, chief, districts + a "tap for history"
// hint. Expanded = headquarters, acquisition and the full history paragraph.
function SsazaCard({ ssaza: s }: { ssaza: Ssaza }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      role="button"
      aria-expanded={open}
      className={[
        "bg-white border border-eborder rounded-[6px] p-4 cursor-pointer transition-all duration-150",
        open
          ? "border-royal2 shadow-[0_2px_12px_rgba(0,0,0,.10)]"
          : "hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(0,0,0,.10)] hover:border-royal2",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-[10px] font-bold text-royal2 tracking-[1px] uppercase mb-1">
          Ssaza {s.num}
        </div>
        {/* Chevron flips when the card is open */}
        <span
          className="text-gold text-[13px] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          ▾
        </span>
      </div>
      <h3 className="font-serif text-[15px] font-normal text-gd mb-0.5">
        {s.name}
      </h3>
      <div className="text-[12px] text-gold font-semibold mb-0.5">
        Saza Chief: {s.chief}
      </div>
      <div className="text-[11px] text-muted">{s.note}</div>

      {open ? (
        <div
          className="mt-3 pt-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Quick facts — headquarters + how the county entered Buganda */}
          <div className="flex flex-col gap-1 mb-2.5">
            <p className="text-[11.5px]">
              <span className="text-[10px] text-muted uppercase tracking-[.5px] mr-1.5">
                Headquarters
              </span>
              <span className="text-gd font-semibold">{s.headquarters}</span>
            </p>
            <p className="text-[11.5px]">
              <span className="text-[10px] text-muted uppercase tracking-[.5px] mr-1.5">
                How acquired
              </span>
              <span className="text-gd">{s.acquired}</span>
            </p>
          </div>
          <p className="text-[12px] text-muted leading-relaxed">{s.history}</p>
        </div>
      ) : (
        <div className="text-[10px] text-royal2 mt-2 tracking-[.5px] uppercase">
          Tap for history →
        </div>
      )}
    </div>
  );
}
