import { prisma } from "../../../lib/prisma";
import { NavigationManager } from "../../../components/admin/navigation-manager";

export default async function AdminNavigationPage() {
  const navItems = await prisma.navigationMenu.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Navigation</h1>
        <p className="mt-3 text-sm text-slate-400">Maintain your header menu, dropdown items, and route structure.</p>
      </div>
      <NavigationManager initialItems={navItems} />
    </div>
  );
}

