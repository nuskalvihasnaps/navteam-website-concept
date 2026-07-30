"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { assetPath, serviceCapabilities } from "../lib/site";
import { ContactTrigger } from "./ContactModal";

type CoverageMarker = {
  id: string;
  type: "office" | "partner";
  x: number;
  y: number;
  label: string;
  detail?: string;
};

const coverageMarkers: CoverageMarker[] = [
  {
    id: "svendborg",
    type: "office",
    x: 49.3,
    y: 27.5,
    label: "Svendborg",
    detail: "Denmark",
  },
  {
    id: "gdansk",
    type: "office",
    x: 50.3,
    y: 28.3,
    label: "Gdansk",
    detail: "Poland",
  },
  {
    id: "tanjung-pelepas",
    type: "office",
    x: 77.7,
    y: 64.6,
    label: "Port of Tanjung Pelepas",
    detail: "Malaysia",
  },
  {
    id: "partner-southampton",
    type: "partner",
    x: 45.1,
    y: 30.3,
    label: "Southampton",
    detail: "United Kingdom",
  },
  {
    id: "partner-rotterdam",
    type: "partner",
    x: 47.5,
    y: 28.5,
    label: "Rotterdam",
    detail: "Netherlands",
  },
  {
    id: "partner-algeciras",
    type: "partner",
    x: 44.4,
    y: 40.6,
    label: "Algeciras",
    detail: "Spain",
  },
  {
    id: "partner-marseille",
    type: "partner",
    x: 47.4,
    y: 35.8,
    label: "Marseille",
    detail: "France",
  },
  {
    id: "partner-piraeus",
    type: "partner",
    x: 53,
    y: 40.3,
    label: "Piraeus",
    detail: "Greece",
  },
  {
    id: "partner-colon",
    type: "partner",
    x: 21,
    y: 60,
    label: "Colón",
    detail: "Panama",
  },
  {
    id: "partner-santos",
    type: "partner",
    x: 31.5,
    y: 81,
    label: "Santos",
    detail: "Brazil",
  },
  {
    id: "partner-cape-town",
    type: "partner",
    x: 52,
    y: 89,
    label: "Cape Town",
    detail: "South Africa",
  },
  {
    id: "partner-jebel-ali",
    type: "partner",
    x: 62.3,
    y: 49,
    label: "Jebel Ali",
    detail: "United Arab Emirates",
  },
  {
    id: "partner-mumbai",
    type: "partner",
    x: 68,
    y: 53.6,
    label: "Mumbai",
    detail: "India",
  },
  {
    id: "partner-shanghai",
    type: "partner",
    x: 82.1,
    y: 48.4,
    label: "Shanghai",
    detail: "China",
  },
  {
    id: "partner-sydney",
    type: "partner",
    x: 91.4,
    y: 90,
    label: "Sydney",
    detail: "Australia",
  },
];

export function ServiceMapHero() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const serviceDetailsRef = useRef<HTMLElement>(null);
  const selectedCapability = serviceCapabilities.find(
    (service) => service.id === selectedService,
  );

  function selectService(serviceId: string, scrollToDetails: boolean) {
    setSelectedService(serviceId);

    if (scrollToDetails) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      requestAnimationFrame(() => {
        serviceDetailsRef.current?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }

  return (
    <>
      <section className="service-map-hero" aria-labelledby="service-map-title">
        <aside className="service-map-sidebar">
          <div className="service-map-intro">
            <p className="eyebrow">Worldwide service coordination</p>
            <h1 id="service-map-title">Service &amp; Support</h1>
            <p>
              Remote and onboard expertise, coordinated 24/7 through NAVTEAM
              offices and trusted partners in major ports.
            </p>
          </div>

          <div
            className="service-capability-list"
            aria-label="Service capabilities"
          >
            {serviceCapabilities.map((service, index) => (
              <button
                type="button"
                key={service.id}
                aria-controls="service-details"
                aria-pressed={selectedService === service.id}
                onClick={() => selectService(service.id, true)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.shortLabel}</strong>
                <i aria-hidden="true">↓</i>
              </button>
            ))}
          </div>

          <Link className="service-map-cta" href="/contact">
            Contact our service team
            <span aria-hidden="true">↗</span>
          </Link>
        </aside>

        <div
          className="service-map-stage"
          onClick={() => setActiveMarker(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActiveMarker(null);
          }}
        >
          <div className="service-map-heading" aria-hidden="true">
            <span>Global network</span>
            <strong>Worldwide coverage</strong>
          </div>

          <div className="service-map-graphic">
            <img
              src={assetPath("world-map-clean.png")}
              alt="World map showing NAVTEAM offices and illustrative service partner coverage"
            />
            {coverageMarkers.map((marker) => {
              const isActive = activeMarker === marker.id;
              return (
                <div
                  className={`coverage-marker-wrap ${marker.type}${
                    marker.x < 12
                      ? " edge-left"
                      : marker.x > 88
                        ? " edge-right"
                        : ""
                  }`}
                  key={marker.id}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setActiveMarker(null);
                    }
                  }}
                  onMouseEnter={() => setActiveMarker(marker.id)}
                  onMouseLeave={() => setActiveMarker(null)}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    className="coverage-marker"
                    type="button"
                    aria-expanded={isActive}
                    aria-label={
                      marker.type === "office"
                        ? `NAVTEAM office: ${marker.label}, ${marker.detail}`
                        : `Illustrative service partner coverage: ${marker.label}, ${marker.detail}`
                    }
                    onClick={() =>
                      setActiveMarker((current) =>
                        current === marker.id ? null : marker.id,
                      )
                    }
                    onFocus={() => setActiveMarker(marker.id)}
                  >
                    <span className="marker-pulse" />
                  </button>

                  {isActive ? (
                    <div className="coverage-tooltip">
                      <span>
                        {marker.type === "office"
                          ? "NAVTEAM office"
                          : "Service partner coverage"}
                      </span>
                      <strong>{marker.label}</strong>
                      {marker.detail ? <small>{marker.detail}</small> : null}
                      {marker.type === "office" ? (
                        <Link href="/contact">Contact this office ↗</Link>
                      ) : (
                        <small>Illustrative coverage point</small>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="service-map-legend">
            <span>
              <i className="office-dot" /> NAVTEAM office
            </span>
            <span>
              <i className="partner-dot" /> Service partner / port
            </span>
          </div>
        </div>
      </section>

      <section
        className="service-details"
        id="service-details"
        ref={serviceDetailsRef}
        aria-labelledby="service-details-title"
      >
        <div className="service-details-heading">
          <div className="service-details-title">
            <p className="eyebrow dark">Onboard capability</p>
            <h2 id="service-details-title">
              From annual surveys and equipment repairs to complete bridge
              retrofits, NAVTEAM coordinates the right expertise for the vessel
              and port.
            </h2>
          </div>
          <div className="service-details-action">
            <ContactTrigger
              className="service-details-contact"
              label="Contact NAVTEAM"
              source="Service & Support – Onboard capability"
              defaultInquiry={selectedCapability?.title}
            />
          </div>
        </div>

        <div className="service-detail-grid">
          {serviceCapabilities.map((service, index) => {
            const isSelected = selectedService === service.id;
            return (
              <button
                className={isSelected ? "service-detail-card selected" : "service-detail-card"}
                type="button"
                key={service.id}
                aria-pressed={isSelected}
                onClick={() => selectService(service.id, false)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
