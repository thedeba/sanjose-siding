import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { buildMetadata } from "../../../lib/seo";
import { siteConfig } from "../../../config/site";
import { CheckCircle2, Phone, Calendar, BadgeCheck, FileCheck } from "lucide-react";

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

  // Bullet points tailored to each service type
  const trustPoints = [
    { title: "Vetted Local Crew", desc: "All installers are local to Santa Clara County and fully background-checked." },
    { title: "Permit Acquisition", desc: "We handle all building permits and local HOA approvals on your behalf." },
    { title: "10-Year Craftsmanship", desc: "Backed by our double-layered waterproofing warranty for peace of mind." },
  ];

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12 space-y-12">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link href="/services" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
            ← Back to all services
          </Link>
        </div>

        {/* Premium Hero Block with Image Overlay */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 sm:p-12 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          
          <div className="space-y-4 flex-1">
            <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              Silicon Valley Standard
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              {service.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
          </div>

          {service.featuredImage && (
            <div className="relative h-64 w-full md:w-80 lg:w-96 flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 shadow-xl group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.featuredImage}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
          )}
        </section>

        {/* Main Columns */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left Column: Full Copy parsed to paragraphs */}
          <section className="space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 sm:p-10 shadow-xl backdrop-blur-md">
            <h2 className="text-2xl font-bold tracking-tight text-white pb-4 border-b border-white/5">
              Service Overview & Specifications
            </h2>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              {service.fullContent.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-base text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Process Steps */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">Our Zero-Compromise Approach</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 items-start">
                  <BadgeCheck className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">VSI & Brand Certified</h4>
                    <p className="text-xs text-slate-400">Trained installers matching all manufacturer guidelines.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <FileCheck className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">Full Insurance Shield</h4>
                    <p className="text-xs text-slate-400">$2M Liability &amp; full worker&apos;s comp for worry-free builds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: CTA & Credential Panel */}
          <aside className="space-y-6">
            {/* Instant Action Form */}
            <div className="rounded-[2rem] border border-cyan-500/10 bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-blue-950/20 p-8 shadow-xl space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">Request Service</p>
                <h3 className="text-xl font-bold text-white">Get a Detailed Quote</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Book an inspection with our lead estimator. We will evaluate your siding and provide a transparent, written estimate.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-cyan-600 transition duration-300 shadow-md shadow-cyan-500/25"
                >
                  <Phone className="h-4 w-4" /> Call {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-slate-950 py-3.5 text-sm font-bold text-white hover:bg-slate-900 transition duration-300"
                >
                  <Calendar className="h-4 w-4" /> Schedule Inspection
                </Link>
              </div>
            </div>

            {/* Local Security Bullets */}
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 shadow-xl space-y-6">
              <h4 className="text-base font-bold text-white">Trust & Credibility</h4>
              <div className="space-y-4">
                {trustPoints.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-white text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
