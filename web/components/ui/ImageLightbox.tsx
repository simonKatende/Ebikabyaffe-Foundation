"use client";

import { useEffect } from "react";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
  label?: string;  // e.g. "Omuziro · Ffumbe — African civet"
  credit?: string; // photographer credit — keep visible (CC licenses)
}

function historyHasLightboxEntry() {
  return (window.history.state as { lightbox?: boolean } | null)?.lightbox === true;
}

// Full-screen photo viewer. Closes on backdrop click, the × button, Esc, or
// the phone's back button/gesture.
// z-[400] sits above the Nav (z-100) and the Toast (z-300).
export function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  // Push a history entry when the lightbox opens so a mobile back
  // press/gesture closes it instead of navigating off the page underneath.
  // Guarded by history.state (rather than popping unconditionally in the
  // cleanup) so React StrictMode's dev-only mount→cleanup→mount double
  // -invoke of this effect can't fire a stray popstate that closes the
  // lightbox the instant it opens for real.
  useEffect(() => {
    if (!historyHasLightboxEntry()) {
      window.history.pushState({ lightbox: true }, "");
    }
    const onPopState = () => onClose();
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [onClose]);

  // Used by the × button, backdrop click, and Esc. If we're the ones who
  // pushed the history entry, close via a real back navigation so it
  // consumes that entry (a later back press then leaves the page as
  // expected, instead of landing on a dead entry); otherwise close directly.
  const requestClose = () => {
    if (historyHasLightboxEntry()) {
      window.history.back();
    } else {
      onClose();
    }
  };

  // Esc-to-close + lock page scroll while open. Locked via position:fixed
  // (not overflow:hidden) — this app's `html, body { height: 100% }` rule
  // means toggling overflow:hidden on body collapses its scrollable content
  // to exactly one viewport, snapping window.scrollY to 0 the instant any
  // lightbox opened. position:fixed + a negative top offset keeps the
  // underlying page visually frozen in place without losing that position.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);

    const scrollY = window.scrollY;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      // Force a synchronous reflow so the browser recomputes the page's
      // scrollable height before restoring scrollY — otherwise scrollTo can
      // clamp against the still-stale (zero) extent from a moment ago.
      void document.body.offsetHeight;
      window.scrollTo(0, scrollY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.9)" }}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        onClick={requestClose}
        aria-label="Close photo"
        className="absolute top-3 right-5 text-white/70 text-[32px] leading-none hover:text-white transition-colors"
      >
        ×
      </button>

      {/* stopPropagation so tapping the photo itself doesn't close it */}
      <div
        className="relative w-full max-w-[900px] flex-1 max-h-[76vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>

      <div className="mt-3 text-center max-w-[640px]" onClick={(e) => e.stopPropagation()}>
        {image.label && (
          <p className="text-[14px] text-white font-medium">{image.label}</p>
        )}
        <p className="text-[12px] text-white/60 mt-0.5">
          {image.alt}
          {image.credit ? ` · Photo: ${image.credit}` : ""}
        </p>
      </div>
    </div>
  );
}
