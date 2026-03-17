import fs from "node:fs";
import path from "node:path";

import { references } from "../src/data/references";
import { getReferencePreviewFilename } from "../src/utils/referencePreview";

type CliArgs = {
  dir: string;
  delete: boolean;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    dir: path.resolve(process.cwd(), "public", "previews"),
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

  const expected = new Set(references.map((r) => getReferencePreviewFilename(r)));
  const files = fs.readdirSync(dir, { withFileTypes: true });

  const unused: string[] = [];
  for (const entry of files) {
    if (!entry.isFile()) continue;
    const name = entry.name;
    if (name === ".gitkeep") continue;
    if (!name.toLowerCase().endsWith(".mp4")) continue;
    if (!expected.has(name)) unused.push(name);
  }

  if (unused.length === 0) {
    console.log("No unused previews found.");
    return;
  }

  console.log(`${unused.length} unused preview(s) found in ${dir}`);
  for (const name of unused) console.log(`- ${name}`);

  if (!shouldDelete) {
    console.log("Dry run only. Re-run with --delete to remove them.");
    return;
  }

  for (const name of unused) {
    fs.unlinkSync(path.join(dir, name));
  }

  console.log(`Deleted ${unused.length} preview(s).`);
}

main();

