import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { TechMarquee } from "@/components/TechMarquee";
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
        <Process />
      </main>
      <SiteFooter />
    </>
  );
}
