import React from "react";
import { useNavigate } from "react-router-dom";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { references } from "./data/references";

const allChannels = Array.from(
  new Set(references.map((ref) => ref.author)),
).sort();

const allTags = Array.from(
  new Set(references.flatMap((ref) => ref.tags)),
).sort();

export const App: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const normalizedQuery = query.toLowerCase().trim();

  const suggestions = React.useMemo(() => {
    if (!normalizedQuery) {
      return [...allChannels, ...allTags].slice(0, 8);
    }
    const fromChannels = allChannels.filter((name) =>
      name.toLowerCase().includes(normalizedQuery),
    );
    const fromTags = allTags.filter((tag) =>
      tag.toLowerCase().includes(normalizedQuery),
    );
    return Array.from(new Set([...fromChannels, ...fromTags])).slice(0, 8);
  }, [normalizedQuery]);

  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  React.useEffect(() => {
    setHighlightedIndex(-1);
  }, [query, suggestions.length]);

  const showSuggestions = focused && suggestions.length > 0;

  const selectSuggestion = React.useCallback((suggestion: string) => {
    setQuery(suggestion);
    setFocused(false);
    setHighlightedIndex(-1);
  }, []);

  const submitSearch = React.useCallback(() => {
    const term = query.trim();
    if (term) {
      setFocused(false);
      setHighlightedIndex(-1);
      navigate(`/search/${encodeURIComponent(term)}`);
    }
  }, [query, navigate]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (showSuggestions && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          selectSuggestion(suggestions[highlightedIndex]);
        } else {
          submitSearch();
        }
        return;
      }
      if (e.key === "Escape") {
        setFocused(false);
        setHighlightedIndex(-1);
        return;
      }
      if (!showSuggestions) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) =>
          i < suggestions.length - 1 ? i + 1 : i,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((i) => (i > 0 ? i - 1 : -1));
      }
    },
    [showSuggestions, suggestions, highlightedIndex, selectSuggestion, submitSearch],
  );

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Motion Design Reference</h1>
      </header>
      <main className="app__content">
        <div className="search-bar" ref={containerRef}>
          <div className="search-bar__row">
            <span className="search-bar__icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              className="search-bar__input"
              type="text"
              placeholder="Search by channel or tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={handleKeyDown}
              aria-autocomplete="list"
              aria-expanded={showSuggestions}
              aria-controls="search-suggestions"
              aria-activedescendant={highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined}
              id="search-input"
            />
            <button
              type="button"
              className="search-bar__submit"
              onClick={submitSearch}
              aria-label="Search"
            >
              Search
            </button>
          </div>
          {showSuggestions && (
            <ul
              id="search-suggestions"
              className="search-bar__suggestions"
              role="listbox"
            >
              {suggestions.map((suggestion, i) => (
                <li
                  key={suggestion}
                  id={`suggestion-${i}`}
                  role="option"
                  aria-selected={i === highlightedIndex}
                  className={`search-bar__suggestion ${i === highlightedIndex ? "search-bar__suggestion--highlighted" : ""}`}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectSuggestion(suggestion);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <section className="references-grid">
          {references.map((reference, index) => (
            <ReferenceThumbnail
              key={`${reference.url}-${reference.timecode}`}
              reference={reference}
              href={`/ref/${index}`}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

