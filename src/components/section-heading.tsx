export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-12 max-w-2xl">
    <p className="section-eyebrow">{eyebrow}</p>
    <h2 className="section-title">{title}</h2>
    {description && <p className="max-w-xl leading-7 text-[#73716c]">{description}</p>}
  </div>;
}
