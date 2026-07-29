import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore careers in professional marine electronics at NAVTEAM.",
};

const disciplines = [
  {
    title: "Marine service engineers",
    text: "Troubleshooting, installation and commissioning onboard vessels around the world.",
  },
  {
    title: "Project & integration",
    text: "Planning bridge retrofits and making complex systems work together.",
  },
  {
    title: "Products & operations",
    text: "Supporting customers with equipment, spare parts and product expertise.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title="Work where technology meets the sea."
        copy="NAVTEAM brings together marine experience, technical curiosity and a practical service mindset."
        detail="Future vacancies can be filtered by location and discipline"
      />

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Join the team</p>
            <h2>Build a career around real-world systems.</h2>
          </div>
          <p>
            The careers page can grow into a clear overview of open positions,
            apprenticeships and life at NAVTEAM.
          </p>
        </div>
        <div className="job-grid">
          {disciplines.map((discipline) => (
            <article className="job-card" key={discipline.title}>
              <span>Discipline</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta compact-cta">
        <div>
          <p className="eyebrow">Open application</p>
          <h2>Think you would fit NAVTEAM?</h2>
        </div>
        <Link
          className="button primary"
          href="mailto:navteam@navteam.com?subject=Open application"
        >
          Send an application
        </Link>
      </section>
    </>
  );
}
