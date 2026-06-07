"use client";

import { useEffect } from "react";

const ICON_DARK  = "/icons/Base Logo - Dark.ico";  /* light theme */
const ICON_LIGHT = "/icons/Base Logo - Light.ico"; /* dark theme  */

export function FaviconSync() {
  useEffect(() => {
    function update() {
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      const link = document.getElementById("app-favicon") as HTMLLinkElement | null;
      if (link) link.href = dark ? ICON_LIGHT : ICON_DARK;
    }

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
