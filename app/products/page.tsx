import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "../components/CatalogExplorer";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore professional marine navigation, communication and safety equipment supplied and supported by NAVTEAM.",
};

export default function ProductsPage() {
  return (
    <>
      <div className="products-opening">
        <section className="page-intro">
          <h1>Products</h1>
          <p>
            Explore professional marine electronics by product type or
            manufacturer.
          </p>
        </section>

        <section className="page-section products-catalogue">
          <CatalogExplorer />
        </section>
      </div>

      <section className="distributor-banner">
        <div>
          <h2>National distributor of JRC · Yokogawa · Tokyo Keiki</h2>
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
