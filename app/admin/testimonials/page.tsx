import { prisma } from "../../../lib/prisma";
import { TestimonialManager } from "../../../components/admin/testimonial-manager";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Testimonials</h1>
        <p className="mt-3 text-sm text-slate-400">Review customer testimonials and maintain trust-building social proof.</p>
      </div>
      <TestimonialManager initialTestimonials={testimonials} />
    </div>
  );
}
