"use client";

import { useMemo, useState } from "react";
import { assetPath, offices } from "../lib/site";

export function CoverageExplorer() {
  const [query, setQuery] = useState("");
  const filteredOffices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return offices;
    return offices.filter((office) =>
      `${office.city} ${office.country} ${office.region}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <div className="coverage-layout">
      <div className="map-card">
        <div
          className="map-viewport"
          role="img"
          aria-label="Concept map showing NAVTEAM offices and worldwide service coverage"
        >
          <img src={assetPath("map-source.png")} alt="" />
        </div>
        <div className="map-legend">
          <span>
            <i className="office-dot" /> NAVTEAM office
          </span>
          <span>
            <i className="partner-dot" /> Service partner / port
          </span>
        </div>
      </div>

      <aside className="coverage-panel">
        <h2>3 NAVTEAM offices</h2>
        <label className="port-search">
          <span>Search office, port or country</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “Europe” or “Malaysia”"
          />
        </label>
        <div className="office-list">
          {filteredOffices.map((office) => (
            <div className="office" key={office.city}>
              <i className="office-dot" />
              <div>
                <strong>{office.city}</strong>
                <span>{office.country}</span>
              </div>
            </div>
          ))}
          {filteredOffices.length === 0 ? (
            <p className="empty-result">
              No launch office matches that search. The future partner dataset
              will extend this view.
            </p>
          ) : null}
        </div>
        <div className="partner-note">
          <strong>Partner coverage</strong>
          <span>
            Major ports worldwide, with the strongest density in Europe.
          </span>
        </div>
      </aside>
    </div>
  );
}
