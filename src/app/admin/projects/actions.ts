 "use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/validators";

function value(form: FormData, key: string) { return String(form.get(key) ?? ""); }

export async function saveProject(form: FormData) {
  await requireAdmin();
  const id = value(form, "id");
  const parsed = projectSchema.safeParse({
    title: value(form, "title"), slug: value(form, "slug"), category: value(form, "category"),
    summary: value(form, "summary"), description: value(form, "description"), imageUrl: value(form, "imageUrl"),
    liveUrl: value(form, "liveUrl"), sourceUrl: value(form, "sourceUrl"),
    featured: form.get("featured") === "on", status: value(form, "status"), sortOrder: value(form, "sortOrder") || 0,
  });
  if (!parsed.success) redirect(`/admin/projects?error=validation`);
  const data = { ...parsed.data, liveUrl: parsed.data.liveUrl ? parsed.data.liveUrl : "", sourceUrl: parsed.data.sourceUrl ? parsed.data.sourceUrl : "" };
  if (id) await db.project.update({ where: { id }, data });
  else await db.project.create({ data });
  revalidatePath("/"); revalidatePath("/admin/projects");
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(form: FormData) {
  await requireAdmin();
  const id = value(form, "id");
  if (!id) redirect("/admin/projects");
  await db.project.delete({ where: { id } });
  revalidatePath("/"); revalidatePath("/admin/projects");
  redirect("/admin/projects?deleted=1");
}
