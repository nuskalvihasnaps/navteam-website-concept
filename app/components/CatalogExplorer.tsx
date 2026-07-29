"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { brands, productGroups } from "../lib/site";

export function CatalogExplorer() {
  const [view, setView] = useState<"products" | "brands">("products");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(
    () =>
      productGroups.filter((product) =>
        `${product.name} ${product.detail}`
          .toLowerCase()
          .includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) => brand.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  return (
    <div className="catalog-explorer">
      <div className="catalog-toolbar">
        <div className="segmented" role="group" aria-label="Catalogue view">
          <button
            className={view === "products" ? "active" : ""}
            onClick={() => setView("products")}
          >
            Product types
          </button>
          <button
            className={view === "brands" ? "active" : ""}
            onClick={() => setView("brands")}
          >
            Manufacturers
          </button>
        </div>
        <label className="catalog-search">
          <span className="sr-only">Search the catalogue</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search radar, brand or system…"
          />
        </label>
      </div>

      {view === "products" ? (
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <Link
              className={index === 0 ? "product-card featured" : "product-card"}
              href="/contact"
              key={product.name}
            >
              <span className="product-code">{product.code}</span>
              <div>
                <h3>{product.name}</h3>
                <p>{product.detail}</p>
              </div>
              <span className="arrow">↗</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="brands-view">
          <div className="brand-highlight">
            <p className="eyebrow dark">National distributors</p>
            <h2>JRC · Yokogawa · Tokyo Keiki</h2>
            <p>
              Direct access to product expertise, commissioning and lifecycle
              support.
            </p>
          </div>
          <div className="brand-cloud">
            {filteredBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      )}

      {view === "products" && filteredProducts.length === 0 ? (
        <p className="empty-result">No product categories match that search.</p>
      ) : null}
      {view === "brands" && filteredBrands.length === 0 ? (
        <p className="empty-result">No manufacturers match that search.</p>
      ) : null}
    </div>
  );
}
