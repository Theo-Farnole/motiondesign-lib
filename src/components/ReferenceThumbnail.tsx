import React from "react";
import { MDReference } from "../data/references";
import "./ReferenceThumbnail.scss";

type ReferenceThumbnailProps = {
  reference: MDReference;
};

const getTagColor = (tag: string): { bg: string; text: string; border: string } => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return {
    bg: `hsl(${hue}, 45%, 92%)`,
    text: `hsl(${hue}, 50%, 28%)`,
    border: `hsl(${hue}, 35%, 85%)`,
  };
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
        </div>
        <div className="reference-thumbnail__tags">
          {reference.tags.map((tag) => {
            const { bg, text, border } = getTagColor(tag);
            return (
              <span
                key={tag}
                className="reference-thumbnail__tag"
                style={{ backgroundColor: bg, color: text, borderColor: border }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
};

