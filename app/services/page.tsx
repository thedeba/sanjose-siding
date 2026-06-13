import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function ServicesPage() {
  const services = (await prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" } })) as Array<{
    id: string;
    title: string;
    shortDescription: string;
    slug: string;
  }>;

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Services</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Professional siding services for every San Jose home.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">Browse our contractor-grade siding offerings for vinyl, fiber cement, wood, repair, replacement, and emergency service.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="border-white/10 bg-slate-900/95 p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Service</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{service.title}</h2>
                </div>
                <p className="text-sm leading-7 text-slate-300">{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`} className="inline-flex text-sm font-semibold text-cyan-300 hover:text-white">
                  Learn more →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
