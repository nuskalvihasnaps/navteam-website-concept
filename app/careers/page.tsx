import type { Metadata } from "next";
import Link from "next/link";

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
      <section className="page-intro">
        <h1>Careers</h1>
        <p>
          Work where marine experience, technical curiosity and a practical
          service mindset come together.
        </p>
      </section>

      <section className="page-section careers-content">
        <div className="section-heading">
          <div>
            <h2>Build a career around real-world systems.</h2>
          </div>
          <p>
            Join a hands-on team working with navigation, communication and
            safety systems onboard commercial vessels around the world.
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

      <section className="page-section alt careers-callout">
        <div>
          <h2>Think you would fit NAVTEAM?</h2>
          <p>
            We welcome open applications from people with relevant marine or
            technical experience.
          </p>
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
