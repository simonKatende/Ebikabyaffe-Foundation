// ── Mock "who has an account" registry ───────────────────────────────────────
//
// The app has no backend yet, so there is nowhere real to check whether a
// phone number already belongs to a member. This is a module-level store
// (same pattern as lib/batakaPanel/store.ts) that remembers phone → name for
// accounts created THIS session — enough to power the "this number already
// has an account" / "sign in without retyping your name" UX in LoginFlow.
// It resets on a hard reload, same as the rest of the app's mocked state.
// In Phase 2 this file gets replaced by a real lookup against the backend.

const registeredPhones = new Map<string, string>();

export function isPhoneRegistered(phone: string): boolean {
  return registeredPhones.has(phone);
}

export function getRegisteredName(phone: string): string | null {
  return registeredPhones.get(phone) ?? null;
}

export function registerPhone(phone: string, name: string): void {
  registeredPhones.set(phone, name);
}
