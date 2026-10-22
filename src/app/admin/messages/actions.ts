 "use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function updateMessage(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") || "");
  const status = String(form.get("status") || "");
  if (!id || !["UNREAD", "READ", "ARCHIVED"].includes(status)) redirect("/admin/messages");
  await db.contactMessage.update({ where: { id }, data: { status: status as "UNREAD" | "READ" | "ARCHIVED" } });
  revalidatePath("/admin/messages"); revalidatePath("/admin");
  redirect("/admin/messages?saved=1");
}
