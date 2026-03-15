import React from "react";
import { Link } from "react-router-dom";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { useCountUp } from "./hooks/useCountUp";
import { references } from "./data/references";

export const App: React.FC = () => {
  const total = references.length;
  const count = useCountUp(total, 1200);

  return (
    <>
      <header className="home-hero">
        <div className="home-hero__count" aria-label={`${total} références`}>
          <span className="home-hero__count-number">{count}</span>
          <span className="home-hero__count-label">
            référence{count !== 1 ? "s" : ""}
          </span>
        </div>

        <p className="home-hero__description">
          pour le motion design, classées par auteur et par thème 👌
        </p>
      </header>

      <section className="references-grid">
        {references.map((reference, index) => (
          <Link
            key={`${reference.url}-${reference.timecode}`}
            to={`/ref/${index}`}
            className="references-grid__link"
          >
            <ReferenceThumbnail reference={reference} />
          </Link>
        ))}
      </section>
    </>
  );
};
