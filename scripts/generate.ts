import { spawn } from "node:child_process";
import path from "node:path";

const tsxBin = path.resolve(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tsx.cmd" : "tsx"
);

function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child =
      process.platform === "win32"
        ? spawn(
            "cmd.exe",
            ["/d", "/s", "/c", [command, ...args].join(" ")],
            { stdio: "inherit", shell: false }
          )
        : spawn(command, args, { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  // Supported passthrough args for both sub-scripts:
  // --limit=, --force, --outDirScreenshots=, --outDirPreviews=
  const screenshotsArgs: string[] = [];
  const previewsArgs: string[] = [];

  for (const a of args) {
    if (a.startsWith("--outDirScreenshots=")) {
      screenshotsArgs.push(`--outDir=${a.slice("--outDirScreenshots=".length)}`);
    } else if (a.startsWith("--outDirPreviews=")) {
      previewsArgs.push(`--outDir=${a.slice("--outDirPreviews=".length)}`);
    } else if (a === "--force" || a.startsWith("--limit=")) {
      screenshotsArgs.push(a);
      previewsArgs.push(a);
    }
  }

  await run(tsxBin, ["scripts/generate-screenshots.ts", ...screenshotsArgs]);
  await run(tsxBin, ["scripts/generate-previews.ts", ...previewsArgs]);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

