"use client";

import { useMemo, useState } from "react";

const productGroups = [
  { name: "Radar", detail: "Navigation & collision avoidance", icon: "RAD" },
  { name: "GMDSS", detail: "Safety & communications", icon: "SOS" },
  { name: "Gyro & heading", detail: "Heading reference systems", icon: "GYR" },
  { name: "ECDIS", detail: "Electronic chart systems", icon: "ECD" },
  { name: "AIS & GPS", detail: "Positioning & identification", icon: "GPS" },
  { name: "Sensors", detail: "Speed, depth & environmental", icon: "SNS" },
];

const brands = [
  "JRC",
  "Yokogawa",
  "Tokyo Keiki",
  "SAAB",
  "Sailor",
  "YDK Technologies",
  "Wärtsilä",
  "Danelec",
  "Jotron",
  "Intellian",
  "Inmarsat",
  "Raymarine",
];

const services = [
  "GMDSS & VDR annual surveys",
  "Full navigation bridge retrofit",
  "Gyro overhaul & installation",
  "Radar service & installation",
  "ECDIS service & installation",
  "GPS & GPS compass",
  "Anti-jamming / spoofing",
  "Echo sounder & speed log",
  "Magnetic compass adjustment",
  "Remote and on-site support",
];

const offices = [
  { city: "Svendborg", country: "Denmark", region: "Europe" },
  { city: "Gdansk", country: "Poland", region: "Europe" },
  { city: "Port of Tanjung Pelepas", country: "Malaysia", region: "Asia" },
];

