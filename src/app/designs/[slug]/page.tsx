import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import SectionHeader from "@/components/SectionHeader";
import InspirationEngagement from "@/components/inspirations/InspirationEngagement";
import {
  getInspirationBySlug,
  getAllInspirations,
  getEntityBySlug,
} from "@/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = getAllInspirations();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).toLowerCase();
  const inspiration = getInspirationBySlug(slug);
  if (!inspiration) {
    return { title: "Inspiration" };
  }
  return {
    title: inspiration.title,
    description: inspiration.description ?? "Interior inspiration details.",
  };
}

export default async function InspirationDetailPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).toLowerCase();
  const inspiration = getInspirationBySlug(slug);
  if (!inspiration) {
    notFound();
  }
  const featured = inspiration.attribution
    ? getEntityBySlug(inspiration.attribution)
    : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-12 sm:px-6">
      <section className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {(inspiration.roomTypes || [])
            .slice(0, 2)
            .map(
              (r) =>
                r
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ") // Convert slug to title
            )
            .join(" · ")}
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          {inspiration.title}
        </h1>
        <p className="text-lg text-muted">{inspiration.description}</p>
        <div className="flex flex-wrap gap-3">
          {inspiration.styles?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/10 bg-[#f4ede6] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1f1a16]"
            >
              {tag
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact" label="Talk to a designer" />
        </div>
        <div className="flex flex-wrap gap-4">
          <InspirationEngagement slug={inspiration.slug} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {inspiration.images.map((image, index) => (
          <div
            key={`${inspiration.slug}-image-${index}`}
            className="relative h-72 overflow-hidden rounded-3xl border border-foreground/10"
          >
            <Image
              src={image}
              alt={`${inspiration.title} gallery ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </section>

      {featured || inspiration.creditText ? (
        <section className="grid gap-8 rounded-[32px] border border-foreground/10 bg-card/70 p-6 sm:p-8 lg:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Featured Studio"
              title={featured?.name ?? "Studio"}
              description="Connect with the team behind this look to explore a similar direction."
            />
            {inspiration.creditText ? (
              <p className="text-sm text-muted">{inspiration.creditText}</p>
            ) : null}
            <ButtonLink href="/contact" label="Contact the Studio" />
          </div>
          {featured ? (
            <Link
              href={`/discover/${featured.slug}`}
              className="group relative h-64 overflow-hidden rounded-3xl border border-foreground/10"
            >
              {featured.featuredImage ? (
                <Image
                  src={featured.featuredImage}
                  alt={featured.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-card/80 px-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                  View Studio
                </div>
              )}
            </Link>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
