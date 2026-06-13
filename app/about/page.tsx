import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 text-white px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">About Us</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">San Jose siding contractors built for quality and trust.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            At {siteConfig.name}, we deliver high-conversion exterior renovations through experience, strong communication, and local project management. Our crew specializes in vinyl, fiber cement, wood siding, repairs, and emergency response across the South Bay.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-slate-300 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-400">Mission</p>
            <p className="mt-4 text-lg">Provide trusted siding performance with modern materials, transparency, and on-time delivery.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-slate-300 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-400">Vision</p>
            <p className="mt-4 text-lg">Create stronger, more beautiful homes in Silicon Valley by combining premium siding systems with exceptional service.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-slate-300 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-400">Promise</p>
            <p className="mt-4 text-lg">Every project includes clear pricing, local craftspeople, and a satisfaction guarantee backed by warranty coverage.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
