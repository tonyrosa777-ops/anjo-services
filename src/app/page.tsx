import { siteConfig, hero } from "@/data/site";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
        aria-hidden
      />
      <div className="relative z-10 max-w-2xl text-center">
        <p className="text-eyebrow text-[var(--accent)] font-display">
          Phase 1 scaffold complete · Stage 1E builds homepage sections
        </p>
        <h1 className="hero-shimmer font-display text-display font-black mt-4">
          {siteConfig.tagline}
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] mt-6">
          {hero.subheadline}
        </p>
        <p className="text-meta font-mono text-[var(--text-muted)] mt-10">
          {siteConfig.phone} · {siteConfig.baseCity}
        </p>
      </div>
    </main>
  );
}
