import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateMessage } from "./actions";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  await requireAdmin();
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return <>
  <p className="section-eyebrow">Inbox</p>
  <h1 className="mt-2 text-3xl font-black tracking-tight">Contact messages</h1>
  <p className="mt-2 text-sm text-[#73716c]">Visitor enquiries submitted through your portfolio contact form.</p>
    <div className="mt-7 grid gap-4">{messages.map((m) => <article key={m.id} className="rounded-2xl border border-[#e6e3dc] bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-bold">{m.subject}</h2><span className="rounded-full bg-[#f3eee8] px-2.5 py-1 text-xs font-bold">{m.status}</span></div><p className="mt-1 text-sm text-[#73716c]">{m.name} · <a className="underline underline-offset-4" href={`mailto:${m.email}`}>{m.email}</a> · {m.createdAt.toLocaleString()}</p></div><form action={updateMessage} className="flex items-center gap-2"><input type="hidden" name="id" value={m.id} /><select name="status" defaultValue={m.status} aria-label={`Status for ${m.subject}`} className="rounded-lg border border-[#ddd8cf] p-2 text-sm"><option value="UNREAD">Unread</option><option value="READ">Read</option><option value="ARCHIVED">Archived</option></select><button className="btn-secondary !rounded-lg !px-3 !py-2">Save</button></form></div><p className="mt-4 whitespace-pre-wrap leading-7 text-[#5f5d58]">{m.message}</p></article>)}{!messages.length && <div className="rounded-2xl border border-dashed border-[#d7d2c8] p-12 text-center"><h2 className="font-bold">Your inbox is empty</h2><p className="mt-2 text-sm text-[#73716c]">New contact form submissions will show up here.</p></div>}</div>
  </>;
}
