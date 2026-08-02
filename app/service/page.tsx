import type { Metadata } from "next";
import { ServiceMapHero } from "../components/ServiceMapHero";

export const metadata: Metadata = {
  title: "Service & Support",
  description:
    "Worldwide marine electronics service, installation, surveys and bridge retrofits coordinated by NAVTEAM.",
};

export default function ServicePage() {
  return (
    <>
      <section className="page-intro service-page-intro">
        <h1 id="service-page-title">Service &amp; Support</h1>
        <p>
          Remote and onboard assistance, coordinated 24/7 through NAVTEAM
          offices and trusted partners in ports all over the globe.
        </p>
      </section>
      <ServiceMapHero />
    </>
  );
}
