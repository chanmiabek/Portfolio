 "use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
export async function createSkill(form: FormData) {
  await requireAdmin();
  const name=String(form.get("name")||"").trim(), category=String(form.get("category")||"Frontend"), level=Number(form.get("level")||80);
  if(name.length<1||name.length>80||!Number.isInteger(level)||level<0||level>100) redirect("/admin/skills?error=1");
  await db.skill.create({data:{name,category,level,sortOrder:Number(form.get("sortOrder")||0)}});
  revalidatePath("/"); redirect("/admin/skills?saved=1");
}
export async function deleteSkill(form: FormData) {
  await requireAdmin(); const id=String(form.get("id")||""); if(id) await db.skill.delete({where:{id}});
  revalidatePath("/"); redirect("/admin/skills");
}
