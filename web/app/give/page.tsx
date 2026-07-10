import { GiveContent } from "@/components/give/GiveContent";

// /give?campaign=<id> deep-links straight to a specific project card
// (e.g. from the home page's Flagship Project section) — same searchParams
// pattern as /clans?view=bataka.
// /give?campaign=sacco&option=<key> goes further and pre-selects a Sacco
// option (membership fee / share / donation) so the user lands on the
// payment step with what they're contributing to already chosen.
export default async function GivePage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string | string[]; option?: string | string[] }>;
}) {
  const params = await searchParams;
  const campaign = Array.isArray(params.campaign) ? params.campaign[0] : params.campaign;
  const option = Array.isArray(params.option) ? params.option[0] : params.option;
  return <GiveContent initialCampaignId={campaign} initialSaccoOption={option} />;
}
