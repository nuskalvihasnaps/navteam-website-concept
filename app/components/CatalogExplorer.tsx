"use client";

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { assetPath, manufacturers, productGroups } from "../lib/site";
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

  const filteredProducts = useMemo(
    () =>
      productGroups.filter((product) =>
        `${product.name} ${product.detail}`
          .toLowerCase()
          .includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  const filteredManufacturers = useMemo(
    () =>
      manufacturers.filter((manufacturer) =>
        manufacturer.name.toLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  const updateScrollControls = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      setCanScrollBack(false);
      setCanScrollForward(false);
      return;
    }

    const maximumScroll = carousel.scrollWidth - carousel.clientWidth;
    setCanScrollBack(carousel.scrollLeft > 4);
    setCanScrollForward(carousel.scrollLeft < maximumScroll - 4);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      carouselRef.current?.scrollTo({ left: 0, behavior: "auto" });
      updateScrollControls();
    });
    window.addEventListener("resize", updateScrollControls);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollControls);
    };
  }, [normalizedQuery, updateScrollControls, view]);

  function scrollCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector<HTMLElement>("[data-carousel-card]");
    const carouselStyle = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(carouselStyle.columnGap || carouselStyle.gap) || 0;
    const distance = (firstCard?.offsetWidth ?? carousel.clientWidth * 0.8) + gap;
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

  function selectView(nextView: "products" | "brands") {
    setView(nextView);
    setQuery("");
    setShowAllProducts(false);
  }

  return (
    <div className="catalog-explorer">
      <div className="catalog-toolbar">
        <div className="segmented" role="group" aria-label="Catalogue view">
          <button
            className={view === "products" ? "active" : ""}
            type="button"
            aria-pressed={view === "products"}
            onClick={() => selectView("products")}
          >
            Product types
          </button>
          <button
            className={view === "brands" ? "active" : ""}
            type="button"
            aria-pressed={view === "brands"}
            onClick={() => selectView("brands")}
          >
            Manufacturers
          </button>
        </div>

        <label className="catalog-search">
          <span className="sr-only">
            {view === "products"
              ? "Search product types"
              : "Search manufacturers"}
          </span>
          <input
            type="search"
            value={query}
            autoComplete="off"
            onChange={(event) => {
              setQuery(event.target.value);
              if (view === "products") setShowAllProducts(false);
            }}
            placeholder={
              view === "products"
                ? "Search product types…"
                : "Search manufacturers…"
            }
          />
        </label>
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

          {filteredProducts.length ? (
            <div
              className="product-carousel"
              ref={carouselRef}
              role="region"
              aria-label="Product types carousel"
              tabIndex={0}
              onKeyDown={handleCarouselKeyDown}
              onScroll={updateScrollControls}
            >
              {filteredProducts.map((product) => (
                <article
                  className="product-carousel-card"
                  data-carousel-card
                  key={product.name}
                >
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

              {!normalizedQuery ? (
                <button
                  className="product-carousel-card product-see-all"
                  data-carousel-card
                  type="button"
                  ref={seeAllButtonRef}
                  aria-expanded={showAllProducts}
                  aria-controls="all-product-types"
                  onClick={revealAllProducts}
                >
                  <span>See all products</span>
                  <i aria-hidden="true">↓</i>
                </button>
              ) : null}
            </div>
          ) : (
            <p className="empty-result">No product types match that search.</p>
          )}

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
        <section
          className="product-carousel-section manufacturer-carousel-section"
          aria-labelledby="manufacturers-title"
        >
          <div className="product-carousel-heading">
            <div>
              <h2 id="manufacturers-title">Manufacturers</h2>
              <p>
                Browse marine electronics manufacturers supplied and supported
                by NAVTEAM.
              </p>
            </div>
            <div
              className="product-carousel-controls"
              aria-label="Manufacturer carousel controls"
            >
              <button
                type="button"
                aria-label="Previous manufacturers"
                disabled={!canScrollBack}
                onClick={() => scrollCarousel(-1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next manufacturers"
                disabled={!canScrollForward}
                onClick={() => scrollCarousel(1)}
              >
                →
              </button>
            </div>
          </div>

          {filteredManufacturers.length ? (
            <div
              className="product-carousel manufacturer-carousel"
              ref={carouselRef}
              role="region"
              aria-label="Manufacturers carousel"
              tabIndex={0}
              onKeyDown={handleCarouselKeyDown}
              onScroll={updateScrollControls}
            >
              {filteredManufacturers.map((manufacturer) => (
                <article
                  className="product-carousel-card manufacturer-carousel-card"
                  data-carousel-card
                  key={manufacturer.id}
                >
                  <div className="manufacturer-card-status">
                    {manufacturer.nationalDistributor ? (
                      <span>National distributor</span>
                    ) : null}
                  </div>
                  <div className="manufacturer-logo">
                    <img
                      src={assetPath(manufacturer.image)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="manufacturer-card-footer">
                    <h3>{manufacturer.name}</h3>
                    <span className="manufacturer-placeholder-cta">
                      View manufacturer <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-result">No manufacturers match that search.</p>
          )}
        </section>
      )}
    </div>
  );
}
