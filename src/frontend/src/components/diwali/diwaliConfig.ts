/**
 * Diwali 2026 fireworks — configuration and eligibility logic.
 *
 * This module is intentionally tiny and dependency-free: it is part of the
 * main bundle so the homepage can decide (with a single date comparison)
 * whether the lazily-loaded animation chunk should be fetched at all.
 *
 * See ./README.md for preview mode, emergency disable and rollback.
 */

/** Emergency switch. Set to `false` and redeploy to disable the feature. */
export const DIWALI_ANIMATION_ENABLED = true;

/** IST is a fixed UTC+05:30 offset (India observes no daylight saving). */
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

/** 8 Nov 2026 00:00:00 IST (inclusive) === 7 Nov 2026 18:30:00 UTC. */
export const DIWALI_START_MS = Date.UTC(2026, 10, 7, 18, 30, 0);

/** 11 Nov 2026 00:00:00 IST (exclusive) === 10 Nov 2026 18:30:00 UTC. */
export const DIWALI_END_MS = Date.UTC(2026, 10, 10, 18, 30, 0);

/** Versioned, namespaced key so it can never collide with other storage. */
export const DIWALI_STORAGE_KEY =
  "riknova:diwali-fireworks-2026:v1:lastShownIstDate";

/** True when `nowMs` falls inside the festival window (timezone-independent). */
export function isWithinFestivalWindow(nowMs: number): boolean {
  return nowMs >= DIWALI_START_MS && nowMs < DIWALI_END_MS;
}

/** The IST calendar date for an instant, formatted `YYYY-MM-DD`. */
export function getIstDateKey(nowMs: number): string {
  return new Date(nowMs + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** Minimal storage shape so the logic can be unit-tested without a browser. */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** In-memory fallback for when both localStorage and sessionStorage fail. */
let memoryLastShown: string | null = null;

function safeStores(): KeyValueStore[] {
  const stores: KeyValueStore[] = [];
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      stores.push(window.localStorage);
    }
  } catch {
    // Access itself can throw (blocked cookies / sandboxed iframes).
  }
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      stores.push(window.sessionStorage);
    }
  } catch {
    // Ignore — fall through to in-memory.
  }
  return stores;
}

/**
 * Reads the last IST date the animation started. Never throws.
 * Returns the most recent date across all stores and the in-memory fallback,
 * so a stale value in one store cannot hide a newer fallback write.
 * (`YYYY-MM-DD` strings sort chronologically.)
 */
export function readLastShown(
  stores: KeyValueStore[] = safeStores(),
): string | null {
  let latest = memoryLastShown;
  for (const store of stores) {
    try {
      const value = store.getItem(DIWALI_STORAGE_KEY);
      if (value && (latest === null || value > latest)) latest = value;
    } catch {
      // Try the next store.
    }
  }
  return latest;
}

/** Records that the animation started on `istDate`. Never throws. */
export function writeLastShown(
  istDate: string,
  stores: KeyValueStore[] = safeStores(),
): void {
  memoryLastShown = istDate;
  for (const store of stores) {
    try {
      store.setItem(DIWALI_STORAGE_KEY, istDate);
      return; // Persisted in the most durable store available.
    } catch {
      // Quota exceeded / private mode — try the next store.
    }
  }
}

/** Test helper: resets the in-memory fallback. */
export function __resetMemoryForTests(): void {
  memoryLastShown = null;
}

/**
 * Production eligibility: feature enabled, inside the IST festival window,
 * and not yet shown on the current IST calendar day.
 */
export function isEligible(
  nowMs: number,
  lastShown: string | null,
  enabled: boolean = DIWALI_ANIMATION_ENABLED,
): boolean {
  if (!enabled) return false;
  if (!isWithinFestivalWindow(nowMs)) return false;
  return lastShown !== getIstDateKey(nowMs);
}

/** Development-only preview options (always inert in production builds). */
export interface DiwaliPreview {
  /** Force the animation regardless of date and last-shown state. */
  force: boolean;
  /** Force the reduced-motion (static greeting) variant. */
  reduced: boolean;
  /** Simulated "now" (epoch ms) for boundary testing, if provided. */
  nowMs: number | null;
}

const NO_PREVIEW: DiwaliPreview = { force: false, reduced: false, nowMs: null };

/**
 * Parses dev preview URL parameters. `import.meta.env.DEV` is replaced with
 * `false` by Vite in production builds, so this whole branch is dead code on
 * the live website and no URL parameter can affect production behaviour.
 */
export function getDevPreview(): DiwaliPreview {
  if (!import.meta.env.DEV) return NO_PREVIEW;
  try {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("diwali-preview");
    const nowParam = params.get("diwali-now");
    const parsedNow = nowParam ? Date.parse(nowParam) : Number.NaN;
    return {
      force: mode === "1" || mode === "reduced",
      reduced: mode === "reduced",
      nowMs: Number.isFinite(parsedNow) ? parsedNow : null,
    };
  } catch {
    return NO_PREVIEW;
  }
}
