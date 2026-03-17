import React from "react";
import { MDReference } from "../data/references";
import { getTagColor } from "../utils/tagColor";
import { getReferenceScreenshotPublicPath } from "../utils/referenceScreenshot";
import { getReferencePreviewPublicPath } from "../utils/referencePreview";
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
  const previewUrl = getReferencePreviewPublicPath(reference);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [hasPreview, setHasPreview] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleEnter = () => {
    setIsHovering(true);
    if (!hasPreview) return;
    queueMicrotask(() => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      // Some browsers block play() sometimes; ignore errors.
      void v.play().catch(() => {});
    });
  };

  const handleLeave = () => {
    setIsHovering(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article className="reference-thumbnail" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {imgSrc && (
        <div className="reference-thumbnail__thumb-button">
          {hasPreview && (
            <video
              ref={videoRef}
              className="reference-thumbnail__video"
              muted
              loop
              playsInline
              preload="none"
              aria-hidden={!isHovering}
              tabIndex={-1}
              onError={() => setHasPreview(false)}
            >
              <source src={previewUrl} type="video/mp4" />
            </video>
          )}
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

