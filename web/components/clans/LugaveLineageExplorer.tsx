"use client";

import { useState } from "react";
import {
  AMASIGA,
  EMITUBA_EMIRANGIRA,
  type Mutuba,
  type Ssiga,
} from "@/lib/lugaveLineage";

// ── Interactive lineage explorer for the Lugave deep page ────────────────────
//
// Three drill-down levels, matching the clan's own structure:
//   Essiga (17)  →  click to reveal its Emituba  →  click a Mutuba to reveal
//   its Ennyiriri. The 6 royal Emituba Emirangira of the Akasolya get the
//   same treatment (two levels) in a second section.
//
// All data comes from lib/lugaveLineage.ts (extracted from the clan's 2021
// archive) — this component owns no lineage facts of its own.

export function LugaveLineageExplorer() {
  return (
    <>
      {/* ── The 17 Amasiga ── */}
      <div className="mb-8">
        <h3
          className="font-serif text-[18px] text-gd font-normal mb-1 pb-2"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          Amasiga — the {AMASIGA.length} Documented Branches
        </h3>
        <p className="text-[12.5px] text-muted leading-relaxed mb-3">
          Tap an essiga to see its emituba, then tap a mutuba to see the
          ennyiriri (family lines) recorded under it — as documented in the
          clan&apos;s 2021 archive. A living record: lines still being
          reconciled are noted as such.
        </p>
        <div className="flex flex-col gap-2">
          {AMASIGA.map((ssiga) => (
            <SsigaCard key={ssiga.name} ssiga={ssiga} />
          ))}
        </div>
      </div>

      {/* ── The 6 royal Emituba Emirangira ── */}
      <div className="mb-8">
        <h3
          className="font-serif text-[18px] text-gd font-normal mb-1 pb-2"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          Emituba Emirangira — the {EMITUBA_EMIRANGIRA.length} Royal
          Sub-lineages
        </h3>
        <p className="text-[12.5px] text-muted leading-relaxed mb-3">
          The royal mituba of the Akasolya carry the blood of Ssimwogerere
          Mulangwa (Ndugwa II) — only these six may produce a Ndugwa, the Clan
          Head. Tap one to see its ennyiriri.
        </p>
        <div className="flex flex-col gap-2">
          {EMITUBA_EMIRANGIRA.map((mutuba) => (
            <MutubaRow key={mutuba.name} mutuba={mutuba} royal />
          ))}
        </div>
      </div>
    </>
  );
}

// One essiga card: header (name + seat + mutuba count) toggles the list of
// its emituba open/closed.
function SsigaCard({ ssiga }: { ssiga: Ssiga }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-eborder rounded-[6px] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 text-left px-4 py-3 bg-transparent border-0 cursor-pointer hover:bg-cream2 transition-colors"
      >
        <span className="flex-1 min-w-0">
          <span className="block text-[14.5px] text-gd font-semibold leading-snug">
            Essiga lya {ssiga.name}
          </span>
          <span className="block text-[11.5px] text-muted mt-0.5">
            {ssiga.seat}
          </span>
        </span>
        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold3 text-gd tracking-[.5px]">
          {ssiga.emituba.length} EMITUBA
        </span>
        <span
          className="text-gold text-[13px] shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3" style={{ borderTop: "1px solid var(--border)" }}>
          {ssiga.head && (
            <p className="text-[12px] text-gd leading-relaxed mt-2.5 px-1">
              <strong>Owessiga:</strong> {ssiga.head}
            </p>
          )}
          {ssiga.note && (
            <p className="text-[12px] text-muted leading-relaxed mt-1.5 px-1">
              {ssiga.note}
            </p>
          )}
          <div className="flex flex-col gap-1.5 mt-2.5">
            {ssiga.emituba.map((mutuba) => (
              <MutubaRow key={mutuba.name} mutuba={mutuba} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// One mutuba row: header toggles its ennyiriri list. Used both nested inside
// a SsigaCard and standalone for the royal Emituba Emirangira section.
function MutubaRow({ mutuba, royal = false }: { mutuba: Mutuba; royal?: boolean }) {
  const [open, setOpen] = useState(false);
  const count = mutuba.ennyiriri.length;

  return (
    <div
      className={`rounded-[5px] overflow-hidden border ${
        royal ? "bg-white border-gold/50" : "bg-cream2 border-eborder"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-2.5 text-left px-3 py-2.5 bg-transparent border-0 cursor-pointer hover:bg-gold3/40 transition-colors"
      >
        <span className="flex-1 min-w-0">
          <span className="block text-[13px] text-gd font-semibold leading-snug">
            {royal && (
              <span aria-hidden="true" className="mr-1">
                👑
              </span>
            )}
            Omutuba gwa {mutuba.name}
          </span>
          {mutuba.seat && (
            <span className="block text-[11px] text-muted mt-0.5">
              {mutuba.seat}
            </span>
          )}
        </span>
        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-white border border-eborder text-muted">
          {count > 0
            ? `${count} ${count === 1 ? "lunnyiriri" : "ennyiriri"}`
            : "no ennyiriri listed"}
        </span>
        <span
          className="text-gold text-[12px] shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="px-3 pb-2.5" style={{ borderTop: "1px solid var(--border)" }}>
          {mutuba.note && (
            <p className="text-[11.5px] text-muted leading-relaxed mt-2 px-0.5 italic">
              {mutuba.note}
            </p>
          )}
          {count > 0 ? (
            <ul className="flex flex-col gap-1 mt-2">
              {mutuba.ennyiriri.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-[12.5px] text-gd leading-snug px-2.5 py-1.5 rounded bg-white border border-eborder"
                >
                  <span className="text-gold text-[10px] mt-0.5" aria-hidden="true">
                    ⚑
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          ) : (
            !mutuba.note && (
              <p className="text-[11.5px] text-muted leading-relaxed mt-2 px-0.5 italic">
                The clan archive does not yet itemise ennyiriri for this
                mutuba — a living record.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
