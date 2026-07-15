"use client";

import { useState } from "react";
import Image from "next/image";
import { Clan, WAVE_LABELS } from "@/lib/clans";
import { getClanImages, type TotemImage } from "@/lib/clanImages";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";

export function GenericClanDetail({ clan }: { clan: Clan }) {
  const { toast } = useToast();
  // Look up the wave display metadata (label, sub-heading, colour) for this clan
  const wave = WAVE_LABELS[clan.originWave];
  // Real totem photos (omuziro + akabbiro) — absent for abstract totems
  const images = getClanImages(clan.slug);
  // Tap any totem photo to view it full-screen
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  return (
    <>
      {/* Hero — dark green with gold border; always rendered */}
      <div
        className="px-6 py-10 text-center border-b-4 border-gold"
        style={{ background: "var(--gd)" }}
      >
        {/* Real totem photo where one exists; emoji only for abstract totems.
            Tapping the photo opens it full-screen. */}
        {images.totem ? (
          <button
            type="button"
            onClick={() =>
              setLightbox({ ...images.totem!, label: `Omuziro · ${clan.omuziro}` })
            }
            aria-label={`View photo of ${images.totem.alt} full-screen`}
            className="relative block w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-3 border-[3px] border-gold cursor-zoom-in transition-transform hover:scale-[1.04]"
          >
            <Image
              src={images.totem.src}
              alt={images.totem.alt}
              fill
              sizes="120px"
              priority
              className="object-cover"
            />
          </button>
        ) : (
          <span className="text-[72px] mb-3 block">{clan.totemEmoji}</span>
        )}
        <h1 className="font-serif text-[32px] text-white font-normal mb-1.5">
          {clan.name}
        </h1>
        <p className="text-[14px] text-white/55 mb-4">{clan.lugandaName}</p>

        {/* Info chips — memberCount is optional so wrapped in a conditional */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-1">
          {clan.memberCount && (
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-[12px] text-white/80">
              <strong className="text-gold2">{clan.memberCount}</strong> registered members
            </div>
          )}
          {/* Wave badge — colour dot matches the clan grid dot for visual consistency */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
            style={{ background: "rgba(255,255,255,.12)", color: "var(--gold2)" }}
          >
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: wave.color }} />
            {wave.label} · {wave.sub}
          </div>
        </div>

        {/* Court role badge — only shown if this clan holds a hereditary Kingdom title */}
        {clan.courtRole && (
          <div className="mt-4">
            <span className="inline-block bg-gold text-gd text-[11px] font-bold px-3.5 py-1.5 rounded-[3px] tracking-[1px] uppercase">
              ⚑ {clan.clanHead} — Royal Court Title
            </span>
          </div>
        )}

        {/* Join CTA — registration is the site's primary goal, so the invite
            sits at the top of every clan page (the fuller card at the bottom
            of the page remains as the second prompt) */}
        <div className="mt-5">
          <Button
            variant="primary"
            onClick={() => toast("Sign-up coming at launch!")}
          >
            Join the {clan.name} clan →
          </Button>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-7">

        {/* Info chips row — all optional fields guarded with conditional rendering */}
        <div className="flex gap-2.5 flex-wrap mb-6">
          <Chip label="Omuziro (Primary totem)" val={`${clan.totemEmoji} ${clan.omuziro}`} />
          {clan.akabbiro && (
            <Chip label="Akabbiro (Secondary totem)" val={clan.akabbiro} />
          )}
          <Chip label="Clan head title" val={clan.clanHead} />
          {clan.obutaka && (
            <Chip label="Obutaka (Ancestral seat)" val={clan.obutaka} />
          )}
        </div>

        {/* Totem gallery — the omuziro (and akabbiro where it's a species) in
            real life. Credit captions are load-bearing (CC licenses). */}
        {(images.totem || images.akabbiro) && (
          <Section title="The Totems — Omuziro & Akabbiro">
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
            >
              {images.totem && (
                <TotemFigure
                  label={`Omuziro · ${clan.omuziro}`}
                  image={images.totem}
                  onOpen={() => setLightbox({ ...images.totem!, label: `Omuziro · ${clan.omuziro}` })}
                />
              )}
              {images.akabbiro && clan.akabbiro && (
                <TotemFigure
                  label={`Akabbiro · ${clan.akabbiro}`}
                  image={images.akabbiro}
                  onOpen={() => setLightbox({ ...images.akabbiro!, label: `Akabbiro · ${clan.akabbiro}` })}
                />
              )}
            </div>
          </Section>
        )}

        {/* Royal court card — only clans with a courtRole field get this section */}
        {clan.courtRole && (
          <div
            className="relative overflow-hidden rounded-[6px] p-5 mb-7 border border-gold"
            style={{ background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)" }}
          >
            <span aria-hidden="true" className="absolute right-4 bottom-3 text-[40px] opacity-[.18] pointer-events-none select-none">
              ⚑
            </span>
            <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-2">
              Royal Court Distinction · Kingdom of Buganda
            </p>
            <h4 className="font-serif text-[17px] text-white font-normal mb-2">
              {clan.clanHead}
            </h4>
            <p className="text-[13px] text-white/70 leading-relaxed">
              {clan.courtRole}
            </p>
          </div>
        )}

        {/* Clan motto (Omubala) — only rendered if the clan has a documented motto */}
        {clan.omubala && (
          <Section title="Omubala (Clan Motto)">
            <blockquote className="border-l-4 border-gold pl-4 py-1 italic text-[15px] text-gd leading-relaxed font-serif">
              &ldquo;{clan.omubala}&rdquo;
            </blockquote>
          </Section>
        )}

        {/* Taboos — every clan has at least two: don't eat the omuziro, don't marry same clan */}
        <Section title="Omuziro & Taboos">
          <ul className="flex flex-col gap-1.5">
            <li className="flex items-start gap-2 text-[14px] px-3 py-2 rounded bg-cream2">
              <span className="text-gold text-[12px] mt-0.5">⚑</span>
              <span>A {clan.name} member may not eat the {clan.omuziro} (Omuziro)</span>
            </li>
            {/* Akabbiro taboo only shown if the clan has a secondary totem */}
            {clan.akabbiro && (
              <li className="flex items-start gap-2 text-[14px] px-3 py-2 rounded bg-cream2">
                <span className="text-gold text-[12px] mt-0.5">⚑</span>
                <span>A {clan.name} member may not eat {clan.akabbiro} (Akabbiro)</span>
              </li>
            )}
            <li className="flex items-start gap-2 text-[14px] px-3 py-2 rounded bg-cream2">
              <span className="text-gold text-[12px] mt-0.5">⚑</span>
              <span>A {clan.name} member may not marry another {clan.name} — clan exogamy is strictly observed</span>
            </li>
          </ul>
        </Section>

        {/* Amasiga (branches) — show documented list if available; otherwise show placeholder */}
        {clan.amasiga && clan.amasiga.length > 0 ? (
          <Section title={`Amasiga — ${clan.amasiga.length} Documented Branches`}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
              {clan.amasiga.map(({ elder, seat }) => (
                <div
                  key={elder}
                  className="bg-white border border-eborder rounded-[5px] px-3.5 py-3"
                >
                  <h4 className="text-[13px] text-gd font-semibold mb-0.5">{elder}</h4>
                  <p className="text-[11px] text-muted">{seat}</p>
                </div>
              ))}
            </div>
          </Section>
        ) : (
          // Graceful "being compiled" notice — the Foundation will update these as data is gathered
          <Section title="Amasiga (Major Branches)">
            <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4">
              <p className="text-[13px] text-gd leading-relaxed">
                The {clan.name} clan&apos;s Amasiga are being compiled in consultation with
                the {clan.clanHead}&apos;s office. If you know your specific Essiga, contact
                the Foundation — your knowledge helps build the registry.
              </p>
            </div>
          </Section>
        )}

        {/* Omutaka section — uses currentHead if documented, falls back to title placeholder */}
        <Section title="Omutaka (Clan Head)">
          <div className="flex gap-4 items-start bg-white border border-eborder rounded-[6px] p-4">
            <div className="w-[52px] h-[52px] rounded-full bg-gd flex items-center justify-center text-[22px] shrink-0">
              👴
            </div>
            <div>
              <h4 className="text-[15px] text-gd mb-0.5">
                {/* Shows the named current holder if documented; otherwise uses the title itself */}
                {clan.currentHead ?? `${clan.clanHead} (Current holder)`}
              </h4>
              <p className="text-[12px] text-muted mb-1.5">
                Omutaka of the {clan.name} Clan · Hereditary title: {clan.clanHead}
                {clan.obutaka ? ` · Seat at ${clan.obutaka}` : ""}
              </p>
              <p className="text-[13px] text-muted leading-relaxed">
                The {clan.clanHead} oversees the welfare of all {clan.name} clan members,
                presides over clan gatherings, and represents the clan in the
                Olukiiko lw&apos;Abataka.
              </p>
            </div>
          </div>
        </Section>

        {/* Call to action — prompts the user to save and verify their clan membership */}
        <div
          className="rounded-[6px] p-6 text-center mt-7"
          style={{ background: "var(--gd)" }}
        >
          <h3 className="font-serif text-[20px] text-white font-normal mb-2">
            This is your clan.
          </h3>
          <p className="text-[14px] text-white/70 mb-4 leading-relaxed">
            Join the Foundation to trace your roots, connect with your Omutaka,
            and get verified by Bataka.
          </p>
          <Button
            variant="primary"
            onClick={() => toast("Sign-up coming at launch!")}
          >
            Join your clan →
          </Button>
        </div>
      </div>

      {lightbox && <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

// ── Local helper components ───────────────────────────────────────────────────

// TotemFigure: photo card with the totem label + photographer credit caption.
// The photo itself is a button so tapping it opens the full-screen lightbox.
function TotemFigure({
  label,
  image,
  onOpen,
}: {
  label: string;
  image: TotemImage;
  onOpen: () => void;
}) {
  return (
    <figure className="bg-white border border-eborder rounded-[6px] overflow-hidden">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View photo of ${image.alt} full-screen`}
        className="relative block w-full aspect-[4/3] cursor-zoom-in"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover"
        />
      </button>
      <figcaption className="px-3.5 py-2.5">
        <p className="text-[12px] text-gd font-semibold">{label}</p>
        <p className="text-[10.5px] text-muted mt-0.5">
          {image.alt} · Photo: {image.credit}
        </p>
      </figcaption>
    </figure>
  );
}

// Chip: pill-shaped label+value pair used in the info row below the hero
function Chip({ label, val }: { label: string; val: string }) {
  return (
    <div className="bg-white border border-eborder rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
      <span className="block text-[10px] text-muted uppercase tracking-[.5px]">{label}</span>
      <span className="text-[13px] text-gd">{val}</span>
    </div>
  );
}

// Section: titled content block with a bottom border under the heading
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3
        className="font-serif text-[18px] text-gd font-normal mb-3 pb-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
