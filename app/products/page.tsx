import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "../components/CatalogExplorer";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Products & Brands",
  description:
    "Explore professional marine navigation, communication and safety equipment supplied and supported by NAVTEAM.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Products & brands"
        title="Bridge equipment, clearly organised."
        copy="Explore professional marine electronics by product type or manufacturer. The final catalogue will show what NAVTEAM sells, stocks, installs, services and is formally authorised for."
        detail="Commercial vessels · Newbuilds · Retrofits · Replacement parts"
      />

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Equipment catalogue</p>
            <h2>Start with a system or a manufacturer.</h2>
          </div>
          <p>
            This visual draft uses high-level product groups. Product models,
            brochures and lifecycle status can be added when the complete data
            is ready.
          </p>
        </div>
        <CatalogExplorer />
      </section>

      <section className="distributor-banner">
        <div>
          <p className="eyebrow">National distributor</p>
          <h2>JRC · Yokogawa · Tokyo Keiki</h2>
        </div>
        <p>
          Product expertise, commissioning and long-term service from one
          marine electronics partner.
        </p>
        <Link className="button secondary" href="/contact">
          Ask about equipment
        </Link>
      </section>
    </>
  );
}
