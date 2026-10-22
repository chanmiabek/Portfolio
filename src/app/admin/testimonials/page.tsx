import {requireAdmin} from "@/lib/auth";import {db} from "@/lib/db";import {createTestimonial,deleteTestimonial} from "./actions";
export const metadata={ title:"Testimonials" };
export default async function TestimonialsPage(){
    await requireAdmin();
    const items=await db.testimonial.findMany({
        orderBy:{sortOrder:"asc"

        }});
return <>
<p className="section-eyebrow">Social proof</p>
<h1 className="mt-2 text-3xl font-black">Testimonials</h1>
<p className="mt-2 text-sm text-[#73716c]">Add feedback and choose which testimonials are public.</p>
<form action={createTestimonial} className="mt-6 grid gap-4 rounded-2xl border border-[#e6e3dc] bg-white p-5 sm:grid-cols-2">
    <div className="form-field">
        <label>Name</label>
        <input name="name" required maxLength={100}/>
    </div>
        <div className="form-field">
            <label>Role / title</label>
            <input name="role" required maxLength={120}/>
        </div>
            <div className="form-field">
                <label>Company (optional)</label>
                <input name="company" maxLength={120}/>
            </div>
            <div className="form-field">
                <label>Photo URL (optional)</label>
                <input name="imageUrl" maxLength={2048}/>
            </div>
            <div className="form-field sm:col-span-2">
                <label>Quote</label>
                <textarea name="quote" required rows={4} maxLength={3000}/>
            </div>
            <div className="form-field">
                <label>Status</label>
                <select name="status">
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                </select>
            </div>
            <div className="form-field">
                <label>Sort order</label>
                <input name="sortOrder" type="number" defaultValue="0"/>
            </div>
            <button className="btn-primary sm:col-span-2">Add testimonial</button>
</form>
<div className="mt-6 grid gap-3 md:grid-cols-2">
    {items.map(i=><article key={i.id} className="rounded-2xl border border-[#e6e3dc] bg-white p-5">
    <div className="flex items-start justify-between gap-4">
        <div>
            <p className="text-3xl text-[#c58d68]">“</p>
            <p className="leading-7">{i.quote}</p>
            <p className="mt-4 font-bold">{i.name}</p>
            <p className="text-sm text-[#73716c]">{i.role}{i.company?` · ${i.company}`:""}</p>
            <p className="mt-2 text-xs font-bold">{i.status}</p>
            </div>
            <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={i.id}/>
                <button className="text-sm font-bold text-red-700">Delete</button>
            </form>
        </div>
            
    </article>)}
</div>
</>;
}
