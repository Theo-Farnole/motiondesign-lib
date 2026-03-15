import React from "react";
import { Link } from "react-router-dom";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { references } from "./data/references";

export const App: React.FC = () => {
  return (
    <>
      <header className="home-hero">
        <h1 className="home-hero__title">
          <span className="home-hero__title--large">Motion Design</span>
          <span className="home-hero__title--small">References</span>
        </h1>
        <p className="home-hero__description">
          Une sélection de références vidéo pour le motion design, classées par auteur et par thème.
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
