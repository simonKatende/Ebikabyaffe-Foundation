// ── Shared "read a chosen photo as a data: URL" helper ───────────────────────
//
// Used by ProfileContent.tsx (profile picture) and BusinessListingCard.tsx
// (business photo) — there's no upload backend yet, so both just read the
// file straight into a data: URL client-side. Browsers can't decode every
// "image/*" the OS file picker will offer — HEIC/HEIF (the default photo
// format on most iPhones) is the common one that reads into a data: URL just
// fine but then fails to actually decode in an <img>, leaving a blank avatar
// with no explanation. Reject unsupported formats and oversized files
// upfront with a clear message instead of a silent no-op.

export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB — generous, but not unbounded
export const PHOTO_ACCEPT_ATTR = SUPPORTED_IMAGE_TYPES.join(",");

export function readPhotoAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      reject(new Error("That photo format isn't supported here — please use a JPEG, PNG, WEBP, or GIF."));
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      reject(new Error("That photo is too large (max 8MB) — please choose a smaller one."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Couldn't read that photo — please try again."));
    reader.readAsDataURL(file);
  });
}
