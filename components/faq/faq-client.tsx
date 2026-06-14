"use client";

import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Card } from "../ui/card";
import { MessageSquare, Phone, MapPin, Compass } from "lucide-react";
import { siteConfig } from "@/config/site";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

type FAQClientProps = {
  faqs: FAQItem[];
};

export function FAQClient({ faqs }: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  // Filter FAQs based on selected category
  const filteredFaqs = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
      {/* Left Column: Category Sidebar Nav */}
      <aside className="space-y-6">
        <Card className="border border-white/10 bg-slate-900/40 p-4 rounded-[2rem] shadow-xl backdrop-blur-md">
          <p className="px-4 pb-3 pt-2 text-xs font-semibold uppercase tracking-widest text-slate-500 border-b border-white/5 flex items-center gap-2">
            <Compass className="h-3.5 w-3.5" /> Topics
          </p>
          <div className="flex flex-col gap-1.5 pt-4">
            {categories.map((category) => (
              <button
                key={category}
                id={`tab-${category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10 scale-[1.02]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Card>

        {/* Sidebar Help Card */}
        <Card className="border border-cyan-500/10 bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-blue-950/20 p-6 rounded-[2rem] shadow-xl space-y-4">
          <div className="rounded-xl bg-cyan-500/10 p-3 w-fit">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Still have questions?</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Our estimator team is happy to discuss code guidelines, pricing, and warranties.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-600 transition duration-300"
            >
              <Phone className="h-3.5 w-3.5" /> Call {siteConfig.phone}
            </a>
          </div>
        </Card>
      </aside>

      {/* Right Column: Accordion Container */}
      <section>
        <Card className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <Accordion type="single" collapsible className="space-y-2">
            {filteredFaqs.map((item) => (
              <AccordionItem
                value={item.id}
                key={item.id}
                className="border-none bg-slate-950/20 rounded-2xl px-6 py-1 hover:bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <AccordionTrigger className="hover:no-underline text-base font-bold text-white leading-snug py-4 flex items-center justify-between">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4 pb-6 mt-1">
                  {item.answer}
                  <div className="mt-4 flex items-center gap-2 text-xs text-cyan-400/80 font-semibold uppercase tracking-wider">
                    <MapPin className="h-3 w-3" /> Categorized in {item.category}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No questions found.
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
