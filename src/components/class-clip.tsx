import { Play } from "lucide-react";

export function ClassClip({
  src,
  poster,
  label,
}: {
  src: string | null;
  poster: string;
  label: string;
}) {
  if (src) {
    return (
      <video
        className="aspect-video w-full rounded-2xl bg-[#3A2A24]"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={`${label}上課短片`}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#F6E4D2]"
      role="img"
      aria-label={`${label}的上課短片準備中`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.8)",
        }}
      />
      <div className="absolute inset-0 bg-[#FFF6EC]/72" />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-white text-[#E15B48] shadow-sm">
          <Play className="size-7 fill-current" aria-hidden="true" />
        </span>
        <p className="text-lg font-bold text-[#3A2A24]">上課短片準備中</p>
        <p className="text-base text-[#7A645B]">之後會換成教室裡的真實片段</p>
      </div>
    </div>
  );
}
