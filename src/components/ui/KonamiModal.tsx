"use client";

import { useState } from "react";
import { useKonami } from "@/hooks/useKonami";

export function KonamiModal() {
  const [show, setShow] = useState(false);
  useKonami(() => setShow(true));

  return (
    <div
      className={`konami-overlay${show ? " show" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="You found the cheat code"
      onClick={() => setShow(false)}
    >
      <div className="konami-card" onClick={(e) => e.stopPropagation()}>
        <h3>
          You found <em>the cheat code.</em>
        </h3>
        <p>
          Truth is, there isn&apos;t one. I just outwork the problem. Most of this site
          was built between 1am and 5am, with a SoterCare deadline running in another
          window.
        </p>
        <p style={{ fontSize: 15, color: "var(--text)", marginBottom: 6 }}>
          Also —{" "}
          <em style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)", fontWeight: 600 }}>
            Sanuli
          </em>
          , if you ever find this: thank you. You&apos;re the real cheat code.
        </p>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 24 }}>
          — Daham
        </p>
        <div className="konami-close">[ click anywhere to close ]</div>
      </div>
    </div>
  );
}
