import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  cover: string;
  publishedAt: string;
  tags: string[];
  content: string;
  contentHtml: string;
};

export type BlogPostMeta = Omit<BlogPost, "content" | "contentHtml">;

function ensureBlogsDirectory() {
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
  }
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  ensureBlogsDirectory();

  const fileNames = fs.readdirSync(blogsDirectory);
  const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

  const posts = markdownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "",
      readTime: data.readTime || "",
      cover: data.cover || "",
      publishedAt: data.publishedAt || "",
      tags: data.tags || [],
    };
  });

  // Sort by publishedAt date (newest first)
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  ensureBlogsDirectory();

  const fullPath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Process markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-link"],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    category: data.category || "",
    readTime: data.readTime || "",
    cover: data.cover || "",
    publishedAt: data.publishedAt || "",
    tags: data.tags || [],
    content,
    contentHtml,
  };
}

export async function getAllBlogSlugs(): Promise<string[]> {
  ensureBlogsDirectory();

  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
