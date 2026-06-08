import { Hero }         from "@/components/sections/Hero";
import { Marquee }      from "@/components/sections/Marquee";
import { LatestPosts }  from "@/components/sections/LatestPosts";
import { Services }     from "@/components/sections/Services";
import { Process }      from "@/components/sections/Process";
import { Projects }     from "@/components/sections/Projects";
import { About }        from "@/components/sections/About";
import { Contact }      from "@/components/sections/Contact";
import { RevealObserver } from "@/components/ui/RevealObserver";

export const revalidate = 60;

export default async function HomePage() {
  return (
    <main id="main-content">
      <RevealObserver />
      <Hero />
      <Marquee />
      <LatestPosts />
      <Services />
      <Process />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
