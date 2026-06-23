import { Suspense } from "react";
import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { FeaturedDiscoverySection } from "@/components/home/FeaturedDiscoverSection";
import { TestimonialsBentoSection } from "@/components/home/TestimonialsBentoSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ShoppingCtaSection } from "@/components/home/ShoppingCtaSection";
import { AiStudioPreviewSection } from "@/components/home/AiStudioPreviewSection";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HeroFullWidth />
      <Reveal>
        <HowItWorksSection />
      </Reveal>
      <Reveal>
        <AiStudioPreviewSection />
      </Reveal>
      <Reveal>
        <TestimonialsBentoSection />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <Suspense fallback={null}>
          <FeaturedDiscoverySection />
        </Suspense>
      </Reveal>
      <Reveal>
        <ShoppingCtaSection />
      </Reveal>
    </div>
  );
}
