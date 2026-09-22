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
  coverImage?: Parameters<typeof urlForImage>[0] & { alt?: string };
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
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
    },
  };
}

// Descargo fijo que se muestra al final de todos los artículos, para que
// Gabriel no tenga que pegarlo en cada uno.
const DISCLAIMER =
  "Descargo de responsabilidad: El contenido de este artículo tiene fines exclusivamente educativos e informativos. No constituye asesoramiento financiero, una recomendación de inversión ni una invitación a comprar o vender instrumentos financieros. Toda inversión implica riesgos de pérdida de capital.";

// Lee ancho y alto del identificador del asset de Sanity
// (formato "image-<id>-<ancho>x<alto>-<ext>") para respetar la proporción
// original de cada imagen en lugar de recortarla.
function imageDimensions(ref: string | undefined) {
  const match = ref?.match(/-(\d+)x(\d+)-/);
  if (!match) return { width: 1600, height: 1000 };
  return { width: Number(match[1]), height: Number(match[2]) };
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const { width, height } = imageDimensions(value?.asset?._ref);
      return (
        <figure className="mx-auto my-10 w-full max-w-xl">
          <Image
            src={urlForImage(value).width(1200).url()}
            alt={value.alt || ""}
            width={width}
            height={height}
            sizes="(max-width: 640px) 100vw, 576px"
            className="h-auto w-full"
          />
        </figure>
      );
    },
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
              alt={post.coverImage.alt || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="prose-financiero max-w-none font-body leading-relaxed text-slate">
          <PortableText value={post.body} components={components} />
        </div>
        <p className="mt-12 border-t border-line pt-6 font-body text-xs leading-relaxed text-slate-soft">
          {DISCLAIMER}
        </p>
      </Container>
    </article>
  );
}
