"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { BusinessStatusBadge } from "@/components/businesses/BusinessStatusBadge";
import { BUSINESS_CATEGORIES, type BusinessCategory } from "@/lib/businesses/types";
import { useBusinessStore, listingForPhone, upsertListing, removeListingForPhone } from "@/lib/businesses/store";
import { readPhotoAsDataUrl, PHOTO_ACCEPT_ATTR } from "@/lib/photoUpload";
import type { Clan } from "@/lib/clans";

// ── "Advertise your business" — frontend mock ────────────────────────────────
//
// Every member gets the option to list one business or organisation against
// their account: a short description, contacts, and an optional photo (read
// straight from the chosen file as a data: URL — there's no upload backend
// yet). A listing is NOT visible in the public /businesses directory the
// moment it's posted — it first goes to the owner's clan officer (or the
// Foundation admin) in the Bataka Panel, the same people who verify clan
// membership, who may contact the owner to confirm details or ask for proof
// of business before approving it. One listing per member — posting again
// (editing) resubmits it for review (see lib/businesses/store.ts).

export function BusinessListingCard({ clan }: { clan: Clan }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const businessState = useBusinessStore();
  const listing = listingForPhone(businessState, user.phone);

  const [formOpen, setFormOpen] = useState(false);

  const [businessName, setBusinessName] = useState(listing?.businessName ?? "");
  const [category, setCategory] = useState<BusinessCategory>(listing?.category ?? "Retail & Shops");
  const [description, setDescription] = useState(listing?.description ?? "");
  const [contactPhone, setContactPhone] = useState(listing?.contactPhone ?? user.phone);
  const [contactEmail, setContactEmail] = useState(listing?.contactEmail ?? "");
  const [location, setLocation] = useState(listing?.location ?? "");
  const [photoDataUrl, setPhotoDataUrl] = useState(listing?.photoDataUrl);
  // Belt-and-braces fallback to the 🏪 placeholder if a saved listing's photo
  // (from before the format guard in lib/photoUpload.ts existed, or from a
  // browser that fails to decode it) can't actually be displayed.
  const [photoLoadFailed, setPhotoLoadFailed] = useState(false);

  const canSubmit = businessName.trim() !== "" && description.trim() !== "" && contactPhone.trim() !== "";

  // See lib/photoUpload.ts — rejects unsupported formats (e.g. iPhone HEIC
  // photos, which read fine but then fail to decode in an <img>) and
  // oversized files upfront with a clear message instead of a silent no-op.
  async function handlePhotoChange(file: File | undefined) {
    if (!file) return;
    try {
      setPhotoDataUrl(await readPhotoAsDataUrl(file));
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't read that photo — please try again.");
    }
  }

  function handleSubmit() {
    if (!canSubmit) return;
    upsertListing({
      ownerPhone: user.phone,
      ownerName: user.name,
      clanSlug: clan.slug,
      businessName: businessName.trim(),
      category,
      description: description.trim(),
      contactPhone: contactPhone.trim(),
      contactEmail: contactEmail.trim() || undefined,
      location: location.trim() || undefined,
      photoDataUrl,
    });
    setFormOpen(false);
    toast(
      `${businessName.trim()} has been submitted for review by your clan's office — you'll be notified once it's approved.`
    );
  }

  function handleRemove() {
    removeListingForPhone(user.phone);
    toast("Your business listing has been removed.");
  }

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";
  const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1";

  return (
    <Card className="mb-3.5">
      <CardHeader>
        <span className="text-[15px] text-gd font-semibold flex-1">Advertise Your Business</span>
        {listing && <BusinessStatusBadge status={listing.status} />}
      </CardHeader>
      <CardBody>
        {/* ── Not listed, form closed ── */}
        {!listing && !formOpen && (
          <>
            <p className="text-[13px] text-muted leading-relaxed mb-3">
              Would you like to advertise your business or organisation? Post
              your contacts, a photo, and a short description so fellow
              members — and your own clan — can find you. Every listing is
              reviewed by your clan&apos;s office before it goes live; they
              may contact you to confirm details or ask for proof of business.
            </p>
            <Button variant="gold" size="sm" onClick={() => setFormOpen(true)}>
              Advertise your business →
            </Button>
          </>
        )}

        {/* ── Listed, viewing ── */}
        {listing && !formOpen && (
          <>
            {/* Review-state messaging above the listing preview */}
            {listing.status === "pending" && (
              <p className="text-[13px] text-muted leading-relaxed mb-3">
                Submitted {listing.submittedAt} — awaiting review by the{" "}
                {clan.clanHead}&apos;s office.
              </p>
            )}
            {listing.status === "info_requested" && (
              <div className="bg-cream2 border border-gold/40 rounded-[6px] px-4 py-3 mb-3">
                <p className="text-[13px] text-gd leading-relaxed">
                  The {clan.clanHead}&apos;s office needs more information
                  before approving this listing:
                </p>
                <p className="text-[13px] text-gd italic mt-1">
                  &ldquo;{listing.decisionNote}&rdquo;
                </p>
                <p className="text-[11px] text-muted mt-1.5">
                  Edit your listing below to add what&apos;s been asked for,
                  then resubmit.
                </p>
              </div>
            )}
            {listing.status === "declined" && (
              <div className="bg-red-50 border border-red-200 rounded-[6px] px-4 py-3 mb-3">
                <p className="text-[13px] leading-relaxed" style={{ color: "#b03a2e" }}>
                  Declined on {listing.decidedAt}. Reason recorded:{" "}
                  {listing.decisionNote}
                </p>
                <p className="text-[11px] text-muted mt-1.5">
                  You can edit the details below and resubmit for review.
                </p>
              </div>
            )}
            {listing.status === "verified" && (
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--gm)" }}>
                ✓ Approved {listing.decidedAt} — live in the Business Owners
                directory.
              </p>
            )}

            <div className="flex items-start gap-3 mb-4">
              {listing.photoDataUrl && !photoLoadFailed ? (
                <Image
                  src={listing.photoDataUrl}
                  alt={listing.businessName}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-[6px] object-cover shrink-0 border border-eborder"
                  unoptimized
                  onError={() => setPhotoLoadFailed(true)}
                />
              ) : (
                <div className="w-16 h-16 rounded-[6px] bg-cream2 border border-eborder flex items-center justify-center text-[26px] shrink-0">
                  🏪
                </div>
              )}
              <div className="flex-1">
                <p className="text-[15px] text-gd font-semibold leading-tight">{listing.businessName}</p>
                <p className="text-[11px] text-muted mt-0.5">{listing.category}</p>
                <p className="text-[13px] text-gd mt-1.5 leading-relaxed">{listing.description}</p>
                <p className="text-[12px] text-muted mt-1.5">
                  📞 {listing.contactPhone}
                  {listing.contactEmail && <> · ✉️ {listing.contactEmail}</>}
                  {listing.location && <> · 📍 {listing.location}</>}
                </p>
              </div>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <Button variant="green" size="sm" onClick={() => setFormOpen(true)}>
                Edit listing
              </Button>
              <Button
                size="sm"
                className="bg-cream2 text-gd border border-eborder hover:bg-cream3"
                onClick={handleRemove}
              >
                Remove listing
              </Button>
            </div>
          </>
        )}

        {/* ── Form (create or edit) ── */}
        {formOpen && (
          <>
            <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <label className="block">
                <span className={labelClass}>Business / organisation name *</span>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Nabatanzi Fresh Produce"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                  className={`${inputClass} bg-white`}
                >
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block mb-3">
              <span className={labelClass}>Description *</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="What you offer, who it's for, and anything that sets it apart."
                className={`${inputClass} resize-none`}
              />
            </label>

            <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <label className="block">
                <span className={labelClass}>Contact phone *</span>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Contact email (optional)</span>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Location (optional)</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ntinda, Kampala"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Photo of your business (optional)</span>
                <input
                  type="file"
                  accept={PHOTO_ACCEPT_ATTR}
                  onChange={(e) => handlePhotoChange(e.target.files?.[0])}
                  className="w-full text-[12px] text-muted file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-cream2 file:text-gd file:text-[12px] file:cursor-pointer"
                />
              </label>
            </div>

            {photoDataUrl && (
              <div className="mb-3">
                <Image
                  src={photoDataUrl}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-[6px] object-cover border border-eborder"
                  unoptimized
                  onError={() => {
                    setPhotoDataUrl(undefined);
                    toast("That photo couldn't be displayed — please try a different one.");
                  }}
                />
              </div>
            )}

            <p className="text-[11px] text-muted leading-relaxed mb-3">
              Submitting sends this to the <strong className="text-gd">{clan.name}</strong>{" "}
              clan office for review — they may contact you at the phone
              number above to confirm details or request proof of business.
              It only appears in the public Business Owners directory once
              approved.
            </p>

            <div className="flex gap-2.5 flex-wrap">
              <Button variant="green" size="sm" onClick={handleSubmit} disabled={!canSubmit}>
                {listing ? "Resubmit for review" : "Submit for review"} →
              </Button>
              <Button
                size="sm"
                className="bg-cream2 text-gd border border-eborder hover:bg-cream3"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
