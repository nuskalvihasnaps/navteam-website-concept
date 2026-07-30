"use client";

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { assetPath, brands, productGroups } from "../lib/site";
import { ContactTrigger } from "./ContactModal";

export function CatalogExplorer() {
  const [view, setView] = useState<"products" | "brands">("products");
  const [query, setQuery] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const allProductsRef = useRef<HTMLDivElement>(null);
  const seeAllButtonRef = useRef<HTMLButtonElement>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) => brand.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  const updateScrollControls = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maximumScroll = carousel.scrollWidth - carousel.clientWidth;
    setCanScrollBack(carousel.scrollLeft > 4);
    setCanScrollForward(carousel.scrollLeft < maximumScroll - 4);
  }, []);

  useEffect(() => {
    requestAnimationFrame(updateScrollControls);
    window.addEventListener("resize", updateScrollControls);
    return () => window.removeEventListener("resize", updateScrollControls);
  }, [updateScrollControls, view]);

  function scrollCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector<HTMLElement>(
      ".product-carousel-card",
    );
    const distance = (firstCard?.offsetWidth ?? carousel.clientWidth * 0.8) + 18;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    carousel.scrollBy({
      left: direction * distance,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function handleCarouselKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollCarousel(event.key === "ArrowLeft" ? -1 : 1);
  }

  function revealAllProducts() {
    setShowAllProducts(true);
    requestAnimationFrame(() => allProductsRef.current?.focus());
  }

  return (
    <div className="catalog-explorer">
      <div className="catalog-toolbar">
        <div className="segmented" role="group" aria-label="Catalogue view">
          <button
            className={view === "products" ? "active" : ""}
            type="button"
            aria-pressed={view === "products"}
            onClick={() => setView("products")}
          >
            Product types
          </button>
          <button
            className={view === "brands" ? "active" : ""}
            type="button"
            aria-pressed={view === "brands"}
            onClick={() => setView("brands")}
          >
            Manufacturers
          </button>
        </div>

        {view === "brands" ? (
          <label className="catalog-search">
            <span className="sr-only">Search manufacturers</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search manufacturers…"
            />
          </label>
        ) : null}
      </div>

      {view === "products" ? (
        <section className="product-carousel-section" aria-labelledby="product-types-title">
          <div className="product-carousel-heading">
            <div>
              <h2 id="product-types-title">Product types</h2>
              <p>Browse professional bridge systems and equipment groups.</p>
            </div>
            <div className="product-carousel-controls" aria-label="Carousel controls">
              <button
                type="button"
                aria-label="Previous products"
                disabled={!canScrollBack}
                onClick={() => scrollCarousel(-1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next products"
                disabled={!canScrollForward}
                onClick={() => scrollCarousel(1)}
              >
                →
              </button>
            </div>
          </div>

          <div
            className="product-carousel"
            ref={carouselRef}
            role="region"
            aria-label="Product types carousel"
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
            onScroll={updateScrollControls}
          >
            {productGroups.map((product) => (
              <article className="product-carousel-card" key={product.name}>
                <div className="product-carousel-copy">
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                  <ContactTrigger
                    className="product-enquiry-cta"
                    label={product.ctaLabel}
                    source={`Products & Brands – ${product.name}`}
                    defaultInquiry="Other"
                    defaultMessage={`I am interested in ${product.enquirySubject}.`}
                  />
                </div>
                <div className="product-carousel-image">
                  <img
                    src={assetPath(product.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            ))}

            <button
              className="product-carousel-card product-see-all"
              type="button"
              ref={seeAllButtonRef}
              aria-expanded={showAllProducts}
              aria-controls="all-product-types"
              onClick={revealAllProducts}
            >
              <span>See all products</span>
              <i aria-hidden="true">↓</i>
            </button>
          </div>

          {showAllProducts ? (
            <div
              className="all-products-panel"
              id="all-product-types"
              ref={allProductsRef}
              tabIndex={-1}
            >
              <div className="all-products-heading">
                <h2>All product types</h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowAllProducts(false);
                    requestAnimationFrame(() =>
                      seeAllButtonRef.current?.focus(),
                    );
                  }}
                >
                  Close
                </button>
              </div>
              <div className="all-products-list">
                {productGroups.map((product, index) => (
                  <article key={product.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <section className="brands-view" aria-labelledby="manufacturers-title">
          <div className="brand-highlight">
            <h2 id="manufacturers-title">
              National distributors: JRC · Yokogawa · Tokyo Keiki
            </h2>
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
        </section>
      )}

      {view === "brands" && filteredBrands.length === 0 ? (
        <p className="empty-result">No manufacturers match that search.</p>
      ) : null}
    </div>
  );
}
