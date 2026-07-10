"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Slide {
  id: number;
  label: string;
  /** Drop-in real image path e.g. "/images/kasubi-tombs.jpg" when ready */
  src?: string;
  /** CSS background used when src is not yet provided */
  placeholder: string;
  /** In-app route this slide's caption links to (e.g. "/amasaza") */
  href?: string;
  /** Short call-to-action shown next to the caption when href is set */
  cta?: string;
  /** Photographer + licence credit (required by CC BY-SA image licences) */
  credit?: string;
}

// Each slide represents a significant Buganda landmark.
// Photos are sourced from Wikimedia Commons under CC BY-SA licences — the
// `credit` line is displayed on the slide to satisfy the attribution term.
// `href` + `cta` turn the caption into a link so slides route to their app section.
const slides: Slide[] = [
  {
    id: 1,
    label: "Kasubi Tombs — UNESCO World Heritage Site · Busiro Ssaza",
    placeholder: "linear-gradient(155deg,#0d2018 0%,#1a3d2b 50%,#0a150e 100%)",
    src: "/images/hero/kasubi-tombs.jpg",
    credit: "Photo: not not phil · Wikimedia Commons · CC BY-SA 2.0",
    href: "/abakungu",
    cta: "Explore Busiro",
  },
  {
    id: 2,
    label: "Lake Victoria (Enyanja Nalubale) — Waters of the Mmamba Clan",
    placeholder: "linear-gradient(155deg,#0d1f5c 0%,#1a3d8f 50%,#071240 100%)",
    src: "/images/hero/lake-victoria.jpg",
    credit: "Photo: Chapelle Musa · Wikimedia Commons · CC BY-SA 4.0",
    href: "/clans/mmamba",
    cta: "Meet the Mmamba",
  },
  {
    id: 3,
    label: "Ssese Islands (Sseze Ssaza) — Islands of the Gods",
    placeholder: "linear-gradient(155deg,#103828 0%,#2d6a4f 50%,#081e15 100%)",
    src: "/images/hero/ssese-islands.jpg",
    credit: "Photo: Jiame Josh · Wikimedia Commons · CC BY-SA 4.0",
    href: "/abakungu",
    cta: "Explore Ssese",
  },
  {
    id: 4,
    label: "Munyonyo — Where the Uganda Martyrs' Path Began, 1886",
    placeholder: "linear-gradient(155deg,#3d1a08 0%,#7a3810 50%,#200e04 100%)",
    src: "/images/hero/munyonyo.jpg",
    credit: "Photo: Wulman83 · Wikimedia Commons · CC BY-SA 4.0",
    href: "/clans",
    cta: "Browse the clans",
  },
  {
    id: 5,
    label: "Bulange, Mmengo — Royal Seat of the Buganda Kingdom",
    placeholder: "linear-gradient(155deg,#2b1a3d 0%,#5a3080 50%,#150a1e 100%)",
    src: "/images/hero/bulange-mengo.jpg",
    credit: "Photo: Jim Joel · Wikimedia Commons · CC BY-SA 4.0",
    href: "/abakungu",
    cta: "The 18 Amasaza",
  },
];

// How long each slide is displayed before advancing (milliseconds)
const INTERVAL = 5000;

interface HeroSliderProps {
  /** Extra overlay opacity 0-1; default 0.62 keeps text readable */
  overlayOpacity?: number;
}

export function HeroSlider({ overlayOpacity = 0.62 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Stores the X position where a touch gesture started — used to detect swipe direction
  const touchStartX = useRef<number | null>(null);

  // Stores the setInterval ID so useEffect can cancel the timer on cleanup
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Modulo wraps the index so going past the last slide loops back to slide 0
  // and going before slide 0 wraps to the last slide
  const goTo = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance timer — restarts whenever the slide or paused state changes.
  // The cleanup function prevents multiple overlapping intervals if the component re-renders.
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, paused]);

  // Touch swipe: record the starting X on touchstart, measure the delta on touchend.
  // A horizontal movement greater than 50px is treated as an intentional swipe.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    // Negative delta = swiped left → advance; positive = swiped right → go back
    if (Math.abs(delta) > 50) {
      if (delta < 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      // Pause auto-advance while the user is hovering (desktop) or swiping (mobile)
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* All slide layers are stacked on top of each other at all times.
          Only the active one has opacity: 1; the rest are invisible.
          This avoids layout shift when switching slides. */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          // aria-hidden hides inactive slides from screen readers
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {slide.src ? (
            // Real image — priority on slide 0 ensures it is preloaded
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              priority={i === 0}
              className="object-cover object-center"
            />
          ) : (
            // Placeholder gradient shown until a real photo is supplied
            <div className="absolute inset-0" style={{ background: slide.placeholder }}>
              {/* Dev-only label — very low opacity, not shown to users */}
              <span className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/20 text-[11px] tracking-widest uppercase whitespace-nowrap pointer-events-none select-none">
                📷 {slide.label}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Multi-stop gradient overlay — image breathes through at the top, text stays
          readable in the center, deep shadow anchors the bottom controls */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            `linear-gradient(to bottom,`,
            `  rgba(10,22,14,${(overlayOpacity * 0.18).toFixed(2)}) 0%,`,
            `  rgba(10,22,14,${(overlayOpacity * 0.50).toFixed(2)}) 28%,`,
            `  rgba(10,22,14,${(overlayOpacity * 0.70).toFixed(2)}) 55%,`,
            `  rgba(10,22,14,${(overlayOpacity * 1.00).toFixed(2)}) 100%`,
            `)`,
          ].join(""),
        }}
      />
      {/* Radial vignette — pulls focus inward, darkens the corners like a lens effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, transparent 25%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      {/* Prev / Next arrows — minimal, frosted-glass style */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          color: "rgba(255,255,255,0.65)",
          fontSize: 20,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)";
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)";
        }}
      >
        ←
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          color: "rgba(255,255,255,0.65)",
          fontSize: 20,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)";
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)";
        }}
      >
        →
      </button>

      {/* Photographer credit — bottom-right, required attribution for the
          CC BY-SA licensed Wikimedia Commons photos */}
      {slides[current].credit && (
        <span
          className="absolute bottom-3 right-4 z-10 text-[9px] tracking-[.5px] pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          {slides[current].credit}
        </span>
      )}

      {/* Slide caption — centred above the progress bar. When the slide has an
          href the caption becomes a link with a gold CTA so each slide routes
          to its section of the app (Amasaza, clans, deep pages). */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        {slides[current].href ? (
          <Link
            href={slides[current].href!}
            className="no-underline flex items-center gap-2.5 transition-opacity hover:opacity-100"
            style={{ opacity: 0.9 }}
          >
            <span
              className="text-[11px] tracking-[2px] uppercase"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {slides[current].label}
            </span>
            <span
              className="text-[10px] tracking-[1.5px] uppercase font-semibold whitespace-nowrap"
              style={{ color: "var(--gold2)" }}
            >
              {slides[current].cta} →
            </span>
          </Link>
        ) : (
          <span
            className="text-[11px] tracking-[2px] uppercase pointer-events-none"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {slides[current].label}
          </span>
        )}
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "rounded-full cursor-pointer transition-all duration-300",
              i === current
                ? "w-6 h-[3px] bg-gold"
                : "w-[3px] h-[3px] bg-white/35 hover:bg-white/65"
            )}
          />
        ))}
      </div>

      {/* Progress bar — resets via key each slide change */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-10" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            key={current}
            className="h-full origin-left"
            style={{
              background: "var(--gold)",
              animation: `slider-progress ${INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}
