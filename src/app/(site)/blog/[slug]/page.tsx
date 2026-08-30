import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Container } from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postsListQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: Parameters<typeof urlForImage>[0];
  body: NonNullable<React.ComponentProps<typeof PortableText>["value"]>;
  publishedAt: string;
};

export async function generateStaticParams() {
  const posts = (await client.fetch<{ slug: string }[]>(postsListQuery)) ?? [];
  return posts.map((post) => ({ slug: post.slug }));
}

async function getPost(slug: string) {
  const post = await client.fetch<Post>(postBySlugQuery, { slug });
  return post ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative my-8 aspect-[16/10] overflow-hidden bg-paper-dim">
        <Image
          src={urlForImage(value).width(1200).url()}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article>
      <Container className="max-w-3xl py-20">
        <p className="font-data text-xs uppercase tracking-[0.1em] text-slate-soft">
          {new Date(post.publishedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
          {post.title}
        </h1>
        {post.coverImage && (
          <div className="relative my-10 aspect-[16/9] overflow-hidden bg-paper-dim">
            <Image
              src={urlForImage(post.coverImage).width(1400).url()}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="prose-financiero max-w-none font-body leading-relaxed text-slate">
          <PortableText value={post.body} components={components} />
        </div>
      </Container>
    </article>
  );
}
