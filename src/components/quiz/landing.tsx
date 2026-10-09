import { Button } from "@/components/ui/button";
import { HeroArt } from "@/components/illustrations";
import { school } from "@/lib/quiz-data";

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col px-5 pb-8 pt-8">
      <p className="text-center text-base font-semibold tracking-wide text-[#C16A4D]">
        {school.name}　{school.campus}
      </p>
      <h1 className="mt-3 text-center text-[2rem] leading-tight font-black text-[#3C2F2A]">
        孩子適合什麼樂器？
      </h1>
      <HeroArt className="mx-auto mt-5 h-auto w-full max-w-sm" />
      <p className="mt-5 text-center text-lg leading-8 text-[#5C463C]">
        不是考試，也不是下定論。花大約一分鐘，看看他
        <span className="font-bold text-[#E07A5F]">可能會喜歡</span>
        什麼。真正的興趣，還是要摸過樂器才知道。
      </p>
      <ul className="mt-5 space-y-2 text-base text-[#6B5348]">
        <li className="rounded-2xl bg-white/80 px-4 py-3">6 題，選完就好</li>
        <li className="rounded-2xl bg-white/80 px-4 py-3">給家長填，適合手機直式</li>
        <li className="rounded-2xl bg-white/80 px-4 py-3">做完可以直接預約課程</li>
      </ul>
      <Button
        size="xl"
        className="mt-8 h-16 w-full rounded-[1.5rem] bg-[#E07A5F] text-xl text-white hover:bg-[#d56b50]"
        onClick={onStart}
      >
        開始探索
      </Button>
    </div>
  );
}
