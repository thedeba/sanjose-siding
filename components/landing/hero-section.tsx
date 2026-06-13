import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Home } from "lucide-react";
import { heroData } from "@/lib/data";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_42%),linear-gradient(180deg,_#020617_0%,_#111827_100%)] px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8 text-white">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-100 shadow-lg shadow-cyan-500/10 backdrop-blur-xl">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Local siding expertise for San Jose homeowners
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {heroData.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {heroData.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/contact">
              <Button className="w-full sm:w-auto">Get a Free Quote</Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" className="w-full sm:w-auto">
                View Services
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {heroData.trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-3 rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-slate-950/20">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                {badge}
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="flex flex-col gap-4 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.2),_transparent_35%)] p-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-cyan-100">
              <Home className="h-4 w-4 text-cyan-300" />
              Premium siding projects
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6">
                <h2 className="text-lg font-semibold text-white">Project Spotlight</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">From vinyl overlays to complete replacement, our local crew delivers durable siding systems that stand up to Bay Area weather.</p>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-5 py-4 text-sm text-slate-200">
                <span>Average install time</span>
                <strong>5 Days</strong>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
              <ArrowRight className="h-4 w-4 text-cyan-300" />
              Award-winning customer care
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
