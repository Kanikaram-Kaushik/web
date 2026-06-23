import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import SectionHeader from "@/components/SectionHeader";
import { getAllServices } from "@/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the services available from discovery to execution.",
};

export default async function ServicesPage() {
  const services = getAllServices();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-12 sm:px-6">
      <SectionHeader
        eyebrow="Services"
        title="Clear offerings for every stage of the journey"
        description="From first consultations to full-service delivery, align with a studio that fits your needs."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="grid gap-6 overflow-hidden rounded-3xl border border-foreground/10 bg-card/80 p-6 sm:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative h-48 overflow-hidden rounded-2xl border border-foreground/10">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="text-sm text-muted">{service.description}</p>
              <div className="mt-auto">
                <ButtonLink
                  href={service.ctaHref ?? "/contact"}
                  label={service.ctaLabel ?? "Learn more"}
                  variant="secondary"
                  external={
                    service.ctaHref
                      ? service.ctaHref.startsWith("http")
                      : false
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
