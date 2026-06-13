import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function ServiceAreasPage() {
  const areas = (await prisma.serviceArea.findMany({ where: { published: true }, orderBy: { cityName: "asc" } })) as Array<{
    id: string;
    cityName: string;
    heroTitle: string;
    slug: string;
  }>;

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Service Areas</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">We serve the San Jose metro with same-day estimates.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">Explore the cities where our siding professionals deliver fast inspections, expert installations, and local support.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {areas.map((area) => (
            <Link key={area.id} href={`/service-areas/${area.slug}`}>
              <Card className="cursor-pointer border-white/10 bg-slate-900/95 p-6 transition hover:-translate-y-1 hover:bg-slate-800/95">
                <h2 className="text-2xl font-semibold text-white">{area.cityName}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{area.heroTitle}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
