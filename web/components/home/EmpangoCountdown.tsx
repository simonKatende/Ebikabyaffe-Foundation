"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

// Calculates how much time remains until the next Empango (31 July each year).
// Returns zeros if the date has already passed.
function getTimeLeft() {
  const empango = new Date("2026-07-31T00:00:00");
  const diff = empango.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
  return {
    // Integer division by the number of milliseconds in each unit
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  };
}

export function EmpangoCountdown() {
  // Initialise with a function reference so getTimeLeft() runs once on mount,
  // not on every render during the useState initialisation phase.
  const [time, setTime] = useState(getTimeLeft);
  const { toast } = useToast();

  // Refresh the countdown every 60 seconds.
  // The cleanup function cancels the interval when the component unmounts.
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-[6px] p-5 mb-3.5 border-2 border-gold"
      style={{
        background: "linear-gradient(135deg,var(--royal) 0%,#0d2660 100%)",
      }}
    >
      {/* Crown watermark — purely decorative, hidden from screen readers */}
      <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-[52px] opacity-[.18] pointer-events-none select-none">
        👑
      </span>

      <p className="text-[10px] tracking-[2px] text-gold2 uppercase mb-2">
        Upcoming Kingdom Event · {time.days} days away
      </p>
      <h3 className="font-serif text-[18px] text-white font-normal mb-1">
        Empango — 33rd Coronation Anniversary
      </h3>
      <p className="text-[13px] text-white/65 mb-3.5 leading-relaxed">
        Kabaka Ronald Muwenda Mutebi II, the 36th Kabaka of Buganda, was
        enthroned on 31 July 1993 at Naggalabi. The Empango ceremony marks
        this historic day annually.
      </p>

      {/* Countdown units — rendered from an array so adding a "Seconds" unit
          is a one-line change in the array */}
      <div className="flex gap-3 mb-3.5">
        {[
          { num: time.days,  lbl: "Days"  },
          { num: time.hours, lbl: "Hours" },
          { num: time.mins,  lbl: "Mins"  },
        ].map(({ num, lbl }) => (
          <div
            key={lbl}
            className="text-center bg-white/10 border border-white/15 rounded-[5px] px-3 py-2"
          >
            <span className="block font-serif text-[24px] text-gold2 leading-none">
              {num}
            </span>
            <span className="block text-[10px] text-white/50 tracking-[.5px] mt-0.5">
              {lbl}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant="gold"
        size="sm"
        onClick={() => toast("You're signed up for Empango 2026 updates!")}
      >
        Get Empango updates →
      </Button>
    </div>
  );
}
