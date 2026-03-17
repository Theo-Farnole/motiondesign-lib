import type { MDReference } from "../data/references";

export function getReferenceScreenshotTimecode(
  reference: Pick<MDReference, "timecode" | "previewImageOffset">
) {
  const offset = reference.previewImageOffset ?? 0;
  const t = reference.timecode + offset;
  return Math.max(0, t);
}

export function getReferenceScreenshotFilename(
  reference: Pick<MDReference, "videoId" | "timecode" | "previewImageOffset">
) {
  const screenshotTimecode = getReferenceScreenshotTimecode(reference);
  return `${reference.videoId}-${screenshotTimecode}.jpg`;
}

export function getReferenceScreenshotPublicPath(
  reference: Pick<MDReference, "videoId" | "timecode" | "previewImageOffset">
) {
  return `/screenshots/${getReferenceScreenshotFilename(reference)}`;
}

