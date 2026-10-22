import {requireAdmin} from "@/lib/auth";
import {db} from "@/lib/db";
import {createExperience,deleteExperience} from "./actions";


export const metadata={title:"Experience"};

export default async function ExperiencePage(){
    await requireAdmin();const items=await db.experience.findMany({orderBy:{sortOrder:"asc"}});

return 
<>
<p className="section-eyebrow">Your journey</p>
<h1 className="mt-2 text-3xl font-black">Experience</h1>
<p className="mt-2 text-sm text-[#73716c]">Manage roles and work history displayed on the portfolio.</p>

<form action={createExperience} className="mt-6 grid gap-4 rounded-2xl border border-[#e6e3dc] bg-white p-5 sm:grid-cols-2">
    <div className="form-field">
        <label>Company</label>
        <input name="company" required maxLength={150}/></div>
        <div className="form-field"><label>Role / title</label>
        
        <input name="role" required maxLength={150}/></div>
        <div className="form-field">
            <label>Location</label>
            <input name="location" maxLength={120} placeholder="Remote"/></div>
            <div className="form-field">
                <label>Start date</label>
                <input name="startDate" type="date" required/></div>
                <div className="form-field">
                    <label>End date (optional)</label>
                    <input name="endDate" type="date"/></div>
                    <div className="form-field">
                        <label>Sort order</label>
                        <input name="sortOrder" type="number" defaultValue="0"/>
        </div>
        <div className="form-field sm:col-span-2">
            <label>Description</label>
            <textarea name="description" rows={3} required maxLength={3000}/></div>
            <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input name="current" type="checkbox"/> This is my current role</label>
                <button className="btn-primary sm:col-span-2">Add experience</button>
                </form>
<div className="mt-6 grid gap-3">
    {items.map(i=>
    <article key={i.id} className="flex items-start justify-between gap-4 rounded-2xl border border-[#e6e3dc] bg-white p-5">
        <div>
            <h2 className="font-bold">{i.role}</h2>
            <p className="mt-1 text-sm text-[#73716c]">{i.company} · {i.startDate.getFullYear()} – {i.current?"Present":i.endDate?.getFullYear()||"—"}</p>
            <p className="mt-3 text-sm leading-6">{i.description}</p></div>
            <form action={deleteExperience}>
                <input type="hidden" name="id" value={i.id}/>
                <button className="text-sm font-bold text-red-700">Delete</button>
            </form>
   </article>)}
</div>
</>;
}
