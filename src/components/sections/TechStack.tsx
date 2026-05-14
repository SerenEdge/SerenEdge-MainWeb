import { techStack } from "@/data/techStack";

export function TechStack() {
  return (
    <section className="stack-section">
      <div className="section-head">
        <div>
          <div className="section-label">04 / Tools of the trade</div>
          <h2 className="section-title">
            Stack-agnostic. <em>Opinion-rich.</em>
          </h2>
        </div>
        <p className="section-aside">
          We pick the tool that fits the job, not the trendy one. Here&apos;s most of what
          we&apos;ve shipped with in the last year.
        </p>
      </div>

      <div className="stack-grid">
        {techStack.map((item, i) => (
          <div
            key={item.name}
            className="stack-cell reveal"
            data-delay={String((i % 4) as number)}
          >
            <div className="sc-ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="100%"
                height="100%"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
            </div>
            <div className="sc-name">{item.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
