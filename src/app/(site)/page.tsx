import { Hero }         from "@/components/sections/Hero";
import { Marquee }      from "@/components/sections/Marquee";
import { LatestPosts }  from "@/components/sections/LatestPosts";
import { Services }     from "@/components/sections/Services";
import { Process }      from "@/components/sections/Process";
import { Projects }     from "@/components/sections/Projects";
import { About }        from "@/components/sections/About";
import { Contact }      from "@/components/sections/Contact";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesSchema } from "@/lib/structured-data";
import { services } from "@/data/services";

export const revalidate = 60;

export default async function HomePage() {
  const offered = services
    .filter((s) => s.tags.length > 0)
    .map((s) => ({
      title: `${s.title} ${s.titleAccent}`.trim(),
      description: s.description,
    }));

  return (
    <main id="main-content">
      <JsonLd data={servicesSchema(offered)} />
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
