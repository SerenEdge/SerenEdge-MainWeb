"use client";

import { useEffect, useState } from "react";

function getLabel(h: number) {
  if (h >= 5  && h < 12) return "Morning shift";
  if (h >= 12 && h < 17) return "Afternoon push";
  if (h >= 17 && h < 22) return "Evening sprint";
  if (h >= 0  && h < 5)  return "Late-night grind";
  return "Night shift";
}

export function TimeGreeting() {
  const [text, setText] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours();
      const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      setText(`${getLabel(h)} · ${time} GMT+5:30`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!text) return null;

  return (
    <div className="time-greeting" aria-live="polite">
      <span className="tg-dot" />
      <em>{text}</em>
    </div>
  );
}
