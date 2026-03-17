import type { MDReference } from "../data/references";

export function getReferenceScreenshotTimecode(
  reference: Pick<MDReference, "timecode" | "screenshotTimecode">
) {
  return reference.screenshotTimecode ?? reference.timecode;
}

export function getReferenceScreenshotFilename(
  reference: Pick<MDReference, "videoId" | "timecode" | "screenshotTimecode">
) {
  const screenshotTimecode = getReferenceScreenshotTimecode(reference);
  return `${reference.videoId}-${screenshotTimecode}.jpg`;
}

export function getReferenceScreenshotPublicPath(
  reference: Pick<MDReference, "videoId" | "timecode" | "screenshotTimecode">
) {
  return `/screenshots/${getReferenceScreenshotFilename(reference)}`;
}

