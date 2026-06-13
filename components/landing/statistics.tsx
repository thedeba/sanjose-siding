import { statsData } from "@/lib/data";
import { Card } from "../ui/card";

export function StatisticsSection() {
  return (
    <section className="bg-slate-950/95 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((item) => (
            <Card key={item.label} className="border-white/10 bg-slate-900/60">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
