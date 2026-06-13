import Link from "next/link";
import { Layers, TreeDeciduous, Wrench } from "lucide-react";
import { servicesData } from "@/lib/data";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export function ServicesPreview() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-500">SERVICES</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Siding services built for lasting curb appeal</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Full-service siding solutions from material selection through professional installation and local warranty support.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {servicesData.map((service) => (
            <Card key={service.slug} className="group overflow-hidden border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:bg-slate-900/80 hover:shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-500 shadow-sm shadow-cyan-500/10">
                  {service.icon === "Layers" ? <Layers className="h-6 w-6" /> : service.icon === "TreeDeciduous" ? <TreeDeciduous className="h-6 w-6" /> : <Wrench className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{service.description}</p>
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/services/${service.slug}`}>
                  <Button variant="ghost" className="text-cyan-400 hover:bg-white/5 hover:text-white">
                    Learn more
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
