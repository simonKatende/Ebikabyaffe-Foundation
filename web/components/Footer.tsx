export function Footer() {
  return (
    // Sits in normal document flow (not fixed) — layout.tsx uses a flex
    // column with <main> set to flex-1, so this only appears pinned to the
    // viewport bottom on short pages. That avoids the old fixed-footer bug
    // where a flat body padding had to match this footer's height exactly;
    // it broke whenever the wrapping contact line grew past that guess.
    <footer
      className="text-center border-t-[3px] border-gold px-4 py-2"
      style={{ background: "var(--gd)" }}
    >
      <p className="font-serif italic text-[11px] text-gold">
        "Okutumbula n'okusitula Ebikabyaffe" — To promote and uplift our heritage
      </p>
      <p className="text-[11px] text-white/50 mt-0.5">
        <strong className="text-gold2">847,213</strong> Baganda ·{" "}
        <strong className="text-gold2">56</strong> Clans ·{" "}
        <strong className="text-gold2">18</strong> Amasaza ·{" "}
        <strong className="text-gold2">12,847</strong> Bataka-verified · NGO
        Bureau Reg. 003/NGOB/2024
      </p>
      <p className="text-[10px] text-white/35 mt-0.5">
        ebikabyaffefoundation@gmail.com · 0788 018835 / 0776 896500 / 0753
        238696 / 0753 238734 · New Mukwano Mall, Plot 23 Kyaggwe Rd, 3rd Floor
        Suite U/G-25, P.O Box 30543, Kampala, Uganda
      </p>
    </footer>
  );
}
