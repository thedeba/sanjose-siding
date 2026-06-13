import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { buildMetadata } from "../../../lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) notFound();

  const mdxSource = await serialize(post.content);

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
          <Link href="/blog" className="text-sm text-cyan-300 hover:text-white">← Back to blog</Link>
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">{post.category}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="text-lg leading-8 text-slate-300">{post.excerpt}</p>
        </div>
        <Card className="rounded-[2rem] border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
          <MDXRemote source={mdxSource} />
        </Card>
      </div>
    </main>
  );
}
