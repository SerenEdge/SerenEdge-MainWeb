export function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-head">
        <div>
          <div className="section-label">04 / Who we are</div>
          <h2 className="section-title">
            Not one lane. <em>Every node.</em>
          </h2>
        </div>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>
            SerenEdge is not a company framed into a single pathway. Founded by{" "}
            <span className="founder-name">
              Daham Dissanayake
              <span className="founder-photo">
                <svg
                  viewBox="0 0 180 220"
                  preserveAspectRatio="xMidYMid slice"
                  width="180"
                  height="220"
                >
                  <defs>
                    <linearGradient id="fg" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="#0e1118" />
                      <stop offset="1" stopColor="#2b5fa0" />
                    </linearGradient>
                  </defs>
                  <rect width="180" height="220" fill="url(#fg)" />
                  <circle cx="90" cy="85" r="34" fill="rgba(255,255,255,0.15)" />
                  <path d="M30 220 Q90 130 150 220" fill="rgba(255,255,255,0.15)" />
                </svg>
                <span className="fp-cap">// daham — founder</span>
              </span>
            </span>
            {", "}we operate across the full spectrum — our own startups, client
            projects, and anything that ships software, signals, or systems.
            A-to-Z IT solutions, handled in-house from first brief to final deployment.
          </p>

          <p>
            We don&apos;t specialise in one stack or one industry. We pick up problems
            other shops won&apos;t touch — embedded firmware, ML pipelines, custom ERPs,
            IoT fleets, web platforms — and we see them through. Same team, same
            accountability, start to finish.
          </p>

          <p>
            The name &ldquo;SerenEdge&rdquo; says it plainly: <em>Seren</em> for Sri Lanka,
            where we&apos;re rooted, and <em>Edge</em> for the way we work &mdash;
            connecting through every node, reaching every layer of the stack.
          </p>
        </div>

        <aside className="about-side">
          <h4>// On the record</h4>
          <ul>
            {[
              { year: "2024", item: "SerenEdge starts", sub: "founded by Daham · late nights · zero excuses" },
              { year: "2025", item: "First production deployment", sub: "SoterCare IoT pipeline live" },
              { year: "2025", item: "First paid retainer", sub: "regional retailer, ongoing" },
              { year: "2026", item: "14 projects shipped", sub: "across 6 disciplines" },
              { year: "next", item: "Yours?", sub: "book a 90-min call below" },
            ].map((e) => (
              <li key={e.year + e.item}>
                <span className="year">{e.year}</span>
                <div className="item">
                  {e.item}
                  <small>{e.sub}</small>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
