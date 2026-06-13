import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/20">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-slate-300">{siteConfig.name} operates the website and values the privacy of local homeowners. This policy explains what information we collect and how we use it.</p>
        <div className="space-y-6 text-slate-300">
          <div>
            <h2 className="text-xl font-semibold text-white">Information Collection</h2>
            <p className="mt-3 leading-7">We collect contact details and project information submitted through our estimate request form to respond effectively and schedule consultations.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Use of Information</h2>
            <p className="mt-3 leading-7">Information is used to manage leads, communicate appointment details, and improve our service offering in San Jose.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Data Retention</h2>
            <p className="mt-3 leading-7">Leads are retained until follow-up is complete and to maintain a record for customer support and service history.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
