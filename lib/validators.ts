import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(10, "Enter a valid phone number."),
  address: z.string().min(5, "Enter an address."),
  service: z.string().min(2, "Select a service."),
  message: z.string().min(10, "Tell us what you need."),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const blogSchema = z.object({
  title: z.string().min(10),
  slug: z.string().min(5),
  excerpt: z.string().min(30),
  content: z.string().min(50),
  featuredImage: z.string().url(),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(30),
  category: z.string().min(3),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});
