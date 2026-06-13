import { prisma } from "../../../lib/prisma";
import { Card } from "../../../components/ui/card";

export default async function AdminSEOPage() {
  const seoSettings = await prisma.siteSetting.findFirst();

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">SEO</h1>
        <p className="mt-3 text-sm text-slate-400">Manage metadata, local schema entries, and page-level SEO details.</p>
      </div>
      <Card className="border-white/10 bg-slate-900/95 p-6">
        <h2 className="text-xl font-semibold text-white">Site Settings</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <p>Company name: {seoSettings?.companyName ?? "Not configured"}</p>
          <p>Email: {seoSettings?.email ?? "Not configured"}</p>
          <p>Phone: {seoSettings?.phone ?? "Not configured"}</p>
        </div>
      </Card>
    </div>
  );
}
