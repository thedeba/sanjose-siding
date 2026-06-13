import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [superAdminRole, adminRole, editorRole, supportRole] = await Promise.all([
    prisma.role.upsert({ where: { name: "Super Admin" }, update: {}, create: { name: "Super Admin" } }),
    prisma.role.upsert({ where: { name: "Admin" }, update: {}, create: { name: "Admin" } }),
    prisma.role.upsert({ where: { name: "Editor" }, update: {}, create: { name: "Editor" } }),
    prisma.role.upsert({ where: { name: "Support" }, update: {}, create: { name: "Support" } }),
  ]);

  const hashedPassword = await hash("admin", 10);
  await prisma.user.upsert({
    where: { email: "admin@sanjosesidingpros.com" },
    update: { name: "Super Admin", password: hashedPassword, roleId: superAdminRole.id },
    create: {
      name: "Super Admin",
      email: "admin@sanjosesidingpros.com",
      password: hashedPassword,
      roleId: superAdminRole.id,
    },
  });

  await prisma.siteSetting.upsert({
    where: { id: "site-settings" },
    update: {
      companyName: "San Jose Siding Pros",
      phone: "(408) 555-0199",
      email: "info@sanjosesidingpros.com",
      address: "1234 Alum Rock Ave, San Jose, CA 95116",
      logo: "/logo.svg",
      favicon: "/favicon.ico",
    },
    create: {
      id: "site-settings",
      companyName: "San Jose Siding Pros",
      phone: "(408) 555-0199",
      email: "info@sanjosesidingpros.com",
      address: "1234 Alum Rock Ave, San Jose, CA 95116",
      logo: "/logo.svg",
      favicon: "/favicon.ico",
    },
  });

  const services = [
    {
      title: "Vinyl Siding",
      slug: "vinyl-siding",
      icon: "Layers",
      shortDescription: "Durable, low-maintenance siding with modern curb appeal.",
      fullContent: "A cost-effective siding option that resists fading and performs well in coastal climates.",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/vinyl-siding.jpg",
      seoTitle: "Vinyl Siding Installation San Jose",
      seoDescription: "Protect your home with our durable vinyl siding installation services in San Jose.",
      order: 1,
    },
    {
      title: "Fiber Cement Siding",
      slug: "fiber-cement-siding",
      icon: "Layers",
      shortDescription: "Architectural resilience with premium finish options.",
      fullContent: "Long-lasting fiber cement siding delivers exceptional fire resistance and style.",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/fiber-cement.jpg",
      seoTitle: "Fiber Cement Siding San Jose",
      seoDescription: "Premium fiber cement siding that protects homes and adds architectural character.",
      order: 2,
    },
    {
      title: "Wood Siding",
      slug: "wood-siding",
      icon: "TreeDeciduous",
      shortDescription: "Classic craftsmanship built to last for every home.",
      fullContent: "Beautiful wood siding for historic and custom homes with expert installation craftsmanship.",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/wood-siding.jpg",
      seoTitle: "Wood Siding Contractors San Jose",
      seoDescription: "Expert wood siding replacement and installation services in the South Bay.",
      order: 3,
    },
    {
      title: "Siding Repair",
      slug: "siding-repair",
      icon: "Tool",
      shortDescription: "Fast damage restoration for emergency leaks and storm impact.",
      fullContent: "Repair damaged siding quickly to stop leaks, restore insulation, and improve curb appeal.",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/siding-repair.jpg",
      seoTitle: "Siding Repair San Jose",
      seoDescription: "Reliable siding repair services for leaks, rot, and storm damage in San Jose.",
      order: 4,
    },
    {
      title: "Siding Replacement",
      slug: "siding-replacement",
      icon: "Sparkles",
      shortDescription: "Full siding replacement with premium materials and expert installation.",
      fullContent: "Upgrade your home exterior with modern siding products and a high-quality installation process.",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/siding-replacement.jpg",
      seoTitle: "Siding Replacement San Jose",
      seoDescription: "Complete siding replacement services designed for long-term home protection.",
      order: 5,
    },
    {
      title: "Emergency Siding",
      slug: "emergency-siding",
      icon: "AlertCircle",
      shortDescription: "24/7 emergency siding response for urgent damage and weather events.",
      fullContent: "Emergency siding services to secure your property and protect against further damage.",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/emergency-siding.jpg",
      seoTitle: "Emergency Siding Services San Jose",
      seoDescription: "Rapid emergency siding response for homeowners after storms or sudden damage.",
      order: 6,
    },
  ];

  await Promise.all(
    services.map((service) =>
      prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: { ...service, published: true },
      })
    )
  );

  const areas = [
    { cityName: "San Jose", slug: "san-jose", heroTitle: "San Jose siding solutions with local craftsmanship.", content: "Your neighborhood siding experts, offering fast inspections and premium installation.", seoTitle: "San Jose Siding Contractor", seoDescription: "Top-rated siding contractor in San Jose offering repairs, replacements, and premium siding systems." },
    { cityName: "Santa Clara", slug: "santa-clara", heroTitle: "Trusted siding work across Santa Clara.", content: "From historic homes to new construction, we provide siding tailored to the South Bay climate.", seoTitle: "Santa Clara Siding Services", seoDescription: "Superior siding installation and repair services in Santa Clara." },
    { cityName: "Sunnyvale", slug: "sunnyvale", heroTitle: "Sunnyvale siding experts ready to protect your home.", content: "Local siding professionals with fast response and high-quality exterior finishes.", seoTitle: "Sunnyvale Siding Contractor", seoDescription: "Professional siding services for homeowners in Sunnyvale." },
    { cityName: "Cupertino", slug: "cupertino", heroTitle: "Cupertino siding upgrades for modern homes.", content: "Precision siding installation and repair for Cupertino residences.", seoTitle: "Cupertino Siding Experts", seoDescription: "The highest level of siding service and support in Cupertino." },
    { cityName: "Milpitas", slug: "milpitas", heroTitle: "Milpitas siding service with local support.", content: "Streamlined siding projects for modern Bay Area homes in Milpitas.", seoTitle: "Milpitas Siding Contractor", seoDescription: "Quality siding installations and repair in Milpitas." },
    { cityName: "Campbell", slug: "campbell", heroTitle: "Campbell siding solutions for every budget.", content: "Durable siding systems installed by licensed Campbell contractors.", seoTitle: "Campbell Siding Services", seoDescription: "Trusted Campbell siding service for homeowners and landlords." },
    { cityName: "Mountain View", slug: "mountain-view", heroTitle: "Mountain View's choice for siding performance.", content: "High-end siding work delivering superior life-cycle value.", seoTitle: "Mountain View Siding Company", seoDescription: "Expert siding repair and replacement for Mountain View homes." },
  ];

  await Promise.all(
    areas.map((area) =>
      prisma.serviceArea.upsert({
        where: { slug: area.slug },
        update: area,
        create: { ...area, published: true },
      })
    )
  );

  const blogs: Array<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    metaTitle: string;
    metaDescription: string;
    category: string;
    tags: string[];
    status: "PUBLISHED" | "DRAFT";
    publishedAt: Date;
  }> = [
    {
      title: "How to Choose the Best Siding for San Jose Homes",
      slug: "choose-best-siding-san-jose",
      excerpt: "Learn the top siding materials, energy efficiency benefits, and local installation tips for Bay Area homes.",
      content: "# Best Siding for San Jose\n\nSelecting the right siding begins with understanding local weather and style preferences...",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/blog-1.jpg",
      metaTitle: "Best Siding for San Jose Homes",
      metaDescription: "A homeowner's guide to selecting the best siding for San Jose climate and curb appeal.",
      category: "Guides",
      tags: ["siding", "San Jose", "home renovation"],
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Spring Siding Maintenance: Prevent Leaks and Rot",
      slug: "spring-siding-maintenance",
      excerpt: "Keep your siding in premium condition with a seasonal inspection checklist tailored to California weather.",
      content: "# Spring Siding Maintenance\n\nA seasonal maintenance plan helps avoid costly repairs and prolongs your siding lifespan...",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/blog-2.jpg",
      metaTitle: "Spring Siding Maintenance in San Jose",
      metaDescription: "Seasonal maintenance advice for siding durability and leak prevention.",
      category: "Maintenance",
      tags: ["siding maintenance", "home care"],
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Vinyl vs. Fiber Cement: Which Siding Wins?",
      slug: "vinyl-vs-fiber-cement-siding",
      excerpt: "Compare two popular siding options for durability, cost, and long-term performance in San Jose.",
      content: "# Vinyl vs Fiber Cement\n\nChoosing the right siding depends on budget, desired look, and performance needs...",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1/blog-3.jpg",
      metaTitle: "Vinyl vs Fiber Cement Siding San Jose",
      metaDescription: "A comparison between vinyl and fiber cement siding for Bay Area homes.",
      category: "Materials",
      tags: ["vinyl siding", "fiber cement"],
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  ];

  await Promise.all(
    blogs.map((post) =>
      prisma.blog.upsert({
        where: { slug: post.slug },
        update: { ...post, status: post.status },
        create: { ...post, status: post.status },
      })
    )
  );

  const faqs = [
    { question: "How long does siding installation take?", answer: "Most residential siding projects finish within one to two weeks depending on scope.", category: "Timeline", sortOrder: 1 },
    { question: "Do you work with insurance claims?", answer: "Yes, we help homeowners document damage and coordinate with insurance providers for siding repairs.", category: "Insurance", sortOrder: 2 },
    { question: "What warranties do you offer?", answer: "Our work is backed by a craftsmanship warranty, and we also honor material warranties from leading manufacturers.", category: "Warranty", sortOrder: 3 },
  ];

  await Promise.all(
    faqs.map(async (faq) => {
      const existing = await prisma.fAQ.findFirst({
        where: { question: faq.question },
      });
      if (existing) {
        return prisma.fAQ.update({
          where: { id: existing.id },
          data: faq,
        });
      } else {
        return prisma.fAQ.create({
          data: faq,
        });
      }
    })
  );

  const testimonials = [
    { customerName: "Maria R.", city: "San Jose", review: "Excellent siding service from start to finish. The team was professional and delivered on time.", rating: 5, image: "https://res.cloudinary.com/demo/image/upload/v1/testimonial-1.jpg" },
    { customerName: "Jordan K.", city: "Cupertino", review: "Our home looks brand-new after the vinyl siding installation. Highly recommended.", rating: 5, image: "https://res.cloudinary.com/demo/image/upload/v1/testimonial-2.jpg" },
    { customerName: "Priya S.", city: "Sunnyvale", review: "The crew was responsive and respectful. Great quality and beautiful results.", rating: 5, image: "https://res.cloudinary.com/demo/image/upload/v1/testimonial-3.jpg" },
  ];

  await Promise.all(
    testimonials.map(async (item) => {
      const existing = await prisma.testimonial.findFirst({
        where: { customerName: item.customerName },
      });
      if (existing) {
        return prisma.testimonial.update({
          where: { id: existing.id },
          data: item,
        });
      } else {
        return prisma.testimonial.create({
          data: item,
        });
      }
    })
  );

  const galleryItems = [
    { title: "Modern siding replacement", category: "Residential", image: "https://res.cloudinary.com/demo/image/upload/v1/gallery-1.jpg", beforeAfter: true },
    { title: "Storm damage repair", category: "Repair", image: "https://res.cloudinary.com/demo/image/upload/v1/gallery-2.jpg", beforeAfter: false },
    { title: "Fiber cement installation", category: "Installation", image: "https://res.cloudinary.com/demo/image/upload/v1/gallery-3.jpg", beforeAfter: false },
  ];

  await Promise.all(
    galleryItems.map(async (item) => {
      const existing = await prisma.gallery.findFirst({
        where: { title: item.title },
      });
      if (existing) {
        return prisma.gallery.update({
          where: { id: existing.id },
          data: item,
        });
      } else {
        return prisma.gallery.create({
          data: item,
        });
      }
    })
  );

  const navigation = [
    { title: "Home", url: "/", position: 1 },
    { title: "About", url: "/about", position: 2 },
    { title: "Services", url: "/services", position: 3 },
    { title: "Service Areas", url: "/service-areas", position: 4 },
    { title: "Gallery", url: "/gallery", position: 5 },
    { title: "Blog", url: "/blog", position: 6 },
    { title: "FAQ", url: "/faq", position: 7 },
    { title: "Contact", url: "/contact", position: 8 },
  ];

  await Promise.all(
    navigation.map(async (item) => {
      const existing = await prisma.navigationMenu.findFirst({
        where: { title: item.title },
      });
      if (existing) {
        return prisma.navigationMenu.update({
          where: { id: existing.id },
          data: item,
        });
      } else {
        return prisma.navigationMenu.create({
          data: item,
        });
      }
    })
  );

  const homepageSections = [
    { key: "hero", value: { headline: "Protect your home with premium siding", subheadline: "Local San Jose siding specialists for repair, replacement, and emergency service." } },
    { key: "whyChoose", value: { bullets: ["Licensed & insured", "24/7 emergency response", "Local Bay Area team", "Free estimates"] } },
  ];

  await Promise.all(
    homepageSections.map((section) =>
      prisma.homepageSection.upsert({
        where: { key: section.key },
        update: section,
        create: section,
      })
    )
  );

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
