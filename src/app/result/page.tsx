import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ResultView } from "@/components/quiz/result-view";
import { SiteFooter } from "@/components/quiz/site-footer";
import { recommendInstruments } from "@/lib/recommend";
import { parseResultParams } from "@/lib/result-params";
import { school } from "@/lib/quiz-data";
import { getSiteUrl } from "@/lib/site-url";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const answers = parseResultParams(await searchParams);
  if (!answers) {
    return {
      title: `孩子適合什麼樂器？｜${school.name}${school.campus}`,
    };
  }
  const names = recommendInstruments(answers)
    .map((item) => item.name)
    .join("、");
  const title = `你家孩子可能會喜歡${names}`;
  const description =
    "孩子真正的興趣，摸過樂器才知道。歡迎預約課程，老師會先讓他試這幾種。";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "zh_TW",
      type: "website",
      url: `${getSiteUrl()}/result`,
    },
  };
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<ResultFallback />}>
      <ResultInner searchParams={searchParams} />
    </Suspense>
  );
}

async function ResultInner({ searchParams }: { searchParams: SearchParams }) {
  const answers = parseResultParams(await searchParams);
  if (!answers) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#FFF4E8]">
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-black text-[#3C2F2A]">先花一分鐘探索看看</h1>
          <p className="mt-3 text-lg leading-8 text-[#6B5348]">
            這份結果需要先回答 6 題。沒有標準答案，選最接近的就好。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-[1.5rem] bg-[#E07A5F] px-8 text-lg font-bold text-white"
          >
            開始探索
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const picked = recommendInstruments(answers);
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#FFF4E8]">
      <ResultView answers={answers} picked={picked} />
    </div>
  );
}

function ResultFallback() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center bg-[#FFF4E8] text-lg text-[#6B5348]">
      結果準備中…
    </div>
  );
}
