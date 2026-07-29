type PageHeroProps = {
  label: string;
  title: string;
  copy: string;
  detail?: string;
};

export function PageHero({ label, title, copy, detail }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
      </div>
      <div className="page-hero-copy">
        <p>{copy}</p>
        {detail ? <span>{detail}</span> : null}
      </div>
    </section>
  );
}
