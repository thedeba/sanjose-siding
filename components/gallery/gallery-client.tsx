"use client";

import { useState } from "react";
import { Card } from "../ui/card";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeAfter: boolean;
};

type GalleryClientProps = {
  photos: GalleryItem[];
};

export function GalleryClient({ photos }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from the database items
  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category)))];

  // Filter photos based on selection
  const filteredPhotos = activeCategory === "All"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            id={`tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 scale-105"
                : "border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 p-0 rounded-[2rem] shadow-xl transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-1.5 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden rounded-t-[2rem] bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Category Overlay Tag */}
              <div className="absolute top-4 left-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                {item.category}
              </div>

              {/* Before/After Overlay Badge */}
              {item.beforeAfter && (
                <div className="absolute top-4 right-4 rounded-xl bg-cyan-500 text-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25">
                  Before / After
                </div>
              )}
            </div>

            {/* Info Container */}
            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Professional siding workmanship in the Silicon Valley area. Built for exceptional aesthetics and durable weather protection.
                </p>
              </div>

              {item.beforeAfter && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span>Transformation Project</span>
                  <span className="text-cyan-400/80 font-medium">View detailed conversion</span>
                </div>
              )}
            </div>
          </Card>
        ))}

        {filteredPhotos.length === 0 && (
          <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-[2rem] bg-slate-900/20">
            <p className="text-slate-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
