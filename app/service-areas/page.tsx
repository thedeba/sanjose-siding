import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

export const metadata = {
  title: "Siding Service Areas | Silicon Valley & South Bay",
  description: "San Jose Siding Pros provides premium siding replacement, repair, and installation services across San Jose, Santa Clara, Sunnyvale, Cupertino, and Mountain View.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default async function ServiceAreasPage() {
  const areas = (await prisma.serviceArea.findMany({
    where: { published: true },
    orderBy: { cityName: "asc" },
  })) as Array<{
    id: string;
    cityName: string;
    heroTitle: string;
    slug: string;
  }>;

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Header section with rich typography */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">
            Locations We Serve
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Siding Service Areas
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            We provide local siding replacement, repair, and code-compliant installations for residential homeowners across the South Bay and Silicon Valley.
          </p>
        </div>

        {/* Responsive Service Areas Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link key={area.id} href={`/service-areas/${area.slug}`} className="group">
              <Card className="h-full flex flex-col justify-between cursor-pointer border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-500 hover:border-cyan-500/20 hover:-translate-y-1.5">
                <div className="space-y-4">
                  {/* Location Icon Tag */}
                  <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-400">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Santa Clara County</span>
                  </div>

                  {/* City Name */}
                  <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {area.cityName}
                  </h2>

                  {/* Title Preview */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {area.heroTitle}
                  </p>
                </div>

                {/* Arrow Navigation Indicator */}
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                  <span>View Local Services</span>
                  <Navigation className="h-3.5 w-3.5 rotate-45" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
