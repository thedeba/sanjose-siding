import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Siding Blog & Guides | San Jose Siding Pros",
  description: "Browse helpful articles, guides, and checklists on home siding replacement, materials, maintenance, and repairs from local experts in San Jose, CA.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = (await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  })) as Array<{
    id: string;
    category: string;
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: string;
  }>;

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">
            Blog & Resources
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Local Siding Expertise & Guides
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Browse our helpful articles on siding materials, home maintenance checklist tips, and energy efficiency upgrades for your Bay Area home.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full flex flex-col justify-between cursor-pointer border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 p-0 rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-500 hover:border-cyan-500/20 hover:-translate-y-1.5">
                <div className="space-y-6">
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden rounded-t-[2rem] bg-slate-950 border-b border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    </div>
                  )}
                  
                  <div className="px-6 space-y-3">
                    <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
