import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { Card } from "../../../components/ui/card";

export default async function AdminLeadsPage() {
  const leads = (await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 })) as Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    service: string;
    status: string;
  }>;

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Leads</h1>
        <p className="mt-3 text-sm text-slate-400">Manage inbound contact requests, lead status, and project follow-up.</p>
      </div>
      <div className="grid gap-4">
        {leads.length ? (
          leads.map((lead) => (
            <Card key={lead.id} className="border-white/10 bg-slate-900/95 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">{lead.name}</h2>
                  <p className="text-sm text-slate-400">{lead.email} • {lead.phone}</p>
                </div>
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-300">{lead.status}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{lead.message}</p>
              <div className="mt-4 text-sm text-slate-400">Service requested: {lead.service}</div>
            </Card>
          ))
        ) : (
          <Card className="border-dashed border-white/10 bg-slate-900/80 p-6 text-slate-400">No leads found yet.</Card>
        )}
      </div>
    </div>
  );
}
