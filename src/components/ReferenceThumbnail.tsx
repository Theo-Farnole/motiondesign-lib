import React from "react";
import { MDReference } from "../data/references";

type LinkItemProps = {
  reference: MDReference;
};

export const ReferenceThumbnail: React.FC<LinkItemProps> = ({ reference }) => {
  return (
    <tr>
      <td>
        <a href={reference.url} target="_blank" rel="noreferrer">
          {reference.url}
        </a>
      </td>
      <td>{reference.timecode}</td>
      <td>{reference.author}</td>
      <td>{reference.tags.join(", ")}</td>
    </tr>
  );
};


