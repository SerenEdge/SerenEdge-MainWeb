import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      {children}
      <Footer />
    </SmoothScrollProvider>
  );
}
