import { prisma } from "../../../lib/prisma";
import { ServiceManager } from "../../../components/admin/service-manager";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ 
    orderBy: { order: "asc" } 
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Services</h1>
        <p className="mt-3 text-sm text-slate-400">Update service pages and maintain your contractor offering list.</p>
      </div>
      <ServiceManager initialServices={services} />
    </div>
  );
}
