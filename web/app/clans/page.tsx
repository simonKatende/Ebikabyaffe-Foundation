import { SectionHead } from "@/components/ui/SectionHead";
import { ClanGrid } from "@/components/clans/ClanGrid";
import { ClanViewTabs } from "@/components/clans/ClanViewTabs";
import { BatakaContent } from "@/components/bataka/BatakaContent";
import { KisekwaContent } from "@/components/kisekwa/KisekwaContent";

// /clans — the 56-clan encyclopedia, three views over the same 56 records:
//   /clans               → Ebika view: totem-led clan grid ("find my clan")
//   /clans?view=bataka   → Bataka view: title-led Mutaka cards (the Council)
//   /clans?view=kisekwa  → Kooti ya Kisekwa: the traditional Court of Clans
// The Amasaza (counties) view that used to live here as a sub-tab now has its
// own top-level route at /amasaza.
export default async function ClansPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const view = (await searchParams).view;

  if (view === "bataka") {
    return (
      <>
        <SectionHead
          title="Olukiiko lw'Abataka · The Bataka of Buganda"
          sub="Each clan is headed by an Omutaka holding a hereditary title — like Kabaka, the title names the office, not the person. Together they form the Council of Clan Heads under the Ssabataka."
        />
        <ClanViewTabs active="bataka" />
        <BatakaContent />
      </>
    );
  }

  if (view === "kisekwa") {
    return (
      <>
        <SectionHead
          title="Kooti ya Kisekwa · The Court of Clans"
          sub="Buganda's apex traditional court for contested clan headships, succession, and Obutaka disputes — sitting at Bulange, Mengo."
        />
        <ClanViewTabs active="kisekwa" />
        <KisekwaContent />
      </>
    );
  }

  return (
    <>
      <SectionHead
        title="The 56 Clans of Buganda"
        sub="Every Muganda belongs to one. Discover yours."
      />
      <ClanViewTabs active="clans" />
      <ClanGrid />
    </>
  );
}
