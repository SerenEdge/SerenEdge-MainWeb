import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar }       from "@/components/layout/Navbar";
import { Footer }       from "@/components/layout/Footer";
import { Cursor }       from "@/components/ui/Cursor";
import { KonamiModal }  from "@/components/ui/KonamiModal";
import { ContactModal } from "@/components/ui/ContactModal";
import { Toast }        from "@/components/ui/Toast";
import { FaviconSync }  from "@/components/ui/FaviconSync";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serenedge.com"),
  title: "SerenEdge — For each node.",
  description:
    "SerenEdge is a small, deeply technical IT studio based in Sri Lanka. We take on the problems other shops won't — web platforms, IoT, automation, custom systems, ML — and ship them end-to-end. For each node.",
  keywords: [
    "IT solutions", "web development", "IoT", "automation", "machine learning",
    "SerenEdge", "Sri Lanka", "full-stack", "embedded systems", "software studio",
  ],
  authors: [{ name: "Daham Dissanayake", url: "https://daham.serenedge.com" }],
  creator: "Daham Dissanayake",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://serenedge.com" },
  icons: {
    icon: [
      { url: "/icons/Base%20Logo%20-%20Dark.ico",  media: "(prefers-color-scheme: light)" },
      { url: "/icons/Base%20Logo%20-%20Light.ico", media: "(prefers-color-scheme: dark)"  },
    ],
    shortcut: "/icons/Base%20Logo%20-%20Dark.ico",
    apple:    "/icons/Base%20Logo%20-%20Light.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title:       "SerenEdge — For each node.",
    description: "Give us any IT problem. We will solve it. For each node.",
    siteName:    "SerenEdge",
    type:        "website",
    url:         "https://serenedge.com",
    locale:      "en_US",
    images: [{ url: "/OG-page.png", width: 1200, height: 630, alt: "SerenEdge — For each node." }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "SerenEdge — For each node.",
    description: "Give us any IT problem. We will solve it.",
    images:      ["/OG-page.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent FOUC — apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('se-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <div className="grid-bg" aria-hidden="true" />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <Cursor />
        <KonamiModal />
        <ContactModal />
        <Toast />
        <FaviconSync />
      </body>
    </html>
  );
}
