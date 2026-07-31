import type { BusinessListing } from "./types";

// ── Seeded sample listings for the directory demo ───────────────────────────
//
// A small, fixed set of fictional example businesses (none are real — same
// rule as lib/batakaPanel/mockMembers.ts) so /businesses isn't empty before
// any real member has posted. No photoDataUrl on any seed entry — only a
// real member's own upload should ever appear as a "photo" of a business.
// Five are pre-verified so the public directory has content; one is left
// "pending" so the Bataka Panel's business-review queue isn't empty either.

export function seedBusinesses(): BusinessListing[] {
  return [
    {
      id: "seed-1",
      ownerPhone: "+256772000001",
      ownerName: "Grace Nabatanzi",
      clanSlug: "mmamba",
      businessName: "Nabatanzi Fresh Produce",
      category: "Retail & Shops",
      description:
        "Fresh fruit, vegetables and household essentials, wholesale and retail. Delivery available across Kampala.",
      contactPhone: "+256 772 000 001",
      location: "Nakawa Market, Kampala",
      status: "verified",
      submittedAt: "02 Jun 2026",
      decidedAt: "04 Jun 2026",
    },
    {
      id: "seed-2",
      ownerPhone: "+256772000002",
      ownerName: "Moses Ssentongo",
      clanSlug: "ngeye",
      businessName: "Ssentongo Builders",
      category: "Construction & Real Estate",
      description:
        "Residential construction, renovations, and plot supervision for clients building in Uganda from the diaspora.",
      contactPhone: "+256 772 000 002",
      contactEmail: "ssentongobuilders@example.com",
      location: "Mukono",
      status: "verified",
      submittedAt: "10 Jun 2026",
      decidedAt: "12 Jun 2026",
    },
    {
      id: "seed-3",
      ownerPhone: "+256772000003",
      ownerName: "Ruth Namuli",
      clanSlug: "lugave",
      businessName: "Namuli Catering & Events",
      category: "Food & Catering",
      description:
        "Traditional Kiganda cuisine for clan gatherings, weddings, and introductions (kwanjula). Buffet and plated service.",
      contactPhone: "+256 772 000 003",
      location: "Ntinda, Kampala",
      status: "verified",
      submittedAt: "01 Jul 2026",
      decidedAt: "03 Jul 2026",
    },
    {
      id: "seed-4",
      ownerPhone: "+256772000004",
      ownerName: "Samuel Kizza",
      clanSlug: "njovu",
      businessName: "Kizza Transport Services",
      category: "Transport & Logistics",
      description:
        "Airport transfers, upcountry hire, and cargo transport. Serving diaspora visitors and local clients alike.",
      contactPhone: "+256 772 000 004",
      location: "Entebbe",
      status: "verified",
      submittedAt: "05 Jul 2026",
      decidedAt: "07 Jul 2026",
    },
    {
      id: "seed-5",
      ownerPhone: "+256772000005",
      ownerName: "Betty Nakintu",
      clanSlug: "mpindi",
      businessName: "Nakintu Tutoring Centre",
      category: "Education & Training",
      description:
        "After-school tutoring in mathematics and English for primary and secondary students, plus adult literacy classes.",
      contactPhone: "+256 772 000 005",
      location: "Kikyusa, Luwero",
      status: "verified",
      submittedAt: "10 Jul 2026",
      decidedAt: "12 Jul 2026",
    },
    {
      id: "seed-6",
      ownerPhone: "+256772000006",
      ownerName: "Henry Mukasa",
      clanSlug: "mmamba",
      businessName: "Mukasa Motor Spares",
      category: "Retail & Shops",
      description:
        "Genuine and after-market spare parts for Japanese and European vehicles, with fitting service on-site.",
      contactPhone: "+256 772 000 006",
      location: "Kisekka Market, Kampala",
      status: "pending",
      submittedAt: "20 Jul 2026",
    },
  ];
}
