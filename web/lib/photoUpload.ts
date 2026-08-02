"use client";

import { createClient } from "@/lib/supabase/client";

// ── Shared "upload a chosen photo" helper ────────────────────────────────────
//
// Used by ProfileContent.tsx (profile picture) and BusinessListingCard.tsx
// (business photo) — uploads to the shared public "member-media" Storage
// bucket (see the phase-3 migration) and returns the object's public URL.
// Browsers can't decode every "image/*" the OS file picker will offer —
// HEIC/HEIF (the default photo format on most iPhones) is the common one
// that reads fine as a file but then fails to actually decode in an <img>,
// leaving a blank avatar with no explanation. Reject unsupported formats
// and oversized files upfront with a clear message instead of a silent
// no-op or a broken-looking upload.

export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB — generous, but not unbounded
export const PHOTO_ACCEPT_ATTR = SUPPORTED_IMAGE_TYPES.join(",");

function validationError(file: File): string | null {
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return "That photo format isn't supported here — please use a JPEG, PNG, WEBP, or GIF.";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "That photo is too large (max 8MB) — please choose a smaller one.";
  }
  return null;
}

// `path` is a fixed, owner-scoped key with NO file extension (e.g.
// "avatars/{userId}/photo" or "businesses/{ownerId}/photo") — deliberately
// so a re-upload in a different format always overwrites the same object
// instead of leaving an orphaned file under a different extension.
// Storage RLS (member_media_owner_insert/update) requires the path's
// second segment to equal the caller's own auth.uid(), so `path` must be
// built from the signed-in member's real id.
export async function uploadPhoto(file: File, path: string): Promise<string> {
  const error = validationError(file);
  if (error) throw new Error(error);

  const supabase = createClient();
  const { error: uploadError } = await supabase.storage
    .from("member-media")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (uploadError) {
    throw new Error("Couldn't upload that photo — please try again.");
  }

  const { data } = supabase.storage.from("member-media").getPublicUrl(path);
  // Cache-bust: the path is fixed per owner, so a re-upload keeps the same
  // URL and a browser/CDN would otherwise keep showing the old cached image.
  return `${data.publicUrl}?v=${Date.now()}`;
}
