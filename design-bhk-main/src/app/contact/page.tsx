import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ButtonLink from "@/components/ButtonLink";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with DesignBHK for interior design discovery.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-12 sm:px-6">
      {/* Header Section */}
      <SectionHeader
        eyebrow="Contact"
        title="Let's create something beautiful"
        description="Share your vision with us and we'll connect you with the perfect studio partners for your project."
        align="center"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Left Column - Contact Info */}
        <div className="flex flex-col gap-6">
          {/* Contact Info Card */}
          <div className="group relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-[0_20px_60px_-15px_rgba(var(--accent-shadow)/0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                DesignBHK Studio
              </h3>
              <p className="mt-2 text-sm text-muted">
                Your partner in exceptional interior design
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href="mailto:hello@designbhk.com"
                  className="flex items-start gap-4 text-muted transition-colors hover:text-accent-strong"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-card/50 transition-colors group-hover/item:border-accent/30 group-hover/item:bg-accent/10">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      Email
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      hello@designbhk.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919000000000"
                  className="flex items-start gap-4 text-muted transition-colors hover:text-accent-strong"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-card/50 transition-colors group-hover/item:border-accent/30 group-hover/item:bg-accent/10">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      Phone
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      +91 90000 00000
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-card/50">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      Address
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      222, Studio Lane, Bandra West
                      <br />
                      Mumbai, 400050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-card/50">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      Hours
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      Mon - Sat: 10:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href="/discover"
                  label="Browse Studios"
                  variant="secondary"
                />
                <ButtonLink
                  href="/services"
                  label="View Services"
                  variant="ghost"
                />
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="group relative h-72 overflow-hidden rounded-[28px] border border-foreground/10 bg-gradient-to-br from-accent/10 via-card/50 to-accent/5 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_20px_60px_-15px_rgba(var(--accent-shadow)/0.15)]">
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, var(--foreground) 1px, transparent 1px),
                    linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                  maskImage:
                    "radial-gradient(circle at center, black 40%, transparent 70%)",
                }}
              />
            </div>

            {/* Map Pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-8 animate-pulse rounded-full bg-accent/20" />
                <div className="absolute -inset-4 rounded-full bg-accent/30" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-accent" />
              </div>
            </div>

            {/* Location Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-foreground/10 bg-card/90 px-4 py-2 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Mumbai, India
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="relative">
          {/* Form Container */}
          <div className="relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:shadow-[0_20px_60px_-15px_rgba(var(--accent-shadow)/0.12)] sm:p-10">
            {/* Subtle gradient overlay */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative">
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Send us a message
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              <form className="space-y-6">
                {/* Name Row */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="group">
                    <label className="mb-2 flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted transition-colors group-focus-within:text-accent-strong">
                      First Name
                      <input
                        type="text"
                        className="w-full rounded-xl border border-foreground/15 bg-background/80 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 transition-all duration-300 focus:border-accent focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10"
                        placeholder="Aarav"
                      />
                    </label>
                  </div>
                  <div className="group">
                    <label className="mb-2 flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted transition-colors group-focus-within:text-accent-strong">
                      Last Name
                      <input
                        type="text"
                        className="w-full rounded-xl border border-foreground/15 bg-background/80 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 transition-all duration-300 focus:border-accent focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10"
                        placeholder="Kapoor"
                      />
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="mb-2 flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted transition-colors group-focus-within:text-accent-strong">
                    Email Address
                    <input
                      type="email"
                      className="w-full rounded-xl border border-foreground/15 bg-background/80 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 transition-all duration-300 focus:border-accent focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10"
                      placeholder="you@studio.com"
                    />
                  </label>
                </div>

                {/* Project Type */}
                <div className="group">
                  <label className="mb-2 flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted transition-colors group-focus-within:text-accent-strong">
                    Project Type
                    <select className="w-full cursor-pointer rounded-xl border border-foreground/15 bg-background/80 px-4 py-3.5 text-sm text-foreground transition-all duration-300 focus:border-accent focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10 [&>option]:bg-card [&>option]:text-foreground">
                      <option value="">Select project type...</option>
                      <option value="residence">Residence</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="retail">Boutique Retail</option>
                      <option value="office">Office Space</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="mb-2 flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted transition-colors group-focus-within:text-accent-strong">
                    Tell us about your project
                    <textarea
                      rows={5}
                      className="w-full resize-none rounded-xl border border-foreground/15 bg-background/80 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 transition-all duration-300 focus:border-accent focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10"
                      placeholder="Share details about timing, scope, location, and any inspirations..."
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-strong px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-accent hover:shadow-[0_15px_40px_rgba(var(--accent-shadow)/0.35)] focus:outline-none focus:ring-4 focus:ring-accent/30 active:scale-[0.98]"
                  >
                    <span>Send Inquiry</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Privacy Note */}
                <p className="text-center text-xs text-muted/80">
                  By submitting, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-accent-strong underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            question: "How quickly will you respond?",
            answer:
              "We typically respond to all inquiries within 24 hours during business days.",
          },
          {
            question: "Do you offer virtual consultations?",
            answer:
              "Yes, we offer both in-person and virtual consultations to accommodate your schedule.",
          },
          {
            question: "What areas do you serve?",
            answer:
              "We primarily serve Mumbai and surrounding areas, with select projects across India.",
          },
        ].map((faq, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-foreground/10 bg-card/50 p-6 transition-all duration-300 hover:border-accent/20 hover:bg-card"
          >
            <h4 className="font-display text-base font-semibold text-foreground">
              {faq.question}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
