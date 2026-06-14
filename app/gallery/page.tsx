import { prisma } from "../../lib/prisma";
import { GalleryClient } from "../../components/gallery/gallery-client";

export const metadata = {
  title: "Project Gallery | San Jose Siding Pros",
  description: "Explore our completed siding projects in San Jose, CA and across the South Bay. High-quality vinyl, fiber cement, and wood siding installations.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function GalleryPage() {
  const photos = await prisma.gallery.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header section with high-end typography */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">
            Our Portfolio
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Siding Project Gallery
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Take a look at our premium siding installations, replacements, and storm damage repairs completed across the South Bay area.
          </p>
        </div>

        {/* Dynamic Gallery Client view */}
        <GalleryClient photos={photos} />
      </div>
    </main>
  );
}
