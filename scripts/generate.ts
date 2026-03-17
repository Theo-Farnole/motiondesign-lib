import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

import ytdlp from "yt-dlp-exec";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - ffmpeg-static has no types in some setups
import ffmpegPath from "ffmpeg-static";

import { references } from "../src/data/references";
import {
  getReferenceScreenshotFilename,
  getReferenceScreenshotTimecode
} from "../src/utils/referenceScreenshot";
import {
  getReferencePreviewDurationSeconds,
  getReferencePreviewFilename,
  getReferencePreviewTimecode
} from "../src/utils/referencePreview";

type CliArgs = {
  limit?: number;
  force: boolean;
  outDirScreenshots: string;
  outDirPreviews: string;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    force: false,
    outDirScreenshots: path.resolve(process.cwd(), "public", "screenshots"),
    outDirPreviews: path.resolve(process.cwd(), "public", "previews")
  };

  for (const raw of argv) {
    if (raw.startsWith("--limit=")) {
      const n = Number(raw.slice("--limit=".length));
      if (Number.isFinite(n) && n > 0) args.limit = Math.floor(n);
    } else if (raw === "--force") {
      args.force = true;
    } else if (raw.startsWith("--outDirScreenshots=")) {
      args.outDirScreenshots = path.resolve(
        process.cwd(),
        raw.slice("--outDirScreenshots=".length)
      );
    } else if (raw.startsWith("--outDirPreviews=")) {
      args.outDirPreviews = path.resolve(process.cwd(), raw.slice("--outDirPreviews=".length));
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

  const first = String(out)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)[0];
  if (!first) throw new Error(`Could not resolve direct URL for ${videoId}`);
  return first;
}

async function runFfmpeg(args: string[]): Promise<void> {
  if (!ffmpegPath) throw new Error("ffmpeg binary not found (ffmpeg-static returned empty)");

  await new Promise<void>((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function main() {
  const { limit, force, outDirScreenshots, outDirPreviews } = parseArgs(process.argv.slice(2));
  fs.mkdirSync(outDirScreenshots, { recursive: true });
  fs.mkdirSync(outDirPreviews, { recursive: true });

  const slice = typeof limit === "number" ? references.slice(0, limit) : references;

  const screenshotJobs = Array.from(
    new Map(slice.map((r) => [`${r.videoId}-${getReferenceScreenshotTimecode(r)}`, r] as const))
      .values()
  );

  const previewJobs = Array.from(
    new Map(
      slice.map((r) => {
        const t = getReferencePreviewTimecode(r);
        const d = getReferencePreviewDurationSeconds(r, 2.4);
        const dMs = Math.round(d * 1000);
        return [`${r.videoId}-${t}-${dMs}`, r] as const;
      })
    ).values()
  );

  console.log(
    `Generating ${screenshotJobs.length} screenshot(s) into ${outDirScreenshots} and ${previewJobs.length} preview(s) into ${outDirPreviews}`
  );

  const urlCache = new Map<string, string>();

  const getUrlCached = async (videoId: string) => {
    const cached = urlCache.get(videoId);
    if (cached) return cached;
    const u = await getDirectVideoUrl(videoId);
    urlCache.set(videoId, u);
    return u;
  };

  for (const ref of screenshotJobs) {
    const filename = getReferenceScreenshotFilename(ref);
    const outputFile = path.join(outDirScreenshots, filename);

    if (!force && fs.existsSync(outputFile)) {
      console.log(`skip screenshot ${filename}`);
      continue;
    }

    const inputUrl = await getUrlCached(ref.videoId);
    const t = getReferenceScreenshotTimecode(ref);
    console.log(`grab screenshot ${filename} @ ${t}s`);

    await runFfmpeg([
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      formatTimecode(t),
      "-i",
      inputUrl,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      "-vf",
      "scale=1280:-2",
      "-y",
      outputFile
    ]);
  }

  for (const ref of previewJobs) {
    const filename = getReferencePreviewFilename(ref, 2.4);
    const outputFile = path.join(outDirPreviews, filename);

    if (!force && fs.existsSync(outputFile)) {
      console.log(`skip preview ${filename}`);
      continue;
    }

    const inputUrl = await getUrlCached(ref.videoId);
    const t = getReferencePreviewTimecode(ref);
    const durationSeconds = getReferencePreviewDurationSeconds(ref, 2.4);
    const startSeconds = Math.max(0, t - 0.2);
    console.log(`clip preview ${filename} @ ${t}s (+${durationSeconds}s)`);

    await runFfmpeg([
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      formatTimecode(startSeconds),
      "-t",
      String(durationSeconds),
      "-i",
      inputUrl,
      "-an",
      "-vf",
      "scale=640:-2,fps=24",
      "-c:v",
      "libx264",
      "-profile:v",
      "baseline",
      "-level",
      "3.0",
      "-pix_fmt",
      "yuv420p",
      "-preset",
      "veryfast",
      "-crf",
      "28",
      "-movflags",
      "+faststart",
      "-y",
      outputFile
    ]);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

