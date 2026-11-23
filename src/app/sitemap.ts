import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { nav, site } from "@/data/site";

const absolute = (path: string) => new URL(path, site.url).toString();

/**
 * Built from `nav` and `guides` rather than a hand-written list, so adding a
 * route or an article puts it in the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = nav.map((item) => ({
    url: absolute(item.href),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const articles: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absolute(`/student-guide/${guide.slug}`),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
