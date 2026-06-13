import { prisma } from "../../../lib/prisma";
import { BlogManager } from "../../../components/admin/blog-manager";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Blogs</h1>
        <p className="mt-3 text-sm text-slate-400">Create, edit, publish and manage your siding blog content.</p>
      </div>
      <BlogManager initialBlogs={blogs} />
    </div>
  );
}

