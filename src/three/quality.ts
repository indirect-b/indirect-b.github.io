// Quality + mode preferences for the QUANTUM (3D) experience.
// Own code — same treatment as the AETHER page: Low mode + auto-fallback
// when the GPU can't keep up, persisted in localStorage.

export type SiteMode = 'quantum' | 'classic';

const MODE_KEY = 'indirect-site-mode';
const LOW_KEY = 'indirect-site-quality-low';

export function loadMode(): SiteMode {
  try {
    return localStorage.getItem(MODE_KEY) === 'classic' ? 'classic' : 'quantum';
  } catch {
    return 'quantum';
  }
}

export function saveMode(mode: SiteMode): void {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* storage unavailable — ignore */
  }
}

/** null = no saved preference yet (auto-fallback may decide). */
export function loadLow(): boolean | null {
  try {
    const v = localStorage.getItem(LOW_KEY);
    return v === null ? null : v === '1';
  } catch {
    return null;
  }
}

export function saveLow(low: boolean): void {
  try {
    localStorage.setItem(LOW_KEY, low ? '1' : '0');
  } catch {
    /* storage unavailable — ignore */
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
