import { Card } from "../ui/card";
import { prisma } from "../../lib/prisma";

const defaultProjects = [
  {
    id: "default-1",
    title: "Complete house re-side",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    beforeAfter: true,
  },
  {
    id: "default-2",
    title: "Storm damage repair",
    category: "Emergency",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    beforeAfter: true,
  },
  {
    id: "default-3",
    title: "Modern trim upgrade",
    category: "Curb Appeal",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    beforeAfter: true,
  },
];

export async function BeforeAfterGallery() {
  // Fetch up to 3 before/after images from the database
  const dbPhotos = await prisma.gallery.findMany({
    where: { beforeAfter: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // Combine database items with default high-quality projects to guarantee 3 items are shown
  const projects = [
    ...dbPhotos,
    ...defaultProjects.slice(dbPhotos.length),
  ];

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">Before & After</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Real Transformations, Lasting Protection
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            See how our premium siding upgrades elevate home value and defense against harsh Pacific weather.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 p-0 rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-500 hover:border-cyan-500/20"
            >
              <div className="space-y-6 p-6">
                {/* Before / After Split View */}
                <div className="grid gap-3 grid-cols-2 relative">
                  {/* Before State (Visual simulation via CSS filters) */}
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950 border border-white/5 group-hover:shadow-lg transition-all duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.title} Before`}
                      className="h-full w-full object-cover filter grayscale contrast-[0.95] brightness-[0.7] sepia-[0.1] blur-[0.5px]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                    <span className="absolute bottom-2 left-2 rounded-lg bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-300 uppercase border border-white/5">
                      Before
                    </span>
                  </div>

                  {/* After State (Full color and vibrant) */}
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/10 group-hover:border-cyan-500/30 group-hover:shadow-lg transition-all duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.title} After`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-lg bg-cyan-500 px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-950 uppercase shadow-md shadow-cyan-500/25">
                      After
                    </span>
                  </div>
                </div>

                {/* Project details */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Siding installation showcasing premium craftsmanship and detailed trim finishes.
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
