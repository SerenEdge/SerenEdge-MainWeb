"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactModal() {
  const [open, setOpen]     = useState(false);
  const [form, setForm]     = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const firstRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setStatus("idle");
    }, 360);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("se-contact", handler);
    return () => window.removeEventListener("se-contact", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className={`cmodal-overlay${open ? " open" : ""}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      <div className="cmodal" onClick={(e) => e.stopPropagation()}>
        <button className="cmodal-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="cmodal-head">
          <div className="section-label">Start a project</div>
          <h2>
            Tell us the <em>problem</em>.
          </h2>
          <p>We&apos;ll write back within 24 hours.</p>
        </div>

        {status === "success" ? (
          <div className="cf-status cf-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Message sent — we&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Your name</label>
                <input
                  ref={firstRef}
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  autoComplete="name"
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Email address</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="cf-message">Tell us about the project</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="What problem are you trying to solve? What have you tried so far?"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                disabled={status === "loading"}
              />
            </div>

            {status === "error" && (
              <div className="cf-status cf-error">
                Something went wrong. Email us directly at{" "}
                <a href="mailto:dahamdissanayake05@gmail.com">dahamdissanayake05@gmail.com</a>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary cf-submit"
              disabled={status === "loading"}
            >
              <span className="dot" />
              {status === "loading" ? "Sending…" : "Send message →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
