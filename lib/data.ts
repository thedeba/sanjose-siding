import { type Metadata } from "next";
import { siteConfig } from "../config/site";

export const heroData = {
  title: "San Jose Siding Experts Ready to Protect Your Home",
  subtitle: "Premium siding replacement, repair, and installation services for modern Bay Area homeowners.",
  ctas: [
    { label: "Get a Free Quote", href: "/contact", primary: true },
    { label: "View Services", href: "/services" },
  ],
  trustBadges: [
    "Licensed & Insured",
    "24/7 Emergency Response",
    "Local San Jose Crew",
    "Flexible Financing",
  ],
};

export const statsData = [
  { label: "Projects Completed", value: "1,250+" },
  { label: "Satisfied Clients", value: "98%" },
  { label: "Years Experience", value: "18" },
  { label: "5-Star Reviews", value: "4.9/5" },
];

export const servicesData = [
  { title: "Vinyl Siding", slug: "vinyl-siding", description: "Durable, low-maintenance siding with modern curb appeal.", icon: "House" },
  { title: "Fiber Cement Siding", slug: "fiber-cement-siding", description: "Architectural resilience with premium finish options.", icon: "Layers" },
  { title: "Wood Siding", slug: "wood-siding", description: "Classic craftsmanship built to last for every home.", icon: "TreeDeciduous" },
  { title: "Siding Repair", slug: "siding-repair", description: "Fast damage restoration for emergency leaks and storm impact.", icon: "Wrench" },
];

export const processSteps = [
  { title: "Inspection & Strategy", description: "We assess your home and create a tailored siding plan.", icon: "Search" },
  { title: "Material Selection", description: "Choose industry-leading siding materials and finishes.", icon: "Palette" },
  { title: "Professional Installation", description: "Certified crews install with precision and care.", icon: "Sparkles" },
  { title: "Final Warranty Review", description: "We finalize your project with a thorough inspection.", icon: "ShieldCheck" },
];

export const areaCards = [
  { city: "San Jose", slug: "san-jose" },
  { city: "Santa Clara", slug: "santa-clara" },
  { city: "Sunnyvale", slug: "sunnyvale" },
  { city: "Cupertino", slug: "cupertino" },
  { city: "Milpitas", slug: "milpitas" },
  { city: "Campbell", slug: "campbell" },
  { city: "Mountain View", slug: "mountain-view" },
];

export const testimonialsData = [
  {
    name: "Maria R.",
    city: "San Jose",
    review: "They transformed our siding with expert craftsmanship and excellent communication.",
    rating: 5,
  },
  {
    name: "Jordan K.",
    city: "Cupertino",
    review: "The team finished ahead of schedule and the house looks brand new.",
    rating: 5,
  },
  {
    name: "Priya S.",
    city: "Sunnyvale",
    review: "Responsive, detail-oriented, and the quality is outstanding.",
    rating: 5,
  },
];

export const faqData = [
  {
    question: "How soon can you start a siding replacement project?",
    answer: "We typically book a free inspection within 48 hours and start most installations within 7-10 days.",
  },
  {
    question: "Do you offer financing for larger siding projects?",
    answer: "Yes, we partner with local finance providers to offer flexible payment plans for eligible customers.",
  },
  {
    question: "Which siding materials are best for San Jose weather?",
    answer: "Vinyl and fiber cement are especially resilient in Bay Area climates and require minimum maintenance.",
  },
];

export const blogData = [
  {
    title: "How to Choose the Best Siding for San Jose Homes",
    slug: "choose-best-siding-san-jose",
    excerpt: "Learn the top siding materials, energy efficiency benefits, and local installation tips for Bay Area homes.",
    category: "Guides",
    date: "2026-05-12",
  },
  {
    title: "Spring Siding Maintenance: Prevent Leaks and Rot",
    slug: "spring-siding-maintenance",
    excerpt: "Keep your siding in premium condition with a seasonal inspection checklist tailored to California weather.",
    category: "Maintenance",
    date: "2026-04-08",
  },
  {
    title: "Vinyl vs. Fiber Cement: Which Siding Wins?",
    slug: "vinyl-vs-fiber-cement-siding",
    excerpt: "Compare two popular siding options for durability, cost, and long-term performance in San Jose.",
    category: "Materials",
    date: "2026-03-21",
  },
];

export const homepageSections = {
  hero: heroData,
  stats: statsData,
  services: servicesData,
  process: processSteps,
  areas: areaCards,
  testimonials: testimonialsData,
  faq: faqData,
};

export const homepageMetadata: Metadata = {
  title: "San Jose Siding Pros | High-Impact Siding Repair & Replacement",
  description: "Premium siding services for San Jose homeowners. Local experts in vinyl, fiber cement, wood siding, repair, and replacement.",
};
