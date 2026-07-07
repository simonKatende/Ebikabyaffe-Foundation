"use client";

import { useEffect } from "react";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
  label?: string;  // e.g. "Omuziro · Ffumbe — African civet"
  credit?: string; // photographer credit — keep visible (CC licenses)
}

// Full-screen photo viewer. Closes on backdrop click, the × button, or Esc.
// z-[400] sits above the Nav (z-100) and the Toast (z-300).
export function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  // Esc-to-close + lock page scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.9)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        onClick={onClose}
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
