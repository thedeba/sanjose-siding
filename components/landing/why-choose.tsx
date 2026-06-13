import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ShieldCheck, Sparkles, Clock3, Building2 } from "lucide-react";

const benefits = [
  { title: "Local San Jose Team", description: "Trusted home siding specialists with deep Bay Area experience.", icon: ShieldCheck },
  { title: "Premium Materials", description: "We source top-rated siding brands for durability and style.", icon: Sparkles },
  { title: "Timely Execution", description: "Fast communication and clean jobsite management on every project.", icon: Clock3 },
  { title: "Warranty Backed", description: "We stand behind our work with clear craftsmanship warranties.", icon: Building2 },
];

export function WhyChooseSection() {
  return (
    <section className="bg-slate-950/95 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl space-y-4">
          <Badge className="bg-cyan-500/10 text-cyan-200">Why choose us</Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Precision siding service designed for modern home value.</h2>
          <p className="text-base leading-8 text-slate-300">From free consultations to professional follow-up, we keep your project on schedule and your home protected.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-white/10 bg-slate-900/90">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
