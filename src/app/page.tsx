import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { TechMarquee } from "@/components/TechMarquee";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Cases />
        <TechMarquee />
        <About />
        <Skills />
        <Process />
      </main>
      <SiteFooter />
    </>
  );
}
