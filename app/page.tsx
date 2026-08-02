import Link from "next/link";
import { ContactForm } from "./components/ContactModal";
import {
  assetPath,
  CONTACT_EMAIL,
  manufacturers,
  productGroups,
} from "./lib/site";

const homepageProductIds = new Set([
  "radar",
  "gmdss",
  "heading-devices",
  "ecdis",
  "gps-ais",
  "spare-parts",
]);

const homepageProducts = productGroups.filter((product) =>
  homepageProductIds.has(product.id),
);

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1>
            <span>Marine electronics.</span>
            <span>Supply. Integrate. Support.</span>
            <span>Worldwide.</span>
          </h1>
          <p>
            NAVTEAM supplies, integrates and services navigation,
            communication and safety equipment for commercial vessels. Our
            experienced team coordinates the right products and technicians.
          </p>
          <div className="home-hero-actions">
            <Link className="button primary" href="/products">
              Explore products
            </Link>
            <Link className="home-hero-link" href="/service">
              Service &amp; support <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="home-hero-image">
          <img
            src={assetPath("bridge-hero.png")}
            alt="Navigation bridge onboard a commercial vessel"
          />
          <div>
            <strong>Equipment · Integration · Service</strong>
            <span className="home-hero-status">
              <i aria-hidden="true" />
              24/7 support coordination
            </span>
          </div>
        </div>
      </section>

      <section className="home-finder" aria-label="Browse NAVTEAM products">
        <div className="home-finder-panel home-product-finder">
          <div className="home-finder-heading">
            <h2>Browse by product type.</h2>
            <p>Browse the main bridge systems and equipment categories.</p>
          </div>
          <div className="home-product-grid">
            {homepageProducts.map((product) => (
              <Link
                className="home-product-tile"
                data-product-id={product.id}
                href="/products#product-types"
                key={product.id}
              >
                <div className="home-product-tile-image">
                  <img src={assetPath(product.image)} alt="" loading="lazy" />
                </div>
                <h3>{product.name}</h3>
              </Link>
            ))}
          </div>
          <Link className="home-finder-link" href="/products#product-types">
            Browse all products <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="home-finder-panel home-manufacturer-finder">
          <div className="home-finder-heading">
            <h2>Browse by manufacturer.</h2>
            <p>Explore the manufacturers supplied and supported by NAVTEAM.</p>
          </div>
          <div className="home-manufacturer-grid">
            {manufacturers.slice(0, 6).map((manufacturer) => (
              <Link
                className="home-manufacturer-tile"
                href="/products#manufacturers"
                key={manufacturer.id}
              >
                <img
                  src={assetPath(manufacturer.image)}
                  alt={`${manufacturer.name} logo`}
                  loading="lazy"
                />
                <span>{manufacturer.name}</span>
              </Link>
            ))}
          </div>
          <Link className="home-finder-link" href="/products#manufacturers">
            Browse all manufacturers <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="page-section home-contact">
        <div className="home-contact-layout">
          <div className="home-contact-copy">
            <h2>Tell us what the vessel needs.</h2>
            <p>
              Products, spare parts, installations or urgent service—share
              the essential details and NAVTEAM will coordinate the right next
              step.
            </p>
            <div className="home-contact-details">
              <span>Urgent service</span>
              <Link href="tel:+4563218080">+45 63 21 80 80</Link>
              <Link href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </Link>
            </div>
          </div>
          <div
            className="contact-modal contact-page-form home-contact-form"
            aria-labelledby="contact-page-form-title"
          >
            <ContactForm options={{ source: "Homepage" }} staticPage />
          </div>
        </div>
      </section>
    </>
  );
}
