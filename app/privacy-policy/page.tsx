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
            <p className="mt-3 leading-7">We do not provide contact or quote submission forms. We process your phone number and details provided directly when you contact us via our phone line to connect you with siding services and schedule consultations.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Use of Information</h2>
            <p className="mt-3 leading-7">Information is used to connect you with local siding service professionals, manage phone inquiries, and improve service delivery in the San Jose area.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Data Retention</h2>
            <p className="mt-3 leading-7">Phone call logs and service inquiry details are retained to ensure customer support continuity and service history verification.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
