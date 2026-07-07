import { GiveContent } from "@/components/give/GiveContent";

// /give?campaign=<id> deep-links straight to a specific project card
// (e.g. from the home page's Flagship Project section) — same searchParams
// pattern as /clans?view=bataka.
export default async function GivePage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string | string[] }>;
}) {
  const raw = (await searchParams).campaign;
  const campaign = Array.isArray(raw) ? raw[0] : raw;
  return <GiveContent initialCampaignId={campaign} />;
}
