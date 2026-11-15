import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HierarchyLevel = {
  title: string;
  desc: ReactNode;
};

// A connected vertical trunk for the Kingdom-hierarchy royal cards (Abakungu,
// Bataka, Kisekwa) — each level links to the next with a short arrow instead
// of indenting, and the apex level (by default the first, pass `apexIndex`
// for a ladder that reads bottom-up to the Kabaka) is picked out in gold.
export function HierarchyChain({
  levels,
  apexIndex = 0,
  className,
}: {
  levels: HierarchyLevel[];
  apexIndex?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-stretch", className)}>
      {levels.map((level, i) => (
        <div key={level.title}>
          {i > 0 && (
            <div className="relative w-0.5 h-5 mx-auto bg-white/25">
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] block"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "6px solid rgba(255,255,255,.35)",
                }}
              />
            </div>
          )}
          <div
            className={cn(
              "rounded-[8px] px-4 py-3 border",
              i === apexIndex
                ? "bg-gold/10 border-gold/40"
                : "bg-white/5 border-white/10"
            )}
          >
            <p
              className={cn(
                "text-[13px] font-semibold leading-snug",
                i === apexIndex ? "text-gold" : "text-gold2"
              )}
            >
              {level.title}
            </p>
            <p className="text-[12.5px] text-white/60 leading-snug mt-1">
              {level.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
