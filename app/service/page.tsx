import type { Metadata } from "next";
import Link from "next/link";
import { CoverageExplorer } from "../components/CoverageExplorer";
import { PageHero } from "../components/PageHero";
import { assetPath, services } from "../lib/site";

export const metadata: Metadata = {
  title: "Service & Support",
  description:
    "Worldwide marine electronics service, installation, surveys and bridge retrofits coordinated by NAVTEAM.",
};

export default function ServicePage() {
  return (
    <>
      <PageHero
        label="Service & support"
        title="The right expertise, at the right port."
        copy="NAVTEAM coordinates remote and onboard support for navigation, communication and safety systems—from annual surveys to complete bridge retrofits."
        detail="24/7 coordination · Offices in Denmark, Poland and Malaysia"
        compact
      />

      <section className="page-section">
        <div className="service-section-heading">
          <p className="eyebrow dark">Onboard capability</p>
          <h2>Service throughout the vessel lifecycle.</h2>
        </div>
        <div className="service-page-layout">
          <div className="service-page-image">
            <img
              src={assetPath("service-bridge-work.jpg")}
              alt="NAVTEAM marine electronics engineer working on bridge cabling onboard"
            />
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <div key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section dark">
        <div className="section-heading light">
          <div>
            <p className="eyebrow orange">Worldwide coverage</p>
            <h2>Local offices. Trusted service partners.</h2>
          </div>
          <p>
            The final map can distinguish NAVTEAM offices, authorised service
            partners and ports where support is available.
          </p>
        </div>
        <CoverageExplorer />
      </section>

      <section className="home-cta compact-cta">
        <div>
          <p className="eyebrow">Need assistance?</p>
          <h2>Tell us the vessel, port and urgency.</h2>
        </div>
        <Link className="button primary" href="/contact">
          Request service
        </Link>
      </section>
    </>
  );
}
