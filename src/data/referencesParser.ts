export type MDReference = {
  videoId: string;
  author: string;
  tags: string[];
  timecode: number;
  description?: string;
  previewImageOffset?: number;
  previewVideoOffset?: number;
  previewDuration?: number;
};

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      out.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  out.push(current.trim());
  return out;
}

function parseOptionalNumber(value: string): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function parseReferencesFromCsv(csvRaw: string): MDReference[] {
  const lines = csvRaw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return [];

  const [, ...rows] = lines;
  const references: MDReference[] = [];

  for (const row of rows) {
    const [
      videoId,
      timecodeRaw,
      author,
      tagsRaw,
      descriptionRaw,
      previewImageOffsetRaw,
      previewVideoOffsetRaw,
      previewDurationRaw
    ] = parseCsvLine(row);

    const timecode = Number(timecodeRaw);
    if (!videoId || !author || !Number.isFinite(timecode)) continue;

    references.push({
      videoId,
      timecode,
      author,
      tags: (tagsRaw || "")
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean),
      description: descriptionRaw || undefined,
      previewImageOffset: parseOptionalNumber(previewImageOffsetRaw),
      previewVideoOffset: parseOptionalNumber(previewVideoOffsetRaw),
      previewDuration: parseOptionalNumber(previewDurationRaw)
    });
  }

  return references;
}

