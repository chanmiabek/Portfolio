 "use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, getSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function loginAction(formData: FormData) {

  const parsed = loginSchema.safeParse({ 
    email: formData.get("email"), password: formData.get("password") });

  if (!parsed.success) 
    redirect("/admin/login?error=invalid");

  const admin = await db.adminUser.findUnique({ 
    where: { 
      email: parsed.data.email.toLowerCase() 
    } });

  if (!admin || !(await compare(parsed.data.password, admin.passwordHash))) 
    redirect("/admin/login?error=invalid");

  await db.adminUser.update({ 
    where: { 
      id: admin.id 
    }, 
    data: { 
      lastLoginAt: new Date() 
    } });
    
  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  const { destroySession } = await import("@/lib/auth");
  await destroySession();
  redirect("/admin/login");
}

export async function currentAdmin() {
  return getSession();
}
