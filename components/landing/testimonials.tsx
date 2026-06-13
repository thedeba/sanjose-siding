import { testimonialsData } from "@/lib/data";
import { Card } from "../ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="bg-slate-950/95 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Client testimonials</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">San Jose homeowners trust our siding craftsmanship.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonialsData.map((item) => (
            <Card key={item.name} className="border-white/10 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">{item.name[0]}</div>
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.city}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <p>“{item.review}”</p>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4" />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
