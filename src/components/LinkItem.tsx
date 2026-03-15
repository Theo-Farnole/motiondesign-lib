import React from "react";

export type LinkRow = {
  url: string;
  timecode: string;
  channel: string;
  tags: string;
};

type LinkItemProps = {
  link: LinkRow;
};

export const LinkItem: React.FC<LinkItemProps> = ({ link }) => {
  return (
    <tr>
      <td>
        <a href={link.url} target="_blank" rel="noreferrer">
          {link.url}
        </a>
      </td>
      <td>{link.timecode}</td>
      <td>{link.channel}</td>
      <td>{link.tags}</td>
    </tr>
  );
};


