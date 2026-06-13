import { processSteps } from "@/lib/data";
import { Card } from "../ui/card";
import { Palette, Search, ShieldCheck, Sparkles } from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Palette,
  Sparkles,
  ShieldCheck,
};

export function ProcessSection() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-500">Process</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Our siding process in four clear steps</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = icons[step.icon] || Search;
            return (
              <Card key={step.title} className="border-slate-200/80 bg-white/95">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-slate-950">Step {index + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
