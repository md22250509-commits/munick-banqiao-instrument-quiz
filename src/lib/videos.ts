import type { InstrumentId } from "./quiz-data";

export type LessonVideo = {
  /** 空字串會顯示占位畫面。可填 /videos/drums.mp4 或 YouTube 連結。 */
  src: string;
  poster?: string;
};

export const instrumentVideos: Record<InstrumentId, LessonVideo> = {
  drums: { src: "" },
  "guitar-acoustic": { src: "" },
  "guitar-electric": { src: "" },
  bass: { src: "" },
  vocal: { src: "" },
  piano: { src: "" },
};

export function youtubeIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.replace("/", "") || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v") || parsed.pathname.split("/").pop() || null;
    }
  } catch {
    return null;
  }
  return null;
}
