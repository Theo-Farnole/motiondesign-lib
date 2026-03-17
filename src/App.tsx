import React from "react";
import { Link } from "react-router-dom";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { useCountUp } from "./hooks/useCountUp";
import { references } from "./data/references";
import { getTagColor } from "./utils/tagColor";

export const App: React.FC = () => {
  const total = references.length;
  const count = useCountUp(total, 1200);
  const allTags = React.useMemo(() => {
    return Array.from(new Set(references.flatMap((ref) => ref.tags))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  return (
    <>
      <header className="home-hero">
        <div className="home-hero__count" aria-label={`${total} références`}>
          <span className="home-hero__count-number">{count}</span>
          <span className="home-hero__count-label">
            reference{count !== 1 ? "s" : ""}
          </span>
        </div>

        <p className="home-hero__description">
          pour vous aider à designer vos motion designs 👌
        </p>
      </header>


      <div className="home-hero__tags" aria-label="Tags">
        {allTags.map((tag) => {
          const { bg, text, border } = getTagColor(tag);
          return (
            <Link
              key={tag}
              className="home-hero__tag"
              to={`/search/${encodeURIComponent(tag)}`}
              aria-label={`Rechercher le tag ${tag}`}
              style={{
                backgroundColor: bg,
                color: text,
                borderColor: border
              }}
            >
              {tag}
            </Link>
          );
        })}
      </div>

      <h2 className="page-heading">Derniers ajouts</h2>
      <section className="references-grid">
        {[...references]
          .reverse()
          .map((reference) => {
            const index = references.indexOf(reference);
            return (
              <Link
                key={`${reference.videoId}-${reference.timecode}`}
                to={`/ref/${index}`}
                className="references-grid__link"
              >
                <ReferenceThumbnail reference={reference} />
              </Link>
            );
          })}
      </section>
    </>
  );
};
