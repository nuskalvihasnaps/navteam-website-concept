import type { Metadata } from "next";
import { assetPath, stories } from "../lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "NAVTEAM news, technical guidance, product updates and marine electronics project stories.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="page-intro">
        <h1>Insights</h1>
        <p>
          Technical guidance, product updates, company news and projects from
          the world of professional marine electronics.
        </p>
      </section>

      <section className="page-section insights-content">
        <div className="section-heading">
          <div>
            <h2>Useful knowledge from the bridge.</h2>
          </div>
          <p>
            Practical information for shipowners, operators and technical
            teams responsible for safe, reliable bridge systems.
          </p>
        </div>
        <div className="story-grid full insights-story-grid">
          {stories.map((story, index) => (
            <article
              className={
                index === 0
                  ? "story story-image story-featured"
                  : "story story-support"
              }
              key={story.title}
            >
              {index === 0 ? (
                <img
                  src={assetPath("jrc-radar.jpg")}
                  alt="Marine radar controls"
                />
              ) : null}
              <div>
                <span>{story.category}</span>
                <h2>{story.title}</h2>
                <p>{story.summary}</p>
                <span className="story-action">Article concept ↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
