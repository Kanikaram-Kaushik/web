import type { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import SectionHeader from "@/components/SectionHeader";
import { getBlogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, guides, and trends from the design world.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-12 sm:px-6">
      <SectionHeader
        eyebrow="Journal"
        title="Design intelligence for modern living"
        description="Read practical guides, trend reports, and insights from leading studios."
      />
      <BlogList posts={posts} />
    </div>
  );
}
