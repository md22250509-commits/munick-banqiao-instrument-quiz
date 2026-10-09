import { SCHOOL } from "@/lib/quiz";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-[#F0D9C8] pt-5 text-base leading-relaxed text-[#7A645B]">
      <p className="font-bold text-[#3A2A24]">
        {SCHOOL.name} · {SCHOOL.campus}
      </p>
      <p>
        <a className="underline decoration-[#E7C3B2] underline-offset-4" href={SCHOOL.mapUrl}>
          {SCHOOL.address}
        </a>
        （{SCHOOL.addressNote}）
      </p>
      <p>
        <a className="font-bold text-[#3A2A24]" href={`tel:${SCHOOL.phoneTel}`}>
          {SCHOOL.phoneDisplay}
        </a>
      </p>
    </footer>
  );
}
