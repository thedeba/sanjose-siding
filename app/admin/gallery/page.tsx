import { prisma } from "../../../lib/prisma";
import { GalleryManager } from "../../../components/admin/gallery-manager";

export default async function AdminGalleryPage() {
  const photos = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Gallery</h1>
        <p className="mt-3 text-sm text-slate-400">Upload and manage gallery images for case studies, before/after, and portfolio items.</p>
      </div>
      <GalleryManager initialPhotos={photos} />
    </div>
  );
}

