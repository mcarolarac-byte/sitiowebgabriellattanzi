import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { postsListQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { site } from "@/lib/content";

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

  return (
    <section>
      <Container className="py-20">
        <p className="font-data text-xs uppercase tracking-[0.2em] text-brass">
          Blog
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
          Ideas sobre retiro, inversión y finanzas personales
        </h1>

        {posts.length === 0 ? (
          <p className="mt-10 max-w-lg font-body text-slate-soft">
            Todavía no hay artículos publicados. Muy pronto {site.name}{" "}
            compartirá aquí sus primeras reflexiones.
          </p>
        ) : (
          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="focus-ring group block rounded-sm"
              >
                {post.coverImage && (
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-paper-dim">
                    <Image
                      src={urlForImage(post.coverImage).width(800).height(500).url()}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <p className="font-data text-xs uppercase tracking-[0.1em] text-slate-soft">
                  {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink group-hover:underline decoration-brass decoration-2 underline-offset-4">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 font-body text-sm leading-relaxed text-slate-soft">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
