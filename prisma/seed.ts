import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [superAdminRole] = await Promise.all([
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
      shortDescription: "Cost-effective, versatile, and highly durable vinyl siding systems installed by VSI-certified crews.",
      fullContent: "Vinyl siding remains the most popular choice for South Bay homeowners looking for an attractive, low-maintenance exterior. Modern vinyl siding has evolved significantly, offering thick, impact-resistant panels that mimic the natural grain of cedar without the constant need for scraping, painting, or sealing.\n\nWe install premium-grade vinyl panels with a thickness range of 0.044\" to 0.048\" to ensure excellent wind load resistance and resistance to denting. Our installation process features advanced house wraps (such as Tyvek HomeWrap) and high-quality flashing around windows and doors to prevent hidden moisture intrusion.\n\nAvailable in a wide array of fade-resistant colors and profiles (including traditional lap, Dutch lap, and board & batten), our vinyl siding installations come with a lifetime manufacturer warranty and our 10-year craftsmanship guarantee.",
      featuredImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      seoTitle: "Vinyl Siding Installation San Jose | San Jose Siding Pros",
      seoDescription: "Premium vinyl siding installation and replacement services in San Jose, CA. Affordable, low-maintenance, and impact-resistant siding systems.",
      order: 1,
    },
    {
      title: "Fiber Cement Siding",
      slug: "fiber-cement-siding",
      icon: "Layers",
      shortDescription: "Premium James Hardie fiber cement siding offering elite fire resistance, durability, and aesthetics.",
      fullContent: "For homeowners seeking the ultimate combination of architectural beauty and extreme durability, fiber cement siding is the gold standard. As a preferred installer of James Hardie products, we specialize in high-performance fiber cement boards designed specifically for the unique climate swings of California.\n\nFiber cement is composed of sand, cement, and cellulose fibers, making it completely non-combustible with a Class A fire rating—an essential consideration for homes near California's wildland-urban interface (WUI) zones. It resists cracking, rotting, and warping, and is completely immune to termites and wood-boring insects.\n\nEach installation utilizes Hardie's proprietary ColorPlus Technology, featuring baked-on colors that resist fading from intense UV rays. Backed by a 30-year non-prorated limited warranty, our fiber cement siding elevates your home's thermal efficiency and security.",
      featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      seoTitle: "James Hardie Fiber Cement Siding San Jose",
      seoDescription: "Top-rated fiber cement and James Hardie siding installation in San Jose, CA. Class A fire rating, termite-proof, and beautiful finishes.",
      order: 2,
    },
    {
      title: "Wood Siding",
      slug: "wood-siding",
      icon: "TreeDeciduous",
      shortDescription: "Timeless natural beauty and historic authenticity with premium Western Red Cedar and Redwood siding.",
      fullContent: "Wood siding offers a warm, natural aesthetic that synthetic materials simply cannot replicate. It is the perfect choice for custom architectural builds and historical home restorations in older San Jose neighborhoods like the Rose Garden and Willow Glen.\n\nWe source only the highest grade of Western Red Cedar and California Redwood, known for their natural resistance to decay, moisture, and insects. Whether you prefer vertical tongue-and-groove boards, traditional bevel lap siding, or rustic cedar shakes, our master carpenters shape and fit each piece with absolute precision.\n\nTo ensure maximum lifespan, we apply premium water-repellent sealers or custom stains that block UV degradation while allowing the wood's natural grain to shine. With proper maintenance, our wood siding installations deliver outstanding insulation and timeless curb appeal for generations.",
      featuredImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      seoTitle: "Wood Siding Contractors San Jose | Historical Restorations",
      seoDescription: "Professional wood siding contractors in San Jose, CA. Premium cedar and redwood lap, shake, and shingle siding installations.",
      order: 3,
    },
    {
      title: "Siding Repair",
      slug: "siding-repair",
      icon: "Tool",
      shortDescription: "Fast, reliable repairs for dry rot, moisture leaks, wind damage, and pest intrusion.",
      fullContent: "Siding damage should never be ignored. Even a minor gap or cracked panel can allow rainwater to seep into your home's wooden frame, leading to hidden dry rot, hazardous mold growth, and compromised structural integrity.\n\nOur siding repair team specializes in diagnostic moisture mapping to find the root cause of leaks. We repair all siding types, including replacing rotting cedar boards, correcting bubbling paint, patching wind-damaged vinyl panels, and replacing failing flashing. We also inspect and repair your home's underlying sheathing and vapor barriers before installing matching exterior panels.\n\nWe take pride in seamless paint and texture matching, ensuring that our repair blends perfectly with your home's existing siding, restoring both protection and visual beauty.",
      featuredImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      seoTitle: "Siding Repair Services San Jose | Fix Dry Rot & Leaks",
      seoDescription: "Expert siding repair contractors in San Jose, CA. Seamless fixes for dry rot, wind damage, leaks, and cracked panels.",
      order: 4,
    },
    {
      title: "Siding Replacement",
      slug: "siding-replacement",
      icon: "Sparkles",
      shortDescription: "Complete exterior transformations with total tear-offs, sheathing repair, and energy-efficient siding systems.",
      fullContent: "A full siding replacement is one of the most valuable investments you can make in your home, dramatically improving energy efficiency, storm safety, and property value. At San Jose Siding Pros, we follow a rigorous, zero-compromise replacement process.\n\nOur process begins with a complete tear-off of your old, failing siding. We inspect the underlying OSB sheathing for structural integrity, repairing any water-damaged wood. We then install high-performance underlayment, custom corner flashing, and starter strips to establish an airtight, moisture-proof seal.\n\nFinally, we mount your chosen premium siding panels with precision spacing to accommodate thermal expansion. Every full siding replacement is backed by a 10-year craftsmanship warranty, giving you peace of mind that your home is secure for the future.",
      featuredImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      seoTitle: "Full Siding Replacement San Jose | Home Exterior Remodels",
      seoDescription: "Complete home siding replacement and exterior remodeling services in San Jose. High-performance weather wraps and premium siding systems.",
      order: 5,
    },
    {
      title: "Emergency Siding",
      slug: "emergency-siding",
      icon: "AlertCircle",
      shortDescription: "24/7 emergency response for wind tear-offs, water intrusion, fallen trees, and storm damage securing.",
      fullContent: "When unexpected storms, high winds, or accidents damage your home's siding, immediate action is required to prevent catastrophic water damage. Our dedicated emergency response crew is on call 24/7 to protect your home's interior.\n\nWe arrive fully equipped to perform emergency dry-ins, which include securing exposed walls with heavy-duty weatherproofing tarps and temporary sheathing. This immediate action stops rain and moisture from soaking into your home's structural framing, insulation, and drywall.\n\nWe also provide comprehensive damage documentation, including photo evidence and detailed repair estimates, to assist you with filing homeowner's insurance claims quickly and smoothly. Once the weather clears, we transition to performing permanent, high-quality siding restoration.",
      featuredImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
      seoTitle: "24/7 Emergency Siding Services San Jose | Storm Damage",
      seoDescription: "Rapid emergency siding repair and temporary weatherproofing in San Jose, CA. On call 24/7 for storm damage securing.",
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

  await prisma.serviceArea.deleteMany();

  const areas = [
    {
      cityName: "San Jose",
      slug: "san-jose",
      heroTitle: "San Jose Siding Solutions with Local Craftsmanship.",
      content: "As Silicon Valley's largest city, San Jose has a wide mix of architectural styles, from the historic Victorian and craftsman homes in the Rose Garden and Willow Glen to modern tract homes in Almaden Valley and Evergreen.\n\nOur local San Jose siding crews understand the unique needs of homeowners here. In historical zones, we specialize in authentic wood siding replacements that meet strict local historic landmark guidelines while upgrading energy efficiency and moisture barriers.\n\nFor newer developments, we install high-performance James Hardie fiber cement panels or insulated vinyl siding designed to handle dry summer heat and local HOA code standards. Every project includes a detailed moisture inspection, permit coordination, and a 10-year craftsmanship guarantee.",
      seoTitle: "San Jose Siding Contractor | Replacement & Repair",
      seoDescription: "Top-rated siding contractor in San Jose offering premium replacements, dry rot repair, and vinyl/fiber cement installation services.",
    },
    {
      cityName: "Santa Clara",
      slug: "santa-clara",
      heroTitle: "Siding Specialists Serving Santa Clara Homeowners.",
      content: "Santa Clara features a diverse climate and a mixture of classic mid-century ranches and modern residential builds. Protecting these properties requires siding materials that resist UV degradation and maintain thermal comfort during hot summers.\n\nWe provide full-service siding replacement, dry rot restoration, and trim upgrades across Santa Clara. Our team works closely with local building departments to ensure prompt permit approvals and strict adherence to the latest California Building Standards Code (Title 24).\n\nWhether you need highly-insulated vinyl siding to cut cooling costs or non-combustible fiber cement for superior fire safety, our certified crews deliver clean, on-time installations designed to protect your home's structure for decades.",
      seoTitle: "Siding Installation & Repair Santa Clara, CA",
      seoDescription: "Certified siding contractors in Santa Clara, CA. Energy-efficient vinyl siding, fiber cement installation, and dry rot repairs.",
    },
    {
      cityName: "Sunnyvale",
      slug: "sunnyvale",
      heroTitle: "Sunnyvale Siding Installation Built for Silicon Valley.",
      content: "Sunnyvale homeowners expect high standards of craftsmanship, longevity, and energy efficiency. From the heritage neighborhoods near downtown to the modern smart homes bordering Cupertino, we provide elite exterior remodeling services tailored to your local aesthetic.\n\nWe specialize in low-maintenance, high-impact siding systems. Our James Hardie fiber cement installations offer class-leading protection against fire and pests, backed by Hardie's ColorPlus Technology to prevent fade from Sunnyvale's intense summer sun.\n\nOur team manages the entire process: procuring city permits, securing HOA approvals, wrapping the home in premium vapor boundaries, and executing flawless installations with daily cleanup. We protect your home like it's our own.",
      seoTitle: "Siding Contractor Sunnyvale, CA | Hardie & Vinyl",
      seoDescription: "Professional siding contractor in Sunnyvale, CA. Specializing in James Hardie fiber cement, insulated vinyl, and siding repair.",
    },
    {
      cityName: "Cupertino",
      slug: "cupertino",
      heroTitle: "Premium Siding Contractors Serving Cupertino, CA.",
      content: "Nestled near the foothills, Cupertino experiences rapid temperature shifts and damp morning mist. These microclimates make robust moisture management and underlayments crucial to preventing mold, dry rot, and sheathing decay.\n\nSan Jose Siding Pros installs high-performance rainscreen systems, specialized house wraps, and custom window flashing details designed specifically for homes in Cupertino. We prioritize durable, fire-safe materials, providing Class A non-combustible fiber cement panels that fit seamlessly into premium neighborhoods.\n\nFrom modern custom designs to traditional family residences, we work with precision, securing all permits with Cupertino's building division and providing comprehensive warranty coverage.",
      seoTitle: "Cupertino Siding Contractor | Dry Rot & Fire Safe Siding",
      seoDescription: "Siding installation and dry rot repairs in Cupertino, CA. Fire-safe fiber cement and premium insulation underlayments.",
    },
    {
      cityName: "Mountain View",
      slug: "mountain-view",
      heroTitle: "Mountain View Siding Services for Premium Home Protection.",
      content: "Bordering the bay, Mountain View homes are subjected to elevated humidity, ocean breezes, and foggy mornings. These elements make high-durability siding and rust-proof trim hardware vital to protecting your investment.\n\nWe offer specialized siding systems optimized for coastal and bay climates in Mountain View. We recommend premium vinyl siding or James Hardie plank systems that do not absorb moisture, preventing paint peeling, swelling, and mold growth.\n\nOur local crew specializes in full siding inspections, storm damage repair, and complete exterior transformations. We handle all planning, local building permissions, and HOA reviews, ensuring your home renovation is completely stress-free.",
      seoTitle: "Mountain View Siding Installation & Repairs",
      seoDescription: "Top siding contractors in Mountain View, CA. Moisture-resistant vinyl, fiber cement siding replacement, and wind damage repair.",
    },
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
    {
      question: "Which siding material is best for San Jose climates?",
      answer: "Vinyl and fiber cement (like James Hardie) are the most popular and resilient choices for the South Bay climate. Vinyl is highly affordable, impact-resistant, and requires zero painting. Fiber cement is completely non-combustible (Class A fire rating), making it ideal for fire-prone regions, and resists cracking or rot under dry summer heat.",
      category: "Materials",
      sortOrder: 1,
    },
    {
      question: "What is the lifespan of James Hardie fiber cement siding?",
      answer: "James Hardie fiber cement siding is engineered to last up to 50 years. The manufacturer provides a 30-year non-prorated limited warranty on the boards, and their proprietary ColorPlus finish comes with a 15-year warranty against peeling, chipping, and cracking.",
      category: "Materials",
      sortOrder: 2,
    },
    {
      question: "Can I install wood siding on a historical home in the Rose Garden or Willow Glen?",
      answer: "Yes. Older neighborhoods in San Jose often have historic preservation guidelines that require wood siding for restorations. We source premium Western Red Cedar and Redwood profiles that comply fully with local historic landmark guidelines while upgrading the vapor barriers underneath to protect your structural sheathing.",
      category: "Materials",
      sortOrder: 3,
    },
    {
      question: "How much does a full siding replacement cost in San Jose?",
      answer: "The cost of siding replacement depends heavily on the material chosen, the size of your home, and any structural repairs (like dry rot restoration) needed. Generally, vinyl siding replacements range from $12,000 to $22,000, while premium fiber cement or cedar runs from $18,000 to $35,000+. We offer detailed, line-item estimates with zero hidden fees.",
      category: "Costs & Permits",
      sortOrder: 4,
    },
    {
      question: "Do you handle the city permit process for home siding?",
      answer: "Yes. We coordinate the entire permit acquisition process with the building departments of San Jose, Santa Clara, Sunnyvale, Cupertino, and Mountain View. We also document structural compliance for HOAs to ensure your siding replacement proceeds without any neighborhood friction.",
      category: "Costs & Permits",
      sortOrder: 5,
    },
    {
      question: "How long does a siding replacement project take to complete?",
      answer: "Most residential siding replacements take between 7 to 14 working days, depending on the size of the home and weather conditions. A full replacement involves tearing off old siding, checking the underlying OSB sheathing for dry rot, wrapping the home in vapor barriers, and mounting new boards and trims.",
      category: "Process",
      sortOrder: 6,
    },
    {
      question: "How do you handle dry rot and water damage found during the tear-off?",
      answer: "If we discover rotting sheathing or damaged wall studs after removing your old siding, we stop and notify you immediately. We provide a clear change-order estimate outlining the cost of replacing the structural wood. Our crew includes licensed carpenters who can surgically restore structural integrity before mounting new siding panels.",
      category: "Process",
      sortOrder: 7,
    },
    {
      question: "Do you help with homeowner's insurance claims for siding damage?",
      answer: "Yes. If your siding is damaged due to a sudden storm, windstorm, or fallen tree limb, we provide rapid tarping and emergency securing services. We also compile photo documentation, write precise diagnostic assessments, and deliver line-item estimates that you can submit directly to your insurance adjuster.",
      category: "Warranty & Insurance",
      sortOrder: 8,
    },
    {
      question: "What warranties do you offer on your craftsmanship?",
      answer: "We back all of our full siding replacements with an industry-leading 10-year craftsmanship warranty. This covers any installation-related defects, flashing leaks, or trim warping. This is in addition to the product warranties provided directly by siding manufacturers like James Hardie or Alside.",
      category: "Warranty & Insurance",
      sortOrder: 9,
    },
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

  await prisma.testimonial.deleteMany();

  const testimonials = [
    { customerName: "Maria R.", city: "San Jose", review: "Excellent siding service from start to finish. The team was professional and delivered on time.", rating: 5, image: "https://res.cloudinary.com/demo/image/upload/v1/testimonial-1.jpg" },
    { customerName: "Jordan K.", city: "San Jose", review: "Our home looks brand-new after the vinyl siding installation. Highly recommended.", rating: 5, image: "https://res.cloudinary.com/demo/image/upload/v1/testimonial-2.jpg" },
    { customerName: "Priya S.", city: "San Jose", review: "The crew was responsive and respectful. Great quality and beautiful results.", rating: 5, image: "https://res.cloudinary.com/demo/image/upload/v1/testimonial-3.jpg" },
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
