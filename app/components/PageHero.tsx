type PageHeroProps = {
  title: string;
  copy: string;
  detail?: string;
  compact?: boolean;
};

export function PageHero({
  title,
  copy,
  detail,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={compact ? "page-hero compact" : "page-hero"}>
      <div>
        <h1>{title}</h1>
      </div>
      <div className="page-hero-copy">
        <p>{copy}</p>
        {detail ? <span>{detail}</span> : null}
      </div>
    </section>
  );
}
