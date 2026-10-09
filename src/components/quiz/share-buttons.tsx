"use client";

import { Button } from "@/components/ui/button";

export function ShareButtons({ text }: { text: string }) {
  const share = (kind: "line" | "facebook") => {
    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedText = encodeURIComponent(text);
    const href =
      kind === "line"
        ? `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`
        : `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="h-12 rounded-2xl border-[#06C755] bg-[#06C755] text-base font-bold text-white hover:bg-[#05b34c] hover:text-white"
        onClick={() => share("line")}
      >
        分享到 LINE
      </Button>
      <Button
        variant="outline"
        className="h-12 rounded-2xl border-[#1877F2] bg-[#1877F2] text-base font-bold text-white hover:bg-[#166fe0] hover:text-white"
        onClick={() => share("facebook")}
      >
        分享到 FB
      </Button>
    </div>
  );
}
