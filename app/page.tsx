import { HeroSection } from "../components/landing/hero-section";
import { StatisticsSection } from "../components/landing/statistics";
import { ServicesPreview } from "../components/landing/services-preview";
import { WhyChooseSection } from "../components/landing/why-choose";
import { ProcessSection } from "../components/landing/process";
import { ServiceAreasSection } from "../components/landing/service-areas";
import { BeforeAfterGallery } from "../components/landing/before-after-gallery";
import { TestimonialsSection } from "../components/landing/testimonials";
import { FAQPreviewSection } from "../components/landing/faq-preview";
import { LeadCTASection } from "../components/landing/lead-cta";

export default function Home() {
  return (
    <main className="flex flex-col overflow-hidden bg-slate-950 text-white">
      <HeroSection />
      <StatisticsSection />
      <ServicesPreview />
      <WhyChooseSection />
      <ProcessSection />
      <ServiceAreasSection />
      <BeforeAfterGallery />
      <TestimonialsSection />
      <FAQPreviewSection />
      <LeadCTASection />
    </main>
  );
}
