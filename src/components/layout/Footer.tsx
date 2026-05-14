"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/SerenEdge", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@serenedge.com", label: "Email" },
];

export function Footer() {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function handleLogoClick() {
    const next = logoClicks + 1;
    setLogoClicks(next);
    clearTimeout(timerRef.current);
    if (next >= 5) {
      setLogoClicks(0);
      setShowEasterEgg(true);
    } else {
      timerRef.current = setTimeout(() => setLogoClicks(0), 2000);
    }
  }

  return (
    <>
      <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container-width px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <button
                onClick={handleLogoClick}
                className="font-display font-bold text-xl tracking-tight text-[var(--text-primary)] select-none"
                aria-label="SerenEdge logo"
              >
                Seren<span className="text-[var(--accent-blue)]">Edge</span>
              </button>
              <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                We solve IT problems. Any of them. Give us your hardest challenge.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-blue)]">
                Navigation
              </p>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-blue)]">
                Connect
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:border-[var(--border-hover)] transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <a
                href="mailto:hello@serenedge.com"
                className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                hello@serenedge.com
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[var(--text-muted)]">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span
                className="glitch-text hover:text-[var(--text-secondary)] transition-colors cursor-default"
                data-text="SerenEdge"
              >
                SerenEdge
              </span>
              . All rights reserved.
            </p>
            <p className="font-mono">
              Built with obsession &amp; too much coffee.
            </p>
          </div>
        </div>
      </footer>

      {/* Easter egg modal */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowEasterEgg(false)}
        >
          <div
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 max-w-md w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-widest">
              Easter egg unlocked
            </p>
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              The Workholic Stats
            </h3>
            <div className="space-y-3 pt-2">
              {[
                ["Cups of coffee consumed", "2,847"],
                ["Hours of code written", "14,200+"],
                ["Bugs fixed", "we lost count"],
                ["3am commits", "too many"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="font-body text-sm text-[var(--text-secondary)]">{label}</span>
                  <span className="font-mono text-sm font-bold text-[var(--accent-blue)]">{value}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              this is a joke... mostly.
            </p>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="w-full mt-4 py-2 border border-[var(--border)] rounded-lg font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
            >
              Back to the real world
            </button>
          </div>
        </div>
      )}
    </>
  );
}
