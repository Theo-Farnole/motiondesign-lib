import React from "react";
import { MDReference } from "../data/references";
import { getTagColor } from "../utils/tagColor";
import { getReferenceScreenshotPublicPath } from "../utils/referenceScreenshot";
import "./ReferenceThumbnail.scss";

type ReferenceThumbnailProps = {
  reference: MDReference;
};

const getYoutubeThumbnailUrl = (videoId: string): string =>
  `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

export const ReferenceThumbnail: React.FC<ReferenceThumbnailProps> = ({
  reference,
}) => {
  const screenshotUrl = getReferenceScreenshotPublicPath(reference);
  const fallbackUrl = getYoutubeThumbnailUrl(reference.videoId);
  const [imgSrc, setImgSrc] = React.useState<string>(screenshotUrl);

  return (
    <article className="reference-thumbnail">
      {imgSrc && (
        <div className="reference-thumbnail__thumb-button">
          <img
            src={imgSrc}
            alt={`Aperçu pour ${reference.author} à ${reference.timecode}s`}
            className="reference-thumbnail__image"
            loading="lazy"
            onError={() => {
              if (imgSrc !== fallbackUrl) setImgSrc(fallbackUrl);
            }}
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

