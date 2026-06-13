import { ContactForm } from "../../components/contact/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_0.7fr]">
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Request a free consultation and estimate today.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Our local team responds quickly to San Jose siding needs, whether you need a repair, replacement, or emergency service.
          </p>
          <div className="grid gap-4 rounded-[2rem] bg-slate-950/90 p-6 text-slate-300 shadow-inner shadow-slate-950/30">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Office</p>
            <p>Phone: (408) 555-0199</p>
            <p>Email: info@sanjosesidingpros.com</p>
            <p>Address: 1234 Alum Rock Ave, San Jose, CA 95116</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
