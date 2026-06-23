import type { Metadata } from "next";
import InspirationMasonry from "@/components/inspirations/InspirationMasonry";
import SectionHeader from "@/components/SectionHeader";
import { getAllInspirations } from "@/data";

export const metadata: Metadata = {
  title: "Inspirations",
  description: "Browse inspiration by room type, style, and mood.",
};

export default async function InspirationsPage() {
  const inspirations = getAllInspirations();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-12 sm:px-6">
      <SectionHeader
        eyebrow="Inspiration"
        title="Collect ideas across rooms, styles, and moods"
        description="Save references, craft your moodboard, and share with the right studio."
      />
      <InspirationMasonry inspirations={inspirations} />
    </div>
  );
}
