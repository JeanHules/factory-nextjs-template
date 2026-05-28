/**
 * Simple in-memory cache with TTL.
 * Agents must use these exact export names — they are declared in lib/contracts.ts.
 */

interface CacheEntry<T> {
  value: T
  expiresAt: number | null
}

const store = new Map<string, CacheEntry<unknown>>()

export function getFromCache<T>(key: string): T | null {
  const entry = store.get(key)
  if (!entry) return null
  if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
    store.delete(key)
    return null
  }
  return entry.value as T
}

export function setInCache<T>(key: string, value: T, ttlMs?: number): void {
  store.set(key, {
    value,
    expiresAt: ttlMs != null ? Date.now() + ttlMs : null,
  })
}

export function clearCache(key?: string): void {
  if (key) {
    store.delete(key)
  } else {
    store.clear()
  }
}

export function getCacheSize(): number {
  return store.size
}
