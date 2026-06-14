import { prisma } from "@/lib/prisma";
import { FAQClient } from "@/components/faq/faq-client";

export const metadata = {
  title: "Frequently Asked Questions | San Jose Siding Pros",
  description: "Get answers to common siding questions asked by Silicon Valley homeowners. Learn about materials, siding replacement costs, HOA guidelines, permits, and repair warranties.",
  alternates: {
    canonical: "/faq",
  },
};

export default async function FAQPage() {
  // Fetch FAQs dynamically from the database
  const faqs = await prisma.fAQ.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">
            Support Center
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about siding materials, project timelines, city permits, and craftsmanship warranties in the South Bay area.
          </p>
        </div>

        {/* Dynamic FAQ Client Dashboard */}
        <FAQClient faqs={faqs} />
      </div>
    </main>
  );
}
