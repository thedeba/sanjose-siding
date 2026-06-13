"use client";

import { Phone, CheckCircle, Shield, Award } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  return (
    <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Call to Get Your Free Siding Estimate</h2>
        <p className="text-sm leading-7 text-slate-300">
          We do not require you to fill out long, tedious forms. Speak directly with a local San Jose siding expert today. Get your estimate, ask questions, or schedule an inspection instantly.
        </p>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Instant Consultation</p>
              <p className="text-xs text-slate-400">No waiting for email replies. Talk to a real person immediately.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Transparent & Direct Pricing</p>
              <p className="text-xs text-slate-400">Get local rates for vinyl, fiber cement, and wood siding options.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Same-Week Inspections</p>
              <p className="text-xs text-slate-400">Secure your appointment slot over the phone in under 2 minutes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 mt-6 border-t border-white/5 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Direct Dispatch Line</p>
        <a 
          href={`tel:${siteConfig.phone}`} 
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan-500 hover:bg-cyan-600 px-6 py-4 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300"
        >
          <Phone className="h-5 w-5 animate-pulse" /> Call Now: {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
