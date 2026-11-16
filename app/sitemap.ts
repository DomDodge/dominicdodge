import type { MetadataRoute } from "next";

const siteUrl = "https://dominicdodge.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/resume`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/word`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
