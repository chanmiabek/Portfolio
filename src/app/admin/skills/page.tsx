import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { createSkill, deleteSkill } from "./actions";
export const metadata={title:"Skills"};
export default async function SkillsPage(){
 await requireAdmin(); const items=await db.skill.findMany({orderBy:{sortOrder:"asc"}});
 return <><p className="section-eyebrow">Profile details</p><h1 className="mt-2 text-3xl font-black">Skills</h1><p className="mt-2 text-sm text-[#73716c]">Add technologies and proficiency levels shown in your profile.</p>
 <form action={createSkill} className="mt-6 grid gap-4 rounded-2xl border border-[#e6e3dc] bg-white p-5 sm:grid-cols-4"><div className="form-field"><label>Name</label><input name="name" required maxLength={80} placeholder="TypeScript"/></div><div className="form-field"><label>Category</label><select name="category"><option>Frontend</option><option>Backend</option><option>Tools</option><option>Design</option></select></div><div className="form-field"><label>Level (0–100)</label><input name="level" type="number" min="0" max="100" defaultValue="80" required/></div><div className="form-field"><label>Sort order</label><input name="sortOrder" type="number" min="0" defaultValue="0"/></div><button className="btn-primary sm:col-span-4">Add skill</button></form>
 <div className="mt-6 grid gap-3 sm:grid-cols-2">{items.map(i=><article key={i.id} className="rounded-2xl border border-[#e6e3dc] bg-white p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="font-bold">{i.name}</h2><p className="mt-1 text-sm text-[#73716c]">{i.category} · {i.level}%</p></div><form action={deleteSkill}><input type="hidden" name="id" value={i.id}/><button className="text-sm font-bold text-red-700">Delete</button></form></div><div className="mt-4 h-1.5 rounded-full bg-[#eee9e1]"><div className="h-1.5 rounded-full bg-[#a96f4c]" style={{width:`${i.level}%`}}/></div></article>)}</div></>;
}
