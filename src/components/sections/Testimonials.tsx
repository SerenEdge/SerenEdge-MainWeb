import { testimonials } from "@/data/techStack";

export function Testimonials() {
  return (
    <section className="testi-section">
      <div className="section-head">
        <div>
          <div className="section-label">05 / Said about us</div>
          <h2 className="section-title">
            Trust earned, one <em>shipped</em> project at a time.
          </h2>
        </div>
        <p className="section-aside">
          We&apos;re new — so we&apos;d rather show the words of the people who took the bet
          on us early.
        </p>
      </div>

      <div className="testi-grid">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="testi reveal"
            data-delay={i > 0 ? String(i) : undefined}
          >
            <blockquote>{t.quote}</blockquote>
            <div className="testi-foot">
              <div className="testi-avatar">{t.initials}</div>
              <div className="testi-who">
                <div className="name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
