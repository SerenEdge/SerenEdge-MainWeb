import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "accent-blue": "var(--accent-blue)",
        "accent-bright": "var(--accent-bright)",
        "accent-glow": "var(--accent-glow)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        glitch: "glitch 0.4s steps(2) infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px var(--accent-glow)" },
          "50%": { boxShadow: "0 0 40px var(--accent-glow), 0 0 80px var(--accent-glow)" },
        },
        glitch: {
          "0%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-4px, 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(4px, 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-4px, 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(4px, 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-4px, 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(0, 0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "blue-glow": "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
