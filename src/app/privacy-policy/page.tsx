import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how DesignBHK handles data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 pb-24 pt-12 sm:px-6">
      <SectionHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="A transparent overview of how we handle information on the Discovery Site."
      />
      <div className="space-y-6 text-base text-muted">
        <p>
          We only collect information you choose to share with us through the
          contact form or direct outreach. This can include name, email, and
          project details.
        </p>
        <p>
          We do not sell your information. Data is used to respond to inquiries,
          connect you with appropriate studios, and improve the content
          experience.
        </p>
        <p>
          This Discovery Site links to a separate Shopping Site. Any purchases
          or data collected there follow that site&apos;s privacy policy.
        </p>
        <p>
          For questions about data handling, please contact
          hello@designbhk.com.
        </p>
      </div>
    </div>
  );
}
