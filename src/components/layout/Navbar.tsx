"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { showToast } from "@/lib/toast";
import { openContactModal } from "@/lib/contact";

const navLinks = [
  { idx: "01", label: "Services", href: "#services" },
  { idx: "02", label: "Process",  href: "#process"  },
  { idx: "03", label: "Work",     href: "#work"      },
  { idx: "04", label: "About",    href: "#about"     },
  { idx: "05", label: "Contact",  href: "#contact"   },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const logoClicksRef = useRef(0);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLogoClick() {
    logoClicksRef.current += 1;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { logoClicksRef.current = 0; }, 1500);
    if (logoClicksRef.current >= 5) {
      logoClicksRef.current = 0;
      showToast("⚡ Passion mode unlocked. We were always like this.");
    }
  }

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      {/* Logo */}
      <div
        className="logo"
        onClick={handleLogoClick}
        title="Click me 5 times…"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}
      >
        <div className="logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12 L9 6 L9 18 Z" fill="currentColor" stroke="none" />
            <path d="M21 12 L15 6 L15 18 Z" />
          </svg>
        </div>
        <span className="logo-text">
          Seren<em>Edge</em>
        </span>
      </div>

      {/* Desktop nav links */}
      <nav className="nav-links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            <span className="idx">{link.idx}</span>
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right controls */}
      <div className="nav-cta">
        <button
          className="theme-toggle"
          aria-label="Toggle theme"
          onClick={toggle}
        >
          {theme === "light" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <button className="btn btn-primary" onClick={openContactModal}>
          <span className="dot" />
          Start a project
        </button>
      </div>
    </header>
  );
}
