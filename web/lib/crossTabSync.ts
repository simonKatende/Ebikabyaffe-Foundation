"use client";

// ── Cross-tab sync for this app's session-only mock stores ───────────────────
//
// Every mock store in this app (lib/batakaPanel/store.ts, lib/businesses/
// store.ts, lib/stats.ts, lib/auth/registry.ts) is a plain module-level
// variable with no backend behind it. By default that means each browser TAB
// gets its own independent copy: a member registering or posting a business
// listing in one tab is invisible in another tab until a real backend exists.
//
// This is a deliberate, lightweight stopgap (2026-08, chosen over waiting for
// the already-scaffolded Supabase backend to be wired up) — NOT real
// persistence. It only shares data between tabs of the SAME browser via
// localStorage + the native `storage` event; a hard browser restart,
// clearing site data, incognito, or a different browser/device still starts
// fresh from seed data, exactly as before.
//
// What deliberately does NOT sync: which identity/role is signed in on a
// given tab (AuthContext's current user, the Bataka Panel's PanelSession).
// Those stay per-tab on purpose — the whole point is being able to stay
// signed in as a member in one tab while another tab is signed in as the
// clan officer or Foundation admin, watching the member's actions land live.

const PREFIX = "ebikabyaffe:sync:";

function storageKey(name: string): string {
  return `${PREFIX}${name}`;
}

// Broadcasts a value under `name` so other already-open tabs can pick it up.
// Best-effort — a quota error or serialization failure here should never
// break the mock action that triggered it.
export function saveSynced<T>(name: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(name), JSON.stringify(value));
  } catch {
    // ignore — sync is a nice-to-have, not a requirement
  }
}

// Reads whatever the last-broadcast value for `name` is, or undefined if
// nothing has been synced yet (or it fails to parse).
export function readSynced<T>(name: string): T | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(storageKey(name));
    return raw == null ? undefined : (JSON.parse(raw) as T);
  } catch {
    return undefined;
  }
}

// Fires `cb` whenever ANOTHER tab calls saveSynced() for this same `name`.
// The native `storage` event only ever fires in tabs OTHER than the one that
// made the write, so there's no risk of a tab reacting to its own change.
export function onExternalSyncChange(name: string, cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const key = storageKey(name);
  function handler(e: StorageEvent) {
    if (e.key === key) cb();
  }
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

// Wraps a useSyncExternalStore-based store's own `subscribe` function so
// that, in addition to its normal local behavior:
//  1. The moment anything subscribes, it catches up with whatever another
//     tab last broadcast for `name`. This is timing-safe for SSR/hydration:
//     React only ever calls a store's `subscribe` AFTER the first commit
//     (never during the render that produces the initial/hydrated output),
//     so applying a different value here cannot cause a hydration mismatch —
//     unlike reading localStorage at module-init time would.
//  2. From then on, live writes from other tabs apply immediately via the
//     `storage` event, with no need to re-subscribe or reload.
// `apply(value)` must overwrite the store's local state and notify its own
// listeners WITHOUT calling saveSynced again — that would just re-broadcast
// a value another tab already sent, which is harmless but pointless.
export function withCrossTabSync<T>(
  name: string,
  baseSubscribe: (listener: () => void) => () => void,
  apply: (value: T) => void
): (listener: () => void) => () => void {
  let liveWired = false;

  return (listener: () => void) => {
    const unsubscribe = baseSubscribe(listener);

    const synced = readSynced<T>(name);
    if (synced !== undefined) apply(synced);

    if (!liveWired) {
      liveWired = true;
      onExternalSyncChange(name, () => {
        const value = readSynced<T>(name);
        if (value !== undefined) apply(value);
      });
    }

    return unsubscribe;
  };
}
