export default function HomePage() {
  return (
    <main>
      {/* Sections will be added phase by phase */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-blue)]">
            Phase 1 — Foundation complete
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[var(--text-primary)] tracking-tighter">
            Seren<span className="text-[var(--accent-blue)]">Edge</span>
          </h1>
          <p className="font-body text-lg text-[var(--text-secondary)]">
            We solve IT problems. Any of them.
          </p>
        </div>
      </section>
    </main>
  );
}
