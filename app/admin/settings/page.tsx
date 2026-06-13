import { prisma } from "../../../lib/prisma";
import { SettingsForm } from "../../../components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findFirst();

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-3 text-sm text-slate-400">Configure company information, contact details, and local business profile.</p>
      </div>
      <SettingsForm initialData={settings} />
    </div>
  );
}
