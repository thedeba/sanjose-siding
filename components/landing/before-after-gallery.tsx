import { Card } from "../ui/card";

const projects = [
  { title: "Complete house re-side", type: "Final finish" },
  { title: "Storm damage repair", type: "Emergency response" },
  { title: "Modern trim upgrade", type: "Curb appeal" },
];

export function BeforeAfterGallery() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-500">Before & after</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Transformations that improve value and weather protection.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden border-white/10 bg-slate-900/60">
              <div className="space-y-5 p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-40 rounded-3xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-100" />
                  <div className="h-40 rounded-3xl bg-gradient-to-br from-cyan-500 via-slate-700 to-slate-950" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-500">{project.type}</p>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
