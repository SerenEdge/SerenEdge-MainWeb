"use client";

import { openContactModal } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>© 2026 SerenEdge · built with too much coffee in Sri Lanka</div>
      <button className="btn btn-primary" onClick={openContactModal}>
        <span className="dot" />
        Start a project
      </button>
    </footer>
  );
}
