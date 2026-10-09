import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { LessonClip } from "@/components/quiz/lesson-clip";
import { ShareButtons } from "@/components/quiz/share-buttons";
import { SiteFooter } from "@/components/quiz/site-footer";
import { school, type Answers, type Instrument } from "@/lib/quiz-data";
import { buildPrefillUrl } from "@/lib/form-prefill";
import { answersSummary } from "@/lib/result-params";

export function ResultView({
  answers,
  picked,
}: {
  answers: Answers;
  picked: Instrument[];
}) {
  const formUrl = buildPrefillUrl(answers, picked);
  const names = picked.map((item) => item.name).join("、");
  const shareText = `我家孩子可能會喜歡${names}。孩子真正的興趣，摸過樂器才知道｜${school.name}${school.campus}`;

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-5 pt-8 pb-6">
        <p className="text-center text-base font-semibold tracking-wide text-[#C16A4D]">
          {school.name}　{school.campus}
        </p>
        <h1 className="mt-3 text-center text-[1.85rem] leading-tight font-black text-[#3C2F2A]">
          你家孩子可能會喜歡
        </h1>
        <p className="mt-3 text-center text-base text-[#8A6E62]">
          {answersSummary(answers)}
        </p>
        <p className="mt-4 rounded-3xl bg-white/90 px-4 py-4 text-center text-lg leading-8 font-medium text-[#5C463C]">
          孩子真正的興趣，摸過樂器才知道。歡迎預約課程，老師會先讓他試這幾種。
        </p>

        <div className="mt-6 space-y-5">
          {picked.map((instrument, index) => (
            <article
              key={instrument.id}
              className="overflow-hidden rounded-[1.75rem] bg-white p-4 shadow-[0_10px_30px_rgba(224,122,95,0.12)]"
            >
              <p className="text-sm font-bold tracking-wide text-[#C16A4D]">
                可能會喜歡 {index + 1}
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#3C2F2A]">
                {instrument.name}
              </h2>
              <p className="mt-2 text-lg leading-8 text-[#5C463C]">{instrument.blurb}</p>
              <div className="mt-4">
                <LessonClip instrument={instrument} />
              </div>
            </article>
          ))}
        </div>

        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-16 w-full items-center justify-center rounded-[1.5rem] bg-[#E07A5F] text-xl font-black text-white hover:bg-[#d56b50]"
        >
          預約課程
        </a>
        <a
          href={school.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[1.5rem] border-2 border-[#06C755] bg-white text-lg font-bold text-[#06C755] hover:bg-[#f0fff6]"
        >
          <MessageCircle className="size-5" />
          用 LINE 問老師
        </a>

        <div className="mt-6">
          <p className="mb-3 text-center text-base font-semibold text-[#6B5348]">
            把結果分享給家人
          </p>
          <ShareButtons text={shareText} />
        </div>

        <p className="mt-6 text-center">
          <Link
            href="/"
            className="text-base font-semibold text-[#C16A4D] underline-offset-4 hover:underline"
          >
            再探索一次
          </Link>
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
