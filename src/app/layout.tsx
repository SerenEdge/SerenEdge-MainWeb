import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { TimeGreeting } from "@/components/ui/TimeGreeting";
import { KonamiModal } from "@/components/ui/KonamiModal";
import { Toast } from "@/components/ui/Toast";

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
  title: "SerenEdge — Engineering solutions at the edge of what's possible",
  description:
    "SerenEdge is a small, deeply technical IT studio. We take on the problems other shops won't — web platforms, IoT, automation, custom systems, ML — and ship them end-to-end.",
  keywords: ["IT solutions", "web development", "IoT", "automation", "machine learning", "SerenEdge", "Sri Lanka"],
  openGraph: {
    title: "SerenEdge — Engineering solutions at the edge of what's possible",
    description: "Give us any IT problem. We will solve it.",
    siteName: "SerenEdge",
    type: "website",
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
        <div className="grid-bg" aria-hidden="true" />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <Cursor />
        <TimeGreeting />
        <KonamiModal />
        <Toast />
      </body>
    </html>
  );
}
