export function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-head">
        <div>
          <div className="section-label">06 / Who we are</div>
          <h2 className="section-title">
            One undergrad. <em>One studio.</em>
          </h2>
        </div>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>
            SerenEdge started because{" "}
            <span className="founder-name">
              Daham
              <span className="founder-photo">
                <svg
                  viewBox="0 0 180 220"
                  preserveAspectRatio="xMidYMid slice"
                  width="180"
                  height="220"
                >
                  <defs>
                    <linearGradient id="fg" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="#0a0e1a" />
                      <stop offset="1" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                  <rect width="180" height="220" fill="url(#fg)" />
                  <circle cx="90" cy="85" r="34" fill="rgba(255,255,255,0.15)" />
                  <path d="M30 220 Q90 130 150 220" fill="rgba(255,255,255,0.15)" />
                </svg>
                <span className="fp-cap">// daham — founder</span>
              </span>
            </span>{" "}
            got tired of watching small businesses pay big money for software that
            didn&apos;t fit, didn&apos;t ship, or didn&apos;t even get finished. So he started a
            team to do it differently.
          </p>

          <p>
            Daham is still an undergraduate — and the team around him works the way
            undergrads do: more energy, more curiosity, and (let&apos;s be honest) more
            time than the studios twice our size. We code at 2am because the problem
            is interesting. We pick up the phone when you call. We treat every
            project like it&apos;s the one our reputation depends on, because at this
            stage, it is.
          </p>

          <p>
            The name &ldquo;SerenEdge&rdquo; is half-aspirational: <em>seren</em> for the calm
            of a well-built system, and <em>edge</em> for the bleeding edge of
            what&apos;s possible right now. We try to live in that intersection.
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
