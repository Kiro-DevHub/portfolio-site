import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { TechMarquee } from "@/components/TechMarquee";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { site, services } from "@/lib/site";

// Person — сущность (для карточки в поиске и связки с Telegram как соц-профилем).
// ProfessionalService — что продаём и по каким ценам (services из lib/site.ts).
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      url: site.url,
      sameAs: [site.telegramUrl],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Telegram Bot API",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} — full-stack разработка`,
      description:
        "Разработка сайтов и Telegram-ботов под задачу бизнеса: от лендинга до комплексного проекта с базой данных.",
      url: site.url,
      areaServed: {
        "@type": "City",
        name: "Ростов-на-Дону",
      },
      provider: { "@id": `${site.url}/#person` },
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        name: s.title,
        description: s.description,
        priceCurrency: "RUB",
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
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
