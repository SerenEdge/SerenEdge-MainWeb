import { projects } from "@/data/projects";

export function Projects() {
  const [featured] = projects;
  const count = projects.length;

  return (
    <section className="projects-section" id="work">
      <div className="section-head">
        <div>
          <div className="section-label">03 / Active projects</div>
          <h2 className="section-title">
            Currently <em>undergoing.</em>
          </h2>
        </div>
        <div className="proj-aside-col">
          <p className="section-aside">
            Projects in active development by the SerenEdge team.
            More arriving soon.
          </p>
          <div className="proj-counter reveal" data-delay="2">
            <span className="proj-counter-num">0{count}</span>
            <span className="proj-counter-lbl">ongoing</span>
          </div>
        </div>
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

        {/* Placeholder slot for next project */}
        <div className="proj proj-placeholder reveal" data-delay="1">
          <span className="proj-placeholder-label">Next project</span>
          <span className="proj-placeholder-sub">coming soon</span>
        </div>
      </div>
    </section>
  );
}
