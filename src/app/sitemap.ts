import type { MetadataRoute } from "next";

const BASE_URL = "https://shravandeb.com";

const staticPages = [
  { url: "", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  { url: "/work", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "/work/devmon", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  { url: "/work/kiran-ai", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  { url: "/work/prism", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  { url: "/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  { url: "/resume", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: "/skills", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: "/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: "/uses", lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  { url: "/now", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "/colophon", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: page.priority,
  }));
}
