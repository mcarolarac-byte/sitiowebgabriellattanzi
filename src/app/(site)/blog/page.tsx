import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { postsListQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { site } from "@/lib/content";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: `Artículos de ${site.name} sobre retiro, inversión y educación financiera.`,
};

export const revalidate = 60;

type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: Parameters<typeof urlForImage>[0];
  publishedAt: string;
};

export default async function BlogPage() {
  const posts = (await client.fetch<PostListItem[]>(postsListQuery)) ?? [];
  return <BlogContent posts={posts} />;
}
