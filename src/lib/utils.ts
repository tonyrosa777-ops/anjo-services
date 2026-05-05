/**
 * Tailwind class merge helper. Tiny inline implementation (no clsx/tailwind-merge
 * dep needed for the scaffold). Agents that need full conflict resolution can
 * upgrade to tailwind-merge later — flag in build-log.md if so.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Reads the user's reduce-motion preference. Returns false during SSR.
 * Animation wrappers and canvas systems guard with this.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
