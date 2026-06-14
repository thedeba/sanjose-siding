import { siteConfig } from "@/config/site";
import { ShieldCheck, Award, CheckCircle, MapPin, Building, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About San Jose Siding Pros | Local Siding Contractors",
  description: "Learn about San Jose Siding Pros, the leading local siding specialists in Silicon Valley. Our history, credentials, core values, and expert team.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const credentials = [
    {
      icon: <FileText className="h-6 w-6 text-cyan-400" />,
      title: "Licensed & Bonded",
      description: "California Contractor License #948210 (Class B & C-17 Siding Specialist) ensuring full compliance with state codes.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
      title: "$2M General Liability",
      description: "Fully insured with comprehensive liability and worker's compensation policies to protect your property.",
    },
    {
      icon: <Award className="h-6 w-6 text-cyan-400" />,
      title: "Certified Clean Site",
      description: "EPA Lead-Safe Certified Firm. We guarantee meticulous daily cleanups so your yard is safe for kids and pets.",
    },
  ];

  const team = [
    {
      name: "Mateo Silva",
      role: "Founder & Lead Estimator",
      bio: "Over 20 years of hands-on exterior construction experience in Northern California. Mateo oversees every estimate to ensure fair pricing and precise planning.",
    },
    {
      name: "Sarah Jenkins",
      role: "Project Coordinator",
      bio: "Keeping projects on schedule and budgets in line. Sarah manages material deliveries, permit requests, and coordinates with local HOAs.",
    },
    {
      name: "Efrain Torres",
      role: "Master Installer & Crew Chief",
      bio: "A VSI-certified vinyl and fiber cement specialist. Efrain has personally led over 450 residential siding installations in Santa Clara County.",
    },
  ];

  const values = [
    {
      title: "Radical Transparency",
      description: "No hidden charges, no bait-and-switch. Our detailed siding estimates breakdown material costs, permits, and labor transparently.",
    },
    {
      title: "Micro-Precision Work",
      description: "From custom corner trims to weather-resistant house wrap overlaps, we inspect every detail to prevent leaks and moisture trapping.",
    },
    {
      title: "Silicon Valley Standards",
      description: "We supply modern, energy-efficient siding panels (like James Hardie fiber cement and high-grade vinyl) built for long-term thermal performance.",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 text-white px-6 py-20 sm:px-8 lg:px-12 space-y-20">
      <div className="mx-auto max-w-6xl space-y-20">
        
        {/* Section 1: Hero Block */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
          
          <div className="relative space-y-6 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">About Us</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              San Jose Siding Contractors Built for Quality & Trust.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              At {siteConfig.name}, we do not just replace siding—we build engineered moisture defenses and high-end curb appeal for Silicon Valley homeowners. Rooted locally, we combine premium materials with unmatched craftsmanship.
            </p>
          </div>
        </section>

        {/* Section 2: Our Story / History */}
        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">Our Heritage</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From One Truck to Silicon Valley&apos;s Siding Experts
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Established in 2008 in San Jose, we started as a small, three-man crew specializing in storm-damage repairs. We noticed a common problem: many general contractors were installing siding without proper weather barriers, causing dry rot and hidden structural issues.
              </p>
              <p>
                We decided to specialize. By focusing exclusively on siding systems, insulation underlayments, and trim design, we built a reputation for bulletproof installations. Today, we operate a fully staffed local team, equipped to handle everything from historical wood restorations in the Rose Garden to fiber cement upgrades in Silver Creek.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Building className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Local Commitment</h4>
                <p className="text-xs text-slate-400">Silicon Valley Headquartered</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              We operate out of Alum Rock Ave and understand the unique microclimates of the South Bay—from dry summer heat in San Jose to the damp morning fog in Cupertino. All our materials are chosen to handle localized temperature swings and UV exposure.
            </p>
            <div className="border-t border-white/15 pt-4 flex gap-8">
              <div>
                <span className="block text-3xl font-extrabold text-cyan-400">1,250+</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Homes Sided</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-cyan-400">18+</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Years Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Credentials & Trust */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Fully Vetted & Certified</h2>
            <p className="text-sm text-slate-400">Credentials that keep your home project completely secure.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((cred, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 space-y-4 hover:border-cyan-500/20 transition-all duration-300 shadow-lg"
              >
                <div className="inline-block rounded-xl bg-cyan-500/10 p-3">{cred.icon}</div>
                <h3 className="text-lg font-bold text-white">{cred.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cred.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Neighborhood Focus */}
        <section className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 sm:p-12 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-3 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
                <MapPin className="h-4 w-4" /> Service Communities
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Expert HOA & Code Compliance</h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                We regularly coordinate with Homeowner Associations (HOAs) in premium residential communities, including **Willow Glen, Almaden Valley, Evergreen, Silver Creek, Rose Garden, and Santa Clara**. We ensure all vinyl or fiber cement styles perfectly match your neighborhood guidelines and acquire all necessary city permits on your behalf.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                "Fire-resistant fiber cement setups",
                "Wildland-Urban Interface (WUI) compliance",
                "High-performance vapor wrap boundaries",
                "Custom exterior color matching",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Team & Core Values */}
        <section className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">Our Pillars</p>
            <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We guide every siding project with these three principles to make sure you get a hassle-free, premium experience from design to final inspection.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-3">
            {values.map((val, idx) => (
              <div key={idx} className="rounded-2xl border border-white/5 bg-slate-900/30 p-6 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">0{idx + 1}</span>
                <h3 className="text-base font-bold text-white">{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Meet the Leadership */}
        <section className="space-y-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400 text-center">The Crew</p>
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Meet Our Leadership</h2>
            <p className="text-slate-400 text-sm text-center max-w-lg mx-auto">
              Our experts hold certifications across vinyl, fiber cement installation, and residential building safety.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 space-y-4 hover:bg-slate-900/60 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs text-cyan-400/80 font-semibold uppercase tracking-wider">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Final CTA Block */}
        <section className="rounded-[2.5rem] bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/10 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to upgrade your home siding?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a free, detailed site inspection with Mateo. We will check your siding condition, test for dry rot, and provide a comprehensive proposal.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-[1.03]"
            >
              Get My Free Quote
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
