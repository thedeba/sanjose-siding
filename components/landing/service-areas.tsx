import Link from "next/link";
import { areaCards } from "@/lib/data";
import { Card } from "../ui/card";
import { MapPin } from "lucide-react";

export function ServiceAreasSection() {
  return (
    <section className="bg-slate-950/95 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Service Area</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Serving San Jose Exclusively</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Responsive local siding service focused exclusively on San Jose homeowners with emergency support and same-week inspections.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          {areaCards.map((area) => (
            <Link key={area.slug} href={`/service-areas/${area.slug}`} className="w-full max-w-md">
              <Card className="group cursor-pointer border-white/10 bg-slate-900/90 p-6 transition hover:-translate-y-1 hover:bg-slate-800/95">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{area.city}</h3>
                    <p className="mt-2 text-sm text-slate-400">Fast siding estimates and responsive project teams.</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
