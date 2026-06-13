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
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Service Area</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Serving San Jose Exclusively</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">We focus our siding services exclusively on San Jose homeowners to ensure responsive support and premium installations.</p>
        </div>
        <div className="flex justify-center">
          {areas.map((area) => (
            <Link key={area.id} href={`/service-areas/${area.slug}`} className="w-full max-w-md">
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
