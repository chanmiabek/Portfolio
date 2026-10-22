import Link from "next/link";

const links = [
  ["About", "#about"], ["Experience", "#experience"], ["Services", "#services"],
  ["Portfolio", "#portfolio"], ["Testimonials", "#testimonials"], ["Contact", "#contact"],
];

export function SiteHeader() {
  return <header className="sticky top-0 z-40 border-b border-[#e6e3dc]/80 bg-[#f8f7f4]/90 backdrop-blur-xl">

    <div className="container-page flex h-[76px] items-center justify-between gap-6">
      <Link href="/" className="text-xl font-black tracking-tight">My
      <span className="text-[#a96f4c]">Portfolio.</span>

      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm text-[#5f5d58] md:flex">
        {links.map(([label, href]) => 
        <a key={href} href={href} className="transition hover:text-black">{label}</a>)}
      </nav>
      <a className="btn-primary !px-5 !py-2.5" href="#contact">Let’s talk <span aria-hidden="true" className="ml-2">↗</span></a>
    </div>
  </header>;
}
