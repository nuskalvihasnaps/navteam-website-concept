import type { CSSProperties } from "react";
import Link from "next/link";
import { assetPath, productGroups, services, stories } from "./lib/site";

export default function Home() {
  return (
    <>
      <section
        className="hero"
        style={
          {
            "--hero-image": `url("${assetPath("bridge-hero.png")}")`,
          } as CSSProperties
        }
      >
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>
            Supply Integrate
            <span className="hero-title-line">Worldwide Support.</span>
          </h1>
          <p className="hero-copy">
            Navigation, communication and safety systems for commercial
            vessels, backed by technicians and service partners in the
            world&apos;s major ports.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/products">
              Explore products
            </Link>
            <Link className="button secondary" href="/service">
              Request service
            </Link>
          </div>
        </div>
        <div className="hero-status">
          <span className="pulse" />
          <span>24/7 service coordination</span>
          <a href="tel:+4563218080">+45 63 21 80 80</a>
        </div>
      </section>

      <section className="task-strip" aria-label="Primary customer tasks">
        <Link href="/products">
          <span>01</span>
          <strong>Find equipment</strong>
          <small>Browse by product type or manufacturer</small>
        </Link>
        <Link href="/service">
          <span>02</span>
          <strong>Arrange service</strong>
          <small>Annuals, installation, retrofit and repair</small>
        </Link>
        <Link href="/service">
          <span>03</span>
          <strong>Find global support</strong>
          <small>Search ports, offices and service partners</small>
        </Link>
      </section>

      <section className="section home-products">
        <div className="section-heading">
          <div>
            <h2>Find the right equipment for your vessel.</h2>
          </div>
          <p>
            Search professional bridge equipment by system or manufacturer,
            with clear supply, installation, service and authorization status.
          </p>
        </div>
        <div className="preview-grid">
          {productGroups.slice(0, 6).map((product) => (
            <Link className="preview-card" href="/products" key={product.name}>
              <h3>{product.name}</h3>
              <p>{product.detail}</p>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/products">
          View all products and brands ↗
        </Link>
      </section>

      <section className="home-service">
        <div className="home-service-image">
          <img
            src={assetPath("service-engineer.png")}
            alt="NAVTEAM engineer servicing marine electronics onboard a vessel"
          />
        </div>
        <div className="home-service-copy">
          <h2>Onboard expertise, wherever you sail.</h2>
          <p>
            From annual surveys and gyro overhauls to complete bridge
            retrofits, one coordinating team connects vessels with the right
            expertise.
          </p>
          <ul className="compact-list">
            {services.slice(0, 5).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <Link className="button secondary" href="/service">
            Explore service coverage
          </Link>
        </div>
      </section>

      <section className="section home-insights">
        <div className="section-heading">
          <div>
            <h2>News from the bridge.</h2>
          </div>
          <Link className="text-link" href="/insights">
            View all insights ↗
          </Link>
        </div>
        <div className="story-grid">
          {stories.slice(0, 3).map((story, index) => (
            <article className={index === 0 ? "story story-image" : "story"} key={story.title}>
              {index === 0 ? (
                <img src={assetPath("jrc-radar.jpg")} alt="Marine radar controls" />
              ) : null}
              <div>
                <span>{story.category}</span>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <Link href="/insights">Read more ↗</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <h2>Independent expertise. Global reach.</h2>
        </div>
        <div>
          <p>
            Professional marine electronics across the vessel&apos;s
            operational lifetime—from individual components to complete bridge
            retrofits.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/about">
              About NAVTEAM
            </Link>
            <Link className="button secondary" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
