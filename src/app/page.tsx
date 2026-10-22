import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Code2, Globe2, Laptop, Mail, Smartphone, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";

export const revalidate = 60;

const fallbackSettings = {
  siteTitle: "MyFolio", fullName: "Maggiso Jak", headline: "Full-stack developer",
  intro: "I turn thoughtful ideas into fast, accessible and useful digital experiences.",
  about: "I’m a developer who enjoys building practical products from the first sketch to the final deployment. I care about clear interfaces, reliable systems, and software that solves real problems.",
  profileImage: "/images/about-us.jpg", resumeUrl: "", email: "hello@example.com", phone: "", location: "Kenya",
  twitterUrl: "", githubUrl: "", linkedinUrl: "", instagramUrl: "", yearsExperience: 2, projectsCount: 12, clientsCount: 8, awardsCount: 0,
};

const fallbackProjects = [
  { id: "1", title: "Editorial food experience", slug: "editorial-food-experience", category: "Web Design", summary: "A visual-first website built around content, clarity and conversion.", imageUrl: "/images/portfolio-1.jpg", liveUrl: "", sourceUrl: "", featured: true },
  { id: "2", title: "Community platform", slug: "community-platform", category: "Web Development", summary: "A responsive product experience that helps people find the right resources.", imageUrl: "/images/portfolio-2.jpg", liveUrl: "", sourceUrl: "", featured: true },
  { id: "3", title: "Digital product dashboard", slug: "digital-product-dashboard", category: "App Development", summary: "A streamlined interface for everyday workflows and useful insights.", imageUrl: "/images/portfolio-3.jpg", liveUrl: "", sourceUrl: "", featured: false },
  { id: "4", title: "Marketing website", slug: "marketing-website", category: "Web Development", summary: "A focused landing page with strong hierarchy and responsive layouts.", imageUrl: "/images/portfolio-4.jpg", liveUrl: "", sourceUrl: "", featured: false },
  { id: "5", title: "Mobile companion", slug: "mobile-companion", category: "App Development", summary: "A mobile-first flow that keeps key actions simple and accessible.", imageUrl: "/images/portfolio-5.jpg", liveUrl: "", sourceUrl: "", featured: false },
  { id: "6", title: "Commerce experience", slug: "commerce-experience", category: "Web Design", summary: "A clean product experience designed to make browsing feel effortless.", imageUrl: "/images/portfolio-6.jpg", liveUrl: "", sourceUrl: "", featured: false },
];

const fallbackServices = [
  { id: "1", title: "Web design", description: "Elegant, accessible interfaces that bring your brand and product to life.", icon: "globe" },
  { id: "2", title: "Web development", description: "Fast, reliable websites and full-stack applications built to scale.", icon: "code" },
  { id: "3", title: "Mobile experiences", description: "Thoughtful mobile-first experiences that feel natural to use.", icon: "mobile" },
  { id: "4", title: "Product strategy", description: "Turn early ideas into clear features, flows and delivery plans.", icon: "sparkles" },
  { id: "5", title: "API integration", description: "Secure integrations, data workflows and dependable backend services.", icon: "laptop" },
  { id: "6", title: "Performance", description: "Improve accessibility, loading speed, search visibility and usability.", icon: "globe" },
];

function serviceIcon(icon: string) {
  const props = { size: 22, strokeWidth: 1.8 };
  if (icon === "mobile") return <Smartphone {...props} />;
  if (icon === "laptop") return <Laptop {...props} />;
  if (icon === "sparkles") return <Sparkles {...props} />;
  if (icon === "code") return <Code2 {...props} />;
  return <Globe2 {...props} />;
}

