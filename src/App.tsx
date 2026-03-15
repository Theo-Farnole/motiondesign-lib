import React from "react";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { references } from "./data/references";

export const App: React.FC = () => {
  const [query, setQuery] = React.useState("");

  const normalizedQuery = query.toLowerCase().trim();
  const filtered = references.filter((ref) => {
    if (!normalizedQuery) return true;

    const inAuthor = ref.author.toLowerCase().includes(normalizedQuery);
    const inUrl = ref.url.toLowerCase().includes(normalizedQuery);
    const inTags = ref.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery),
    );

    return inAuthor || inUrl || inTags;
  });

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Motion Design Reference</h1>
      </header>
      <main className="app__content">
        <div className="search-bar">
          <input
            className="search-bar__input"
            type="text"
            placeholder="Search by author, tag, or URL..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <section className="references-grid">
          {filtered.map((reference) => (
            <ReferenceThumbnail
              key={`${reference.url}-${reference.timecode}`}
              reference={reference}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

