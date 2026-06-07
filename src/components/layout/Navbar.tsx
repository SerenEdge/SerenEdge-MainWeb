"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { showToast } from "@/lib/toast";
import { openContactModal } from "@/lib/contact";

const navLinks = [
  { idx: "01", label: "Services", href: "#services" },
  { idx: "02", label: "Process",  href: "#process"  },
  { idx: "03", label: "Work",     href: "#work"      },
  { idx: "04", label: "About",    href: "#about"     },
  { idx: "05", label: "Contact",  href: "#contact"   },
  { idx: "06", label: "Blog",     href: "/blog", blog: true },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoClicksRef = useRef(0);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onBlog = pathname.startsWith("/blog");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleLogoClick() {
    setMenuOpen(false);
    if (onBlog) {
      router.push("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    logoClicksRef.current += 1;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { logoClicksRef.current = 0; }, 1500);
    if (logoClicksRef.current >= 5) {
      logoClicksRef.current = 0;
      showToast("⚡ Passion mode unlocked. We were always like this.");
    }
  }

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}${!scrolled && theme === "light" && pathname === "/" ? " at-top" : ""}${menuOpen ? " menu-open" : ""}`}>

        {/* Left — site links ↔ back arrow, animated via CSS grid overlay */}
        <nav className="nav-links">
          {/* Site links: exit right when on /blog */}
          <div className={`nl-site${onBlog ? " nl-exit" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={link.blog ? "nav-link-blog" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back-to-home: exit left when NOT on /blog */}
          <button
            className={`nl-back${onBlog ? "" : " nl-exit"}`}
            onClick={() => router.push("/")}
            aria-label="Back to home"
          >
            <span className="nl-back-arr">←</span>
            Home
          </button>
        </nav>

        {/* Center — logo */}
        <div
          className="logo"
          onClick={handleLogoClick}
          title={onBlog ? "Go home" : "Click me 5 times…"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={theme === "dark" || (!scrolled && pathname === "/") ? "/Base%20Logo%20-%20Light.png" : "/Base%20Logo%20-%20Dark.png"}
            alt="SerenEdge"
            className="logo-img"
          />
        </div>

        {/* Right — CTA */}
        <div className="nav-cta">
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
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
          <button className="btn" onClick={openContactModal}>
            Let&apos;s talk
          </button>
          <button
            className={`btn-menu${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="menu-label">{menuOpen ? "Close" : "Menu"}</span>
            <span className="menu-bars" aria-hidden="true">
              <span /><span />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div className={`nav-overlay${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="nav-overlay-inner">
          {onBlog ? (
            <button
              className="ol-link ol-back"
              style={{ "--i": 0 } as React.CSSProperties}
              onClick={() => { setMenuOpen(false); router.push("/"); }}
            >
              <span className="ol-idx">←</span>
              <span className="ol-label">Home</span>
            </button>
          ) : (
            navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={`ol-link${link.blog ? " ol-link-blog" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setMenuOpen(false)}
              >
                <span className="ol-idx">{link.idx}</span>
                <span className="ol-label">{link.label}</span>
              </a>
            ))
          )}
        </nav>

        <div className="nav-overlay-cta">
          <button
            className="btn btn-primary"
            onClick={() => { setMenuOpen(false); openContactModal(); }}
          >
            <span className="dot" />Let&apos;s talk
          </button>
        </div>

        <div className="nav-overlay-foot">
          <span>dahamdissanayake05@gmail.com</span>
          <span>Sri Lanka · GMT+5:30</span>
        </div>
      </div>
    </>
  );
}
