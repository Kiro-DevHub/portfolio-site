import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// output: 'export' требует явного force-static на route-хендлерах вида sitemap/robots.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
