import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function LeadCTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <div className="rounded-[3rem] border border-slate-200/10 bg-gradient-to-r from-cyan-500/10 via-slate-950/95 to-slate-950/90 p-10 shadow-2xl shadow-slate-950/20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Badge className="bg-cyan-500/10 text-cyan-200">Call for an estimate</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to secure your home with premium siding?</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Call our local San Jose siding specialists today to discuss your project, get a free over-the-phone estimate, or schedule a same-week inspection.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:(408)555-0199" className="w-full">
              <Button className="w-full text-base font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-950 py-6 rounded-full flex items-center justify-center gap-2">
                Call Now: (408) 555-0199
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
