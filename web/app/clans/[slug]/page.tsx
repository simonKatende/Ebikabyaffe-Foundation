import Link from "next/link";
import { notFound } from "next/navigation";
import { clans, getClan } from "@/lib/clans";
import { MmambaDetail } from "@/components/clans/MmambaDetail";
import { LugaveDetail } from "@/components/clans/LugaveDetail";
import { GenericClanDetail } from "@/components/clans/GenericClanDetail";

interface Props {
  // In Next.js App Router (v15+), dynamic route params are a Promise that must be awaited
  params: Promise<{ slug: string }>;
}

export default async function ClanDetailPage({ params }: Props) {
  const { slug } = await params;
  const clan = getClan(slug);

  // notFound() renders the nearest not-found.tsx (or Next.js default 404) if the slug
  // doesn't match any entry in clans.ts — avoids a blank or broken page
  if (!clan) notFound();

  return (
    <>
      {/* Back link sits above the clan detail so users can return to the full grid */}
      <Link
        href="/clans"
        className="flex items-center gap-1.5 text-muted text-[13px] px-6 py-3.5 border-b border-eborder bg-white hover:text-gd no-underline transition-colors"
      >
        ← Back to all clans
      </Link>

      {/* Mmamba and Lugave have hand-curated deep pages; all other clans use
          GenericClanDetail which auto-populates from the clans.ts data object */}
      {slug === "mmamba" ? (
        <MmambaDetail />
      ) : slug === "lugave" ? (
        <LugaveDetail />
      ) : (
        <GenericClanDetail clan={clan} />
      )}
    </>
  );
}

// Tells Next.js which slugs to pre-render at build time (static generation).
// Without this, dynamic routes would only render on request (slower first load).
export function generateStaticParams() {
  return clans.map((c) => ({ slug: c.slug }));
}
