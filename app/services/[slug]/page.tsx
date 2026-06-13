import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { buildMetadata } from "../../../lib/seo";

export async function generateStaticParams() {
  const services = (await prisma.service.findMany({ where: { published: true }, select: { slug: true } })) as Array<{ slug: string }>;
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return { title: "Service not found" };
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    pathname: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) notFound();

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
          <Link href="/services" className="text-sm text-cyan-300 hover:text-white">← Back to services</Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{service.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{service.shortDescription}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_0.5fr]">
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
            <h2 className="text-2xl font-semibold text-white">What we do</h2>
            <p className="text-slate-300 leading-8">{service.fullContent}</p>
          </div>
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Featured</p>
            <p className="text-lg font-semibold text-white">Why homeowners choose this service</p>
            <ul className="space-y-3 text-slate-300">
              <li>• Local siding expertise</li>
              <li>• Efficient installation timelines</li>
              <li>• Premium component selection</li>
              <li>• Long-term performance guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
