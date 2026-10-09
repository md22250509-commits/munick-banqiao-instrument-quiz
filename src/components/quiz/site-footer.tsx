import { MapPin, Phone } from "lucide-react";
import { school } from "@/lib/quiz-data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#F0D2B8] bg-[#FFF8EE] px-5 py-6 text-center text-base leading-relaxed text-[#6B5348]">
      <p className="font-bold text-[#3C2F2A]">
        {school.name}　{school.campus}
      </p>
      <a
        href={school.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-start justify-center gap-1.5 text-[#6B5348] underline-offset-2 hover:underline"
      >
        <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
        <span>{school.address}</span>
      </a>
      <p className="mt-2">
        <a
          href={`tel:${school.phoneTel}`}
          className="inline-flex items-center gap-1.5 font-semibold text-[#E07A5F]"
        >
          <Phone className="size-4" aria-hidden />
          {school.phoneDisplay}
        </a>
      </p>
      <p className="mt-3 text-sm text-[#A18476]">本頁不收集個人資料，也不需要登入。</p>
    </footer>
  );
}
