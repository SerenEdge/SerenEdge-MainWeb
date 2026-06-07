"use client";

import { openContactModal } from "@/lib/contact";

export function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid">
        <div>
          <div className="section-label" style={{ marginBottom: 20 }}>
            Get in touch
          </div>
          <h2>
            Tell us the <em>problem.</em>
            <br />
            We&apos;ll write back in 24 hours.
          </h2>
        </div>

        <div className="contact-info">
          <div className="ci-row">
            <span className="label">// email</span>
            <a className="value" href="mailto:dahamdissanayake05@gmail.com">
              dahamdissanayake05@gmail.com
            </a>
          </div>
          <div className="ci-row">
            <span className="label">// phone / whatsapp</span>
            <a className="value" href="tel:+94704888440">
              +94 70 488 8440
            </a>
          </div>
          <div className="ci-row">
            <span className="label">// based</span>
            <span className="value">Sri Lanka · GMT+5:30</span>
          </div>
          <div className="ci-row">
            <span className="label">// availability</span>
            <span className="value">
              <span style={{ color: "#22c55e" }}>●</span> open · Q2 2026 onward
            </span>
          </div>
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-primary" onClick={openContactModal}>
              <span className="dot" />
              Start a project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
