import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { offices } from "../lib/site";

export const metadata: Metadata = {
  title: "About NAVTEAM",
  description:
    "Meet NAVTEAM, a professional marine electronics supplier and service partner with worldwide reach.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About NAVTEAM"
        title="Independent expertise. Global reach."
        copy="NAVTEAM supplies, integrates and supports professional marine electronics across the vessel's operational lifetime."
        detail="Navigation · Communication · Safety · Integration · Service"
      />

      <section className="page-section">
        <div className="split-layout">
          <div>
            <p className="eyebrow dark">Our role</p>
            <h2>A practical partner for the complete bridge.</h2>
          </div>
          <div className="content-copy">
            <p>
              Shipowners and operators need more than equipment. They need
              systems that work together, documentation that remains useful
              and support that follows the vessel from port to port.
            </p>
            <p>
              NAVTEAM brings product supply and technical service together,
              covering everything from individual spare parts to full
              navigation bridge retrofits.
            </p>
          </div>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span>01</span>
            <h3>Marine focus</h3>
            <p>Professional equipment and service for seagoing vessels.</p>
          </article>
          <article className="feature-card">
            <span>02</span>
            <h3>System thinking</h3>
            <p>Integration expertise across navigation and communication.</p>
          </article>
          <article className="feature-card">
            <span>03</span>
            <h3>Worldwide support</h3>
            <p>Local offices supported by a global partner network.</p>
          </article>
        </div>
      </section>

      <section className="page-section alt">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Our locations</p>
            <h2>Three offices. One coordinating team.</h2>
          </div>
          <Link className="text-link" href="/contact">
            Contact an office ↗
          </Link>
        </div>
        <div className="office-grid">
          {offices.map((office) => (
            <article key={office.city}>
              <span>{office.region}</span>
              <h3>{office.city}</h3>
              <p>{office.country}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
