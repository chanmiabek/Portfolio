import Link from "next/link";
import { LayoutDashboard, BriefcaseBusiness, Wrench, GraduationCap, MessageSquare, Settings, Star, LogOut, ExternalLink } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/admin/login/actions";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/experience", label: "Experience", icon: GraduationCap },
  { href: "/admin/services", label: "Services", icon: Star },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const admin = await getSession();
  if (!admin) 
    
    return <>
    {children}
    
    </>;

  return <div className="min-h-screen bg-[#f7f6f2] lg:grid lg:grid-cols-[250px_1fr]">
    <aside className="border-b border-[#e6e3dc] bg-white p-5 lg:min-h-screen lg:border-b-0 lg:border-r lg:p-6">
      <Link href="/" className="text-xl font-black tracking-tight">My<span className="text-[#a96f4c]">Portfolio.</span></Link>

      <p className="mt-1 text-xs text-[#73716c]">CONTENT STUDIO</p>
      <div className="mt-7 rounded-2xl bg-[#f7f6f2] p-3">
        
        <p className="text-xs text-[#73716c]">SIGNED IN AS</p>
        
      <p className="mt-1 truncate text-sm font-bold">{admin.name}</p>
      <p className="truncate text-xs text-[#73716c]">{admin.email}</p>
      </div>

      <nav aria-label="Admin navigation" className="mt-6 grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
        {nav.map(({ href, label, icon: Icon }) => 
        <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#5f5d58] transition hover:bg-[#f3eee8] hover:text-[#20201f]">
          <Icon size={17} />{label}</Link>)}
      </nav>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-[#e6e3dc] pt-5 lg:flex-col">
        
        <Link href="/" target="_blank" className="inline-flex items-center gap-2 text-sm text-[#73716c]">
        
        <ExternalLink size={15} /> View website
        </Link>
        <form action={logoutAction}>
          <button className="inline-flex items-center gap-2 text-sm text-[#73716c]">
            
            <LogOut size={15} /> Sign out
          </button>
            
        </form>
      </div>
    </aside>
    <main className="min-w-0 p-5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  </div>;
}
