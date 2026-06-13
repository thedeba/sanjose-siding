import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/20">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="text-slate-300">The following terms govern the use of {siteConfig.name}. By accessing this website, you agree to the policies described below.</p>
        <div className="space-y-6 text-slate-300">
          <div>
            <h2 className="text-xl font-semibold text-white">Service Scope</h2>
            <p className="mt-3 leading-7">We provide siding repair, replacement, and installation services through scheduled consultations and written estimates.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Scheduling and Payment</h2>
            <p className="mt-3 leading-7">Appointments and deposits are confirmed in writing. Payment terms are established prior to project start.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Liability</h2>
            <p className="mt-3 leading-7">Our company is licensed and insured. We make best efforts to deliver accurate estimates and high-quality workmanship.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
