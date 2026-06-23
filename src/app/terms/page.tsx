import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Review the terms for using the DesignBHK Discovery Site.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 pb-24 pt-12 sm:px-6">
      <SectionHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Guidelines for using the DesignBHK Discovery Site."
      />
      <div className="space-y-6 text-base text-muted">
        <p>
          The Discovery Site provides informational content and introductions to
          design professionals. It does not offer direct purchasing or payment
          flows.
        </p>
        <p>
          Profiles and inspiration content are for reference. Always validate
          project timelines, budgets, and deliverables directly with the studio.
        </p>
        <p>
          External links, including the Shopping Site, are provided for
          convenience and are governed by their own terms and policies.
        </p>
        <p>
          By using this site, you agree to these terms. For questions, reach out
          to hello@designbhk.com.
        </p>
      </div>
    </div>
  );
}
