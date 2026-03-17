import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

import ytdlp from "yt-dlp-exec";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - ffmpeg-static has no types in some setups
import ffmpegPath from "ffmpeg-static";

import { references } from "../src/data/references";
import { getReferenceScreenshotFilename, getReferenceScreenshotTimecode } from "../src/utils/referenceScreenshot";

type CliArgs = {
  outDir: string;
  limit?: number;
  force: boolean;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    outDir: path.resolve(process.cwd(), "public", "screenshots"),
    force: false
  };

  for (const raw of argv) {
    if (raw.startsWith("--outDir=")) {
      args.outDir = path.resolve(process.cwd(), raw.slice("--outDir=".length));
    } else if (raw.startsWith("--limit=")) {
      const n = Number(raw.slice("--limit=".length));
      if (Number.isFinite(n) && n > 0) args.limit = Math.floor(n);
    } else if (raw === "--force") {
      args.force = true;
    }
  }

  return args;
}

function formatTimecode(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

async function getDirectVideoUrl(videoId: string): Promise<string> {
  const pageUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const out = await ytdlp(pageUrl, {
    format: "mp4/best",
    getUrl: true,
    noWarnings: true,
    quiet: true
  });

  const first = String(out).split(/\r?\n/).map((l) => l.trim()).filter(Boolean)[0];
  if (!first) throw new Error(`Could not resolve direct URL for ${videoId}`);
  return first;
}

async function runFfmpegGrabFrame(opts: {
  inputUrl: string;
  timecodeSeconds: number;
  outputFile: string;
}): Promise<void> {
  if (!ffmpegPath) throw new Error("ffmpeg binary not found (ffmpeg-static returned empty)");

  await new Promise<void>((resolve, reject) => {
    const args = [
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      formatTimecode(opts.timecodeSeconds),
      "-i",
      opts.inputUrl,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      "-vf",
      "scale=1280:-2",
      "-y",
      opts.outputFile
    ];

    const child = spawn(ffmpegPath, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function main() {
  const { outDir, limit, force } = parseArgs(process.argv.slice(2));
  fs.mkdirSync(outDir, { recursive: true });

  const slice = typeof limit === "number" ? references.slice(0, limit) : references;
  const unique = Array.from(
    new Map(
      slice.map((r) => [`${r.videoId}-${getReferenceScreenshotTimecode(r)}`, r] as const)
    ).values()
  );

  console.log(`Generating ${unique.length} screenshot(s) into ${outDir}`);

  const urlCache = new Map<string, string>();
  for (const ref of unique) {
    const filename = getReferenceScreenshotFilename(ref);
    const outputFile = path.join(outDir, filename);

    if (!force && fs.existsSync(outputFile)) {
      console.log(`skip ${filename}`);
      continue;
    }

    const inputUrl =
      urlCache.get(ref.videoId) ??
      (await getDirectVideoUrl(ref.videoId).then((u) => {
        urlCache.set(ref.videoId, u);
        return u;
      }));

    const screenshotTimecode = getReferenceScreenshotTimecode(ref);
    console.log(`grab ${filename} @ ${screenshotTimecode}s`);
    await runFfmpegGrabFrame({
      inputUrl,
      timecodeSeconds: screenshotTimecode,
      outputFile
    });
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

