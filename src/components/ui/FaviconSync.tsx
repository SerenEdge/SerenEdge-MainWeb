"use client";

import { useEffect } from "react";

export function FaviconSync() {
  useEffect(() => {
    function update() {
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      const href = dark
        ? "/icons/Base%20Logo%20-%20Light.ico"
        : "/icons/Base%20Logo%20-%20Dark.ico";

      let link = document.querySelector<HTMLLinkElement>('link[data-favicon-theme]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.setAttribute("data-favicon-theme", "1");
        document.head.appendChild(link);
      }
      link.href = href;
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
