interface SectionHeadProps {
  title: string;
  sub?: string;
  children?: React.ReactNode;
  variant?: "green" | "royal";
}

export function SectionHead({
  title,
  sub,
  children,
  variant = "green",
}: SectionHeadProps) {
  // Royal blue is used for Amasaza section; dark green (gd) is the default for all other pages
  const bg = variant === "royal" ? "var(--royal)" : "var(--gd)";
  return (
    <div
      className="px-6 py-9 text-center"
      style={{ background: bg }}
    >
      <h2 className="font-serif text-[28px] text-white font-normal mb-1.5">
        {title}
      </h2>
      {sub && <p className="text-[14px] text-white/60">{sub}</p>}
      {children}
    </div>
  );
}