export default function Home() {
  const [catalogView, setCatalogView] = useState<"products" | "brands">("products");
  const [coverageQuery, setCoverageQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredOffices = useMemo(() => {
    const query = coverageQuery.trim().toLowerCase();
    if (!query) return offices;
    return offices.filter((office) =>
      `${office.city} ${office.country} ${office.region}`.toLowerCase().includes(query),
    );
  }, [coverageQuery]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NAVTEAM home" onClick={closeMenu}>
          <strong>NAVTEAM</strong>
          <span>Professional Marine Electronics</span>
        </a>

        <button
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""}>
          <a href="#products" onClick={closeMenu}>Products & Brands</a>
          <a href="#coverage" onClick={closeMenu}>Service & Support</a>
          <a href="#insights" onClick={closeMenu}>Insights</a>
          <a href="#company" onClick={closeMenu}>Company</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Professional marine electronics</p>
          <h1>
            Supply Integrate
            <span className="hero-title-line">Worldwide Support.</span>
          </h1>
          <p className="hero-copy">
            Navigation, communication and safety systems for commercial vessels,
            backed by technicians and service partners in the world&apos;s major ports.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#products">Explore products</a>
            <a className="button secondary" href="#service">Request service</a>
          </div>
        </div>
        <div className="hero-status">
          <span className="pulse" />
          <span>24/7 service coordination</span>
          <a href="tel:+4563218080">+45 63 21 80 80</a>
        </div>
      </section>

      <section className="task-strip" aria-label="Primary customer tasks">
        <a href="#products">
          <span>01</span>
          <strong>Find equipment</strong>
          <small>Browse by product type or manufacturer</small>
        </a>
        <a href="#service">
          <span>02</span>
          <strong>Arrange service</strong>
          <small>Annuals, installation, retrofit and repair</small>
        </a>
        <a href="#coverage">
          <span>03</span>
          <strong>Find global support</strong>
          <small>Search ports, offices and service partners</small>
        </a>
      </section>

      <section className="section catalog" id="products">
        <div className="section-intro">
          <div>
            <p className="eyebrow dark">Products & brands</p>
            <h2>One catalogue.<br />Two ways in.</h2>
          </div>
          <p>
            Find the right bridge equipment by system or manufacturer.
            Every product page can show whether NAVTEAM supplies, stocks,
            installs, services or is formally authorized for the product.
          </p>
        </div>

        <div className="catalog-toolbar">
          <div className="segmented" role="group" aria-label="Catalogue view">
            <button
              className={catalogView === "products" ? "active" : ""}
              onClick={() => setCatalogView("products")}
            >
              Product types
            </button>
            <button
              className={catalogView === "brands" ? "active" : ""}
              onClick={() => setCatalogView("brands")}
            >
              Manufacturers
            </button>
          </div>
          <label className="catalog-search">
            <span className="sr-only">Search the catalogue</span>
            <input placeholder="Search radar, model, brand or system…" />
            <button aria-label="Search">Search</button>
          </label>
        </div>

        {catalogView === "products" ? (
          <div className="product-grid">
            {productGroups.map((product, index) => (
              <a className={index === 0 ? "product-card featured" : "product-card"} href="#contact" key={product.name}>
                <span className="product-code">{product.icon}</span>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                </div>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="brands-view">
            <div className="brand-highlight">
              <p className="eyebrow dark">National distributors</p>
              <h3>JRC · Yokogawa · Tokyo Keiki</h3>
              <p>Direct access to product expertise, commissioning and lifecycle support.</p>
            </div>
            <div className="brand-cloud">
              {brands.map((brand) => <span key={brand}>{brand}</span>)}
            </div>
          </div>
        )}
      </section>

      <section className="coverage" id="coverage">
        <div className="section-intro inverse">
          <div>
            <p className="eyebrow">Worldwide service</p>
            <h2>Support you can<br />see before arrival.</h2>
          </div>
          <p>
            Searchable coverage gives operators one clear route to local offices,
            approved service partners and coordinated support in major ports.
          </p>
        </div>

        <div className="coverage-layout">
          <div className="map-card">
            <div className="map-viewport" role="img" aria-label="Concept map showing NAVTEAM offices and worldwide service coverage">
              <img src="/assets/map-source.png" alt="" />
            </div>
            <div className="map-legend">
              <span><i className="office-dot" /> NAVTEAM office</span>
              <span><i className="partner-dot" /> Service partner / port</span>
            </div>
          </div>

          <aside className="coverage-panel">
            <p className="eyebrow orange">Coverage at launch</p>
            <h3>3 NAVTEAM offices</h3>
            <label className="port-search">
              <span>Search office, port or country</span>
              <input
                value={coverageQuery}
                onChange={(event) => setCoverageQuery(event.target.value)}
                placeholder="Try “Europe” or “Malaysia”"
              />
            </label>
            <div className="office-list">
              {filteredOffices.length ? filteredOffices.map((office) => (
                <div className="office" key={office.city}>
                  <i className="office-dot" />
                  <div>
                    <strong>{office.city}</strong>
                    <span>{office.country}</span>
                  </div>
                </div>
              )) : <p className="empty-result">No launch office matches that search. The future partner dataset will extend this view.</p>}
            </div>
            <div className="partner-note">
              <strong>Partner coverage</strong>
              <span>Major ports worldwide, with the strongest density in Europe.</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="service-section" id="service">
        <div className="service-photo">
          <img src="/assets/service-engineer.png" alt="NAVTEAM engineer servicing marine electronics onboard a vessel" />
          <div>
            <p>24/7 remote and on-site support</p>
            <span>One service request. One coordinating team.</span>
          </div>
        </div>
        <div className="service-copy">
          <p className="eyebrow dark">Service & support</p>
          <h2>Onboard expertise,<br />wherever you sail.</h2>
          <div className="service-list">
            {services.map((service, index) => (
              <div key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{service}</p>
              </div>
            ))}
          </div>
          <a className="button secondary" href="#contact">Request service</a>
        </div>
      </section>

      <section className="section insights" id="insights">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow dark">Insights</p>
            <h2>News from the bridge</h2>
          </div>
          <a href="#contact">View all insights ↗</a>
        </div>
        <div className="story-grid">
          <article className="story story-image">
            <img src="/assets/jrc-radar.jpg" alt="Marine radar display and controls" />
            <div>
              <span>Technology</span>
              <h3>Preparing bridge systems for resilient positioning</h3>
              <p>Anti-jamming and spoofing protection is becoming a practical bridge requirement.</p>
            </div>
          </article>
          <article className="story">
            <span>Service</span>
            <h3>What to prepare before a GMDSS or VDR annual survey</h3>
            <p>A concise checklist for operators, superintendents and vessel crews.</p>
            <a href="#contact">Read article ↗</a>
          </article>
          <article className="story">
            <span>Projects</span>
            <h3>From ageing equipment to an integrated navigation bridge</h3>
            <p>How a staged retrofit reduces downtime and supports long-term serviceability.</p>
            <a href="#contact">Read case study ↗</a>
          </article>
        </div>
      </section>

      <section className="company" id="company">
        <div>
          <p className="eyebrow">About NAVTEAM</p>
          <h2>Independent expertise.<br />Global reach.</h2>
        </div>
        <div className="company-copy">
          <p>
            NAVTEAM supplies and supports professional marine electronics across
            a vessel&apos;s operational lifetime—from individual components to complete
            bridge retrofits.
          </p>
          <div className="company-links">
            <a href="#contact">About us ↗</a>
            <a href="#contact">Careers ↗</a>
            <a href="#coverage">Locations ↗</a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow dark">Start a conversation</p>
          <h2>Equipment, service<br />or urgent support?</h2>
        </div>
        <div className="contact-card">
          <p>Tell us the vessel, port and system. We will route your request to the right team.</p>
          <div>
            <a className="button secondary" href="mailto:info@navteam.com">Contact NAVTEAM</a>
            <a href="tel:+4563218080">24/7 · +45 63 21 80 80</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <strong>NAVTEAM</strong>
          <span>Professional Marine Electronics</span>
        </a>
        <div>
          <span>Svendborg · Gdansk · Tanjung Pelepas</span>
          <span>Concept website · English first</span>
        </div>
      </footer>
    </main>
  );
}
