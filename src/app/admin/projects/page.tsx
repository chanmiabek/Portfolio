import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { db } from "@/lib/db";
import { saveProject, deleteProject } from "./actions";

export const metadata = { title: "Projects" };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string; deleted?: string }> }) {
  await requireAdmin();
  const params = await searchParams;
  const projects = await db.project.findMany({ orderBy: [{ updatedAt: "desc" }] });
  return <><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="section-eyebrow">Portfolio content</p><h1 className="mt-2 text-3xl font-black tracking-tight">Projects</h1><p className="mt-2 text-sm text-[#73716c]">Create, edit, publish and remove portfolio projects.</p></div><a href="#project-form" className="btn-primary">+ New project</a></div>
    {params.error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">Please check the project fields. Image must be a valid URL and slug must use lowercase letters, numbers and hyphens.</p>}
    {(params.saved || params.deleted) && <p className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-800">{params.saved ? "Project saved." : "Project deleted."}</p>}
    <section className="mt-7 overflow-hidden rounded-2xl border border-[#e6e3dc] bg-white"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#f7f6f2] text-[#73716c]"><tr><th className="p-4 font-semibold">Project</th><th className="p-4 font-semibold">Category</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Updated</th></tr></thead><tbody className="divide-y divide-[#e6e3dc]">{projects.map((p) => <tr key={p.id}><td className="p-4"><a href={`#edit-${p.id}`} className="font-bold underline underline-offset-4">{p.title}</a><p className="mt-1 text-xs text-[#73716c]">/{p.slug}</p></td><td className="p-4">{p.category}</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.status === "PUBLISHED" ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>{p.status}</span></td><td className="p-4 text-[#73716c]">{p.updatedAt.toLocaleDateString()}</td></tr>)}</tbody></table></div>{!projects.length && <p className="p-6 text-sm text-[#73716c]">No projects yet. Add one using the form below.</p>}</section>
    <div id="project-form" className="mt-9"><h2 className="text-xl font-bold">Create a project</h2><p className="mt-1 text-sm text-[#73716c]">Use an absolute HTTPS image URL or a local path such as /images/portfolio-1.jpg.</p><ProjectForm action={saveProject} /></div>
    {projects.map((p) => <section key={p.id} id={`edit-${p.id}`} className="mt-8 scroll-mt-6 rounded-2xl border border-[#e6e3dc] bg-white p-6"><div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-bold">Edit: {p.title}</h2><form action={deleteProject}><input type="hidden" name="id" value={p.id} /><button className="text-sm font-bold text-red-700 underline underline-offset-4">Delete</button></form></div><ProjectForm action={saveProject} project={p} /></section>)}
  </>;
}

function ProjectForm({ action, project }: { action: (form: FormData) => Promise<void>; project?: { id: string; title: string; slug: string; category: string; summary: string; description: string; imageUrl: string; liveUrl: string; sourceUrl: string; featured: boolean; status: "DRAFT" | "PUBLISHED"; sortOrder: number } }) {
  return <form action={action} className="mt-5 grid gap-4 rounded-2xl border border-[#e6e3dc] bg-white p-5 sm:grid-cols-2">
    {project && <input type="hidden" name="id" value={project.id} />}
    <Field label="Title" name="title" defaultValue={project?.title} required />
    <Field label="Slug (unique)" name="slug" defaultValue={project?.slug} required placeholder="my-awesome-project" />
    <Field label="Category" name="category" defaultValue={project?.category || "Web Development"} required />
    <Field label="Image URL" name="imageUrl" defaultValue={project?.imageUrl} required placeholder="/images/portfolio-1.jpg" />
    <div className="form-field sm:col-span-2"><label htmlFor={`summary-${project?.id || "new"}`}>Short summary</label><textarea id={`summary-${project?.id || "new"}`} name="summary" defaultValue={project?.summary} required minLength={10} maxLength={300} rows={2} /></div>
    <div className="form-field sm:col-span-2"><label htmlFor={`description-${project?.id || "new"}`}>Full description</label><textarea id={`description-${project?.id || "new"}`} name="description" defaultValue={project?.description} rows={4} maxLength={10000} /></div>
    <Field label="Live URL (optional)" name="liveUrl" defaultValue={project?.liveUrl} />
    <Field label="Source URL (optional)" name="sourceUrl" defaultValue={project?.sourceUrl} />
    <Field label="Sort order" name="sortOrder" type="number" defaultValue={String(project?.sortOrder ?? 0)} />
    <div className="form-field"><label htmlFor={`status-${project?.id || "new"}`}>Publication status</label><select id={`status-${project?.id || "new"}`} name="status" defaultValue={project?.status || "DRAFT"}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></div>
    <label className="flex items-center gap-2 text-sm font-semibold sm:col-span-2"><input type="checkbox" name="featured" defaultChecked={project?.featured} /> Feature this project</label>
    <div className="sm:col-span-2"><button className="btn-primary">{project ? "Save changes" : "Create project"}</button></div>
  </form>;
}
function Field({ label, name, defaultValue, required, placeholder, type = "text" }: { label: string; name: string; defaultValue?: string; required?: boolean; placeholder?: string; type?: string }) {
  const id = `${name}-${defaultValue ? defaultValue.replace(/[^a-z0-9]/gi, "").slice(0, 10) : "new"}`;
  return <div className="form-field"><label htmlFor={id}>{label}</label><input id={id} name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder} /></div>;
}
