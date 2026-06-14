"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth";
import { Prisma } from "@prisma/client";

// Helper to check authentication
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

// 1. Site Settings Actions
export async function updateSettings(data: {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
}) {
  await requireAuth();

  await prisma.siteSetting.upsert({
    where: { id: "site-settings" },
    update: data,
    create: {
      id: "site-settings",
      favicon: "/favicon.ico",
      ...data,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin/seo");
  revalidatePath("/");
  return { success: true };
}

// 2. FAQ Actions
export async function createFAQ(data: {
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}) {
  await requireAuth();

  await prisma.fAQ.create({
    data,
  });

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  return { success: true };
}

export async function updateFAQ(
  id: string,
  data: {
    question: string;
    answer: string;
    category: string;
    sortOrder: number;
  }
) {
  await requireAuth();

  await prisma.fAQ.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  return { success: true };
}

export async function deleteFAQ(id: string) {
  await requireAuth();

  await prisma.fAQ.delete({
    where: { id },
  });

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  return { success: true };
}

// 3. Service Actions
export async function updateService(
  id: string,
  data: {
    title: string;
    slug: string;
    icon: string;
    shortDescription: string;
    fullContent: string;
    featuredImage: string;
    seoTitle: string;
    seoDescription: string;
    published: boolean;
    order: number;
  }
) {
  await requireAuth();

  await prisma.service.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`);
  revalidatePath("/");
  return { success: true };
}

export async function createService(data: {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullContent: string;
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  order: number;
}) {
  await requireAuth();

  await prisma.service.create({
    data,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireAuth();

  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}

// 4. Testimonial Actions
export async function createTestimonial(data: {
  customerName: string;
  city: string;
  review: string;
  rating: number;
  image: string;
}) {
  await requireAuth();

  await prisma.testimonial.create({
    data,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(
  id: string,
  data: {
    customerName: string;
    city: string;
    review: string;
    rating: number;
    image: string;
  }
) {
  await requireAuth();

  await prisma.testimonial.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await requireAuth();

  await prisma.testimonial.delete({
    where: { id },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
  revalidatePath("/");
  return { success: true };
}

// 5. Blog Actions
export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
}) {
  await requireAuth();

  await prisma.blog.create({
    data: {
      ...data,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
  return { success: true };
}

export async function updateBlog(
  id: string,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    metaTitle: string;
    metaDescription: string;
    category: string;
    status: "DRAFT" | "PUBLISHED";
  }
) {
  await requireAuth();

  const existing = await prisma.blog.findUnique({ where: { id } });
  const publishedAt = 
    data.status === "PUBLISHED" 
      ? existing?.publishedAt ?? new Date() 
      : null;

  await prisma.blog.update({
    where: { id },
    data: {
      ...data,
      publishedAt,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteBlog(id: string) {
  await requireAuth();

  await prisma.blog.delete({
    where: { id },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
  return { success: true };
}

// 6. Gallery Actions
export async function createGallery(data: {
  title: string;
  category: string;
  image: string;
  beforeAfter: boolean;
}) {
  await requireAuth();

  await prisma.gallery.create({
    data,
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function updateGallery(
  id: string,
  data: {
    title: string;
    category: string;
    image: string;
    beforeAfter: boolean;
  }
) {
  await requireAuth();

  await prisma.gallery.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGallery(id: string) {
  await requireAuth();

  await prisma.gallery.delete({
    where: { id },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

// 7. Homepage Section Actions
export async function updateHomepageSection(id: string, value: Prisma.InputJsonValue) {
  await requireAuth();

  await prisma.homepageSection.update({
    where: { id },
    data: { value },
  });

  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { success: true };
}

// 8. Navigation Actions
export async function createNavigationItem(data: {
  title: string;
  url: string;
  position: number;
}) {
  await requireAuth();

  await prisma.navigationMenu.create({
    data,
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return { success: true };
}

export async function updateNavigationItem(
  id: string,
  data: {
    title: string;
    url: string;
    position: number;
  }
) {
  await requireAuth();

  await prisma.navigationMenu.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return { success: true };
}

export async function deleteNavigationItem(id: string) {
  await requireAuth();

  await prisma.navigationMenu.delete({
    where: { id },
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return { success: true };
}

// 9. Service Area Actions
export async function createServiceArea(data: {
  cityName: string;
  slug: string;
  heroTitle: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
}) {
  await requireAuth();

  await prisma.serviceArea.create({
    data,
  });

  revalidatePath("/admin/service-areas");
  revalidatePath("/service-areas");
  revalidatePath("/");
  return { success: true };
}

export async function updateServiceArea(
  id: string,
  data: {
    cityName: string;
    slug: string;
    heroTitle: string;
    content: string;
    seoTitle: string;
    seoDescription: string;
    published: boolean;
  }
) {
  await requireAuth();

  await prisma.serviceArea.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/service-areas");
  revalidatePath("/service-areas");
  revalidatePath(`/service-areas/${data.slug}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteServiceArea(id: string) {
  await requireAuth();

  await prisma.serviceArea.delete({
    where: { id },
  });

  revalidatePath("/admin/service-areas");
  revalidatePath("/service-areas");
  revalidatePath("/");
  return { success: true };
}
