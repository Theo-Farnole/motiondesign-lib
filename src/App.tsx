import React from "react";
import { Link } from "react-router-dom";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { references } from "./data/references";

export const App: React.FC = () => {
  return (
    <>
      <header className="home-hero">
        <div className="home-hero__count" aria-label={`${references.length} références`}>
          <span className="home-hero__count-number">{references.length}</span>
          <span className="home-hero__count-label">
            référence{references.length > 1 ? "s" : ""}
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
