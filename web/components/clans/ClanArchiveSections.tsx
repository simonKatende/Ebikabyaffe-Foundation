import { getClanAmasiga } from "@/lib/clanAmasiga";
import { getOmubala, OMUBALA_SOURCES } from "@/lib/emibala";

// ── Archive-driven sections shared by the clan detail pages ──────────────────
//
// Layout follows the Lugave deep page (LugaveLineageExplorer / the Lugave
// omubala card): serif section heading with a ruled border, a short intro
// line, and a vertical stack of white bordered cards. These components render
// nothing when the clan has no entry in the respective registry, so callers
// can keep their own fallbacks.

// Amasiga section — one card per Essiga, from lib/clanAmasiga.ts
export function AmasigaArchiveSection({ slug }: { slug: string }) {
  const entry = getClanAmasiga(slug);
  if (!entry) return null;

  return (
    <div className="mb-8">
      <h3
        className="font-serif text-[18px] text-gd font-normal mb-1 pb-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {entry.archiveHeading} — {entry.amasiga.length} Documented Branches
      </h3>
      <p className="text-[12.5px] text-muted leading-relaxed mb-3">
        As recorded in the clan registry of Amasiga, in the archive&apos;s own
        order and spellings. A living record — branches still being reconciled
        are noted as such.
      </p>
      {entry.note && (
        <p className="text-[12px] text-muted italic leading-relaxed mb-3">
          {entry.note}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {entry.amasiga.map((ssiga, i) => (
          <div
            key={`${ssiga.name}-${i}`}
            className="bg-white border border-eborder rounded-[6px] px-4 py-3"
          >
            <p className="text-[14.5px] text-gd font-semibold leading-snug">
              Essiga lya {ssiga.name}
            </p>
            {ssiga.seat && (
              <p className="text-[11.5px] text-muted mt-0.5">{ssiga.seat}</p>
            )}
            {ssiga.head && (
              <p className="text-[12px] text-gd leading-relaxed mt-1.5">
                <strong>Omukulu w&apos;essiga:</strong> {ssiga.head}
              </p>
            )}
            {ssiga.note && (
              <p className="text-[11.5px] text-muted italic leading-relaxed mt-1">
                {ssiga.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Omubala section — the clan praise verse / drum slogan, from lib/emibala.ts.
// `fallback` is the legacy clans.ts omubala string, rendered (unsourced) only
// when the reference document has no captured text for this clan.
export function OmubalaSection({
  slug,
  fallback,
}: {
  slug: string;
  fallback?: string;
}) {
  const entry = getOmubala(slug);
  if (!entry && !fallback) return null;

  return (
    <div className="mb-7">
      <h3
        className="font-serif text-[18px] text-gd font-normal mb-3 pb-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        Omubala — The Clan Praise Verse (Drum Slogan)
      </h3>
      {entry ? (
        <>
          {entry.status === "none-by-tradition" ? (
            <p className="text-[14px] text-gd leading-relaxed bg-cream2 rounded px-3.5 py-3">
              {entry.text}
            </p>
          ) : (
            <blockquote className="border-l-4 border-gold pl-4 py-1 italic text-[15px] text-gd leading-relaxed font-serif">
              &ldquo;{entry.text}&rdquo;
            </blockquote>
          )}
          {entry.status === "partial" && (
            <p className="text-[11.5px] text-muted italic leading-relaxed mt-2.5">
              ⚠ Partial record — only a fragment or a single secondary source
              has been found; to be verified with the clan authority before
              formal use.
            </p>
          )}
          {entry.note && (
            <p className="text-[11.5px] text-muted leading-relaxed mt-1.5">
              {entry.note}
            </p>
          )}
          {entry.source && (
            <p className="text-[10.5px] text-muted mt-1.5">
              Source:{" "}
              {entry.source
                .split(" / ")
                .map((tag) => OMUBALA_SOURCES[tag] ?? tag)
                .join(" · ")}
            </p>
          )}
        </>
      ) : (
        <blockquote className="border-l-4 border-gold pl-4 py-1 italic text-[15px] text-gd leading-relaxed font-serif">
          &ldquo;{fallback}&rdquo;
        </blockquote>
      )}
    </div>
  );
}
