import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactModal";
import { offices } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact NAVTEAM for marine electronics products, worldwide service and technical support.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <h1>Contact</h1>
        <p>
          Tell us what your vessel needs and we will connect you with the right
          product specialist, engineer or service partner.
        </p>
      </section>

      <section className="page-section contact-page-section">
        <div className="contact-page-note">
          <p>
            For urgent service, call{" "}
            <Link href="tel:+4563218080">+45 63 21 80 80</Link>
          </p>
          <Link href="mailto:navteam@navteam.com">navteam@navteam.com</Link>
        </div>

        <div
          className="contact-modal contact-page-form"
          aria-labelledby="contact-page-form-title"
        >
          <ContactForm options={{ source: "Contact page" }} staticPage />
        </div>
      </section>

      <section className="page-section about-offices">
        <div className="section-heading">
          <div>
            <h2>Local presence, worldwide coordination.</h2>
          </div>
          <p>
            Contact NAVTEAM through our shared enquiry form and the right
            office will coordinate the next step.
          </p>
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
