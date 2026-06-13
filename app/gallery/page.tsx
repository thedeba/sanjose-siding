import { Card } from "../../components/ui/card";

const galleries = [
  { title: "Historic home siding replacement", location: "San Jose, CA" },
  { title: "Storm recovery siding repair", location: "Sunnyvale, CA" },
  { title: "Modern fiber cement upgrade", location: "Mountain View, CA" },
  { title: "Energy-efficient siding remodel", location: "Cupertino, CA" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Gallery</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Premium siding projects from the South Bay.</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {galleries.map((item) => (
            <Card key={item.title} className="overflow-hidden border-white/10 bg-slate-900/95 p-0">
              <div className="h-72 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{item.location}</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">Professional siding work that blends modern aesthetics with long-term performance.</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
