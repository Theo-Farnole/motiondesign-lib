import React from "react";
import { Link } from "react-router-dom";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { references } from "./data/references";

export const App: React.FC = () => {
  return (
    <>
      <h2 className="page-heading">Gallery</h2>
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
