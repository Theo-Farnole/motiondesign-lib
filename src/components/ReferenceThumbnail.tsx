import React from "react";
import { MDReference } from "../data/references";
import { getTagColor } from "../utils/tagColor";
import "./ReferenceThumbnail.scss";

type ReferenceThumbnailProps = {
  reference: MDReference;
};

const getYoutubeThumbnailUrl = (videoId: string): string =>
  `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

export const ReferenceThumbnail: React.FC<ReferenceThumbnailProps> = ({
  reference,
}) => {
  const thumbnailUrl = getYoutubeThumbnailUrl(reference.videoId);

  return (
    <article className="reference-thumbnail">
      {thumbnailUrl && (
        <div className="reference-thumbnail__thumb-button">
          <img
            src={thumbnailUrl}
            alt={`Miniature pour ${reference.videoId}`}
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

