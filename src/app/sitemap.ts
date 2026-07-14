import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseContentSlugs } from "@/content/cases";

// output: 'export' требует явного force-static на route-хендлерах вида sitemap/robots.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...caseContentSlugs.map((slug) => ({
      url: `${site.url}/case/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  return routes;
}
