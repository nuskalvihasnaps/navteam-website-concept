import type { Metadata } from "next";
import Link from "next/link";
import { assetPath, offices } from "../lib/site";

export const metadata: Metadata = {
  title: "About NAVTEAM",
  description:
    "Meet NAVTEAM, a marine electronics knowledge centre and system integrator supporting commercial vessels worldwide.",
};

const pillars = [
  {
    number: "01",
    title: "Maritime Experts",
    copy: "Since 2001, NAVTEAM has built its business around professional marine electronics and the needs of commercial vessels. Our practical experience and in-depth product knowledge help customers choose dependable equipment, plan service and make confident technical decisions.",
  },
  {
    number: "02",
    title: "Systems & Integration",
    copy: "We look beyond individual products to understand how the complete bridge works together. From equipment supply and engineering to installation, commissioning and lifecycle support, NAVTEAM adapts each solution to the vessel and its operational requirements.",
  },
  {
    number: "03",
    title: "Worldwide Coverage",
    copy: "Our offices in Denmark, Poland and Malaysia coordinate remote assistance and onboard attendance with trusted service partners in ports around the globe. Customers have one point of contact for the right expertise, wherever the vessel is operating.",
  },
];

const officeDescriptions: Record<string, string> = {
  Svendborg:
    "Our Danish knowledge centre, located in the heart of Svendborg's maritime community.",
  Gdansk:
    "Local NAVTEAM presence for customer support and service coordination across Europe.",
  "Port of Tanjung Pelepas":
    "NAVTEAM presence in Malaysia, supporting vessels and coordinating service across the region.",
};

export default function AboutPage() {
  return (
    <>
      <div className="about-opening">
        <section className="about-intro">
          <h1>About NAVTEAM</h1>
          <p>
            A marine electronics knowledge centre and system integrator built
            on know-how, credibility and trust.
          </p>
        </section>

        <section
          className="page-section about-pillars"
          aria-labelledby="about-pillars-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="about-pillars-title">What NAVTEAM brings onboard.</h2>
            </div>
            <p>
              Since 2001, we have grown through commitment, flexibility and
              close attention to our customers&apos; business.
            </p>
          </div>

          <div className="about-pillar-grid">
            {pillars.map((pillar) => (
              <article className="about-pillar-card" key={pillar.number}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="page-section alt about-offices">
        <img
          className="office-section-map"
          src={assetPath("world-map-clean.png")}
          alt=""
          aria-hidden="true"
        />
        <div className="section-heading">
          <div>
            <h2>Three offices. One coordinating team.</h2>
          </div>
          <p>
            Local NAVTEAM teams connect customers with product knowledge,
            engineering support and worldwide service coordination.
          </p>
        </div>

        <div className="office-grid">
          {offices.map((office) => (
            <article key={office.city}>
              <span>{office.region}</span>
              <h3>{office.city}</h3>
              <p className="office-country">{office.country}</p>
              <p>{officeDescriptions[office.city]}</p>
              <Link href="/contact">Contact this office ↗</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
