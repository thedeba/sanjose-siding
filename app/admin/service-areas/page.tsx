import { prisma } from "../../../lib/prisma";
import { ServiceAreaManager } from "../../../components/admin/service-area-manager";

export default async function AdminServiceAreasPage() {
  const areas = await prisma.serviceArea.findMany({
    orderBy: { cityName: "asc" },
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Service Areas</h1>
        <p className="mt-3 text-sm text-slate-400">Manage city landing pages and local SEO content for the Bay Area.</p>
      </div>
      <ServiceAreaManager initialAreas={areas} />
    </div>
  );
}

