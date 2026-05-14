"use client";

import { useEffect, useRef, useState } from "react";

export function Toast() {
  const [msg, setMsg]  = useState("");
  const [show, setShow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handler = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setMsg(message);
      setShow(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShow(false), 3200);
    };
    window.addEventListener("se-toast", handler);
    return () => window.removeEventListener("se-toast", handler);
  }, []);

  return (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      <span className="dot" />
      <span>{msg}</span>
    </div>
  );
}
