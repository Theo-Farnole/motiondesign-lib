import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDReference, references } from "../data/references";
import { Link } from "react-router-dom";
import { ReferenceThumbnail } from "../components/ReferenceThumbnail";
import "./PlayerPage.scss";

const getYoutubeVideoId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const vParam = parsed.searchParams.get("v");
    if (vParam) return vParam;
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return id || null;
    }
    return null;
  } catch {
    return null;
  }
};

const formatTimecode = (totalSeconds: number): string => {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (value: number) => value.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${minutes}:${pad(seconds)}`;
};

export const PlayerPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const index = params.id ? Number.parseInt(params.id, 10) : NaN;
  const reference: MDReference | undefined =
    Number.isFinite(index) && index >= 0 && index < references.length
      ? references[index]
      : undefined;

  React.useEffect(() => {
    if (!reference) {
      navigate("/", { replace: true });
    }
  }, [reference, navigate]);

  if (!reference) {
    return null;
  }

  const videoId = getYoutubeVideoId(reference.url);
  const startSeconds = Math.max(0, Math.floor(reference.timecode));
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?start=${startSeconds}`
    : null;

  const suggestions = references
    .filter((ref) => ref !== reference)
    .slice(0, 4);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Motion Design Reference</h1>
      </header>
      <main className="app__content">
        <div className="player-layout__back">
          <button
            type="button"
            className="player-layout__back-button"
            onClick={() => navigate("/")}
          >
            ← Back to gallery
          </button>
        </div>

        <section className="player-layout">
          <div className="player-layout__video">
            {embedUrl && (
              <iframe
                src={embedUrl}
                title="Motion design reference"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>

          <div className="player-layout__meta">
            <span className="player-layout__author">
              {reference.author} — {formatTimecode(reference.timecode)}
            </span>
            <div className="player-layout__tags">
              {reference.tags.map((tag) => (
                <span key={tag} className="player-layout__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <footer className="player-layout__suggestions">
            <div className="player-layout__suggestions-title">Suggestions</div>
            <div className="references-grid">
              {suggestions.map((ref) => {
                const suggestionIndex = references.indexOf(ref);
                return (
                  <Link
                    key={`${ref.url}-${ref.timecode}`}
                    to={`/ref/${suggestionIndex}`}
                    className="references-grid__link"
                  >
                    <ReferenceThumbnail reference={ref} />
                  </Link>
                );
              })}
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

