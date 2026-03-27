import referencesCsvRaw from "./references.csv?raw";
import { parseReferencesFromCsv } from "./referencesParser";
import type { MDReference } from "./referencesParser";
export type { MDReference } from "./referencesParser";

export const references: MDReference[] = parseReferencesFromCsv(referencesCsvRaw);
