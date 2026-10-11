import type { InstrumentId } from "@/lib/quiz";

/**
 * 上課短片。目前是占位，換成教室影片時：
 * 1. 把 mp4 放到 public/videos/
 * 2. 把對應的 null 改成 "/videos/檔名.mp4"
 */
export const classClips: Record<InstrumentId, string | null> = {
  drums: null,
  guitar: null,
  vocal: null,
  piano: null,
};
