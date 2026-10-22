import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  await requireAdmin();
  const [projects, published, messages, unread, skills, experiences, testimonials] = await Promise.all([
    db.project.count(), db.project.count({ where: { status: "PUBLISHED" } }),
    db.contactMessage.count(), db.contactMessage.count({ where: { status: "UNREAD" } }),
    db.skill.count(), db.experience.count(), db.testimonial.count(),
  ]);
  const recentMessages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const stats = [{ label: "Total projects", value: projects, sub: `${published} published` }, { label: "Contact messages", value: messages, sub: `${unread} unread` }, { label: "Skills", value: skills, sub: "In your profile" }, { label: "Experience entries", value: experiences, sub: `${testimonials} testimonials` }];
  return <><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="section-eyebrow">Your workspace</p><h1 className="mt-2 text-3xl font-black tracking-tight">Dashboard overview</h1><p className="mt-2 text-sm text-[#73716c]">Manage your portfolio content from one place.</p></div><Link href="/" target="_blank" className="btn-primary">View website ↗</Link></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-[#e6e3dc] bg-white p-5"><p className="text-sm text-[#73716c]">{stat.label}</p><p className="mt-3 text-4xl font-black tracking-tight">{stat.value}</p><p className="mt-2 text-xs text-[#73716c]">{stat.sub}</p></div>)}</div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_.7fr]"><section className="rounded-2xl border border-[#e6e3dc] bg-white p-6"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Recent messages</h2><Link href="/admin/messages" className="text-sm font-bold underline underline-offset-4">View inbox</Link></div>
      {recentMessages.length ? <div className="mt-5 divide-y divide-[#e6e3dc]">{recentMessages.map((message) => <div key={message.id} className="py-4"><div className="flex items-center justify-between gap-3"><p className="font-bold">{message.name}</p><span className="text-xs text-[#73716c]">{message.createdAt.toLocaleDateString()}</span></div><p className="mt-1 text-sm text-[#73716c]">{message.subject}</p><p className="mt-2 line-clamp-2 text-sm">{message.message}</p></div>)}</div> : <p className="mt-5 rounded-xl bg-[#f7f6f2] p-5 text-sm text-[#73716c]">No messages yet. Messages submitted from the public contact form will appear here.</p>}
    </section><section className="rounded-2xl border border-[#e6e3dc] bg-white p-6"><h2 className="text-lg font-bold">Quick actions</h2><div className="mt-4 grid gap-3">{[{ href: "/admin/projects", title: "Manage projects", desc: "Add work to your portfolio" }, { href: "/admin/settings", title: "Edit profile", desc: "Update your bio and links" }, { href: "/admin/messages", title: "Open inbox", desc: "Read visitor enquiries" }].map((item) => <Link key={item.href} href={item.href} className="rounded-xl border border-[#e6e3dc] p-4 transition hover:border-[#c58d68]"><p className="font-bold">{item.title} ↗</p><p className="mt-1 text-sm text-[#73716c]">{item.desc}</p></Link>)}</div></section></div>
  </>;
}
