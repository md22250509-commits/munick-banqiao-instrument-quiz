import { Play } from "lucide-react";
import { InstrumentArt } from "@/components/illustrations";
import type { Instrument } from "@/lib/quiz-data";
import { instrumentVideos, youtubeIdFromUrl } from "@/lib/videos";

export function LessonClip({ instrument }: { instrument: Instrument }) {
  const media = instrumentVideos[instrument.id];
  const youtubeId = media.src ? youtubeIdFromUrl(media.src) : null;

  if (youtubeId) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl bg-[#3C2F2A]">
        <iframe
          title={`${instrument.name}上課短片`}
          src={`https://www.youtube.com/embed/${youtubeId}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (media.src) {
    return (
      <video
        className="aspect-video w-full rounded-2xl bg-[#3C2F2A] object-cover"
        controls
        playsInline
        poster={media.poster || undefined}
        src={media.src}
      >
        你的瀏覽器不支援影片播放。
      </video>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <InstrumentArt id={instrument.id} className="h-auto w-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#3C2F2A]/25 px-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-[#E07A5F] shadow-md">
          <Play className="size-7 translate-x-0.5" fill="currentColor" />
        </span>
        <p className="mt-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#6B5348]">
          上課短片即將上架
        </p>
      </div>
    </div>
  );
}
