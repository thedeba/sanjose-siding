import { prisma } from "../../../lib/prisma";
import { HomepageManager } from "../../../components/admin/homepage-manager";

export default async function AdminHomepagePage() {
  const sections = await prisma.homepageSection.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Homepage</h1>
        <p className="mt-3 text-sm text-slate-400">Update hero content, service highlights, and featured homepage sections.</p>
      </div>
      <HomepageManager initialSections={sections} />
    </div>
  );
}

