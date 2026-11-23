import type { MetadataRoute } from "next";
import { nav, site } from "@/data/site";

const absolute = (path: string) => new URL(path, site.url).toString();

/** Built from `nav`, so adding a route puts it in the sitemap automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return nav.map((item) => ({
    url: absolute(item.href),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
