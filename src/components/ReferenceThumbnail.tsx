import React from "react";
import { MDReference } from "../data/references";
import "./ReferenceThumbnail.scss";

type ReferenceThumbnailProps = {
  reference: MDReference;
};

const getYoutubeThumbnailUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    const vParam = parsed.searchParams.get("v");
    if (vParam) {
      return `https://img.youtube.com/vi/${vParam}/hqdefault.jpg`;
    }

    // Short URL: https://youtu.be/VIDEO_ID
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
    <tr>
      <td>
        {thumbnailUrl && (
          <a href={reference.url} target="_blank" rel="noreferrer">
            <img
              src={thumbnailUrl}
              alt={`Thumbnail for ${reference.url}`}
              className="reference-thumbnail__image"
            />
          </a>
        )}
      </td>
      <td>
        <a href={reference.url} target="_blank" rel="noreferrer">
          {reference.url}
        </a>
        <div className="reference-thumbnail__timecode">{reference.timecode}</div>
      </td>
      <td>{reference.author}</td>
      <td>
        <div className="reference-thumbnail__tags">
          {reference.tags.map((tag) => (
            <span key={tag} className="reference-thumbnail__tag">
              {tag}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};

