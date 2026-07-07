"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";

const MMAMBA_TOTEM: LightboxImage = {
  src: "/images/totems/mmamba.jpg",
  alt: "Marbled lungfish",
  label: "Omuziro · Mmamba — lungfish",
  credit: "George Berninger Jr. · CC BY-SA 4.0",
};

// Mmamba is the only clan with a fully hand-curated deep page.
// All other clans use GenericClanDetail which is data-driven from clans.ts.
export function MmambaDetail() {
  const { toast } = useToast();
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  return (
    <>
      {/* Hero */}
      <div
        className="px-6 py-10 text-center border-b-4 border-gold"
        style={{ background: "var(--gd)" }}
      >
        {/* Real omuziro photo — the marbled lungfish (credit is load-bearing, CC BY-SA).
            Tapping the photo opens it full-screen. */}
        <button
          type="button"
          onClick={() => setLightbox(MMAMBA_TOTEM)}
          aria-label="View photo of marbled lungfish full-screen"
          className="relative block w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-2 border-[3px] border-gold cursor-zoom-in transition-transform hover:scale-[1.04]"
        >
          <Image
            src={MMAMBA_TOTEM.src}
            alt={MMAMBA_TOTEM.alt}
            fill
            sizes="120px"
            priority
            className="object-cover"
          />
        </button>
        <p className="text-[10px] text-white/40 mb-3">
          Photo: George Berninger Jr. · CC BY-SA 4.0 · Wikimedia Commons
        </p>
        <h1 className="font-serif text-[32px] text-white font-normal mb-1.5">
          Mmamba
        </h1>
        <p className="text-[14px] text-white/55 mb-4">
          The Lungfish Clan · Ekika kya Mmamba
        </p>
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-[12px] text-white/80 mb-3">
          <strong className="text-gold2">23,481</strong> registered members ·
          1,204 Bataka-verified
        </div>
        <br />
        {/* Court title badge — displayed prominently because Gabunga is one of the most
            significant hereditary titles in the Buganda Kingdom */}
        <span className="inline-block bg-gold text-gd text-[11px] font-bold px-3.5 py-1.5 rounded-[3px] tracking-[1px] uppercase mt-3">
          ⚓ Gabunga — Admiral of the Royal Navy of Buganda
        </span>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-7">

        {/* Info chips — rendered from an array for consistent pill styling */}
        <div className="flex gap-2.5 flex-wrap mb-6">
          {[
            { label: "Omuziro (Primary totem)",    val: "🐟 Lungfish — Mmamba"     },
            // Akabbiro was incorrectly "Ndiga (sheep)" in older data — corrected to Muguya
            { label: "Akabbiro (Secondary totem)", val: "🐊 Muguya"                },
            { label: "Royal Court Title",          val: "⚓ Gabunga"               },
            { label: "Curated with",               val: "Office of the Ssabataka"  },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="bg-white border border-eborder rounded-full px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <span className="block text-[10px] text-muted uppercase tracking-[.5px]">
                {label}
              </span>
              <span className="text-[13px] text-gd">{val}</span>
            </div>
          ))}
        </div>

        {/* Royal navy card — royal blue gradient reserved for Kingdom court distinctions */}
        <div
          className="relative overflow-hidden rounded-[6px] p-5 mb-7 border border-gold"
          style={{ background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)" }}
        >
          <span aria-hidden="true" className="absolute right-4 bottom-3 text-[40px] opacity-[.18] pointer-events-none select-none">
            ⚓
          </span>
          <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-2">
            Royal Court Distinction · Kingdom of Buganda
          </p>
          <h4 className="font-serif text-[17px] text-white font-normal mb-2">
            The Gabunga — Admiral of the Royal Navy
          </h4>
          <p className="text-[13px] text-white/70 leading-relaxed">
            The Mmamba clan holds the hereditary court title of{" "}
            <strong className="text-gold2">Gabunga</strong> — the Admiral of
            the Kabaka's royal navy on Lake Victoria. This title, passed down
            through the Mmamba lineage, made the clan the commanding force of
            the Kingdom's fleet. The Gabunga commanded the royal canoes
            (Enyanja), protected the King's waterways, and controlled trade and
            movement across Lake Victoria and the Sese Islands — making the
            Mmamba clan one of the most strategically significant clans in
            Buganda's history.
          </p>
        </div>

        <Section title="Origin Story">
          <p>
            The Mmamba clan is one of the oldest and most distinguished of the
            56 Buganda clans. According to oral tradition, the Mmamba trace
            their origins to Kintu, the first Kabaka of Buganda, through the
            lineage of Nambi. The lungfish — which can survive both in water
            and on land, and endure long dry seasons buried in the earth —
            became the clan's totem as a symbol of resilience, adaptability,
            and enduring life.
          </p>
          <p className="mt-2.5">
            The Mmamba are historically associated with the shores of Lake
            Victoria and the Sese Islands (Sseze Ssaza), where the lungfish is
            found in abundance. As the clan of the Gabunga, the Mmamba
            commanded Lake Victoria — the Kingdom's most vital waterway.
          </p>
        </Section>

        {/* Sacred sites rendered from an array — same pattern used throughout the deep page */}
        <Section title="Sacred Sites">
          <div className="flex flex-col gap-2">
            {[
              {
                icon: "🌊",
                name: "Lake Victoria shores (Enyanja Nalubale)",
                desc: "The ancestral waters of the Mmamba clan. As the Gabunga commanded the royal fleet here, Lake Victoria holds a central place in Mmamba identity, history, and spiritual practice.",
              },
              {
                icon: "🏝️",
                name: "Ssese Islands (Sseze Ssaza)",
                desc: "The Ssese Islands — under Saza Chief Kweba — are the homeland of Mmamba warriors and navigators. The Nkerebwe siga traces its roots here, and the lungfish abounds in its surrounding waters.",
              },
              {
                icon: "🌿",
                name: "Munyonyo",
                desc: "A historic gathering place for the Mmamba clan on the shores of Lake Victoria in Kampala. The annual Mmamba clan assembly is held here, presided over by Ssabataka Ndiwalana.",
              },
              {
                icon: "🏛️",
                name: "Kasubi Tombs (Amasiro ga Abakabaka) — UNESCO",
                desc: "The royal burial grounds of the Kabakas of Buganda in Busiro Ssaza. As a clan with deep royal court connections, the Mmamba have served as guardians across generations. A UNESCO World Heritage Site.",
              },
            ].map(({ icon, name, desc }) => (
              <div
                key={name}
                className="flex gap-2.5 items-start bg-white border border-eborder rounded-[5px] p-3.5"
              >
                <span className="text-[20px] shrink-0 mt-0.5">{icon}</span>
                <div>
                  <h4 className="text-[14px] text-gd mb-1">{name}</h4>
                  <p className="text-[12px] text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Amasiga placeholder — Mmamba branches are being compiled with the Gabunga's office */}
        <Section title="Amasiga (Major Branches)">
          <div className="bg-gold3 border border-gold/30 rounded-[5px] p-4 mb-3">
            <p className="text-[13px] text-gd leading-relaxed">
              The Mmamba clan&apos;s Amasiga (major branch list) is currently being compiled
              in consultation with the Gabunga&apos;s office and the Olukiiko lw&apos;Abataka.
              Members who know their specific Essiga within the Mmamba clan are
              encouraged to contact the Foundation — your knowledge helps build the
              registry.
            </p>
          </div>
          <p className="text-[12px] text-muted leading-relaxed">
            The Mmamba clan spans the Lake Victoria shoreline, the Sese Islands (Sseze Ssaza),
            Munyonyo, and parts of Mawokota, Kyaggwe, and Buddu. Branches are organised
            under the Gabunga&apos;s jurisdiction across these regions.
          </p>
        </Section>

        <Section title="Omutaka">
          <div className="flex gap-4 items-start bg-white border border-eborder rounded-[6px] p-4">
            <div className="w-[52px] h-[52px] rounded-full bg-gd flex items-center justify-center text-[22px] shrink-0">
              👴
            </div>
            <div>
              <h4 className="text-[15px] text-gd mb-0.5">
                Ssabataka Hannington Ndiwalana
              </h4>
              <p className="text-[12px] text-muted mb-1.5">
                Omutaka of the Mmamba Clan · Serving since 2008 · Member,
                Olukiiko lw'Abataka
              </p>
              <p className="text-[13px]">
                Ssabataka Ndiwalana has led the Mmamba clan for over 16 years,
                presiding over annual clan gatherings at Munyonyo and
                representing Mmamba interests in the Buganda Lukiiko. He
                upholds the Gabunga heritage traditions and works closely with
                the Foundation on the Mmamba heritage programme.
              </p>
            </div>
          </div>
        </Section>

        {/* Taboos list — rendered from an array; each taboo is a list item with a gold marker */}
        <Section title="Taboos (Mizizo)">
          <ul className="flex flex-col gap-1.5">
            {[
              "A Mmamba may not eat the lungfish (omuziro)",
              "A Mmamba may not eat Muguya (akabbiro)",
              "A Mmamba may not kill or mistreat a lungfish; if one is found on land it must be returned to water",
              "A Mmamba may not marry another Mmamba — exogamy is strictly observed",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-[14px] px-3 py-2 rounded bg-cream2"
              >
                <span className="text-gold text-[12px]">⚑</span>
                {t}
              </li>
            ))}
          </ul>
        </Section>

        {/* Join CTA */}
        <div
          className="rounded-[6px] p-6 text-center mt-7"
          style={{ background: "var(--gd)" }}
        >
          <h3 className="font-serif text-[20px] text-white font-normal mb-2">
            This is your clan.
          </h3>
          <p className="text-[14px] text-white/70 mb-4 leading-relaxed">
            Save your profile to learn more, get notified by your Omutaka, and
            join <strong className="text-gold2">23,481 Mmamba</strong> already
            here. Sign up in under 60 seconds.
          </p>
          <Button
            variant="primary"
            onClick={() => toast("Sign-up coming at launch!")}
          >
            Save your clan →
          </Button>
        </div>
      </div>

      {lightbox && <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

// Section: reusable titled block with a ruled bottom border on the heading
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
