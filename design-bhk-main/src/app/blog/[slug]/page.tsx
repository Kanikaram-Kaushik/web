import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import SectionHeader from "@/components/SectionHeader";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Blog" };
  }
  return {
    title: post.title,
    description: post.excerpt ?? "Design journal entry.",
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 pb-24 pt-12 sm:px-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {post.category} · {post.readTime}
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">{post.title}</h1>
        {post.publishedAt ? (
          <p className="text-base text-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
      </div>

      <div className="relative h-72 overflow-hidden rounded-[32px] border border-foreground/10 sm:h-96">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <article
        className="blog-content space-y-6"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="flex flex-wrap gap-3">
        {(post.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-foreground/10 bg-[#f4ede6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f1a16]"
          >
            {tag}
          </span>
        ))}
      </div>

      <section className="rounded-[32px] border border-foreground/10 bg-card/70 p-8">
        <SectionHeader
          eyebrow="Next step"
          title="Ready to bring your brief to life?"
          description="Connect with a studio that aligns with your aesthetic and timeline."
        />
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink href="/discover" label="Browse Studios" />
          <ButtonLink href="/contact" label="Talk to Us" variant="secondary" />
        </div>
      </section>

      <Link
        href="/blog"
        className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground"
      >
        Back to journal
      </Link>
    </div>
  );
}
