import type { MetadataRoute } from "next";
import { casePath, site } from "@/lib/site";
import { caseContentSlugs } from "@/content/cases";

// output: 'export' требует явного force-static на route-хендлерах вида sitemap/robots.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...caseContentSlugs.map((slug) => ({
      url: `${site.url}${casePath(slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