export default async function HomePage() {

  const [ settingsRecord, skillsRecord, experienceRecord, servicesRecord, projectsRecord, testimonialsRecord] = await Promise.all([
    db.siteSettings.findUnique({ where: { id: "main" } }).catch(() => null),
    db.skill.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }).catch(() => []),
    db.experience.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }).catch(() => []),
    db.service.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }).catch(() => []),
    db.project.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] }).catch(() => []),
    db.testimonial.findMany({ where: { status: "PUBLISHED" }, orderBy: { sortOrder: "asc" } }).catch(() => []),
  ]);
  const settings = { ...fallbackSettings, ...(settingsRecord || {}) };
  const skills = skillsRecord.length ? skillsRecord : [
    { id: "s1", name: "TypeScript", category: "Frontend", level: 88 }, { id: "s2", name: "React / Next.js", category: "Frontend", level: 90 },
    { id: "s3", name: "Tailwind CSS", category: "Frontend", level: 90 }, { id: "s4", name: "Node.js", category: "Backend", level: 82 },
    { id: "s5", name: "Python", category: "Backend", level: 78 }, { id: "s6", name: "PostgreSQL", category: "Backend", level: 78 },
  ];
  const experiences = experienceRecord.length ? experienceRecord : [
    { id: "e1", company: "Independent", role: "Full-stack Developer", location: "Remote", startDate: new Date("2024-01-01"), endDate: null, current: true, description: "Designing and building responsive applications, APIs, and data-driven products." },
    { id: "e2", company: "Personal projects", role: "Software Developer", location: "Kenya", startDate: new Date("2022-01-01"), endDate: new Date("2023-12-01"), current: false, description: "Practiced product development from interface design through implementation and deployment." },
  ];
  const services = servicesRecord.length ? servicesRecord : fallbackServices;
  const projects = projectsRecord.length ? projectsRecord : fallbackProjects;
  const testimonials = testimonialsRecord;

  return <>
  <SiteHeader />
    <main>
      <section id="home" className="relative overflow-hidden border-b border-[#e6e3dc]">
        <div className="container-page grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div className="relative z-10">
            <p className="section-eyebrow mb-6 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#719477]" /> Available for select projects</p>
            <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.065em] sm:text-6xl lg:text-7xl">Building digital things that <span className="text-[#a96f4c]">make a difference.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#73716c]">{settings.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#portfolio" className="btn-primary">Explore my work <ArrowUpRight size={17} className="ml-2" /></a><a href="#about" className="btn-secondary">More about me</a></div>
            <div className="mt-14 flex flex-wrap gap-x-9 gap-y-4 border-t border-[#e6e3dc] pt-6 text-sm text-[#73716c]"><span><strong className="text-2xl text-[#20201f]">{settings.projectsCount}+</strong><br />Projects built</span><span><strong className="text-2xl text-[#20201f]">{settings.yearsExperience}+</strong><br />Years learning & building</span><span><strong className="text-2xl text-[#20201f]">{settings.clientsCount}+</strong><br />Collaborations</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-5 rotate-3 rounded-[42%_58%_52%_48%] bg-[#e9d8ca]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border-[8px] border-white bg-[#e6e1d8] shadow-2xl">
              <Image src={settings.profileImage || "/images/about-us.jpg"} alt={`${settings.fullName} portrait`} fill priority sizes="(max-width: 1024px) 90vw, 440px" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-7 rounded-2xl border border-[#e6e3dc] bg-white p-4 shadow-lg"><p className="text-xs text-[#73716c]">CURRENTLY FOCUSED ON</p><p className="mt-1 font-bold">Full-stack products ↗</p></div>
          </div>
        </div>
        <a href="#about" aria-label="Scroll to about section" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[#73716c] md:block"><ArrowDownRight /></a>
      </section>

      <section id="about" className="section"><div className="container-page grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="section-eyebrow">A little about me</p><h2 className="section-title">Curious mind.<br />Builder at heart.</h2><div className="mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-[#e6e1d8]"><Image src="/images/about-us.jpg" alt="Developer at work" width={800} height={600} className="h-full w-full object-cover" /></div></div>
        <div className="pt-1"><p className="text-2xl font-semibold leading-relaxed tracking-tight">{settings.headline}</p><p className="mt-5 whitespace-pre-line leading-8 text-[#73716c]">{settings.about}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">{["Frontend", "Backend"].map((category) => <div key={category}><h3 className="mb-5 text-lg font-bold">{category} skills</h3><div className="space-y-4">{skills.filter((skill) => skill.category.toLowerCase().includes(category.toLowerCase()) || (category === "Frontend" && ["react", "typescript", "tailwind", "javascript", "html", "css"].some((x) => skill.name.toLowerCase().includes(x))) || (category === "Backend" && ["python", "node", "sql", "api", "java", "php"].some((x) => skill.name.toLowerCase().includes(x)))).slice(0, 4).map((skill) => <div key={skill.id}><div className="mb-2 flex justify-between text-sm"><span>{skill.name}</span><span className="text-[#73716c]">{skill.level}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e8e4dc]"><div className="h-full rounded-full bg-[#a96f4c]" style={{ width: `${skill.level}%` }} /></div></div>)}</div></div>)}</div>
          <div className="mt-9 flex flex-wrap gap-3"><a className="btn-primary" href="#contact">Work with me <ArrowUpRight size={16} className="ml-2" /></a>{settings.resumeUrl && <a className="btn-secondary" href={settings.resumeUrl} target="_blank" rel="noreferrer">View résumé</a>}</div>
        </div>
      </div>
      </section>

      <section id="experience" className="section bg-[#efede7]">
        <div className="container-page">
          <SectionHeading eyebrow="The journey" title="Experience & learning" description="A snapshot of the roles, collaborations and experiences that have shaped how I build."/>
          <div className="grid gap-4 md:grid-cols-2">{experiences.map((item) => <article key={item.id} className="rounded-2xl border border-[#dfdbd2] bg-white p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-[#a96f4c]">{new Date(item.startDate).getFullYear()} — {item.current ? "Present" : item.endDate ? new Date(item.endDate).getFullYear() : "—"}</p>
            <h3 className="mt-3 text-xl font-bold">{item.role}</h3>
            <p className="mt-1 text-sm text-[#73716c]">{item.company}{item.location ? ` · ${item.location}` : ""}</p>
            <p className="mt-4 leading-7 text-[#73716c]">{item.description}</p>
            </article>)}
            </div>
            </div>
      </section>

      <section id="services" className="section">
        <div className="container-page">
          <SectionHeading eyebrow="What I can do" title="Services built around your goals" description="From the first idea to a polished release, I help bring useful digital products to life."/>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <article key={service.id} className="surface group p-7 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4e9df] text-[#8b5c3e]">{serviceIcon(service.icon)}</div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="mt-3 leading-7 text-[#73716c]">{service.description}</p>
            <a href="#contact" aria-label={`Ask about ${service.title}`} className="mt-6 inline-flex items-center text-sm font-bold">Let’s discuss <ArrowUpRight size={16} className="ml-2" /></a>
            </article>)}
            </div>
            </div>
      </section>

      <section id="portfolio" className="section bg-[#efede7]">
        <div className="container-page">
          <SectionHeading eyebrow="Selected work" title="A few things I’ve made" description="A selection of web, product and mobile experiences. Replace these sample entries with your real projects in the dashboard."/>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <article key={project.id} className="group overflow-hidden rounded-2xl border border-[#dfdbd2] bg-white">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e6e1d8]">
            <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
            <div className="p-6">
              <p className="section-eyebrow !text-[.65rem]">{project.category}</p>
              <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
              <p className="mt-2 leading-6 text-[#73716c]">{project.summary}</p>
              <div className="mt-5 flex gap-4 text-sm font-bold">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center">Live project <ArrowUpRight size={15} className="ml-1" /></a>}{project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center">Source code <ArrowUpRight size={15} className="ml-1" /></a>}
              </div>
              </div>
              </article>)}
              </div>
              <p className="mt-7 text-sm text-[#73716c]">Showing {projects.length} projects · Content can be managed in the admin dashboard.</p>
              </div>
      </section>

      <section id="testimonials" className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Kind words" title="Good work is a team effort" description="Feedback from people who have collaborated on projects."/>
          <div className="grid gap-5 md:grid-cols-3">{(testimonials.length ? testimonials : [{ id: "t1", name: "Your future client", role: "Project partner", company: "", quote: "Great communication, thoughtful problem-solving and a focus on the details that matter." }]).map((item) => <blockquote key={item.id} className="surface p-7">

            <p className="text-4xl leading-none text-[#c58d68]">“</p>

            <p className="mt-3 leading-7 text-[#5f5d58]">{item.quote}</p>

            <footer className="mt-7 border-t border-[#e6e3dc] pt-4">
              <p className="font-bold">{item.name}</p>
              <p className="mt-1 text-sm text-[#73716c]">{item.role}{item.company ? ` · ${item.company}` : ""}</p>
              </footer>
              </blockquote>)}
              </div>
              </div>
      </section>

      <section id="contact" className="section bg-[#222220] text-white">
        <div className="container-page grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-eyebrow !text-[#e2b393]">Have a project in mind?</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Let’s make something useful.</h2>
            <p className="mt-5 max-w-md leading-7 text-white/65">Have an idea, a problem to solve, or just want to say hello? Send a message and let’s start a conversation.</p>
            <div className="mt-8 flex items-center gap-3 text-white/80">

            <Mail size={18} />
            {settings.email}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">{settings.githubUrl &&
             
              <a href={settings.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}{settings.linkedinUrl && 
              <a href={settings.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>}{settings.twitterUrl && 
              <a href={settings.twitterUrl} target="_blank" rel="noreferrer">Twitter ↗</a>}
              </div>
              </div>
              <div className="rounded-3xl bg-white p-6 text-[#20201f] sm:p-9">
                <ContactForm />
                </div>
                </div>
      </section>
    </main>
    <footer className="bg-[#222220] px-5 pb-8 text-sm text-white/50">
    <div className="container-page flex flex-col justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
    <p>© {new Date().getFullYear()} 
      {settings.fullName}. All rights reserved.</p>
      <p>Designed with care · <Link href="/admin/login" className="underline underline-offset-4">Admin</Link> · Template base: 
      <a href="" target="_blank" rel="noreferrer" className="underline underline-offset-4">Maggiso</a>
      </p>
      </div>
    </footer>
  </>;
}
