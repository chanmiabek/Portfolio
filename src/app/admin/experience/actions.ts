 "use server";

import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation"; 
import { requireAdmin } from "@/lib/auth"; 
import { db } from "@/lib/db";


export async function createExperience(form:FormData){

 await requireAdmin(); 
 const company=String(form.get("company")||"").trim(), 
 role=String(form.get("role")||"").trim(), 
 description=String(form.get("description")||"").trim(), start=String(form.get("startDate")||"");


 if(!company||!role||!description||!start||Number.isNaN(Date.parse(start))) 
    
    redirect("/admin/experience?error=1");

 const current=form.get("current")==="on", 
 end=String(form.get("endDate")||"");

 await db.experience.create({data:{
    company, role, description, location:String(form.get("location")||""),

    startDate:new Date(start),

    endDate:current||!end?null:new Date(end),
    current,
    sortOrder:Number(form.get("sortOrder")||0)}});

 revalidatePath("/"); redirect("/admin/experience?saved=1");
}
export async function deleteExperience(form:FormData){

    await requireAdmin();
    const id=String(form.get("id")||"");
    if(id)
        
        await db.experience.delete({where:{id}});
        revalidatePath("/");
        redirect("/admin/experience");
    }
