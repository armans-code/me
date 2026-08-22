import type { MetadataRoute } from "next";
import { getThoughtIds } from "@/lib/thoughts";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const thoughtUrls = getThoughtIds().map((id) => ({
    url: absoluteUrl(`/thoughts/${id}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/thoughts"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...thoughtUrls,
    {
      url: absoluteUrl("/gui"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/llms.txt"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
