"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath, services } from "../lib/site";

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
    x: 49.4,
    y: 28.5,
    label: "Svendborg",
    detail: "Denmark",
  },
  {
    id: "gdansk",
    type: "office",
    x: 52.1,
    y: 29.1,
    label: "Gdansk",
    detail: "Poland",
  },
  {
    id: "tanjung-pelepas",
    type: "office",
    x: 79.1,
    y: 62.4,
    label: "Port of Tanjung Pelepas",
    detail: "Malaysia",
  },
  { id: "partner-north-atlantic", type: "partner", x: 41.7, y: 22.5, label: "North Atlantic" },
  { id: "partner-north-america", type: "partner", x: 28.2, y: 37.5, label: "North America" },
  { id: "partner-caribbean", type: "partner", x: 25.3, y: 56.8, label: "Caribbean" },
  { id: "partner-south-america", type: "partner", x: 31.5, y: 67.2, label: "South America" },
  { id: "partner-uk", type: "partner", x: 46.8, y: 31.2, label: "Northern Europe" },
  { id: "partner-benelux", type: "partner", x: 48.1, y: 34.8, label: "Western Europe" },
  { id: "partner-iberia", type: "partner", x: 45.5, y: 41.2, label: "Southern Europe" },
  { id: "partner-mediterranean", type: "partner", x: 52.4, y: 42.8, label: "Mediterranean" },
  { id: "partner-middle-east", type: "partner", x: 62.8, y: 49.2, label: "Middle East" },
  { id: "partner-india", type: "partner", x: 69.4, y: 54.4, label: "Indian Ocean" },
  { id: "partner-east-asia", type: "partner", x: 84.4, y: 45.3, label: "East Asia" },
  { id: "partner-japan", type: "partner", x: 88.1, y: 34.5, label: "Japan" },
  { id: "partner-south-africa", type: "partner", x: 52.6, y: 79.5, label: "Southern Africa" },
];

export function ServiceMapHero() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
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

        <div className="service-capability-list" aria-label="Service capabilities">
          {services.map((service, index) => (
            <div key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service}</strong>
            </div>
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
                className={`coverage-marker-wrap ${marker.type}`}
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
                      : `Illustrative service partner coverage: ${marker.label}`
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
  );
}
