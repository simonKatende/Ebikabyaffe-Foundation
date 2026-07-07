"use client";

import { useState } from "react";
import Link from "next/link";
import { clans, Clan } from "@/lib/clans";
import {
  getBatakaStatus,
  batakaNotes,
  BATAKA_STATUS_META,
  type BatakaStatus,
} from "@/lib/bataka";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// Bataka view of the Clans tab (/clans?view=bataka) — the Council of Clan
// Heads. The grid is led by the OMUTAKA TITLES themselves (Nnamwama, Gabunga,
// Walusimbi…), not the clan names: each card is a Mutaka card that expands on
// click to show the current holder (or documented status), seat, totems, and
// the office's history — populated from "The Bataka of Buganda — Clan Heads
// of the 56 Ebika" compilation. The section head + view switcher are rendered
// by app/clans/page.tsx.
export function BatakaContent() {
  const { toast } = useToast();
  const [query, setQuery]   = useState("");
  const [status, setStatus] = useState<BatakaStatus | "all">("all");

  // Status counts drive the filter-chip labels
  const confirmed = clans.filter((c) => getBatakaStatus(c.slug) === "confirmed").length;
  const disputed  = clans.filter((c) => getBatakaStatus(c.slug) === "disputed").length;
  const remaining = clans.length - confirmed - disputed;

  // Sort the grid alphabetically by TITLE — this view is about the offices
  const byTitle = [...clans].sort((a, b) => a.clanHead.localeCompare(b.clanHead));

  // Combined filter: title/clan/totem text match AND documentation status
  const filtered = byTitle.filter((c) => {
    const q = query.toLowerCase();
    const matchText = (
      c.clanHead.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.lugandaName.toLowerCase().includes(q) ||
      c.omuziro.toLowerCase().includes(q)
    );
    const matchStatus = status === "all" || getBatakaStatus(c.slug) === status;
    return matchText && matchStatus;
  });

  return (
    <>
      {/* Search strip — dark green, mirrors the Ebika view's search */}
      <div className="px-6 pt-4 pb-4" style={{ background: "var(--gd)" }}>
        <div className="max-w-[680px] mx-auto relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title, clan, or totem…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-[5px] border-none text-[14px] outline-none text-white placeholder-white/40"
            style={{ background: "rgba(255,255,255,.12)" }}
          />
        </div>
      </div>

      {/* Status filter — this view's counterpart to the Ebika wave chips */}
      <div
        className="flex overflow-x-auto"
        style={{ background: "var(--gd)", borderTop: "1px solid rgba(255,255,255,.08)" }}
      >
        {[
          { key: "all" as const,         label: `All (${clans.length})` },
          { key: "confirmed" as const,   label: `✓ Confirmed holders (${confirmed})` },
          { key: "disputed" as const,    label: `⚠ Disputed / vacant (${disputed})` },
          { key: "unconfirmed" as const, label: `◌ Being documented (${remaining})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setStatus(key)}
            className="shrink-0 px-4 py-2.5 text-[12px] font-medium transition-all whitespace-nowrap border-b-2"
            style={{
              background:  "transparent",
              color:       status === key ? "var(--gold2)" : "rgba(255,255,255,.5)",
              borderColor: status === key ? "var(--gold2)" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-7">

        {/* ── Kingdom hierarchy — royal card for Kingdom-level context ── */}
        <div
          className="relative overflow-hidden rounded-[6px] p-6 mb-7 border-2 border-gold"
          style={{ background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)" }}
        >
          <span
            aria-hidden="true"
            className="absolute right-5 bottom-4 text-[48px] opacity-[.15] pointer-events-none select-none"
          >
            👑
          </span>
          <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-3">
            How the Bataka fit in the Kingdom
          </p>

          {/* Descending hierarchy — each level indents to visualise rank */}
          <div className="flex flex-col gap-1.5 mb-4">
            {[
              ["Ssaabasajja Kabaka", "Ronald Muwenda Mutebi II — as Ssabataka, 'chief of the Bataka', the monarchy sits atop the older clan structure it draws legitimacy from"],
              ["Katikkiro of Buganda", "Owek. Charles Peter Mayiga — the Kingdom's prime minister at Mmengo"],
              ["Olukiiko lw'Abataka", "The Council of Clan Heads — guardians of ennono (tradition), clan lands and succession"],
              ["56 Abataka b'Obusolya", "One hereditary titleholder per clan, each at the top of his clan's Akasolya ('roof')"],
            ].map(([title, desc], i) => (
              <div
                key={title}
                className="flex items-start gap-3"
                style={{ marginLeft: i * 16 }}
              >
                <span className="text-gold2 text-[12px] mt-0.5 shrink-0">
                  {i === 0 ? "◆" : "└"}
                </span>
                <p className="text-[13px] text-white/85 leading-snug">
                  <strong className="text-gold2">{title}</strong>
                  <span className="text-white/60"> — {desc}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-white/55 leading-relaxed">
            An Omutaka&apos;s authority is personal and follows clan membership
            wherever members live — unlike a Ssaza chief, whose authority is
            territorial. Bataka preside over marriages, disputes and
            successions within their clan, carry fixed ceremonial duties at a
            new Kabaka&apos;s coronation, and safeguard the clan&apos;s totems,
            praise verse and burial customs.
          </p>
        </div>

        {/* ── The Mutaka grid ── */}
        <div
          className="flex items-baseline justify-between flex-wrap gap-2 mb-3 pb-2"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3 className="font-serif text-[18px] text-gd font-normal">
            The 56 Abataka — by title
          </h3>
          <span className="text-[11px] text-muted">
            Showing {filtered.length} of {clans.length} titles · tap a title
          </span>
        </div>

        <div
          className="grid gap-2.5 mb-8 items-start"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
        >
          {filtered.map((c) => (
            <MutakaCard key={c.slug} clan={c} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[13px] text-muted mb-8">
            No titles match — try a different spelling or clear the filter.
          </p>
        )}

        {/* ── Verification CTA ── */}
        <div
          className="rounded-[6px] p-6 text-center"
          style={{ background: "var(--gd)" }}
        >
          <h3 className="font-serif text-[20px] text-white font-normal mb-2">
            Get Bataka-verified.
          </h3>
          <p className="text-[14px] text-white/70 mb-4 leading-relaxed max-w-[520px] mx-auto">
            Verification links your Foundation profile to your clan&apos;s
            Omutaka. <strong className="text-gold2">12,847 members</strong>{" "}
            are already Bataka-verified — unlocking priority registration at
            clan gatherings and a voice in clan affairs.
          </p>
          <Button
            variant="primary"
            onClick={() => toast("Bataka verification opens at launch!")}
          >
            Start verification →
          </Button>
        </div>
      </div>
    </>
  );
}

// ── MutakaCard ────────────────────────────────────────────────────────────────
// Collapsed: the hereditary TITLE (the star of this page), clan subline, and a
// documentation-status badge. Expanded on click: current holder or status,
// seat, totems, office history, and a link through to the clan page.
function MutakaCard({ clan: c }: { clan: Clan }) {
  const [open, setOpen] = useState(false);
  const status = getBatakaStatus(c.slug);
  const meta = BATAKA_STATUS_META[status];
  const note = batakaNotes[c.slug];

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      role="button"
      aria-expanded={open}
      className={[
        "bg-white border border-eborder rounded-[6px] p-3.5 cursor-pointer transition-all duration-150",
        open
          ? "border-gold shadow-[0_2px_12px_rgba(0,0,0,.10)]"
          : "hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(0,0,0,.10)] hover:border-gold",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        {/* The hereditary title leads — gold serif, largest element on the card */}
        <div className="font-serif text-[19px] text-gold leading-tight">
          {c.clanHead}
        </div>
        <span
          className="text-gold text-[13px] shrink-0 mt-1 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          ▾
        </span>
      </div>

      <p className={`text-[12px] text-muted mt-0.5 ${status === "confirmed" && c.currentHead ? "" : "mb-2"}`}>
        Omutaka of the {c.name} clan {c.totemEmoji}
      </p>

      {/* Current holder's name — shown up front on the collapsed card, not
          hidden behind a click, for every clan where the Bataka compilation
          names a confirmed titleholder. */}
      {status === "confirmed" && c.currentHead && (
        <p className="text-[13px] text-gd font-semibold mt-1 mb-2 flex items-center gap-1.5">
          <span aria-hidden="true">👤</span> {c.currentHead}
        </p>
      )}

      {/* Documentation-status badge (per the Bataka compilation) */}
      <span
        className="inline-block text-[9.5px] font-bold px-2 py-0.5 rounded tracking-[.5px] uppercase"
        style={{ background: meta.bg, color: meta.text }}
      >
        {meta.label}
      </span>

      {open ? (
        <div
          className="mt-3 pt-3"
          style={{ borderTop: "1px solid var(--border)" }}
          // Stop the inner link click from toggling the card closed
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-1 mb-2.5">
            <Fact
              label="Current Omutaka"
              value={
                status === "confirmed"
                  ? c.currentHead ?? c.clanHead
                  : status === "disputed"
                  ? "Disputed / vacant — see note below"
                  : "Not yet independently confirmed"
              }
            />
            {c.obutaka && <Fact label="Seat (Obutaka)" value={c.obutaka} />}
            <Fact label="Clan totem (Omuziro)" value={c.omuziro} />
            {c.akabbiro && <Fact label="Akabbiro" value={c.akabbiro} />}
          </div>

          {note && (
            <p className="text-[12px] text-muted leading-relaxed mb-2.5">
              {note}
            </p>
          )}

          <Link
            href={`/clans/${c.slug}`}
            className="text-[11px] text-royal2 font-semibold uppercase tracking-[.5px] no-underline hover:underline"
          >
            Visit the {c.name} clan page →
          </Link>
        </div>
      ) : (
        <div className="text-[10px] text-royal2 mt-2 tracking-[.5px] uppercase">
          Tap for this Mutaka →
        </div>
      )}
    </div>
  );
}

// Fact: small label + value row used inside the expanded Mutaka card
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[12px] leading-snug">
      <span className="text-[10px] text-muted uppercase tracking-[.5px] mr-1.5">
        {label}
      </span>
      <span className="text-gd font-medium">{value}</span>
    </p>
  );
}
