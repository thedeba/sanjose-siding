import { prisma } from "../../../lib/prisma";
import { FAQManager } from "../../../components/admin/faq-manager";

export default async function AdminFAQsPage() {
  const faqs = await prisma.fAQ.findMany({ 
    orderBy: { sortOrder: "asc" } 
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">FAQs</h1>
        <p className="mt-3 text-sm text-slate-400">Organize frequently asked questions for better customer clarity and search performance.</p>
      </div>
      <FAQManager initialFAQs={faqs} />
    </div>
  );
}
