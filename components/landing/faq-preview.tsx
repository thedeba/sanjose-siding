import { faqData } from "../../lib/data";
import { Card } from "../ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";

export function FAQPreviewSection() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-500">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Answers to common siding questions.</h2>
        </div>
        <Card className="mt-12 border-white/10 bg-slate-900/60 p-8">
          <Accordion type="single" collapsible>
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}
