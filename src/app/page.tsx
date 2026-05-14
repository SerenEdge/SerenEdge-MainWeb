import { Hero }         from "@/components/sections/Hero";
import { Marquee }      from "@/components/sections/Marquee";
import { Stats }        from "@/components/sections/Stats";
import { Services }     from "@/components/sections/Services";
import { Process }      from "@/components/sections/Process";
import { Projects }     from "@/components/sections/Projects";
import { TechStack }    from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { About }        from "@/components/sections/About";
import { Contact }      from "@/components/sections/Contact";
import { RevealObserver } from "@/components/ui/RevealObserver";

export default function HomePage() {
  return (
    <main>
      <RevealObserver />
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Process />
      <Projects />
      <TechStack />
      <Testimonials />
      <About />
      <Contact />
    </main>
  );
}
