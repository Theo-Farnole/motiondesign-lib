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
    <>
      <h2 className="search-page__heading">
          {decodedTerm ? `Résultats pour « ${decodedTerm} »` : "Recherche"}
          {decodedTerm && (
            <span className="search-page__count">
              {" "}({filtered.length} référence{filtered.length !== 1 ? "s" : ""})
            </span>
          )}
        </h2>
        {filtered.length === 0 ? (
          <p className="search-page__empty">Aucun résultat.</p>
        ) : (
          <section className="references-grid search-page__grid">
            {filtered.map((reference) => {
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
        )}
    </>
  );
};
