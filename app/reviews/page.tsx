import { testimonialsData } from "@/lib/data";
import { Card } from "@/components/ui/card";

export default function ReviewsPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Reviews</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Hear from San Jose homeowners we’ve helped.</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonialsData.map((item) => (
            <Card key={item.name} className="border-white/10 bg-slate-900/95 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">{item.name[0]}</div>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.city}</p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-300">“{item.review}”.</p>
                <p className="text-sm text-slate-400">Rating: {item.rating}/5</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
