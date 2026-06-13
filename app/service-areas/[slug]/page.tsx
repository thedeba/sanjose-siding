import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { buildMetadata } from "../../../lib/seo";

export async function generateStaticParams() {
  const areas = (await prisma.serviceArea.findMany({ where: { published: true }, select: { slug: true } })) as Array<{ slug: string }>;
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await prisma.serviceArea.findUnique({ where: { slug } });
  if (!area) return { title: "Service area not found" };
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    pathname: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await prisma.serviceArea.findUnique({ where: { slug } });
  if (!area) notFound();

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
          <Link href="/service-areas" className="text-sm text-cyan-300 hover:text-white">← Back to service areas</Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{area.heroTitle}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">We deliver high-quality siding work to homeowners in {area.cityName}. Local inspections, transparent pricing, and long-term support are included.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_0.5fr]">
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
            <p className="text-slate-300 leading-8">{area.content}</p>
          </div>
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Local Advantage</p>
            <ul className="space-y-3 text-slate-300">
              <li>• San Jose-based support team</li>
              <li>• Same-week walkthroughs</li>
              <li>• Fire-safe material options</li>
              <li>• Neighborhood-friendly project management</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
