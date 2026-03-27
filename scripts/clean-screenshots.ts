import fs from "node:fs";
import path from "node:path";

import { parseReferencesFromCsv } from "../src/data/referencesParser";
import { getReferenceScreenshotFilename } from "../src/utils/referenceScreenshot";

type CliArgs = {
  dir: string;
  delete: boolean;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    dir: path.resolve(process.cwd(), "public", "screenshots"),
    delete: false
  };

  for (const raw of argv) {
    if (raw.startsWith("--dir=")) {
      args.dir = path.resolve(process.cwd(), raw.slice("--dir=".length));
    } else if (raw === "--delete") {
      args.delete = true;
    }
  }

  return args;
}

function main() {
  const { dir, delete: shouldDelete } = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exitCode = 1;
    return;
  }

  const csvPath = path.resolve(process.cwd(), "src", "data", "references.csv");
  const csvRaw = fs.readFileSync(csvPath, "utf8");
  const references = parseReferencesFromCsv(csvRaw);
  const expected = new Set(references.map((r) => getReferenceScreenshotFilename(r)));
  const files = fs.readdirSync(dir, { withFileTypes: true });

  const unused: string[] = [];
  for (const entry of files) {
    if (!entry.isFile()) continue;
    const name = entry.name;
    if (name === ".gitkeep") continue;
    if (!name.toLowerCase().endsWith(".jpg")) continue;
    if (!expected.has(name)) unused.push(name);
  }

  if (unused.length === 0) {
    console.log("No unused screenshots found.");
    return;
  }

  console.log(`${unused.length} unused screenshot(s) found in ${dir}`);
  for (const name of unused) console.log(`- ${name}`);

  if (!shouldDelete) {
    console.log("Dry run only. Re-run with --delete to remove them.");
    return;
  }

  for (const name of unused) {
    fs.unlinkSync(path.join(dir, name));
  }

  console.log(`Deleted ${unused.length} screenshot(s).`);
}

main();

