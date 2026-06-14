import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { buildMetadata } from "../../../lib/seo";
import { siteConfig } from "../../../config/site";
import { MapPin, Phone, Calendar, ShieldCheck, CheckCircle2, Award } from "lucide-react";

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

  // Local neighborhoods and landmarks list based on slug to make it feel highly realistic
  const getLocalFeatures = (citySlug: string) => {
    switch (citySlug) {
      case "san-jose":
        return ["Willow Glen", "Almaden Valley", "Evergreen", "Rose Garden", "Silver Creek"];
      case "santa-clara":
        return ["Rivermark", "Kifer", "Old Quad", "Central Park", "El Camino"];
      case "sunnyvale":
        return ["Heritage District", "Ortega", "Birdland", "Cherry Chase", "Lowland"];
      case "cupertino":
        return ["Monta Vista", "Rancho Rinconada", "Oak Valley", "Seven Springs", "Canyon"];
      case "mountain-view":
        return ["Old Mountain View", "Rex Manor", "Monta Loma", "Cuesta Park", "Whisman"];
      default:
        return ["Downtown", "Residential Areas", "Historical Districts"];
    }
  };

  const localNeighborhoods = getLocalFeatures(slug);

  const localTrustPoints = [
    { title: "Local Code Compliance", desc: "We ensure all materials and spacings match localized city permits and fire-safety standards." },
    { title: "HOA Guidelines Expertise", desc: "Pre-approved styles that align perfectly with neighborhood association rules." },
    { title: "Same-Week Site Visits", desc: "Local estimator dispatch for rapid inspection and consultation." },
  ];

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12 space-y-12">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link href="/service-areas" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
            ← Back to service areas
          </Link>
        </div>

        {/* Hero Header Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

          <div className="relative space-y-6 max-w-4xl">
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/10">
              <MapPin className="h-3.5 w-3.5" />
              <span>{area.cityName}, CA Service Hub</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              {area.heroTitle}
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              We deliver premium siding replacement, dry rot repairs, and complete exterior restorations to residential properties across {area.cityName} and surrounding neighborhoods.
            </p>
          </div>
        </section>

        {/* Main Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left Column: Local Copy & Neighborhood Details */}
          <div className="space-y-8">
            {/* Local Overview */}
            <section className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 sm:p-10 shadow-xl backdrop-blur-md">
              <h2 className="text-2xl font-bold tracking-tight text-white pb-4 border-b border-white/5">
                Local Siding Services & Standards
              </h2>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                {area.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Neighborhoods Served List */}
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 sm:p-10 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-400" /> Neighborhoods We Serve in {area.cityName}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {localNeighborhoods.map((name, index) => (
                  <div key={index} className="flex items-center gap-3 bg-slate-950/40 border border-white/5 rounded-xl p-4">
                    <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">{name} Neighborhoods</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: CTA Panel & Local trust markers */}
          <aside className="space-y-6">
            {/* Instant Action CTA Card */}
            <div className="rounded-[2rem] border border-cyan-500/10 bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-blue-950/20 p-8 shadow-xl space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">Local Inspections</p>
                <h3 className="text-xl font-bold text-white">Free Siding Estimate</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ready to upgrade your home exterior? Schedule a comprehensive, code-compliant consultation with our estimator team.
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
                  <Calendar className="h-4 w-4" /> Schedule Online
                </Link>
              </div>
            </div>

            {/* Local advantage items */}
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <Award className="h-5 w-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Local Advantages</h4>
              </div>
              <div className="space-y-4">
                {localTrustPoints.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <ShieldCheck className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
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
