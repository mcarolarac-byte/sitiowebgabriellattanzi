import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postsListQuery } from "@/sanity/lib/queries";
import { site } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/quien-soy",
    "/que-hago",
    "/blog",
    "/contacto",
    "/privacidad",
  ].map((path) => ({
    url: `${site.baseUrl}${path}`,
    lastModified: new Date(),
  }));

  try {
    const posts =
      (await client.fetch<{ slug: string; publishedAt: string }[]>(
        postsListQuery
      )) ?? [];
    const postRoutes = posts.map((post) => ({
      url: `${site.baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    }));
    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
