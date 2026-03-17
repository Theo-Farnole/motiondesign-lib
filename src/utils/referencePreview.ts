import type { MDReference } from "../data/references";
import { getReferenceScreenshotTimecode } from "./referenceScreenshot";

export function getReferencePreviewTimecode(
  reference: Pick<MDReference, "timecode" | "previewImageOffset">
) {
  // For now we align preview with the visual timecode used for screenshots.
  return getReferenceScreenshotTimecode(reference);
}

export function getReferencePreviewDurationSeconds(
  reference: Pick<MDReference, "previewDuration">,
  defaultSeconds: number
) {
  const v = reference.previewDuration;
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : defaultSeconds;
}

export function getReferencePreviewFilename(
  reference: Pick<MDReference, "videoId" | "timecode" | "previewImageOffset" | "previewDuration">,
  defaultSeconds = 2.4
) {
  const t = getReferencePreviewTimecode(reference);
  const dMs = Math.round(getReferencePreviewDurationSeconds(reference, defaultSeconds) * 1000);
  return `${reference.videoId}-${t}-${dMs}ms.mp4`;
}

export function getReferencePreviewPublicPath(
  reference: Pick<MDReference, "videoId" | "timecode" | "previewImageOffset" | "previewDuration">,
  defaultSeconds = 2.4
) {
  return `/previews/${getReferencePreviewFilename(reference, defaultSeconds)}`;
}

