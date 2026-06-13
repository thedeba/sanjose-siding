import { statsData } from "@/lib/data";
import { Card } from "../ui/card";

export function StatisticsSection() {
  return (
    <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((item) => (
            <Card key={item.label} className="border-slate-200/80 bg-white/95">
              <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
