import React from "react";
import { useParams, Link } from "react-router-dom";
import { ReferenceThumbnail } from "../components/ReferenceThumbnail";
import { references } from "../data/references";
import "./SearchPage.scss";

export const SearchPage: React.FC = () => {
  const { term } = useParams<{ term: string }>();
  const decodedTerm = term ? decodeURIComponent(term) : "";

  const filtered = React.useMemo(() => {
    if (!decodedTerm.trim()) return [];
    const q = decodedTerm.toLowerCase().trim();
    return references.filter((ref) => {
      const inAuthor = ref.author.toLowerCase().includes(q);
      const inTags = ref.tags.some((tag) => tag.toLowerCase().includes(q));
      return inAuthor || inTags;
    });
  }, [decodedTerm]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Motion Design Reference</h1>
      </header>
      <main className="app__content">
        <div className="search-page__back">
          <Link to="/" className="search-page__back-link">
            ← Back to home
          </Link>
        </div>
        <h2 className="search-page__heading">
          {decodedTerm ? `Results for “${decodedTerm}”` : "Search"}
        </h2>
        {filtered.length === 0 ? (
          <p className="search-page__empty">No results found.</p>
        ) : (
          <section className="references-grid">
            {filtered.map((reference) => {
              const index = references.indexOf(reference);
              return (
                <ReferenceThumbnail
                  key={`${reference.url}-${reference.timecode}`}
                  reference={reference}
                  href={`/ref/${index}`}
                />
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};
