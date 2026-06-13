import { faqData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">FAQ</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Answers to the siding questions San Jose homeowners ask most.</h1>
        </div>
        <Card className="border-white/10 bg-slate-900/95 p-6">
          <Accordion type="single" collapsible>
            {faqData.map((item, index) => (
              <AccordionItem value={`faq-${index}`} key={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </main>
  );
}
