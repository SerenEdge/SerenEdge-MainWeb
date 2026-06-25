import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { KonamiModal } from "@/components/ui/KonamiModal";
import { ContactModal } from "@/components/ui/ContactModal";
import { Toast } from "@/components/ui/Toast";
import { FaviconSync } from "@/components/ui/FaviconSync";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, SITE_KEYWORDS } from "@/lib/site";
import {
  organizationSchema,
  websiteSchema,
  founderSchema,
} from "@/lib/structured-data";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: "SerenEdge — IT, IoT & Automation Studio in Sri Lanka | For each node.",
    template: "%s | SerenEdge",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: SITE_KEYWORDS,
  category: "technology",
  authors: [{ name: SITE.founder.name, url: SITE.founder.url }],
  creator: SITE.founder.name,
  publisher: SITE.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to use HTML-tag GSC verification
  // (DNS domain-property verification is preferred and needs nothing here).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  manifest: "/site.webmanifest",
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
  openGraph: {
    title: "SerenEdge — IT, IoT & Automation Studio | For each node.",
    description: SITE.shortDescription,
    siteName: SITE.name,
    type: "website",
    url: SITE.url,
    locale: SITE.locale,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "SerenEdge — For each node.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SerenEdge — IT, IoT & Automation Studio | For each node.",
    description: SITE.shortDescription,
    images: [SITE.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/* Favicon paths — no %20 encoding, raw spaces work fine as link href values */
const ICON_DARK = "/icons/Base Logo - Dark.ico"; /* use on light theme */
const ICON_LIGHT = "/icons/Base Logo - Light.ico"; /* use on dark theme  */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Single favicon link — id lets the FOUC script and FaviconSync both
          target it directly, avoiding conflicts with any media-query based links.
          Default to dark-theme icon (light icon on dark bg).
        */}
        <link
          id="app-favicon"
          rel="icon"
          type="image/x-icon"
          href={ICON_LIGHT}
        />

        {/*
          FOUC prevention: apply saved theme + immediately correct the favicon
          before first paint so there is no flash on either theme.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var t = localStorage.getItem('se-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
    var dark = (t || 'dark') !== 'light';
    var f = document.getElementById('app-favicon');
    if (f) f.href = dark ? '${ICON_LIGHT}' : '${ICON_DARK}';
  } catch(e) {}
})();`,
          }}
        />
      </head>
      <body>
        <JsonLd
          data={[organizationSchema(), websiteSchema(), founderSchema()]}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <div className="grid-bg" aria-hidden="true" />
        {children}
        <Cursor />
        <KonamiModal />
        <ContactModal />
        <Toast />
        <FaviconSync />
        <Analytics />
      </body>
    </html>
  );
}
