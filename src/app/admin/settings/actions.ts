 "use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  siteTitle: z.string()
  .trim()
  .min(1)
  .max(100), 
  fullName: z.string()
  .trim().min(1).max(100),
  headline: z.string()
  .trim()
  .min(1)
  .max(180), 
  intro: z.string()
  .trim()
  .max(1000),
  about: z.string()
  .trim()
  .max(10000), 
  profileImage: z.string()
  .trim()
  .min(1)
  .max(2048),
  resumeUrl: z.string()
  .trim()
  .max(2048), 
  email: z.union([z.literal(""), 
    z.string()
    .email()
    .max(254)]),
  phone: z.string()
  .trim()
  .max(50), 
  location: z.string()
  .trim()
  .max(120),
  twitterUrl: z.string()
  .trim()
  .max(2048), 
  githubUrl: z.string()
  .trim()
  .max(2048),
  linkedinUrl: z.string()
  .trim().max(2048), 
  instagramUrl: z.string()
  .trim()
  .max(2048),

  yearsExperience: z.coerce
  .number()
  .int()
  .min(0)
  .max(100), 
  projectsCount: z.coerce
  .number()
  .int()
  .min(0)
  .max(100000),
  clientsCount: z.coerce
  .number()
  .int()
  .min(0)
  .max(100000), 
  awardsCount: z.coerce
  .number()
  .int()
  .min(0)
  .max(100000),

});

export async function saveSettings(form: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(form.entries());

  const parsed = schema.safeParse(raw);

  if (!parsed.success) 
    redirect("/admin/settings?error=validation");

  await db.siteSettings.upsert({ 
    where: { id: "main" }, 
    create: { id: "main", ...parsed.data }, 
    update: parsed.data });

  revalidatePath("/"); 
  revalidatePath("/admin/settings");
  
  redirect("/admin/settings?saved=1");
}
