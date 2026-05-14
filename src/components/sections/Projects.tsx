import { projects } from "@/data/projects";

export function Projects() {
  const [featured, ...rest] = projects;
  const [second, ...small] = rest;

  return (
    <section className="projects-section" id="work">
      <div className="section-head">
        <div>
          <div className="section-label">03 / Selected work</div>
          <h2 className="section-title">
            Things we <em>actually</em> shipped.
          </h2>
        </div>
        <p className="section-aside">
          A small portfolio for now. Every entry is a real system in production —
          not a case-study mockup.
        </p>
      </div>

      <div className="proj-grid">
        {/* Featured — SoterCare */}
        <article className="proj featured reveal">
          <div>
            <div className="proj-meta">
              <span style={{ fontFamily: "var(--font-mono)" }}>
                {featured.num} / {featured.category}
              </span>
              <span className={`badge${featured.badgeLive ? " live" : ""}`}>
                {featured.badge}
              </span>
            </div>
            <h3>
              <em>{featured.title}</em> {featured.titleAccent}
            </h3>
            <p>{featured.body}</p>
            <div className="proj-tags">
              {featured.tags.map((t) => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="proj-visual">
            <svg
              viewBox="0 0 600 280"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              style={{ color: "var(--accent)" }}
            >
              <rect x="0" y="0" width="600" height="280" fill="var(--bg-2)" />
              <path d="M0 180 Q50 160 100 170 T200 150 T300 180 T400 130 T500 160 T600 140" strokeWidth="1.5" opacity="0.6" />
              <path d="M0 200 Q60 180 120 195 T240 175 T360 200 T480 170 T600 185" strokeWidth="1" opacity="0.3" />
              <circle cx="120" cy="170" r="4" fill="currentColor" />
              <circle cx="240" cy="155" r="4" fill="currentColor" />
              <circle cx="360" cy="178" r="4" fill="currentColor" />
              <circle cx="480" cy="135" r="4" fill="currentColor" />
              <text x="20" y="40" fontFamily="JetBrains Mono" fontSize="11" fill="currentColor" opacity="0.7">heart_rate · spo2 · skin_temp · accel</text>
              <text x="20" y="60" fontFamily="JetBrains Mono" fontSize="11" fill="currentColor" opacity="0.4">stream: 4 sensors @ 1Hz · 14ms RTT</text>
              <rect x="430" y="22" width="150" height="32" rx="4" strokeWidth="1" opacity="0.4" />
              <text x="505" y="42" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="currentColor">ALERT · BP rising</text>
            </svg>
          </div>
        </article>

        {/* Inventory Sync */}
        <article className="proj reveal" data-delay="1">
          <div>
            <div className="proj-meta">
              <span style={{ fontFamily: "var(--font-mono)" }}>
                {second.num} / {second.category}
              </span>
              <span className="badge">{second.badge}</span>
            </div>
            <h3>
              {second.title} <em>{second.titleAccent}</em>
            </h3>
            <p>{second.body}</p>
            <div className="proj-tags">
              {second.tags.map((t) => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="proj-visual">
            <svg viewBox="0 0 400 200" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ color: "var(--accent)" }}>
              <rect width="400" height="200" fill="var(--bg-2)" />
              <rect x="30" y="60" width="60" height="80" rx="4" opacity="0.5" />
              <rect x="170" y="80" width="60" height="40" rx="4" />
              <rect x="310" y="40" width="60" height="120" rx="4" opacity="0.7" />
              <path d="M90 100 L170 100 M230 100 L310 100" strokeDasharray="4 4" />
              <text x="60" y="170" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="currentColor">POS</text>
              <text x="200" y="170" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="currentColor">ETL</text>
              <text x="340" y="180" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="currentColor">DW</text>
            </svg>
          </div>
        </article>
      </div>

      <div className="proj-row-2">
        {small.map((proj, i) => (
          <article key={proj.id} className="proj reveal" data-delay={i > 0 ? "1" : undefined}>
            <div>
              <div className="proj-meta">
                <span style={{ fontFamily: "var(--font-mono)" }}>
                  {proj.num} / {proj.category}
                </span>
                <span className="badge">{proj.badge}</span>
              </div>
              <h3>
                {proj.title} <em>{proj.titleAccent}</em>
              </h3>
              <p>{proj.body}</p>
              <div className="proj-tags">
                {proj.tags.map((t) => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
