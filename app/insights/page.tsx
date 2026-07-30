import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { assetPath, stories } from "../lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "NAVTEAM news, technical guidance, product updates and marine electronics project stories.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        title="Useful knowledge from the bridge."
        copy="A home for technical guidance, product lifecycle notices, company news and projects that demonstrate NAVTEAM's capabilities."
        detail="Concept articles shown for presentation purposes"
      />

      <section className="page-section">
        <div className="story-grid full">
          {stories.map((story, index) => (
            <article
              className={index === 0 ? "story story-image" : "story"}
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
