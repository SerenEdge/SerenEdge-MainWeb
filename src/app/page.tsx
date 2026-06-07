import { Hero }         from "@/components/sections/Hero";
import { Marquee }      from "@/components/sections/Marquee";
import { Services }     from "@/components/sections/Services";
import { Process }      from "@/components/sections/Process";
import { Projects }     from "@/components/sections/Projects";
import { About }        from "@/components/sections/About";
import { Contact }      from "@/components/sections/Contact";
import { RevealObserver } from "@/components/ui/RevealObserver";

export default function HomePage() {
  return (
    <main>
      <RevealObserver />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
