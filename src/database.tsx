import React from "react";
import type { LinkRow } from "./components/LinkItem";

const parseLinksFromSql = (sql: string): LinkRow[] => {
  const valuesPartMatch = sql.match(/VALUES([\s\S]*);/i);
  if (!valuesPartMatch) {
    return [];
  }

  const valuesPart = valuesPartMatch[1];

  const tuples = valuesPart
    .split("),")
    .map((tuple) => tuple.replace(/[\n\r]/g, "").trim())
    .filter(Boolean)
    .map((tuple) => {
      const cleaned = tuple.replace(/^[,(]+/, "").replace(/[);]+$/, "");
      const rawValues = cleaned.split(",").map((v) => v.trim());
      const values = rawValues.map((v) => {
        const withoutQuotes = v.replace(/^'/, "").replace(/'$/, "");
        return withoutQuotes.replace(/''/g, "'");
      });
      const [url, timecode, channel, tags] = values;
      return { url, timecode, channel, tags };
    });

  return tuples;
};

export const useSqlLinks = (): LinkRow[] => {
  const [links, setLinks] = React.useState<LinkRow[]>([]);

  React.useEffect(() => {
    fetch("/sql/link.sql")
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseLinksFromSql(text);
        setLinks(parsed);
      })
      .catch((error) => {
        console.error("Failed to load SQL links", error);
      });
  }, []);

  return links;
};

