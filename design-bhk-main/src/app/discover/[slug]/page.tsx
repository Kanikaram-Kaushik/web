import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import SectionHeader from "@/components/SectionHeader";
import ReviewsAndComments from "@/components/discover/ReviewsAndComments";
import ProfileActions from "@/components/discover/ProfileActions";
import {
  getEntityBySlug,
  getAllEntities,
  getInspirationsByEntity,
} from "@/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entities = getAllEntities();
  return entities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).toLowerCase();
  const profile = getEntityBySlug(slug);
  if (!profile) {
    return { title: "Profile" };
  }
  return {
    title: profile.name,
    description: profile.bio ?? "Interior design studio profile.",
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).toLowerCase();
  const profile = getEntityBySlug(slug);
  if (!profile) {
    notFound();
  }
  const linkedInspirations = getInspirationsByEntity(profile.slug);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-12 sm:px-6">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {profile.type} · {profile.location}
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            {profile.name}
          </h1>
          <p className="text-lg text-muted">{profile.bio}</p>
          <div className="flex flex-wrap gap-3">
            {profile.styles?.map((style) => (
              <span
                key={style}
                className="rounded-full border border-foreground/10 bg-[#f4ede6] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1f1a16]"
              >
                {style
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" label="Contact Studio" />
            {profile.website ? (
              <ButtonLink
                href={profile.website}
                label="Visit Website"
                variant="ghost"
                external
              />
            ) : null}
          </div>
          <div className="flex flex-wrap gap-4">
            <ProfileActions profileId={profile.slug} />
          </div>
        </div>
        <div className="relative h-80 overflow-hidden rounded-[32px] border border-foreground/10 lg:h-full">
          {profile.featuredImage ? (
            <Image
              src={profile.featuredImage}
              alt={profile.name}
              fill
              className="object-cover"
            />
          ) : null}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Recent work highlights"
          description="A glimpse into signature projects and material palettes."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile.gallery.map((image, index) => (
            <div
              key={`${profile.slug}-portfolio-${index}`}
              className="relative h-60 overflow-hidden rounded-3xl border border-foreground/10"
            >
              <Image
                src={image}
                alt={`${profile.name} portfolio ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Specializations"
          title="What they are known for"
          description="Project focus areas, design disciplines, and client types."
        />
        <div className="flex flex-wrap gap-4">
          {(profile.services ?? [])
            .filter((item): item is string => Boolean(item && item.trim()))
            .map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-foreground/10 bg-white/70 px-5 py-2 text-sm font-semibold text-foreground"
              >
                {item}
              </span>
            ))}
        </div>
      </section>

      <ReviewsAndComments reviews={[]} targetId={profile.slug} />

      {linkedInspirations.length ? (
        <section className="space-y-8">
          <SectionHeader
            eyebrow="Inspirations"
            title="Inspired spaces linked to this studio"
            description="Explore projects and concepts credited to this team."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {linkedInspirations.map((item) => (
              <Link
                key={item.id}
                href={`/designs/${item.slug}`}
                className="group overflow-hidden rounded-3xl border border-foreground/10 bg-card/80 transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,10,5,0.12)]"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                    {(item.roomTypes || [])
                      .slice(0, 2)
                      .map(
                        (r) =>
                          r
                            .split("-")
                            .map(
                              (w) => w.charAt(0).toUpperCase() + w.slice(1)
                            )
                            .join(" ") // Convert slug to title
                      )
                      .join(" · ")}
                  </p>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
