import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { saveSettings } from "./actions";

export const metadata = { title: "Site settings" };

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  await requireAdmin();
  const params = await searchParams;
  const settings = await db.siteSettings.findUnique({ where: { id: "main" } }) || {
    siteTitle: "MyFolio", fullName: "Your Name", headline: "Full-stack developer", intro: "I build thoughtful digital experiences.", about: "",
    profileImage: "/images/about-us.jpg", resumeUrl: "", email: "", phone: "", location: "", twitterUrl: "", githubUrl: "", linkedinUrl: "", instagramUrl: "",
    yearsExperience: 0, projectsCount: 0, clientsCount: 0, awardsCount: 0,
  };
  const fields: [string, string, string, string?][] = [
    ["siteTitle", "Site title", "text"], ["fullName", "Your full name", "text"], ["headline", "Professional headline", "text"],
    ["intro", "Hero introduction", "textarea"], ["about", "About you", "textarea"], ["profileImage", "Profile image URL/path", "text"],
    ["resumeUrl", "Résumé URL", "text"], ["email", "Public email", "email"], ["phone", "Phone", "text"], ["location", "Location", "text"],
    ["twitterUrl", "Twitter / X URL", "text"], ["githubUrl", "GitHub URL", "text"], ["linkedinUrl", "LinkedIn URL", "text"], ["instagramUrl", "Instagram URL", "text"],
    ["yearsExperience", "Years of experience", "number"], ["projectsCount", "Project count", "number"], ["clientsCount", "Client count", "number"], ["awardsCount", "Awards count", "number"],
  ];
  return <><p className="section-eyebrow">Public profile</p><h1 className="mt-2 text-3xl font-black tracking-tight">Site settings</h1><p className="mt-2 text-sm text-[#73716c]">Update the profile, social links and hero content shown on the public website.</p>
    {params.saved && <p className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-800">Settings saved.</p>}
    {params.error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">Please check the fields and try again.</p>}
    <form action={saveSettings} className="mt-7 grid gap-5 rounded-2xl border border-[#e6e3dc] bg-white p-6 sm:grid-cols-2">
      {fields.map(([name, label, type]) => <div key={name} className={`form-field ${type === "textarea" ? "sm:col-span-2" : ""}`}><label htmlFor={name}>{label}</label>{type === "textarea" ? <textarea id={name} name={name} rows={name === "about" ? 6 : 3} defaultValue={String(settings[name as keyof typeof settings] ?? "")} /> : <input id={name} name={name} type={type} defaultValue={String(settings[name as keyof typeof settings] ?? "")} required={["siteTitle", "fullName", "headline", "profileImage"].includes(name)} />}</div>)}
      <div className="sm:col-span-2"><button className="btn-primary">Save site settings</button></div>
    </form>
  </>;
}
