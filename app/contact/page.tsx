import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { offices } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact NAVTEAM for marine electronics products, worldwide service and technical support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact NAVTEAM"
        title="Products, projects or urgent service."
        copy="Reach the coordinating team and we will connect your vessel with the right product specialist, engineer or service partner."
        detail="For urgent service, call +45 63 21 80 80"
      />

      <section className="page-section">
        <div className="contact-grid">
          <article className="contact-panel primary-panel">
            <p className="eyebrow">General enquiries</p>
            <h2>Start with NAVTEAM.</h2>
            <Link href="mailto:navteam@navteam.com">
              navteam@navteam.com
            </Link>
            <Link href="tel:+4563218080">+45 63 21 80 80</Link>
          </article>
          <article className="contact-panel">
            <p className="eyebrow dark">For faster service</p>
            <h2>Include these details.</h2>
            <ul className="checklist">
              <li>Vessel name and IMO number</li>
              <li>Current or next port</li>
              <li>Equipment brand and model</li>
              <li>Fault description and urgency</li>
              <li>Contact person onboard</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section alt">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">NAVTEAM offices</p>
            <h2>Local presence, worldwide coordination.</h2>
          </div>
        </div>
        <div className="office-grid">
          {offices.map((office) => (
            <article key={office.city}>
              <span>{office.region}</span>
              <h3>{office.city}</h3>
              <p>{office.country}</p>
              <Link href="mailto:navteam@navteam.com">Contact office ↗</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
