"use client";

import { createContext, useContext, useCallback, useRef, useState } from "react";

interface ToastContextValue {
  toast: (msg: string) => void;
}

// Default value is a no-op so components that call useToast outside the provider
// silently do nothing rather than throwing.
const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  // useRef stores the timer ID so we can cancel an in-flight hide when a new
  // toast fires before the previous one has disappeared.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useCallback gives toast() a stable reference so child components that
  // receive it as a prop don't re-render every time ToastProvider re-renders.
  const toast = useCallback((message: string) => {
    setMsg(message);
    setVisible(true);
    // Cancel any previous hide timer before starting a fresh 2.8-second one
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* aria-live="polite" announces the message to screen readers without interrupting speech */}
      <div
        aria-live="polite"
        className={[
          // Fixed near the bottom of the viewport, independent of the (now
          // non-fixed, variable-height) Footer — z-[300] keeps it above everything
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-[300]",
          "bg-gd text-white border border-gold rounded-full",
          "px-5 py-3 text-[13px] whitespace-nowrap pointer-events-none",
          "transition-all duration-300",
          // Slide up into view when visible, slide down and fade out when hidden
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5",
        ].join(" ")}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
