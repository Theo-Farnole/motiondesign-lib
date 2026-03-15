import React from "react";
import { MDReference } from "../data/references";
import "./ReferenceThumbnail.scss";

type ReferenceThumbnailProps = {
  reference: MDReference;
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

const getYoutubeThumbnailUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    const vParam = parsed.searchParams.get("v");
    if (vParam) {
      return `https://img.youtube.com/vi/${vParam}/hqdefault.jpg`;
    }

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) {
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const ReferenceThumbnail: React.FC<ReferenceThumbnailProps> = ({
  reference,
}) => {
  const thumbnailUrl = getYoutubeThumbnailUrl(reference.url);

  return (
    <article className="reference-thumbnail">
      {thumbnailUrl && (
        <div className="reference-thumbnail__thumb-button">
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${reference.url}`}
            className="reference-thumbnail__image"
          />
        </div>
      )}
      <div className="reference-thumbnail__body">
        <div className="reference-thumbnail__meta">
          <span className="reference-thumbnail__author">{reference.author}</span>
          <span className="reference-thumbnail__timecode">
            {formatTimecode(reference.timecode)}
          </span>
        </div>
        <span className="reference-thumbnail__url">
          {reference.url}
        </span>
        <div className="reference-thumbnail__tags">
          {reference.tags.map((tag) => (
            <span key={tag} className="reference-thumbnail__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

