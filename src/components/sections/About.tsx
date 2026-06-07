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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/IMG_9222-Daham.jpeg"
                  alt="Daham Dissanayake"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
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
            The name &ldquo;SerenEdge&rdquo; says it plainly: <em>Seren</em>for Sri Lanka,
            where we&apos;re rooted, and <em>Edge</em> for the way we work,
            connecting through every node, reaching every layer of the stack.
          </p>
        </div>

        <aside className="about-side">
          <h4>// On the record</h4>
          <ul>
            [
              { year: "Feb 2026", item: "SerenEdge founded", sub: "Daham Dissanayake · day one · building in public" },
              { year: "Sep 2025", item: "SoterCare in development", sub: "first active project · Healthcare IoT" },
              { year: "next", item: "Yours?", sub: "reach out below" },
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
