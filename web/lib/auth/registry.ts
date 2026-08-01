"use client";

import { saveSynced, readSynced, onExternalSyncChange } from "@/lib/crossTabSync";

// ── Mock "who has an account" registry ───────────────────────────────────────
//
// The app has no backend yet, so there is nowhere real to check whether a
// phone number already belongs to a member. This is a module-level store
// (same pattern as lib/batakaPanel/store.ts) that remembers phone → name for
// accounts created THIS session. Keys are canonical E.164 strings
// ("+256772345678", "+447911123456") — LoginFlow normalises every typed
// number before touching this map, so one phone = one account across formats — enough to power the "this number already
// has an account" / "sign in without retyping your name" UX in LoginFlow.
// It resets on a hard reload, same as the rest of the app's mocked state.
// In Phase 2 this file gets replaced by a real lookup against the backend.
//
// Cross-tab sync (2026-08, see lib/crossTabSync.ts): a registration in one
// tab is recognized as "already registered" in another tab's /login without
// a reload. Maps aren't JSON-serializable, so entries are broadcast as a
// plain [phone, name][] array and merged back into the Map on each read.

const SYNC_NAME = "auth-registry";

const registeredPhones = new Map<string, string>();

function mergeFromStorage() {
  const entries = readSynced<[string, string][]>(SYNC_NAME);
  if (!entries) return;
  for (const [phone, name] of entries) registeredPhones.set(phone, name);
}

if (typeof window !== "undefined") {
  onExternalSyncChange(SYNC_NAME, mergeFromStorage);
}

export function isPhoneRegistered(phone: string): boolean {
  mergeFromStorage();
  return registeredPhones.has(phone);
}

export function getRegisteredName(phone: string): string | null {
  mergeFromStorage();
  return registeredPhones.get(phone) ?? null;
}

export function registerPhone(phone: string, name: string): void {
  registeredPhones.set(phone, name);
  saveSynced(SYNC_NAME, Array.from(registeredPhones.entries()));
}
