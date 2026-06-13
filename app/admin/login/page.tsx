import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-5xl gap-12 rounded-[3rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:grid-cols-[0.9fr_0.7fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Admin access</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Secure dashboard access for {siteConfig.name}</h1>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            Manage leads, services, blogs, site settings and SEO from a single secured admin portal.
          </p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
