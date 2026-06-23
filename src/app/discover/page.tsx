import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import DiscoveryGrid from "@/components/discover/DiscoverGrid";
import { getAllEntities } from "@/data";

export const metadata: Metadata = {
  title: "Discovery",
  description: "Browse interior designers, architects, and studios by style.",
};

export default async function DiscoveryPage() {
  const professionals = getAllEntities();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-12 sm:px-6">
      <SectionHeader
        eyebrow="Discovery"
        title="Meet the professionals shaping modern interiors"
        description="Filter by profession, style, and location to find the right team."
      />
      <DiscoveryGrid professionals={professionals} />
    </div>
  );
}
