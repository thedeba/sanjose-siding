import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function BlogPage() {
  const posts = (await prisma.blog.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" } })) as Array<{
    id: string;
    category: string;
    title: string;
    excerpt: string;
    slug: string;
  }>;

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Local siding expertise for homeowners in the Bay Area.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">Browse helpful articles on siding materials, maintenance, repair, and energy-efficient upgrades.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="border-white/10 bg-slate-900/95 p-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">{post.category}</p>
                <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
                <p className="text-sm leading-7 text-slate-300">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex text-sm font-semibold text-cyan-300 hover:text-white">
                  Read article →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
