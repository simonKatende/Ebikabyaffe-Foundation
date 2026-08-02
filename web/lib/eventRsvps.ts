"use client";

import { createClient } from "@/lib/supabase/client";

// ── Real RSVP / event-updates-signup tracking ────────────────────────────────
//
// Backs the "RSVP — I'll attend" (Parliament land-law meeting) and "Get
// Empango updates" buttons on the home dashboard — both record a real row
// instead of just showing a toast. See the migration for schema/RLS.
// `eventKey` is a stable slug for whichever hardcoded event card is calling
// this; events themselves aren't database rows.

export async function hasRsvped(profileId: string, eventKey: string): Promise<boolean> {
  const { data } = await createClient()
    .from("event_rsvps")
    .select("id")
    .eq("profile_id", profileId)
    .eq("event_key", eventKey)
    .maybeSingle();
  return Boolean(data);
}

export async function recordRsvp(
  profileId: string,
  eventKey: string,
  email: string
): Promise<{ error?: string }> {
  const { error } = await createClient()
    .from("event_rsvps")
    .upsert(
      { profile_id: profileId, event_key: eventKey, email: email || null },
      { onConflict: "profile_id,event_key", ignoreDuplicates: true }
    );
  // A unique-violation on a genuine double-click race isn't a real error —
  // the RSVP already exists either way.
  if (error && error.code !== "23505") {
    return { error: "Something went wrong — please try again." };
  }
  return {};
}
