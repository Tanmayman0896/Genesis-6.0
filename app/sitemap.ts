import type { MetadataRoute } from "next";

const baseUrl = "https://genesis.ieeemuj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/events", "/gallery", "/partners", "/teams", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
