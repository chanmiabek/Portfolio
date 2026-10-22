import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(200),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(), // Honeypot field; bots often fill it.
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(10).max(300),
  description: z.string().max(10000).default(""),
  imageUrl: z.string().trim().min(1).max(2048).refine((v) => v.startsWith("/") || /^https:\/\//i.test(v), "Use a local path or HTTPS URL"),
  liveUrl: z.string().trim().max(2048).default(""),
  sourceUrl: z.string().trim().max(2048).default(""),
  featured: z.coerce.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  sortOrder: z.coerce.number().int().min(0).max(100000).default(0),
});
