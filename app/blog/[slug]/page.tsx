import { notFound } from "next/navigation";
import Link from "next/link";
import { ComponentProps } from "react";
import { prisma } from "../../../lib/prisma";
import { buildMetadata } from "../../../lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Card } from "../../../components/ui/card";

export async function generateStaticParams() {
  const posts = (await prisma.blog.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } })) as Array<{ slug: string }>;
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) return { title: "Blog article not found" };
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    pathname: `/blog/${post.slug}`,
  });
}

// Custom components to render markdown tags with premium Tailwind styles
const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="text-3xl font-extrabold tracking-tight mt-8 mb-4 text-white" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-2xl font-bold tracking-tight mt-8 mb-4 text-white border-b border-white/5 pb-2" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-xl font-bold tracking-tight mt-6 mb-3 text-white" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-base text-slate-300 leading-relaxed mb-6" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 mb-6 text-slate-300 space-y-2" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6 mb-6 text-slate-300 space-y-2" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="text-slate-300 text-sm sm:text-base" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-300" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="border-l-4 border-cyan-500 pl-4 italic my-6 text-slate-400 bg-slate-900/30 py-3 pr-4 rounded-r-2xl" {...props} />
  ),
  img: ({ alt, ...props }: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className="rounded-2xl border border-white/10 my-8 max-h-[450px] w-full object-cover shadow-2xl transition-all duration-300 hover:border-cyan-500/20"
      loading="lazy"
      {...props}
    />
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) notFound();

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Breadcrumb Header Block */}
        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
            ← Back to blog directory
          </Link>
          <div className="pt-2">
            <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-slate-300">
            {post.excerpt}
          </p>
        </div>

        {/* MDX Remote Content Card with Unified Image Header */}
        <Card className="rounded-[2rem] border border-white/10 bg-slate-900/40 shadow-2xl shadow-slate-950/20 backdrop-blur-md overflow-hidden p-0">
          {post.featuredImage && (
            <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-slate-950 border-b border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>
          )}
          <div className="p-8 sm:p-12">
            <article className="max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>
          </div>
        </Card>
      </div>
    </main>
  );
}
