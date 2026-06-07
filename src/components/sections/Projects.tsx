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
          <div className="proj-visual" style={{ padding: 0, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/SoterCare banner.png"
              alt="SoterCare"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
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
